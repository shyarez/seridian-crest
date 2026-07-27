import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGalleryImageDocument extends Document {
  src: string;
  publicId: string;
  alt: string;
  caption: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImageDocument>(
  {
    src: { type: String, required: true },
    publicId: { type: String, required: true },
    alt: { type: String, required: true, trim: true },
    caption: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, default: 'General' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const GalleryImage: Model<IGalleryImageDocument> =
  mongoose.models.GalleryImage ??
  mongoose.model<IGalleryImageDocument>('GalleryImage', GalleryImageSchema);

export default GalleryImage;
