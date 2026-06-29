import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContentDocument extends Document {
  heroTitle: string;
  heroSubtitle: string;
  aboutContent: string;
  mission: string;
  vision: string;
  ctaText: string;
  phone: string;
  email: string;
  address: string;
}

const ContentSchema = new Schema<IContentDocument>({
  heroTitle: { type: String, default: 'Global Maritime Logistics Made Reliable' },
  heroSubtitle: { type: String, default: 'Seridian Crest LLP delivers dependable shipping, freight forwarding, customs clearance, and cargo management solutions that connect businesses to global trade routes with confidence.' },
  aboutContent: { type: String, default: 'Seridian Crest LLP is a maritime logistics and shipping solutions company committed to simplifying global trade through dependable logistics coordination and operational excellence.' },
  mission: { type: String, default: 'To deliver world-class maritime logistics services that empower businesses to compete globally — with speed, reliability, and full regulatory compliance at every port.' },
  vision: { type: String, default: 'To be India\'s most trusted maritime logistics partner, known for precision, innovation, and an unwavering commitment to our clients\' success across every ocean.' },
  ctaText: { type: String, default: 'Partner with Seridian Crest LLP for dependable maritime logistics and supply chain support.' },
  phone: { type: String, default: '+91 12345 67890' },
  email: { type: String, default: 'info@seridian-crest.com' },
  address: { type: String, default: '12th Floor, Maritime Tower, Mumbai – 400 001, India' },
});

// We only need one document for the site content
const Content: Model<IContentDocument> =
  mongoose.models.Content ?? mongoose.model<IContentDocument>('Content', ContentSchema);

export default Content;
