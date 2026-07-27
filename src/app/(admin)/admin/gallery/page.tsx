'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import {
  Upload, Trash2, Pencil, Check, X, ImagePlus, Loader2, GripVertical, Eye, EyeOff,
} from 'lucide-react';

interface GalleryItem {
  _id: string;
  src: string;
  publicId: string;
  alt: string;
  caption: string;
  category: string;
  order: number;
  isActive: boolean;
}

const CATEGORIES = ['General', 'Fishing', 'Harbour', 'Market', 'Processing', 'Seafood', 'Shipping'];

// ─── Upload dropzone ──────────────────────────────────────────────────────────
function UploadZone({ onUploaded }: { onUploaded: (item: GalleryItem) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ alt: '', caption: '', category: 'General' });
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  function handleFile(f: File) {
    if (!f.type.startsWith('image/')) { toast.error('Only image files are allowed.'); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) { toast.error('Please select an image first.'); return; }
    if (!form.alt.trim() || !form.caption.trim()) { toast.error('Alt text and caption are required.'); return; }

    setUploading(true);
    try {
      // 1. Upload to Cloudinary via existing /api/upload
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'seridian-crest/gallery');
      const upRes = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!upRes.ok) { const e = await upRes.json(); throw new Error(e.error ?? 'Upload failed'); }
      const { url, publicId } = await upRes.json();

      // 2. Save metadata to DB
      const saveRes = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src: url, publicId, ...form }),
      });
      if (!saveRes.ok) throw new Error('Failed to save image.');
      const created: GalleryItem = await saveRes.json();

      toast.success('Image uploaded successfully!');
      onUploaded(created);
      setFile(null); setPreview(null);
      setForm({ alt: '', caption: '', category: 'General' });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-brand-border bg-brand-bg/50">
        <h2 className="font-extrabold text-brand-primary flex items-center gap-2">
          <ImagePlus className="w-5 h-5 text-brand-accent" /> Upload New Image
        </h2>
      </div>

      <div className="p-6 space-y-5">
        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden flex items-center justify-center
            ${dragging ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-border hover:border-brand-accent/60 hover:bg-brand-bg'}
            ${preview ? 'h-48' : 'h-36'}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
          {preview ? (
            <Image src={preview} alt="Preview" fill className="object-cover" sizes="600px" />
          ) : (
            <div className="text-center">
              <Upload className="w-8 h-8 text-brand-border mx-auto mb-2" />
              <p className="text-sm font-medium text-brand-text-secondary">
                Drag & drop or <span className="text-brand-accent font-bold">click to browse</span>
              </p>
              <p className="text-xs text-brand-text-secondary/60 mt-1">JPG, PNG, WebP · max 5 MB</p>
            </div>
          )}
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-wider">Caption *</label>
            <input
              value={form.caption} onChange={(e) => setForm(p => ({ ...p, caption: e.target.value }))}
              placeholder="e.g. Fishing Harbour at Dawn"
              className="px-3 py-2 rounded-lg border border-brand-border text-sm text-brand-primary bg-brand-bg focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-wider">Alt Text *</label>
            <input
              value={form.alt} onChange={(e) => setForm(p => ({ ...p, alt: e.target.value }))}
              placeholder="e.g. Trawlers moored at harbour"
              className="px-3 py-2 rounded-lg border border-brand-border text-sm text-brand-primary bg-brand-bg focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-wider">Category</label>
            <select
              value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))}
              className="px-3 py-2 rounded-lg border border-brand-border text-sm text-brand-primary bg-brand-bg focus:outline-none focus:border-brand-accent transition-colors"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <button
          type="submit" disabled={uploading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-secondary transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading…</> : <><Upload className="w-4 h-4" /> Upload Image</>}
        </button>
      </div>
    </form>
  );
}

