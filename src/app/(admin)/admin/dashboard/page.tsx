import type { Metadata } from 'next';
import { connectDB } from '@/lib/db/mongoose';
import Lead from '@/lib/db/models/Lead';
import Service from '@/lib/db/models/Service';
import { Inbox, Layers, FileText, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Dashboard | Admin' };

async function getStats() {
  await connectDB();
  const [totalLeads, newLeads, totalServices, activeServices] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ status: 'new' }),
    Service.countDocuments(),
    Service.countDocuments({ isActive: true }),
  ]);
  return { totalLeads, newLeads, totalServices, activeServices };
}

async function getRecentLeads() {
  await connectDB();
  const leads = await Lead.find().sort({ submittedAt: -1 }).limit(5).lean();
  return JSON.parse(JSON.stringify(leads));
}

export default async function DashboardPage() {
  const [stats, recentLeads] = await Promise.all([getStats(), getRecentLeads()]);

  const STAT_CARDS = [
    { icon: Inbox, label: 'Total Leads', value: stats.totalLeads, sub: `${stats.newLeads} new`, href: '/admin/leads', color: 'text-brand-accent bg-brand-accent/10' },
    { icon: TrendingUp, label: 'New Leads', value: stats.newLeads, sub: 'Awaiting action', href: '/admin/leads?status=new', color: 'text-orange-500 bg-orange-500/10' },
    { icon: Layers, label: 'Total Services', value: stats.totalServices, sub: `${stats.activeServices} active`, href: '/admin/services', color: 'text-brand-primary bg-brand-primary/10' },
    { icon: FileText, label: 'Content Blocks', value: 'Global', sub: 'Editable fields', href: '/admin/content', color: 'text-purple-500 bg-purple-500/10' },
  ];

  const STATUS_COLORS: Record<string, string> = {
    new: 'bg-orange-100 text-orange-700',
    reviewed: 'bg-brand-bg text-brand-primary border border-brand-border',
    closed: 'bg-green-100 text-green-700',
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-primary">Dashboard</h1>
          <p className="text-brand-text-secondary mt-1 text-lg">Overview of your site activity.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/content" className="px-4 py-2 rounded-xl bg-white border border-brand-border text-brand-primary font-bold text-sm hover:bg-brand-bg transition-colors">
            Edit Content
          </Link>
          <Link href="/admin/services/new" className="px-4 py-2 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-secondary transition-colors shadow-md">
            Add Service
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {STAT_CARDS.map(({ icon: Icon, label, value, sub, href, color }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-3xl border border-brand-border p-6 hover:shadow-lg hover:border-brand-accent/30 transition-all hover:-translate-y-1"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <p className="text-3xl font-extrabold text-brand-primary">{value}</p>
            <p className="text-sm font-bold text-brand-text-secondary mt-1 uppercase tracking-wider">{label}</p>
            <p className="text-xs text-brand-text-secondary/70 mt-2">{sub}</p>
          </Link>
        ))}
      </div>

      {/* Recent leads */}
      <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-brand-border flex items-center justify-between bg-brand-bg/50">
          <h2 className="text-lg font-extrabold text-brand-primary">Recent Leads</h2>
          <Link href="/admin/leads" className="text-sm text-brand-accent hover:text-brand-primary font-bold transition-colors">
            View all leads →
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <div className="text-center py-16">
            <Inbox className="w-12 h-12 text-brand-border mx-auto mb-4" />
            <p className="text-brand-text-secondary font-medium">No leads received yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-brand-border">
            {recentLeads.map((lead: { _id: string; name: string; email: string; status: string; submittedAt: string; service?: string }) => (
              <Link
                key={lead._id}
                href={`/admin/leads/${lead._id}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between px-8 py-5 hover:bg-brand-bg transition-colors gap-4"
              >
                <div>
                  <p className="text-base font-bold text-brand-primary mb-1">{lead.name}</p>
                  <div className="flex items-center gap-3 text-sm text-brand-text-secondary">
                    <span>{lead.email}</span>
                    {lead.service && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-brand-border" />
                        <span className="font-medium text-brand-accent">{lead.service}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider ${STATUS_COLORS[lead.status]}`}>
                    {lead.status}
                  </span>
                  <span className="text-sm text-brand-text-secondary/70 font-medium whitespace-nowrap">
                    {new Date(lead.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
