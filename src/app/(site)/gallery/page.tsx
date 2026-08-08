"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: string | number;
  src: string;
  alt: string;
  caption: string;
  category: string;
  span?: string;
}

// ─── Replace the `src` values below with your own image URLs ──────────────────
const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1655523539874-e6c9aa4b5edd?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Container ship at port during golden hour",
    caption: "Port Operations",
    category: "Shipping",
    span: "col-span-2 row-span-2", // large feature tile
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1587391028604-b370121a40f6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Aerial view of cargo port",
    caption: "Aerial View – Cargo Port",
    category: "Port",
    span: "",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1657143454860-36bfb5d03a89?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Freight warehouse interior",
    caption: "Warehouse & Freight",
    category: "Logistics",
    span: "",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1572535386131-07174befdaec?q=80&w=1225&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Customs clearance documentation",
    caption: "Customs Clearance",
    category: "Compliance",
    span: "",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1555656814-ff00647cd0a9?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Heavy lift breakbulk cargo",
    caption: "Breakbulk Operations",
    category: "Cargo",
    span: "row-span-2", // tall tile
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1781991682254-eef77e7befd1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Ship at anchorage",
    caption: "Liner Agency",
    category: "Shipping",
    span: "",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1559036211-aac71e257f9c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Air freight cargo loading",
    caption: "Air Freight",
    category: "Logistics",
    span: "",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1634043270873-f2f830e5d4bf?q=80&w=1199&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Truck fleet at logistics hub",
    caption: "Land Transportation",
    category: "Logistics",
    span: "",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1643096728389-0cedb6729dfb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Team meeting at operations center",
    caption: "Our Team at Work",
    category: "Team",
    span: "col-span-2", // wide tile
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1613690399151-65ea69478674?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Port crane loading containers",
    caption: "Container Loading",
    category: "Port",
    span: "",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1631451378666-8fc875f2684b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Ship husbandry services",
    caption: "Husbandry Services",
    category: "Shipping",
    span: "",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1671190365057-b9a8f79d306f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Global shipping network map",
    caption: "Global Network",
    category: "Compliance",
    span: "",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [dbImages, setDbImages] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => (r.ok ? r.json() : []))
      .then(
        (
          data: Array<{
            _id: string;
            src: string;
            alt: string;
            caption: string;
            category: string;
          }>,
        ) => {
          setDbImages(
            data.map((d) => ({
              id: d._id,
              src: d.src,
              alt: d.alt,
              caption: d.caption,
              category: d.category,
            })),
          );
        },
      )
      .catch(() => {});
  }, []);

  // DB images first, then static fallback
  const allItems: GalleryItem[] = [...dbImages, ...GALLERY_ITEMS];
  const CATEGORIES = [
    "All",
    ...Array.from(new Set(allItems.map((i) => i.category))),
  ];

  const filtered =
    activeCategory === "All"
      ? allItems
      : allItems.filter((i) => i.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : null,
    );
  const goNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null,
    );

  const activeLightboxItem =
    lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      {/* ── Page Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero-gradient section-padding pb-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4FA7D8_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-accent/10 blur-3xl rounded-full" />
        <div className="container-site relative z-10 text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg leading-relaxed"
          >
            A visual journey through our port operations, freight logistics, and
            global trade network.
          </motion.p>
        </div>
      </section>

      {/* ── Filter Tabs ───────────────────────────────────────────────────────── */}
      <section className="bg-white sticky top-16 z-30 border-b border-brand-border shadow-sm">
        <div className="container-site overflow-x-auto">
          <div className="flex items-center justify-center gap-4 py-5 min-w-max mx-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`gallery-filter-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-brand-primary text-white shadow-md"
                    : "bg-brand-bg text-brand-text-secondary border border-brand-border hover:border-brand-accent/50 hover:text-brand-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Grid ──────────────────────────────────────────────────────── */}
      <section
        className="section-padding bg-brand-bg"
        aria-label="Photo gallery"
      >
        <div className="container-site">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative group rounded-2xl overflow-hidden cursor-pointer border border-brand-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${item.span}`}
                  onClick={() => openLightbox(index)}
                  role="button"
                  aria-label={`View ${item.alt}`}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-brand-primary text-xs font-bold backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    {item.category}
                  </span>

                  {/* Zoom Icon */}
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-bold text-sm leading-snug">
                      {item.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-brand-text-secondary">
              No images in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand-primary/95 backdrop-blur-md p-4"
            onClick={closeLightbox}
          >
            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image wrapper */}
              <div
                className="relative w-full rounded-2xl overflow-hidden bg-brand-alt-bg"
                style={{ aspectRatio: "16/10" }}
              >
                <Image
                  src={activeLightboxItem.src}
                  alt={activeLightboxItem.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  priority
                />
              </div>

              {/* Caption */}
              <div className="mt-4 flex items-center justify-between px-1">
                <div>
                  <p className="text-white font-bold text-lg">
                    {activeLightboxItem.caption}
                  </p>
                  <p className="text-brand-highlight text-sm">
                    {activeLightboxItem.category}
                  </p>
                </div>
                <p className="text-brand-highlight text-sm font-medium">
                  {(lightboxIndex ?? 0) + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>

            {/* Close */}
            <button
              id="lightbox-close"
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Prev */}
            <button
              id="lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Next */}
            <button
              id="lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