// ─── Gallery Image Card ───────────────────────────────────────────────────────
function GalleryCard({
  item, onDelete, onUpdate,
}: {
  item: GalleryItem;
  onDelete: (id: string) => void;
  onUpdate: (id: string, patch: Partial<GalleryItem>) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ alt: item.alt, caption: item.caption, category: item.category });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function save() {
    setSaving(true);
    try {
      const res = await fetch(`/api/gallery/${item._id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      onUpdate(item._id, form);
      setEditing(false);
      toast.success('Updated!');
    } catch { toast.error('Failed to save changes.'); }
    finally { setSaving(false); }
  }

  async function remove() {
    if (!confirm('Delete this image? This cannot be undone.')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/gallery/${item._id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      onDelete(item._id);
      toast.success('Image deleted.');
    } catch { toast.error('Failed to delete image.'); }
    finally { setDeleting(false); }
  }

  async function toggleVisibility() {
    const res = await fetch(`/api/gallery/${item._id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !item.isActive }),
    });
    if (res.ok) onUpdate(item._id, { isActive: !item.isActive });
  }

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden shadow-sm transition-all ${item.isActive ? 'border-brand-border' : 'border-dashed border-brand-border opacity-60'}`}>
      {/* Image */}
      <div className="relative h-44 bg-brand-alt-bg group">
        <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="350px" />
        <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/20 transition-all" />
        {/* drag handle — visual only */}
        <div className="absolute top-2 left-2 p-1 rounded bg-white/80 text-brand-text-secondary/40 cursor-grab">
          <GripVertical className="w-3 h-3" />
        </div>
        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 text-brand-primary text-[10px] font-bold">
          {item.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {editing ? (
          <div className="space-y-2">
            <input
              value={form.caption} onChange={e => setForm(p => ({ ...p, caption: e.target.value }))}
              placeholder="Caption" className="w-full px-2 py-1.5 text-sm border border-brand-border rounded-lg focus:outline-none focus:border-brand-accent"
            />
            <input
              value={form.alt} onChange={e => setForm(p => ({ ...p, alt: e.target.value }))}
              placeholder="Alt text" className="w-full px-2 py-1.5 text-sm border border-brand-border rounded-lg focus:outline-none focus:border-brand-accent"
            />
            <select
              value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              className="w-full px-2 py-1.5 text-sm border border-brand-border rounded-lg focus:outline-none focus:border-brand-accent bg-white"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        ) : (
          <>
            <p className="font-bold text-brand-primary text-sm truncate">{item.caption}</p>
            <p className="text-brand-text-secondary text-xs truncate">{item.alt}</p>
          </>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          {editing ? (
            <>
              <button onClick={save} disabled={saving}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-primary text-white text-xs font-bold hover:bg-brand-secondary transition-colors disabled:opacity-60"
              >
                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />} Save
              </button>
              <button onClick={() => setEditing(false)}
                className="px-3 py-1.5 rounded-lg border border-brand-border text-brand-text-secondary text-xs font-bold hover:bg-brand-bg transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-border text-brand-primary text-xs font-bold hover:bg-brand-bg transition-colors"
              >
                <Pencil className="w-3 h-3" /> Edit
              </button>
              <button onClick={toggleVisibility}
                title={item.isActive ? 'Hide from gallery' : 'Show in gallery'}
                className="px-3 py-1.5 rounded-lg border border-brand-border text-brand-text-secondary text-xs hover:bg-brand-bg transition-colors"
              >
                {item.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
              <button onClick={remove} disabled={deleting}
                className="px-3 py-1.5 rounded-lg border border-red-200 text-red-500 text-xs hover:bg-red-50 transition-colors disabled:opacity-60"
              >
                {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then((data: GalleryItem[]) => setImages(data))
      .catch(() => toast.error('Failed to load gallery images.'))
      .finally(() => setLoading(false));
  }, []);

  function handleUploaded(item: GalleryItem) {
    setImages(prev => [item, ...prev]);
  }

  function handleDelete(id: string) {
    setImages(prev => prev.filter(i => i._id !== id));
  }

  function handleUpdate(id: string, patch: Partial<GalleryItem>) {
    setImages(prev => prev.map(i => i._id === id ? { ...i, ...patch } : i));
  }

  const allCategories = ['All', ...Array.from(new Set(images.map(i => i.category)))];
  const filtered = filter === 'All' ? images : images.filter(i => i.category === filter);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-primary">Gallery</h1>
          <p className="text-brand-text-secondary mt-1">
            {images.length} image{images.length !== 1 ? 's' : ''} · {images.filter(i => i.isActive).length} visible
          </p>
        </div>
        <a href="/gallery" target="_blank" rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl border border-brand-border text-brand-primary font-bold text-sm hover:bg-brand-bg transition-colors"
        >
          View Public Gallery ↗
        </a>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-8 items-start">
        {/* Left: Upload */}
        <div className="xl:sticky xl:top-8">
          <UploadZone onUploaded={handleUploaded} />
        </div>

        {/* Right: Grid */}
        <div>
          {/* Filter tabs */}
          {images.length > 0 && (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {allCategories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === cat ? 'bg-brand-primary text-white' : 'bg-white border border-brand-border text-brand-text-secondary hover:border-brand-accent/50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-48 text-brand-text-secondary gap-3">
              <Loader2 className="w-6 h-6 animate-spin" /> Loading images…
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-brand-text-secondary border-2 border-dashed border-brand-border rounded-2xl">
              <ImagePlus className="w-10 h-10 text-brand-border mb-3" />
              <p className="font-medium">No images yet. Upload your first one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(item => (
                <GalleryCard key={item._id} item={item} onDelete={handleDelete} onUpdate={handleUpdate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
