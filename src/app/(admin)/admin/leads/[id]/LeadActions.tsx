'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface LeadActionsProps {
  leadId: string;
  currentStatus: string;
}

export default function LeadActions({ leadId, currentStatus }: LeadActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function updateStatus(status: string) {
    setLoading(status);
    const res = await fetch(`/api/leads/${leadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setLoading(null);

    if (res.ok) {
      toast.success(`Lead marked as ${status}.`);
      router.refresh();
    } else {
      toast.error('Failed to update lead status.');
    }
  }

  async function deleteLead() {
    if (!confirm('Delete this lead permanently?')) return;
    setLoading('delete');
    const res = await fetch(`/api/leads/${leadId}`, { method: 'DELETE' });
    setLoading(null);

    if (res.ok) {
      toast.success('Lead deleted.');
      router.push('/admin/leads');
    } else {
      toast.error('Failed to delete lead.');
    }
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 p-6 bg-white rounded-3xl border border-brand-border shadow-sm">
      <div className="flex gap-4">
        {currentStatus !== 'reviewed' && (
          <button
            onClick={() => updateStatus('reviewed')}
            disabled={!!loading}
            className="px-6 py-2.5 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-secondary disabled:opacity-60 transition-colors shadow-md"
          >
            {loading === 'reviewed' ? <Loader2 className="w-4 h-4 animate-spin inline" /> : 'Mark as Reviewed'}
          </button>
        )}
        {currentStatus !== 'closed' && (
          <button
            onClick={() => updateStatus('closed')}
            disabled={!!loading}
            className="px-6 py-2.5 rounded-xl border border-brand-border text-brand-primary font-bold text-sm hover:bg-brand-bg disabled:opacity-60 transition-colors"
          >
            {loading === 'closed' ? <Loader2 className="w-4 h-4 animate-spin inline" /> : 'Mark as Closed'}
          </button>
        )}
      </div>
      <button
        onClick={deleteLead}
        disabled={!!loading}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 disabled:opacity-60 transition-colors"
      >
        {loading === 'delete' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        Delete
      </button>
    </div>
  );
}
