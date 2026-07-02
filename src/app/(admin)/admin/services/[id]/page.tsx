import { Metadata } from 'next';
import ServiceForm from '@/components/admin/ServiceForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound, redirect } from 'next/navigation';
import { requireSession } from '@/lib/auth';
import { connectDB } from '@/lib/db/mongoose';
import Service from '@/lib/db/models/Service';

export const metadata: Metadata = { title: 'Edit Service | Admin' };

async function getService(id: string) {
  try {
    await requireSession();
  } catch {
    redirect('/admin/login');
  }

  await connectDB();
  const service = await Service.findById(id).lean();
  if (!service) return null;
  return JSON.parse(JSON.stringify(service));
}

export default async function EditServicePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const service = await getService(params.id);

  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link href="/admin/services" className="inline-flex items-center gap-2 text-brand-text-secondary hover:text-brand-primary font-bold text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <h1 className="text-3xl font-extrabold text-brand-primary">Edit Service</h1>
        </div>
      </div>
      <ServiceForm initialData={service} />
    </div>
  );
}
