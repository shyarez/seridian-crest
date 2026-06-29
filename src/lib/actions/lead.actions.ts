'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/db/mongoose';
import Lead from '@/lib/db/models/Lead';
import { requireSession } from '@/lib/auth';
import { LeadSchema } from '@/lib/validations';
import { ActionResult, ILead } from '@/types';

export async function submitLead(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company') || undefined,
    phone: formData.get('phone') || undefined,
    service: formData.get('service') || undefined,
    message: formData.get('message'),
  };

  const parsed = LeadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await connectDB();
  await Lead.create({ ...parsed.data, submittedAt: new Date() });

  return { success: true, message: 'Your enquiry has been received. We will be in touch shortly.' };
}

export async function updateLead(
  id: string,
  data: { status?: string }
): Promise<ActionResult<ILead>> {
  await requireSession();
  await connectDB();

  const lead = await Lead.findByIdAndUpdate(id, { ...data }, { new: true });
  if (!lead) return { success: false, message: 'Lead not found' };

  revalidatePath('/admin/leads');
  revalidatePath(`/admin/leads/${id}`);

  return { success: true, data: JSON.parse(JSON.stringify(lead)) };
}

export async function deleteLead(id: string): Promise<ActionResult> {
  await requireSession();
  await connectDB();

  await Lead.findByIdAndDelete(id);
  revalidatePath('/admin/leads');

  return { success: true, message: 'Lead deleted' };
}
