import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

// POST /api/upload — Admin: upload an image to Cloudinary
export async function POST(request: NextRequest) {
  // Auth guard
  try {
    await requireSession();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const folder = (formData.get('folder') as string | null) ?? 'seridian-crest';
  const oldPublicId = formData.get('oldPublicId') as string | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF, AVIF.' },
      { status: 400 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large. Maximum size is 5 MB.' }, { status: 400 });
  }

  // Convert browser File → Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    // Delete old image from Cloudinary first (non-blocking; ignore errors)
    if (oldPublicId) {
      cloudinary.uploader.destroy(oldPublicId).catch(() => {});
    }

    // Upload with auto quality/format optimisation
    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            use_filename: false,
            unique_filename: true,
            overwrite: false,
            resource_type: 'image',
            transformation: [
              { quality: 'auto:best', fetch_format: 'auto' },
            ],
          },
          (error, result) => {
            if (error || !result) return reject(error ?? new Error('Upload failed'));
            resolve(result as { secure_url: string; public_id: string });
          }
        );
        stream.end(buffer);
      }
    );

    return NextResponse.json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    console.error('[/api/upload] Cloudinary error:', err);
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }
}
