/**
 * Inline evidence strength indicator — three dots showing how strong
 * the clinical evidence is. Differentiates Formulate from every other
 * supplement blog by showing epistemic confidence visually.
 */

type EvidenceLevel = "strong" | "moderate" | "emerging" | "mixed";

interface EvidenceBadgeProps {
  level: EvidenceLevel;
  label?: string;
}

const config: Record<EvidenceLevel, { dots: number; color: string; text: string }> = {
  strong:   { dots: 3, color: "#10B981", text: "Strong evidence" },
  moderate: { dots: 2, color: "#F59E0B", text: "Moderate evidence" },
  emerging: { dots: 1, color: "#6B7280", text: "Emerging evidence" },
  mixed:    { dots: 2, color: "#8B5CF6", text: "Mixed evidence" },
};

export function EvidenceBadge({ level, label }: EvidenceBadgeProps) {
  const c = config[level];
  const dots = [1, 2, 3];

  return (
    <span className="not-prose inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-surface border border-border text-[11px] font-medium whitespace-nowrap">
      <span className="inline-flex gap-[3px]">
        {dots.map((d) => (
          <span
            key={d}
            className="w-[5px] h-[5px] rounded-full"
            style={{
              backgroundColor: d <= c.dots ? c.color : "rgba(100,116,139,0.2)",
            }}
          />
        ))}
      </span>
      <span style={{ color: c.color }}>{label || c.text}</span>
    </span>
  );
}
