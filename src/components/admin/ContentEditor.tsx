'use client';

import { useState } from 'react';
import { IContent } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function ContentEditor({ initialData }: { initialData: IContent }) {
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    const form = e.currentTarget;
    const getValue = (name: string) =>
      ((form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement)?.value) || undefined;

    const data = {
      heroTitle: getValue('heroTitle'),
      heroSubtitle: getValue('heroSubtitle'),
      aboutContent: getValue('aboutContent'),
      mission: getValue('mission'),
      vision: getValue('vision'),
      ctaText: getValue('ctaText'),
      phone: getValue('phone'),
      email: getValue('email'),
      address: getValue('address'),
    };

    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setSaving(false);

    if (res.ok) {
      toast.success('Content updated successfully.');
    } else {
      const body = await res.json();
      if (body.errors) {
        setErrors(body.errors);
        toast.error('Please fix the errors in the form.');
      } else {
        toast.error(body.error ?? 'Something went wrong.');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-10">

      {/* Hero Section */}
      <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-sm">
        <h2 className="text-xl font-extrabold text-brand-primary mb-6">Hero Section</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Input id="heroTitle" name="heroTitle" defaultValue={initialData.heroTitle} className="text-base" />
            {errors.heroTitle && <p className="text-red-500 text-xs">{errors.heroTitle[0]}</p>}
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
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-secondary disabled:opacity-60 transition-all shadow-md"
        >
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> Save Content</>}
        </button>
      </div>
    </form>
  );
}
