'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/db/mongoose';
import Service from '@/lib/db/models/Service';
import { requireSession } from '@/lib/auth';
import { ServiceSchema } from '@/lib/validations';
import { ActionResult, IService } from '@/types';

export async function createService(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult<IService>> {
  await requireSession();

  const raw = {
    title: formData.get('title'),
    description: formData.get('description'),
    icon: formData.get('icon'),
    features: formData.getAll('features').filter(Boolean),
    benefits: formData.getAll('benefits').filter(Boolean),
    order: Number(formData.get('order') ?? 0),
    isActive: formData.get('isActive') === 'true',
  };

  const parsed = ServiceSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  await connectDB();
  const service = await Service.create(parsed.data);
  revalidatePath('/', 'layout');

  return { success: true, data: JSON.parse(JSON.stringify(service)) };
}

export async function updateService(
  id: string,
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult<IService>> {
  await requireSession();

  const raw = {
    title: formData.get('title'),
    description: formData.get('description'),
    icon: formData.get('icon'),
    features: formData.getAll('features').filter(Boolean),
    benefits: formData.getAll('benefits').filter(Boolean),
    order: Number(formData.get('order') ?? 0),
    isActive: formData.get('isActive') === 'true',
  };

  const parsed = ServiceSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  await connectDB();
  const service = await Service.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!service) return { success: false, message: 'Service not found' };

  revalidatePath('/', 'layout');

  return { success: true, data: JSON.parse(JSON.stringify(service)) };
}

export async function deleteService(id: string): Promise<ActionResult> {
  await requireSession();
  await connectDB();

  await Service.findByIdAndDelete(id);
  revalidatePath('/', 'layout');

  return { success: true, message: 'Service deleted' };
}
