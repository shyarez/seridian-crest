import { Metadata } from 'next';
import ServiceForm from '@/components/admin/ServiceForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = { title: 'New Service | Admin' };

export default function NewServicePage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/services" className="inline-flex items-center gap-2 text-brand-text-secondary hover:text-brand-primary font-bold text-sm mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
        <h1 className="text-3xl font-extrabold text-brand-primary">Add New Service</h1>
      </div>
      <ServiceForm />
    </div>
  );
}
