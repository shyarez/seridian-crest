import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import Lead from '@/lib/db/models/Lead';
import { requireSession } from '@/lib/auth';
import { LeadSchema } from '@/lib/validations';

// GET /api/leads — Admin: list all leads
export async function GET(request: NextRequest) {
  try {
    await requireSession();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const filter = status && status !== 'all' ? { status } : {};
  const leads = await Lead.find(filter).sort({ submittedAt: -1 }).lean();
  return NextResponse.json(leads);
}

// POST /api/leads — Public: submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = LeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 422 });
    }

    await connectDB();
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
    const lead = await Lead.create({ ...parsed.data, ipAddress: ip, submittedAt: new Date() });
    return NextResponse.json(lead, { status: 201 });
  } catch (err) {
    console.error('[POST /api/leads]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
