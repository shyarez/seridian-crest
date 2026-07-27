import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description: "Explore Seridian Crest LLP's gallery — a visual journey through our port operations, customs clearance, and cargo management solutions.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
