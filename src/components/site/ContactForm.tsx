'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitLead } from '@/lib/actions/lead.actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ActionResult } from '@/types';
import { Loader2, SendHorizonal, CheckCircle2 } from 'lucide-react';

const SERVICES = [
  'Liner Agency & Husbandry',
  'Freight Forwarding & Cargo Management',
  'Project & Breakbulk Cargo',
  'Customs Clearance & Compliance',
];

const initialState: ActionResult = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      id="contact-submit"
      className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-secondary disabled:opacity-60 transition-all shadow-xl hover:-translate-y-0.5"
    >
      {pending ? (
        <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
      ) : (
        <><SendHorizonal className="w-4 h-4" /> Submit Enquiry</>
      )}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitLead, initialState);

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4 bg-brand-bg rounded-2xl border border-brand-border">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2 shadow-sm">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-extrabold text-brand-primary">Enquiry Received</h3>
        <p className="text-brand-text-secondary text-lg max-w-sm">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-brand-text-primary font-bold">Full Name <span className="text-red-500">*</span></Label>
          <Input id="name" name="name" placeholder="John Smith" required className="text-base h-12" />
          {state.errors?.name && (
            <p className="text-red-500 text-xs">{state.errors.name[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-brand-text-primary font-bold">Email Address <span className="text-red-500">*</span></Label>
          <Input id="email" name="email" type="email" placeholder="john@company.com" required className="text-base h-12" />
          {state.errors?.email && (
            <p className="text-red-500 text-xs">{state.errors.email[0]}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company" className="text-brand-text-primary font-bold">Company Name</Label>
          <Input id="company" name="company" placeholder="Acme Shipping Co." className="text-base h-12" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-brand-text-primary font-bold">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" className="text-base h-12" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="service" className="text-brand-text-primary font-bold">Service Required</Label>
        <select
          id="service"
          name="service"
          className="w-full h-12 px-4 rounded-xl border border-brand-border bg-white text-base ring-offset-background focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors"
        >
          <option value="">Select a service…</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-brand-text-primary font-bold">Message <span className="text-red-500">*</span></Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Describe your cargo, route, or requirements…"
          rows={5}
          required
          className="text-base resize-none"
        />
        {state.errors?.message && (
          <p className="text-red-500 text-xs">{state.errors.message[0]}</p>
        )}
      </div>

      <div className="pt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
