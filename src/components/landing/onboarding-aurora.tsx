"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Animated, accent-tinted aurora backdrop for the /start onboarding flow —
 * mirrors the webapp onboarding's AuroraBackground. Three soft blurred blobs
 * drift on independent loops; falls back to a static gradient under
 * prefers-reduced-motion.
 */
export function OnboardingAurora() {
  const reduce = useReducedMotion();
  const accent = "var(--color-accent)";
  const blob = "absolute rounded-full blur-[80px] will-change-transform";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[#06060d]" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, color-mix(in srgb, var(--color-accent) 20%, transparent) 0%, transparent 60%)",
        }}
      />

      {reduce ? (
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: `radial-gradient(60% 50% at 30% 20%, ${accent}33, transparent 70%)` }}
        />
      ) : (
        <>
          <motion.div
            className={blob}
            style={{ width: 460, height: 460, top: "-8%", left: "-6%", background: accent, opacity: 0.2 }}
            animate={{ x: [0, 60, -20, 0], y: [0, 40, 80, 0], scale: [1, 1.12, 0.96, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={blob}
            style={{ width: 520, height: 520, bottom: "-12%", right: "-8%", background: "#7c6dfa", opacity: 0.16 }}
            animate={{ x: [0, -50, 30, 0], y: [0, -30, -70, 0], scale: [1, 1.08, 1.18, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={blob}
            style={{ width: 380, height: 380, top: "35%", left: "55%", background: "#10b981", opacity: 0.12 }}
            animate={{ x: [0, 40, -40, 0], y: [0, 50, 20, 0], scale: [1, 0.9, 1.1, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" />
    </div>
  );
}
