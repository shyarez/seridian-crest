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
  heroTitle: { type: String, default: 'Your Trusted Partner in Global Trade' },
  heroSubtitle: { type: String, default: 'Seridian Crest LLP delivers reliable shipping, freight forwarding, customs clearance, and cargo solutions that keep your business connected to global markets.' },
  aboutContent: { type: String, default: 'Seridian Crest LLP helps businesses move goods across international markets through reliable shipping and logistics solutions. We combine industry expertise with dependable service to simplify global trade.' },
  mission: { type: String, default: 'To deliver reliable shipping and logistics solutions that help businesses trade globally with confidence.' },
  vision: { type: String, default: 'To become a trusted partner for businesses seeking dependable international shipping and trade solutions.' },
  ctaText: { type: String, default: 'Connect with Seridian Crest LLP for reliable shipping and global trade solutions.' },
  phone: { type: String, default: '+91 12345 67890' },
  email: { type: String, default: 'info@seridian-crest.com' },
  address: { type: String, default: '12th Floor, Maritime Tower, Mumbai – 400 001, India' },
});

// We only need one document for the site content
const Content: Model<IContentDocument> =
  mongoose.models.Content ?? mongoose.model<IContentDocument>('Content', ContentSchema);

export default Content;
