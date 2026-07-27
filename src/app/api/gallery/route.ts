import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/auth';
import { connectDB } from '@/lib/db/mongoose';
import GalleryImage from '@/lib/db/models/GalleryImage';

// GET /api/gallery — public: list all active images
export async function GET() {
  await connectDB();
  const images = await GalleryImage.find({ isActive: true })
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return NextResponse.json(images);
}

// POST /api/gallery — admin: add a new gallery image
export async function POST(request: NextRequest) {
  try { await requireSession(); } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { src, publicId, alt, caption, category, order } = body;

  if (!src || !publicId || !alt || !caption) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  await connectDB();
  const image = await GalleryImage.create({ src, publicId, alt, caption, category, order: order ?? 0 });
  return NextResponse.json(image, { status: 201 });
}
