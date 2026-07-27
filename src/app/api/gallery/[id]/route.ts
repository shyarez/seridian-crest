import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/auth';
import { connectDB } from '@/lib/db/mongoose';
import GalleryImage from '@/lib/db/models/GalleryImage';
import cloudinary from '@/lib/cloudinary';

type Params = { params: Promise<{ id: string }> };

// PATCH /api/gallery/[id] — admin: update caption/alt/category/order/isActive
export async function PATCH(request: NextRequest, { params }: Params) {
  try { await requireSession(); } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  await connectDB();
  const updated = await GalleryImage.findByIdAndUpdate(id, body, { new: true });
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

// DELETE /api/gallery/[id] — admin: delete image + Cloudinary asset
export async function DELETE(_: NextRequest, { params }: Params) {
  try { await requireSession(); } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  await connectDB();
  const image = await GalleryImage.findById(id);
  if (!image) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Delete from Cloudinary (non-fatal)
  if (image.publicId) {
    cloudinary.uploader.destroy(image.publicId).catch(() => {});
  }

  await image.deleteOne();
  return NextResponse.json({ success: true });
}
