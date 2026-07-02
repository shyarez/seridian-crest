import { Metadata } from 'next';
import Link from 'next/link';
import { Plus, Edit2, CheckCircle2, XCircle } from 'lucide-react';
import { redirect } from 'next/navigation';
import { requireSession } from '@/lib/auth';
import { connectDB } from '@/lib/db/mongoose';
import Service from '@/lib/db/models/Service';

export const metadata: Metadata = { title: 'Services | Admin' };

async function getServices() {
  try {
    await requireSession();
  } catch {
    redirect('/admin/login');
  }

  await connectDB();
  const services = await Service.find({}).sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(services));
}

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-primary">Services Management</h1>
          <p className="text-brand-text-secondary mt-2 text-lg">Manage the logistics services offered on the website.</p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-secondary transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-sm">
        {services.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-brand-text-secondary text-lg mb-4">No services found.</p>
            <Link href="/admin/services/new" className="text-brand-accent font-bold hover:underline">
              Create your first service
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-brand-border">
            {services.map((service: any) => (
              <div key={service._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-brand-bg transition-colors gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-xl text-brand-primary truncate">{service.title}</h3>
                    {service.isActive ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-brand-text-secondary bg-brand-border/50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                        <XCircle className="w-3.5 h-3.5" /> Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-brand-text-secondary text-sm line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-center hidden sm:block">
                    <p className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-wider mb-1">Order</p>
                    <p className="text-sm font-bold text-brand-primary bg-brand-bg px-3 py-1 rounded-lg border border-brand-border">{service.order}</p>
                  </div>
                  <Link
                    href={`/admin/services/${service._id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-bg text-brand-primary border border-brand-border font-bold text-sm hover:bg-white hover:border-brand-accent transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
