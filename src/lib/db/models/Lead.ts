import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILeadDocument extends Document {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
  status: 'new' | 'reviewed' | 'closed';
  submittedAt: Date;
}

const LeadSchema = new Schema<ILeadDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    phone: { type: String },
    service: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'reviewed', 'closed'], default: 'new' },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Lead: Model<ILeadDocument> =
  mongoose.models.Lead ?? mongoose.model<ILeadDocument>('Lead', LeadSchema);

export default Lead;
