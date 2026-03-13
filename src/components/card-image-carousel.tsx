"use client";

import { useState, useCallback } from "react";

interface CardImageCarouselProps {
  images: string[];
  alt: string;
}

export function CardImageCarousel({ images, alt }: CardImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const hasManyImages = count > 1;

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIndex((i) => (i - 1 + count) % count);
    },
    [count],
  );

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIndex((i) => (i + 1) % count);
    },
    [count],
  );

  if (count === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-3xl opacity-10">💊</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group/carousel">
      <img
        src={images[index]}
        alt={`${alt} — image ${index + 1} of ${count}`}
        className="w-full h-full object-contain"
        draggable={false}
      />

      {/* Left arrow */}
      {hasManyImages && (
        <button
          onClick={prev}
          className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full
            bg-[rgba(20,22,28,0.85)] text-white text-xs font-bold
            flex items-center justify-center
            opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-150
            hover:bg-[rgba(30,32,38,0.95)] cursor-pointer z-10"
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      {/* Right arrow */}
      {hasManyImages && (
        <button
          onClick={next}
          className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full
            bg-[rgba(20,22,28,0.85)] text-white text-xs font-bold
            flex items-center justify-center
            opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-150
            hover:bg-[rgba(30,32,38,0.95)] cursor-pointer z-10"
          aria-label="Next image"
        >
          ›
        </button>
      )}

      {/* Dot indicators */}
      {hasManyImages && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1 rounded-full bg-[rgba(20,22,28,0.85)] z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIndex(i);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                i === index
                  ? "bg-white scale-125"
                  : "bg-white/35 hover:bg-white/60"
              }`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
