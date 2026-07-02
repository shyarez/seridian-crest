import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Building, Briefcase, Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import LeadActions from './LeadActions';

export const metadata: Metadata = { title: 'Lead Details | Admin' };

async function getLead(id: string) {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const res = await fetch(`${protocol}://${host}/api/leads/${id}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to load lead');
  return res.json();
}

export default async function LeadDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const lead = await getLead(params.id);

  if (!lead) notFound();

  const STATUS_COLORS: Record<string, string> = {
    new: 'text-orange-700 bg-orange-100',
    reviewed: 'text-brand-primary bg-brand-bg border border-brand-border',
    closed: 'text-green-700 bg-green-100',
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/leads" className="inline-flex items-center gap-2 text-brand-text-secondary hover:text-brand-primary font-bold text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Leads
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-brand-primary">Lead Details</h1>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider ${STATUS_COLORS[lead.status]}`}>
              Status: {lead.status}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-sm mb-8">
        {/* Header section */}
        <div className="p-8 border-b border-brand-border bg-brand-bg">
          <h2 className="text-2xl font-extrabold text-brand-primary mb-2">{lead.name}</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-text-secondary font-medium">
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-brand-accent" /> <a href={`mailto:${lead.email}`} className="hover:text-brand-primary transition-colors">{lead.email}</a></div>
            {lead.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-brand-accent" /> <a href={`tel:${lead.phone}`} className="hover:text-brand-primary transition-colors">{lead.phone}</a></div>}
            {lead.company && <div className="flex items-center gap-2"><Building className="w-4 h-4 text-brand-accent" /> {lead.company}</div>}
          </div>
        </div>

        {/* Content section */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border">
              <div className="flex items-center gap-2 text-brand-text-secondary mb-2">
                <Briefcase className="w-4 h-4" /> <span className="font-bold text-sm uppercase tracking-wider">Service Required</span>
              </div>
              <p className="text-brand-primary font-bold text-lg">{lead.service || 'Not specified'}</p>
            </div>
            <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border">
              <div className="flex items-center gap-2 text-brand-text-secondary mb-2">
                <Calendar className="w-4 h-4" /> <span className="font-bold text-sm uppercase tracking-wider">Submitted On</span>
              </div>
              <p className="text-brand-primary font-bold text-lg">
                {new Date(lead.submittedAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br/>
                <span className="text-sm font-medium text-brand-text-secondary">{new Date(lead.submittedAt).toLocaleTimeString('en-US')}</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-brand-primary text-lg mb-4">Message</h3>
            <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border text-brand-primary leading-relaxed whitespace-pre-wrap">
              {lead.message}
            </div>
          </div>
        </div>
      </div>

      {/* Client component for interactive actions */}
      <LeadActions leadId={lead._id} currentStatus={lead.status} />
    </div>
  );
}
