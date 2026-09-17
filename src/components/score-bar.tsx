"use client";

import { useEffect, useRef, useState } from "react";

interface ScoreBarProps {
  label: string;
  score: number;
  desc: string;
  color?: string;
}

export function ScoreBar({ label, score, desc, color: colorProp }: ScoreBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const color = colorProp ?? (score >= 90 ? "#10B981" : score >= 75 ? "#3B82F6" : score >= 60 ? "#F59E0B" : "#EF4444");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The FILL starts at 50 so the range most products occupy spreads across the
  // bar. It is a drawing scale, not the score scale: since V3.23 gates can take a
  // product below 50 (lowest shipped: 44), and those draw as an empty bar.
  const barPercent = Math.max(0, (score - 50) * 2);

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between mb-1.5">
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-sm font-bold" style={{ color }} aria-live="polite">
          {visible ? score : 0}
          <span className="sr-only"> out of 100</span>
        </div>
      </div>
      <div
        className="h-2 bg-white/5 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={visible ? score : 0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${score} out of 100`}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: visible ? `${barPercent}%` : "0%",
            backgroundColor: color,
            transition: "width 1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
      <div className="text-[11px] text-muted mt-1">{desc}</div>
    </div>
  );
}
