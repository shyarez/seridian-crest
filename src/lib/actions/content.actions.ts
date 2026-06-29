'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/db/mongoose';
import Content from '@/lib/db/models/Content';
import { requireSession } from '@/lib/auth';
import { ContentSchema } from '@/lib/validations';
import { ActionResult, IContent } from '@/types';

// ─── Admin: Update the global content document ─────────────────────────────
export async function updateContent(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult<IContent>> {
  await requireSession();

  const raw = {
    heroTitle: (formData.get('heroTitle') as string) || undefined,
    heroSubtitle: (formData.get('heroSubtitle') as string) || undefined,
    aboutContent: (formData.get('aboutContent') as string) || undefined,
    mission: (formData.get('mission') as string) || undefined,
    vision: (formData.get('vision') as string) || undefined,
    ctaText: (formData.get('ctaText') as string) || undefined,
    phone: (formData.get('phone') as string) || undefined,
    email: (formData.get('email') as string) || undefined,
    address: (formData.get('address') as string) || undefined,
  };

  const parsed = ContentSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  await connectDB();

  // Upsert the single content document
  const content = await Content.findOneAndUpdate(
    {}, // match the first/only document
    { $set: parsed.data },
    { new: true, upsert: true }
  );

  // Revalidate all pages since content could be anywhere
  revalidatePath('/', 'layout');

  return { success: true, data: JSON.parse(JSON.stringify(content)) };
}

// ─── Read: Get global content (server-side) ────────────────────────────────
export async function getGlobalContent(): Promise<IContent> {
  if (!process.env.MONGODB_URI) {
    return {
      heroTitle: 'Global Maritime Logistics Made Reliable',
      heroSubtitle: 'Seridian Crest LLP delivers dependable shipping, freight forwarding, customs clearance, and cargo management solutions that connect businesses to global trade routes with confidence.',
      aboutContent: 'Seridian Crest LLP is a maritime logistics and shipping solutions company committed to simplifying global trade through dependable logistics coordination and operational excellence.',
      mission: 'To deliver world-class maritime logistics services that empower businesses to compete globally — with speed, reliability, and full regulatory compliance at every port.',
      vision: 'To be India\'s most trusted maritime logistics partner, known for precision, innovation, and an unwavering commitment to our clients\' success across every ocean.',
      ctaText: 'Partner with Seridian Crest LLP for dependable maritime logistics and supply chain support.',
      phone: '+91 12345 67890',
      email: 'info@seridian-crest.com',
      address: '12th Floor, Maritime Tower, Mumbai – 400 001, India',
    };
  }

  await connectDB();
  let content = await Content.findOne().lean();
  if (!content) {
    content = await Content.create({}); // Returns the defaults defined in schema
  }
  return JSON.parse(JSON.stringify(content));
}
