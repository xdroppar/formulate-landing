import type { CSSProperties } from "react";
import { scoreGrade } from "@/lib/products";

/**
 * Circular score gauge — a ring that fills proportional to the /100 score,
 * colored by grade band, with the number (and optional letter) centered.
 * Replaces bare-number score displays across the reference pages so they read
 * as visual meters, on par with the app. Pure server component (static SVG);
 * fill animation can be layered on later.
 */
export function ScoreMeter({
  score,
  size = 64,
  strokeWidth = 5,
  showGrade = false,
  color: colorOverride,
  className = "",
}: {
  score: number | null;
  size?: number;
  strokeWidth?: number;
  showGrade?: boolean;
  /** Override the grade-band color (e.g. foods use their own scheme). */
  color?: string;
  className?: string;
}) {
  const grade = scoreGrade(score);
  const letter = grade.letter;
  const color = colorOverride ?? grade.color;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const frac = score == null ? 0 : Math.max(0, Math.min(1, score / 100));
  const offset = circumference * (1 - frac);
  const numberPx = Math.round(size * (showGrade ? 0.32 : 0.36));

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border"
        />
        {score != null && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="score-meter-arc"
            style={{ "--score-c": circumference } as CSSProperties}
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="font-black tabular-nums" style={{ color, fontSize: numberPx }}>
          {score ?? "—"}
        </span>
        {showGrade && score != null && (
          <span
            className="font-bold text-muted mt-0.5"
            style={{ fontSize: Math.round(size * 0.17) }}
          >
            {letter}
          </span>
        )}
      </div>
    </div>
  );
}
