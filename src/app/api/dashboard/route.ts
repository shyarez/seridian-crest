import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import Lead from '@/lib/db/models/Lead';
import Service from '@/lib/db/models/Service';
import { requireSession } from '@/lib/auth';

// GET /api/dashboard — Admin: summary stats + recent leads
export async function GET() {
  try {
    await requireSession();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();

  const [totalLeads, newLeads, totalServices, activeServices, recentLeads] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ status: 'new' }),
    Service.countDocuments(),
    Service.countDocuments({ isActive: true }),
    Lead.find().sort({ submittedAt: -1 }).limit(5).lean(),
  ]);

  return NextResponse.json({
    stats: { totalLeads, newLeads, totalServices, activeServices },
    recentLeads: JSON.parse(JSON.stringify(recentLeads)),
  });
}
