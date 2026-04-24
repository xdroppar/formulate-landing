"use client";

/**
 * Thin scroll progress bar fixed at the top of the viewport — fills
 * left-to-right as the user scrolls the content page. Hydrates on
 * mount, no-op on very short pages where there's no meaningful scroll
 * distance (avoids rendering a useless always-full bar).
 *
 * Mount on long-form content pages (guides, ingredient encyclopedia,
 * research studies). Keep off list / landing / form pages.
 */

import { useEffect, useState } from "react";

const MIN_SCROLLABLE_PX = 240;

export function ReadingProgressBar() {
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max < MIN_SCROLLABLE_PX) {
        setVisible(false);
        return;
      }
      setVisible(true);
      const ratio = window.scrollY / max;
      setPct(Math.max(0, Math.min(100, ratio * 100)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms" }}
    >
      <div
        className="h-full bg-gradient-to-r from-accent to-accent2 transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
