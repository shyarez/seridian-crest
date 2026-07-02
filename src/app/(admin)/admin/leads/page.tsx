import { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = { title: 'Leads | Admin' };

async function getLeads(status?: string) {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const cookie = headersList.get('cookie') ?? '';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const url = new URL(`${protocol}://${host}/api/leads`);
  if (status) url.searchParams.set('status', status);

  const res = await fetch(url.toString(), {
    cache: 'no-store',
    headers: { cookie },
  });

  if (res.status === 401) return null;
  if (!res.ok) return [];
  return res.json();
}

export default async function AdminLeadsPage(props: { searchParams: Promise<{ status?: string }> }) {
  const searchParams = await props.searchParams;
  const statusFilter = searchParams.status;
  const leads = await getLeads(statusFilter);

  if (leads === null) redirect('/admin/login');

  const STATUS_COLORS: Record<string, string> = {
    new: 'bg-orange-100 text-orange-700',
    reviewed: 'bg-brand-bg text-brand-primary border border-brand-border',
    closed: 'bg-green-100 text-green-700',
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-primary">Leads Management</h1>
          <p className="text-brand-text-secondary mt-2 text-lg">View and manage incoming customer enquiries.</p>
        </div>
        <div className="flex bg-white rounded-xl border border-brand-border p-1">
          <Link
            href="/admin/leads"
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${!statusFilter ? 'bg-brand-bg text-brand-primary' : 'text-brand-text-secondary hover:text-brand-primary'}`}
          >
            All
          </Link>
          <Link
            href="/admin/leads?status=new"
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${statusFilter === 'new' ? 'bg-brand-bg text-brand-primary' : 'text-brand-text-secondary hover:text-brand-primary'}`}
          >
            New
          </Link>
          <Link
            href="/admin/leads?status=reviewed"
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${statusFilter === 'reviewed' ? 'bg-brand-bg text-brand-primary' : 'text-brand-text-secondary hover:text-brand-primary'}`}
          >
            Reviewed
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-sm">
        {leads.length === 0 ? (
          <div className="text-center py-20 text-brand-text-secondary text-lg">
            No leads found for this filter.
          </div>
        ) : (
          <div className="divide-y divide-brand-border">
            {leads.map((lead: any) => (
              <Link
                key={lead._id}
                href={`/admin/leads/${lead._id}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-brand-bg transition-colors gap-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg text-brand-primary">{lead.name}</h3>
                    {lead.company && (
                      <span className="text-sm font-medium text-brand-text-secondary">@ {lead.company}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-brand-text-secondary">
                    <span>{lead.email}</span>
                    {lead.phone && <span>{lead.phone}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {lead.service && (
                    <div className="hidden md:block text-right">
                      <p className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-wider mb-1">Service</p>
                      <p className="text-sm font-bold text-brand-accent">{lead.service}</p>
                    </div>
                  )}
                  <div className="text-right">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider block mb-2 ${STATUS_COLORS[lead.status]}`}>
                      {lead.status}
                    </span>
                    <span className="text-xs font-medium text-brand-text-secondary">
                      {new Date(lead.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
