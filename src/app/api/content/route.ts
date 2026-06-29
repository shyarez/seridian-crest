import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import Content from '@/lib/db/models/Content';
import { requireSession } from '@/lib/auth';
import { ContentFieldsSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

// GET /api/content?pageId=home
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');

  await connectDB();
  const filter = pageId ? { pageId } : {};
  const blocks = await Content.find(filter).lean();
  return NextResponse.json(blocks);
}

// PUT /api/content — Admin: update a block
export async function PUT(request: NextRequest) {
  try {
    await requireSession();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { pageId, sectionId, fields } = body;

  if (!pageId || !sectionId) {
    return NextResponse.json({ error: 'pageId and sectionId are required' }, { status: 400 });
  }

  const parsed = ContentFieldsSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  await connectDB();
  const content = await Content.findOneAndUpdate(
    { pageId, sectionId },
    { $set: { fields: parsed.data } },
    { new: true, upsert: true }
  );

  const pathMap: Record<string, string> = {
    home: '/',
    about: '/about',
    services: '/services',
    contact: '/contact',
  };
  revalidatePath(pathMap[pageId] ?? '/');
  revalidatePath('/admin/content');

  return NextResponse.json(content);
}
