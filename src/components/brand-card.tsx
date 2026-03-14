import Link from "next/link";
import type { CatalogBrand } from "@/lib/types";

const COMPONENT_META = [
  { key: "integrity" as const, label: "Integrity", color: "#8B5CF6" },
  { key: "product_quality" as const, label: "Quality", color: "#3B82F6" },
  { key: "innovation" as const, label: "Innovation", color: "#F59E0B" },
  { key: "transparency" as const, label: "Transprncy", color: "#22C55E" },
  { key: "verification" as const, label: "Verification", color: "#06B6D4" },
] as const;

const GRADE_COLORS: Record<string, string> = {
  "A+": "#22C55E", A: "#22C55E", "A-": "#4ADE80",
  "B+": "#84CC16", B: "#A3E635", "B-": "#BEF264",
  "C+": "#FBC34D", C: "#FBBF24", "C-": "#F59E0B",
  "D+": "#FB923C", D: "#F97316", "D-": "#EA580C",
  F: "#EF4444",
};

const STANDOUT_COLORS: Record<string, string> = {
  "Most Trusted": "#8B5CF6",
  "Highest Quality": "#3B82F6",
  "Most Innovative": "#F59E0B",
  "Most Transparent": "#22C55E",
  "Most Verified": "#06B6D4",
};

function getGradeColor(grade: string | null): string {
  if (!grade) return "#6B7280";
  return GRADE_COLORS[grade] ?? "#6B7280";
}

interface BrandCardProps {
  brand: CatalogBrand;
  rank?: number;
}

export function BrandCard({ brand, rank }: BrandCardProps) {
  const gradeColor = getGradeColor(brand.grade);
  const score = brand.score ?? brand.avg_score;

  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 hover:-translate-y-0.5 transition-all flex flex-col"
    >
      {/* Header */}
      <div className="relative px-5 pt-5 pb-3">
        <div className="flex items-start gap-3">
          {/* Grade badge */}
          <div
            className="w-11 h-11 rounded-full border-[2.5px] flex items-center justify-center shrink-0"
            style={{ borderColor: gradeColor }}
          >
            <span
              className="text-sm font-extrabold leading-none"
              style={{ color: gradeColor }}
            >
              {brand.grade ?? "–"}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            {rank !== undefined && (
              <span className="text-[9px] text-muted font-mono">#{rank}</span>
            )}
            <h3 className="text-sm font-bold text-text truncate group-hover:text-accent transition-colors">
              {brand.name}
            </h3>
            {brand.standout && (
              <span
                className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1"
                style={{
                  color: STANDOUT_COLORS[brand.standout] ?? "#6B7280",
                  backgroundColor: `${STANDOUT_COLORS[brand.standout] ?? "#6B7280"}18`,
                }}
              >
                {brand.standout}
              </span>
            )}
          </div>
        </div>

        {/* Score + product count */}
        <div className="flex items-baseline gap-2 mt-2.5">
          <span className="text-base font-black" style={{ color: gradeColor }}>
            {score ?? "–"}/100
          </span>
          <span className="text-[10px] text-muted">
            {brand.product_count} product{brand.product_count !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Score breakdown bars */}
      {brand.components && (
        <div className="px-5 pb-3 space-y-1.5">
          {COMPONENT_META.map(({ key, label, color }) => {
            const val = brand.components![key];
            return (
              <div key={key} className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[10px] text-muted w-[68px] shrink-0">{label}</span>
                <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${val}%`,
                      backgroundColor: color,
                      opacity: 0.85,
                    }}
                  />
                </div>
                <span className="text-[10px] font-bold text-muted w-6 text-right shrink-0">
                  {val}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Tags */}
      {brand.tags.length > 0 && (
        <div className="px-5 pb-3 flex flex-wrap gap-1.5">
          {brand.tags.map((tag) => (
            <span
              key={tag.text}
              className="inline-flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-full bg-white/[0.05] text-muted"
            >
              {tag.icon && <span>{tag.icon}</span>}
              {tag.text}
            </span>
          ))}
        </div>
      )}

      {/* View Products button */}
      <div className="mt-auto px-5 pb-4 pt-1">
        <div className="w-full text-center text-[11px] font-semibold text-accent py-2 rounded-lg border border-accent/20 group-hover:bg-accent/10 transition-colors">
          View Products
        </div>
      </div>
    </Link>
  );
}
