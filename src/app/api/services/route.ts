import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import Service from '@/lib/db/models/Service';
import { requireSession } from '@/lib/auth';
import { ServiceSchema } from '@/lib/validations';

// GET /api/services — Public: active services; ?all=true (admin): all services
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const showAll = searchParams.get('all') === 'true';

  if (showAll) {
    try {
      await requireSession();
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  await connectDB();
  const filter = showAll ? {} : { isActive: true };
  const services = await Service.find(filter).sort({ order: 1 }).lean();
  return NextResponse.json(services);
}

// POST /api/services — Admin: create service
export async function POST(request: NextRequest) {
  try {
    await requireSession();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = ServiceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  await connectDB();
  const service = await Service.create(parsed.data);
  return NextResponse.json(service, { status: 201 });
}
