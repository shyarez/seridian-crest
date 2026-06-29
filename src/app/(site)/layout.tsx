import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { Toaster } from '@/components/ui/sonner';
import { getGlobalContent } from '@/lib/actions/content.actions';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getGlobalContent();

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer phone={content.phone} email={content.email} address={content.address} />
      <Toaster richColors position="bottom-right" />
    </>
  );
}
