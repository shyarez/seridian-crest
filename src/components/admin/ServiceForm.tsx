'use client';

import { useState } from 'react';
import { IService } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ServiceForm({ initialData }: { initialData?: IService }) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [features, setFeatures] = useState<string[]>(
    initialData?.features?.length ? initialData.features : ['']
  );
  const [benefits, setBenefits] = useState<string[]>(
    initialData?.benefits?.length ? initialData.benefits : ['']
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    const form = e.currentTarget;
    const data = {
      title: (form.elements.namedItem('title') as HTMLInputElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
      icon: (form.elements.namedItem('icon') as HTMLInputElement).value,
      order: Number((form.elements.namedItem('order') as HTMLInputElement).value ?? 0),
      isActive: (form.elements.namedItem('isActive') as HTMLInputElement).checked,
      features: features.filter(Boolean),
      benefits: benefits.filter(Boolean),
    };

    const url = isEditing ? `/api/services/${initialData._id}` : '/api/services';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setSaving(false);

    if (res.ok) {
      toast.success(`Service ${isEditing ? 'updated' : 'created'} successfully.`);
      if (!isEditing) router.push('/admin/services');
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

  async function handleDelete() {
    if (!initialData?._id) return;
    if (!confirm('Are you sure you want to delete this service? This cannot be undone.')) return;

    setDeleting(true);
    const res = await fetch(`/api/services/${initialData._id}`, { method: 'DELETE' });
    setDeleting(false);

    if (res.ok) {
      toast.success('Service deleted.');
      router.push('/admin/services');
    } else {
      toast.error('Failed to delete service.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-10">
      <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-sm">
        <h2 className="text-xl font-extrabold text-brand-primary mb-6">Service Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={initialData?.title} className="text-base" required />
            {errors.title && <p className="text-red-500 text-xs">{errors.title[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Lucide Icon Name</Label>
            <Input id="icon" name="icon" defaultValue={initialData?.icon || 'Anchor'} className="text-base" required />
            <p className="text-xs text-brand-text-secondary">E.g., Anchor, Ship, Package, ShieldCheck</p>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <Label htmlFor="description">Overview (Description)</Label>
          <Textarea id="description" name="description" defaultValue={initialData?.description} rows={4} className="text-base" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input id="order" name="order" type="number" defaultValue={initialData?.order ?? 0} className="text-base" />
          </div>
          <div className="flex items-center gap-2 mt-8">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              defaultChecked={initialData?.isActive !== false}
              className="w-5 h-5 accent-brand-primary"
            />
            <Label htmlFor="isActive" className="text-base cursor-pointer">Active (Visible on website)</Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Features */}
        <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-brand-primary">Features</h2>
            <button type="button" onClick={() => setFeatures([...features, ''])} className="text-brand-accent hover:text-brand-primary text-sm font-bold flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <div className="space-y-3">
            {features.map((val, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={val}
                  onChange={(e) => { const f = [...features]; f[i] = e.target.value; setFeatures(f); }}
                  className="text-base"
                  placeholder="Feature description..."
                />
                <button type="button" onClick={() => setFeatures(features.filter((_, idx) => idx !== i))} className="p-2 text-brand-text-secondary hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-brand-primary">Benefits</h2>
            <button type="button" onClick={() => setBenefits([...benefits, ''])} className="text-brand-accent hover:text-brand-primary text-sm font-bold flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <div className="space-y-3">
            {benefits.map((val, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={val}
                  onChange={(e) => { const b = [...benefits]; b[i] = e.target.value; setBenefits(b); }}
                  className="text-base"
                  placeholder="Benefit description..."
                />
                <button type="button" onClick={() => setBenefits(benefits.filter((_, idx) => idx !== i))} className="p-2 text-brand-text-secondary hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <div>
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 disabled:opacity-60 transition-colors"
            >
              {deleting ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting…</> : <><Trash2 className="w-4 h-4" /> Delete Service</>}
            </button>
          )}
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.push('/admin/services')}
            className="px-6 py-2.5 rounded-xl border border-brand-border text-brand-text-primary font-bold text-sm hover:bg-brand-bg transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-secondary disabled:opacity-60 transition-all shadow-md"
          >
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> {isEditing ? 'Update' : 'Create'} Service</>}
          </button>
        </div>
      </div>
    </form>
  );
}
