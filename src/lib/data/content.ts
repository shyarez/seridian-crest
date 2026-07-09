import { headers } from 'next/headers';
import { IContent } from '@/types';


export async function getGlobalContent(): Promise<IContent> {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  try {
    const res = await fetch(`${protocol}://${host}/api/content`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API error');
    return res.json();
  } catch {

    return {
      heroTitle: 'Your Trusted Partner in Global Trade',
      heroSubtitle:
        'Seridian Crest LLP delivers reliable shipping, freight forwarding, customs clearance, and cargo solutions that keep your business connected to global markets.',
      aboutContent:
        'Seridian Crest LLP helps businesses move goods across international markets through reliable shipping and logistics solutions. We combine industry expertise with dependable service to simplify global trade.',
      mission:
        'To deliver reliable shipping and logistics solutions that help businesses trade globally with confidence.',
      vision:
        'To become a trusted partner for businesses seeking dependable international shipping and trade solutions.',
      ctaText:
        'Connect with Seridian Crest LLP for reliable shipping and global trade solutions.',
      phone: '+91 12345 67890',
      email: 'info@seridian-crest.com',
      address: '12th Floor, Maritime Tower, Mumbai 400 001, India',
    };
  }
}
