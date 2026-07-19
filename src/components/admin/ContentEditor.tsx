'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { IContent } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Upload, Trash2, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

// ─── Image Upload Widget ────────────────────────────────────────────────────

interface ImageUploadProps {
  label: string;
  description: string;
  fieldKey: 'heroImageUrl' | 'aboutImageUrl' | 'ctaBannerImageUrl';
  folder: string;
  currentUrl: string;
  currentPublicId: string;
  onUploaded: (fieldKey: string, url: string, publicId: string) => void;
}

function ImageUploadWidget({
  label,
  description,
  fieldKey,
  folder,
  currentUrl,
  currentPublicId,
  onUploaded,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentUrl);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', `seridian-crest/${folder}`);
      if (currentPublicId) formData.append('oldPublicId', currentPublicId);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? 'Upload failed.');
        setPreviewUrl(currentUrl); // revert
        return;
      }

      onUploaded(fieldKey, data.url, data.publicId);
      toast.success(`${label} uploaded successfully.`);
    } catch {
      toast.error('Upload failed. Please try again.');
      setPreviewUrl(currentUrl);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  function handleRemove() {
    setPreviewUrl('');
    onUploaded(fieldKey, '', '');
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-bold text-brand-primary">{label}</p>
        <p className="text-xs text-brand-text-secondary mt-0.5">{description}</p>
      </div>

      {/* Preview area */}
      <div className="relative w-full h-48 rounded-2xl border-2 border-dashed border-brand-border bg-brand-bg overflow-hidden group">
        {previewUrl ? (
          <>
            <Image
              src={previewUrl}
              alt={label}
              fill
              className="object-cover"
              unoptimized={previewUrl.startsWith('blob:')}
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-brand-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-brand-primary text-xs font-bold hover:bg-brand-bg transition-colors disabled:opacity-60"
              >
                {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                Replace
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors disabled:opacity-60"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-brand-text-secondary hover:text-brand-primary hover:bg-brand-primary/5 transition-colors disabled:opacity-60"
          >
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 animate-spin text-brand-accent" />
                <span className="text-sm font-medium">Uploading…</span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-white border border-brand-border flex items-center justify-center shadow-sm">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Click to upload image</span>
                <span className="text-xs text-brand-text-secondary/60">JPEG, PNG, WebP · max 5 MB</span>
              </>
            )}
          </button>
        )}

        {/* Upload progress indicator (shown while uploading with existing image) */}
        {uploading && previewUrl && (
          <div className="absolute inset-0 bg-brand-primary/40 flex items-center justify-center">
            <div className="bg-white rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg">
              <Loader2 className="w-4 h-4 animate-spin text-brand-accent" />
              <span className="text-sm font-bold text-brand-primary">Uploading…</span>
            </div>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

// ─── Main Editor ────────────────────────────────────────────────────────────

export default function ContentEditor({ initialData }: { initialData: IContent }) {
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Track uploaded image URLs + publicIds in state
  const [imageState, setImageState] = useState({
    heroImageUrl: initialData.heroImageUrl ?? '',
    heroImagePublicId: '',
    aboutImageUrl: initialData.aboutImageUrl ?? '',
    aboutImagePublicId: '',
    ctaBannerImageUrl: initialData.ctaBannerImageUrl ?? '',
    ctaBannerImagePublicId: '',
  });

  function handleImageUploaded(fieldKey: string, url: string, publicId: string) {
    setImageState(prev => ({
      ...prev,
      [fieldKey]: url,
      [`${fieldKey.replace('Url', 'PublicId').replace('ImageP', 'ImageP')}`]: publicId,
      // e.g. heroImageUrl → heroImagePublicId
      ...(fieldKey === 'heroImageUrl' && { heroImagePublicId: publicId }),
      ...(fieldKey === 'aboutImageUrl' && { aboutImagePublicId: publicId }),
      ...(fieldKey === 'ctaBannerImageUrl' && { ctaBannerImagePublicId: publicId }),
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    const form = e.currentTarget;
    const getValue = (name: string) =>
      ((form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement)?.value) || undefined;

    const data = {
      heroTitle: getValue('heroTitle'),
      heroSubtitle: getValue('heroSubtitle'),
      heroImageUrl: imageState.heroImageUrl || undefined,
      aboutContent: getValue('aboutContent'),
      aboutImageUrl: imageState.aboutImageUrl || undefined,
      mission: getValue('mission'),
      vision: getValue('vision'),
      ctaText: getValue('ctaText'),
      ctaBannerImageUrl: imageState.ctaBannerImageUrl || undefined,
      phone: getValue('phone'),
      email: getValue('email'),
      address: getValue('address'),
    };

    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setSaving(false);

    if (res.ok) {
      toast.success('Content updated successfully.');
    } else {
      const body = await res.json();
      if (body.errors) {
        setErrors(body.errors);
        toast.error('Please fix the errors in the form.');
      } else {
        toast.error(body.error ?? 'Something went wrong.');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-10">

      {/* ── Hero Section ────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
            <ImageIcon className="w-4 h-4 text-brand-primary" />
          </div>
          <h2 className="text-xl font-extrabold text-brand-primary">Hero Section</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Text fields */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="heroTitle">Hero Title</Label>
              <Input id="heroTitle" name="heroTitle" defaultValue={initialData.heroTitle} className="text-base" />
              {errors.heroTitle && <p className="text-red-500 text-xs">{errors.heroTitle[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
              <Textarea id="heroSubtitle" name="heroSubtitle" defaultValue={initialData.heroSubtitle} rows={4} className="text-base" />
            </div>
          </div>

          {/* Image upload */}
          <ImageUploadWidget
            label="Hero Background Image"
            description="Displayed as the hero section background. Recommended: 1920×1080px."
            fieldKey="heroImageUrl"
            folder="hero"
            currentUrl={imageState.heroImageUrl}
            currentPublicId={imageState.heroImagePublicId}
            onUploaded={handleImageUploaded}
          />
        </div>
      </div>

      {/* ── About & Mission ─────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
            <ImageIcon className="w-4 h-4 text-brand-primary" />
          </div>
          <h2 className="text-xl font-extrabold text-brand-primary">About &amp; Mission</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <ImageUploadWidget
            label="About Section Image"
            description="Shown alongside the company overview text. Recommended: 800×600px."
            fieldKey="aboutImageUrl"
            folder="about"
            currentUrl={imageState.aboutImageUrl}
            currentPublicId={imageState.aboutImagePublicId}
            onUploaded={handleImageUploaded}
          />

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="aboutContent">Company Overview (About)</Label>
              <Textarea id="aboutContent" name="aboutContent" defaultValue={initialData.aboutContent} rows={4} className="text-base" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="mission">Mission Statement</Label>
            <Textarea id="mission" name="mission" defaultValue={initialData.mission} rows={4} className="text-base" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vision">Vision Statement</Label>
            <Textarea id="vision" name="vision" defaultValue={initialData.vision} rows={4} className="text-base" />
          </div>
        </div>
      </div>

      {/* ── Call to Action & Contact ─────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
            <ImageIcon className="w-4 h-4 text-brand-primary" />
          </div>
          <h2 className="text-xl font-extrabold text-brand-primary">Contact &amp; CTA</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ctaText">Global CTA Text</Label>
              <Input id="ctaText" name="ctaText" defaultValue={initialData.ctaText} className="text-base" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" defaultValue={initialData.phone} className="text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" defaultValue={initialData.email} className="text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Office Address</Label>
                <Input id="address" name="address" defaultValue={initialData.address} className="text-base" />
              </div>
            </div>
          </div>

          <ImageUploadWidget
            label="CTA Banner Image"
            description="Optional accent image for the call-to-action section. Recommended: 1200×400px."
            fieldKey="ctaBannerImageUrl"
            folder="cta"
            currentUrl={imageState.ctaBannerImageUrl}
            currentPublicId={imageState.ctaBannerImagePublicId}
            onUploaded={handleImageUploaded}
          />
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-secondary disabled:opacity-60 transition-all shadow-md"
        >
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> Save All Content</>}
        </button>
      </div>
    </form>
  );
}
