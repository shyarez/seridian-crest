import { getGlobalContent } from '@/lib/data/content';
import ContentEditor from '@/components/admin/ContentEditor';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Content Management | Admin' };

export default async function AdminContentPage() {
  const content = await getGlobalContent();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand-primary">Content Management</h1>
        <p className="text-brand-text-secondary mt-2 text-lg">
          Update the global text, mission, vision, and contact details used across the website.
        </p>
      </div>

      <ContentEditor initialData={content} />
    </div>
  );
}
