'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createService, updateService } from '@/lib/actions/service.actions';
import { IService } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-secondary disabled:opacity-60 transition-all shadow-md"
    >
      {pending ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> {isEditing ? 'Update' : 'Create'} Service</>}
    </button>
  );
}

export default function ServiceForm({ initialData }: { initialData?: IService }) {
  const router = useRouter();
  const isEditing = !!initialData;

  const action = isEditing ? updateService.bind(null, initialData._id) : createService;
  const [state, formAction] = useActionState(action, { success: false });

  // State for dynamic arrays
  const [features, setFeatures] = useState<string[]>(initialData?.features?.length ? initialData.features : ['']);
  const [benefits, setBenefits] = useState<string[]>(initialData?.benefits?.length ? initialData.benefits : ['']);

  useEffect(() => {
    if (state.success) {
      toast.success(`Service ${isEditing ? 'updated' : 'created'} successfully.`);
      if (!isEditing) router.push('/admin/services');
    }
    if (state.success === false && state.errors) {
      toast.error('Please fix the errors in the form.');
    }
  }, [state, isEditing, router]);

  return (
    <form action={formAction} className="space-y-8 pb-10">
      <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-sm">
        <h2 className="text-xl font-extrabold text-brand-primary mb-6">Service Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={initialData?.title} className="text-base" required />
            {state.errors?.title && <p className="text-red-500 text-xs">{state.errors.title[0]}</p>}
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
            <Input id="order" name="order" type="number" defaultValue={initialData?.order || 0} className="text-base" />
          </div>
          <div className="flex items-center gap-2 mt-8">
            <input type="checkbox" id="isActive" name="isActive" value="true" defaultChecked={initialData?.isActive !== false} className="w-5 h-5 accent-brand-primary" />
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
                <Input name="features" value={val} onChange={(e) => { const newF = [...features]; newF[i] = e.target.value; setFeatures(newF); }} className="text-base" placeholder="Feature description..." />
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
                <Input name="benefits" value={val} onChange={(e) => { const newB = [...benefits]; newB[i] = e.target.value; setBenefits(newB); }} className="text-base" placeholder="Benefit description..." />
                <button type="button" onClick={() => setBenefits(benefits.filter((_, idx) => idx !== i))} className="p-2 text-brand-text-secondary hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button type="button" onClick={() => router.push('/admin/services')} className="px-6 py-2.5 rounded-xl border border-brand-border text-brand-text-primary font-bold text-sm hover:bg-brand-bg transition-all">
          Cancel
        </button>
        <SubmitButton isEditing={isEditing} />
      </div>
    </form>
  );
}
