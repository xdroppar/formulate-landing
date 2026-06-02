"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";

/**
 * Evidence-score ring that spring-counts from 0 to the target — the single most
 * satisfying beat in the /start flow. Mirrors the webapp onboarding's
 * AnimatedScoreRing; the number tweens in sync with the arc so they always
 * agree. `score` is 0-100 (average research-grade of the recommended stack).
 */
export function OnboardingScoreRing({
  score,
  size = 148,
  strokeWidth = 12,
  label,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}) {
  const reduce = useReducedMotion();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const arcRef = useRef<SVGCircleElement>(null);

  const color =
    score >= 90 ? "#10B981"
    : score >= 80 ? "#3B82F6"
    : score >= 65 ? "#22d3ee"
    : score >= 45 ? "#F59E0B"
    : "#F97316";

  useEffect(() => {
    const target = Math.max(0, Math.min(1, score / 100));
    const unsub = progress.on("change", (v) => {
      setDisplay(Math.round(v * 100));
      if (arcRef.current) {
        arcRef.current.style.strokeDashoffset = String(circumference * (1 - v));
      }
    });
    const controls = animate(progress, target, {
      duration: reduce ? 0 : 1.2,
      delay: reduce ? 0 : 0.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => {
      unsub();
      controls.stop();
    };
  }, [score, progress, circumference, reduce]);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth}
        />
        <circle
          ref={arcRef}
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 7px ${color}66)` }}
        />
      </svg>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={reduce ? false : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 18 }}
      >
        <span className="font-extrabold leading-none tabular-nums" style={{ color, fontSize: size * 0.3 }}>
          {display}
        </span>
        {label && (
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
