import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IServiceDocument extends Document {
  title: string;
  description: string;
  icon: string;
  features: string[];
  benefits: string[];
  order: number;
  isActive: boolean;
}

const ServiceSchema = new Schema<IServiceDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, required: true, default: 'Anchor' },
    features: [{ type: String }],
    benefits: [{ type: String }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service: Model<IServiceDocument> =
  mongoose.models.Service ?? mongoose.model<IServiceDocument>('Service', ServiceSchema);

export default Service;
