import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://seridian-crest.com'),
  title: {
    default: 'Seridian Crest LLP — Maritime Logistics & Shipping Solutions',
    template: '%s | Seridian Crest LLP',
  },
  description:
    'Seridian Crest LLP delivers end-to-end maritime logistics, freight forwarding, and port operations management across global trade lanes.',
  keywords: ['maritime logistics', 'freight forwarding', 'shipping', 'port operations', 'cargo'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Seridian Crest LLP',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
