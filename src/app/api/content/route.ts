import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import Content from '@/lib/db/models/Content';
import { requireSession } from '@/lib/auth';
import { ContentSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

// GET /api/content — Public: get global content document
export async function GET() {
  await connectDB();
  let content = await Content.findOne().lean();
  if (!content) {
    content = await Content.create({});
  }
  return NextResponse.json(content);
}

// PUT /api/content — Admin: update global content document
export async function PUT(request: NextRequest) {
  try {
    await requireSession();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = ContentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  await connectDB();
  const content = await Content.findOneAndUpdate(
    {},
    { $set: parsed.data },
    { new: true, upsert: true }
  );

  revalidatePath('/', 'layout');

  return NextResponse.json(content);
}
