import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://seridiancrest.com'),
  title: {
    default: 'Seridian Crest LLP | Export Services and Freight Forwarding',
    template: '%s | Seridian Crest LLP',
  },

  description:
    'Seridian Crest LLP delivers dependable export services, freight forwarding, customs clearance, and cargo management connecting businesses to global trade routes.',
  keywords: ['export services', 'freight forwarding', 'shipping', 'customs clearance', 'cargo management'],
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
      <head>
        {/* Upgrade all http:// sub-resource requests to https:// — client-side CSP fallback */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        {/* Prevent the browser from caching a stale parking page */}
        <meta httpEquiv="Cache-Control" content="no-store, no-cache, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
