"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Lightweight celebratory confetti burst — hand-rolled with motion (no extra
 * dependency beyond motion itself). Mirrors the webapp onboarding's Confetti.
 * Render conditionally; the parent removes it after ~1.6s. The random spread is
 * computed client-side so it never causes a hydration mismatch.
 */
const COLORS = ["#00e5a0", "#7c6dfa", "#10b981", "#f59e0b", "#22d3ee", "#ec4899", "#f87171"];

export function OnboardingConfetti({ count = 90 }: { count?: number }) {
  const reduce = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = Math.PI * (i / count) - Math.PI / 2 + (Math.random() - 0.5) * 0.6;
        const dist = 120 + Math.random() * 260;
        return {
          id: i,
          x: Math.cos(angle) * dist * (Math.random() > 0.5 ? 1 : -1) * 0.6 + (Math.random() - 0.5) * 340,
          y: -(80 + Math.random() * 320),
          rot: (Math.random() - 0.5) * 720,
          color: COLORS[i % COLORS.length],
          size: 6 + Math.random() * 8,
          delay: Math.random() * 0.12,
          round: Math.random() > 0.6,
        };
      }),
    [count],
  );

  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[260] flex items-center justify-center overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            width: p.size,
            height: p.round ? p.size : p.size * 0.5,
            backgroundColor: p.color,
            borderRadius: p.round ? "9999px" : "2px",
            top: "42%",
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 420], opacity: [1, 1, 0], rotate: p.rot, scale: [1, 1, 0.8] }}
          transition={{ duration: 1.5, delay: p.delay, ease: [0.2, 0.6, 0.3, 1], times: [0, 0.4, 1] }}
        />
      ))}
    </div>
  );
}
