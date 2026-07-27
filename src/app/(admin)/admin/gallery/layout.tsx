import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Gallery | Admin' };
export default function GalleryAdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
