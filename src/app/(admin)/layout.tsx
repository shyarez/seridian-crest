import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Toaster } from '@/components/ui/sonner';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session.isLoggedIn) redirect('/admin/login');

  return (
    <div className="flex min-h-screen bg-[oklch(0.97_0.005_245)]">
      <AdminSidebar email={session.email ?? ''} />
      <main className="flex-1 min-w-0 p-8 overflow-auto">{children}</main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
