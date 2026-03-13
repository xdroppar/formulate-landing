"use client";

import { useEffect, useCallback, useState } from "react";

interface ImageLightboxProps {
  images: string[];
  alt: string;
  initialIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function ImageLightbox({ images, alt, initialIndex, onClose, onIndexChange }: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const count = images.length;

  const prev = useCallback(() => {
    setIndex((i) => {
      const next = (i - 1 + count) % count;
      onIndexChange(next);
      return next;
    });
  }, [count, onIndexChange]);

  const next = useCallback(() => {
    setIndex((i) => {
      const next = (i + 1) % count;
      onIndexChange(next);
      return next;
    });
  }, [count, onIndexChange]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white/70 hover:text-white text-2xl font-light transition-colors cursor-pointer z-10"
        aria-label="Close lightbox"
      >
        ✕
      </button>

      {/* Left arrow */}
      {count > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-28 rounded-xl
            bg-white/10 hover:bg-white/20 text-white text-3xl font-light
            flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      {/* Image */}
      <img
        src={images[index]}
        alt={`${alt} — image ${index + 1} of ${count}`}
        className="max-w-[85vw] max-h-[85vh] object-contain rounded-lg select-none"
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />

      {/* Right arrow */}
      {count > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-28 rounded-xl
            bg-white/10 hover:bg-white/20 text-white text-3xl font-light
            flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Next image"
        >
          ›
        </button>
      )}

      {/* Counter */}
      {count > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[rgba(20,22,28,0.85)] text-white/80 text-sm font-medium">
          {index + 1} / {count}
        </div>
      )}
    </div>
  );
}
