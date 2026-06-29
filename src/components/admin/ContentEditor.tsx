'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateContent } from '@/lib/actions/content.actions';
import { IContent } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-secondary disabled:opacity-60 transition-all shadow-md"
    >
      {pending ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> Save Content</>}
    </button>
  );
}

export default function ContentEditor({ initialData }: { initialData: IContent }) {
  const [state, formAction] = useActionState(updateContent, { success: false });

  useEffect(() => {
    if (state.success) {
      toast.success('Content updated successfully.');
    }
    if (state.success === false && state.errors) {
      toast.error('Please fix the errors in the form.');
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-8 pb-10">
      
      {/* Hero Section */}
      <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-sm">
        <h2 className="text-xl font-extrabold text-brand-primary mb-6">Hero Section</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Input id="heroTitle" name="heroTitle" defaultValue={initialData.heroTitle} className="text-base" />
            {state.errors?.heroTitle && <p className="text-red-500 text-xs">{state.errors.heroTitle[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
            <Textarea id="heroSubtitle" name="heroSubtitle" defaultValue={initialData.heroSubtitle} rows={3} className="text-base" />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-sm">
        <h2 className="text-xl font-extrabold text-brand-primary mb-6">About & Mission</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="aboutContent">Company Overview (About)</Label>
            <Textarea id="aboutContent" name="aboutContent" defaultValue={initialData.aboutContent} rows={4} className="text-base" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="mission">Mission Statement</Label>
              <Textarea id="mission" name="mission" defaultValue={initialData.mission} rows={4} className="text-base" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vision">Vision Statement</Label>
              <Textarea id="vision" name="vision" defaultValue={initialData.vision} rows={4} className="text-base" />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action & Contact */}
      <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-sm">
        <h2 className="text-xl font-extrabold text-brand-primary mb-6">Contact & CTA</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ctaText">Global CTA Text</Label>
            <Input id="ctaText" name="ctaText" defaultValue={initialData.ctaText} className="text-base" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" defaultValue={initialData.phone} className="text-base" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" defaultValue={initialData.email} className="text-base" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Office Address</Label>
              <Input id="address" name="address" defaultValue={initialData.address} className="text-base" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
