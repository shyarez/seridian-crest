import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdminDocument extends Document {
  email: string;
  passwordHash: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

const AdminSchema = new Schema<IAdminDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    lastLoginAt: Date,
  },
  { timestamps: true }
);

AdminSchema.index({ email: 1 }, { unique: true });

const Admin: Model<IAdminDocument> =
  mongoose.models.Admin ?? mongoose.model<IAdminDocument>('Admin', AdminSchema);

export default Admin;
