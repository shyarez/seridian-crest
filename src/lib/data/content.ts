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
      heroTitle: 'Global Maritime Logistics Made Reliable',
      heroSubtitle:
        'Seridian Crest LLP delivers dependable shipping, freight forwarding, customs clearance, and cargo management solutions that connect businesses to global trade routes with confidence.',
      aboutContent:
        'Seridian Crest LLP is a maritime logistics and shipping solutions company committed to simplifying global trade through dependable logistics coordination and operational excellence.',
      mission:
        'To deliver world-class maritime logistics services that empower businesses to compete globally — with speed, reliability, and full regulatory compliance at every port.',
      vision:
        "To be India's most trusted maritime logistics partner, known for precision, innovation, and an unwavering commitment to our clients' success across every ocean.",
      ctaText:
        'Partner with Seridian Crest LLP for dependable maritime logistics and supply chain support.',
      phone: '+91 12345 67890',
      email: 'info@seridian-crest.com',
      address: '12th Floor, Maritime Tower, Mumbai – 400 001, India',
    };
  }
}
