"use client";

interface ScoreRingProps {
  score: number | null;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ScoreRing({ score, size = 64, strokeWidth = 5, className = "" }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = score !== null ? (score / 100) * circumference : 0;
  const offset = circumference - progress;

  const color =
    score === null
      ? "#7a7a9a"
      : score >= 75
        ? "#00e5a0"
        : score >= 50
          ? "#ffa94d"
          : "#ff4f6a";

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Solid dark fill behind the number for readability */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth / 2}
          fill="rgba(8,8,15,0.85)"
          stroke="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span
        className="absolute text-center font-extrabold"
        style={{ color, fontSize: size * 0.3 }}
      >
        {score ?? "–"}
      </span>
    </div>
  );
}
