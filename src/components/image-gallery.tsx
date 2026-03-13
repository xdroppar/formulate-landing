"use client";

import { useState, useCallback, useEffect } from "react";
import { ImageLightbox } from "./image-lightbox";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const count = images.length;
  const hasManyImages = count > 1;

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => {
    if (!hovered) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [hovered, prev, next]);

  if (count === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-6xl opacity-15">💊</span>
      </div>
    );
  }

  return (
    <>
      <div
        className="relative w-full h-full group cursor-pointer select-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setLightboxOpen(true)}
      >
        {/* Main image */}
        <img
          src={images[index]}
          alt={`${alt} — image ${index + 1} of ${count}`}
          className="w-full h-full object-contain rounded-2xl transition-transform duration-200 group-hover:scale-[1.03]"
          draggable={false}
        />

        {/* Left arrow */}
        {hasManyImages && (
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
              bg-[rgba(20,22,28,0.85)] text-white text-sm font-bold
              flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition-opacity duration-150
              hover:bg-[rgba(30,32,38,0.95)] cursor-pointer"
            aria-label="Previous image"
          >
            ‹
          </button>
        )}

        {/* Right arrow */}
        {hasManyImages && (
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
              bg-[rgba(20,22,28,0.85)] text-white text-sm font-bold
              flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition-opacity duration-150
              hover:bg-[rgba(30,32,38,0.95)] cursor-pointer"
            aria-label="Next image"
          >
            ›
          </button>
        )}

        {/* Dot indicators (pill bar) */}
        {hasManyImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[rgba(20,22,28,0.85)]">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  i === index
                    ? "bg-white scale-125"
                    : "bg-white/35 hover:bg-white/60"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={images}
          alt={alt}
          initialIndex={index}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={setIndex}
        />
      )}
    </>
  );
}
