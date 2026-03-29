"use client";

import { useEffect, useRef, useState } from "react";

interface ScoreBarProps {
  label: string;
  score: number;
  desc: string;
}

export function ScoreBar({ label, score, desc }: ScoreBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const color = score >= 90 ? "#10B981" : score >= 75 ? "#3B82F6" : score >= 60 ? "#F59E0B" : "#EF4444";

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

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between mb-1.5">
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-sm font-bold" style={{ color }}>{visible ? score : 0}</div>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            // Scores are on a 50-100 scale; map 50→0% and 100→100% bar width
            width: visible ? `${Math.max(0, (score - 50) * 2)}%` : "0%",
            backgroundColor: color,
            transition: "width 1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
      <div className="text-[11px] text-muted mt-1">{desc}</div>
    </div>
  );
}
