import { Metadata } from 'next';
import { connectDB } from '@/lib/db/mongoose';
import Service from '@/lib/db/models/Service';
import ServiceForm from '@/components/admin/ServiceForm';
import Link from 'next/link';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { deleteService } from '@/lib/actions/service.actions';

export const metadata: Metadata = { title: 'Edit Service | Admin' };

export default async function EditServicePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  await connectDB();
  const service = await Service.findById(params.id).lean();

  if (!service) {
    notFound();
  }

  // Server action binding for delete
  const deleteAction = deleteService.bind(null, params.id);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link href="/admin/services" className="inline-flex items-center gap-2 text-brand-text-secondary hover:text-brand-primary font-bold text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <h1 className="text-3xl font-extrabold text-brand-primary">Edit Service</h1>
        </div>
        <form action={deleteAction}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors"
            onClick={(e) => {
              if (!confirm('Are you sure you want to delete this service? This cannot be undone.')) {
                e.preventDefault();
              }
            }}
          >
            <Trash2 className="w-4 h-4" />
            Delete Service
          </button>
        </form>
      </div>
      <ServiceForm initialData={JSON.parse(JSON.stringify(service))} />
    </div>
  );
}
