"use client";

import Link from "next/link";
import { ScoreRing } from "./score-ring";
import type { CatalogProduct } from "@/lib/types";

const SCORE_RANGES = [
  { label: "90+", min: 90, max: 100, color: "#00e5a0" },
  { label: "80–89", min: 80, max: 89, color: "#22d3ee" },
  { label: "70–79", min: 70, max: 79, color: "#7c6dfa" },
  { label: "60–69", min: 60, max: 69, color: "#ffa94d" },
  { label: "< 60", min: 0, max: 59, color: "#ff4f6a" },
] as const;

interface InsightsPanelProps {
  products: CatalogProduct[];
  onScoreRangeClick?: (min: number, max: number) => void;
  onCategoryClick?: (category: string) => void;
  onBrandClick?: (brand: string) => void;
}

export function InsightsPanel({
  products,
  onScoreRangeClick,
  onCategoryClick,
  onBrandClick,
}: InsightsPanelProps) {
  const scored = products.filter((p) => p.score !== null);
  const total = products.length;

  const scoreDist = SCORE_RANGES.map((r) => {
    const count = scored.filter(
      (p) => p.score! >= r.min && p.score! <= r.max
    ).length;
    return { ...r, count };
  });
  const maxScoreCount = Math.max(...scoreDist.map((d) => d.count), 1);

  const topProducts = [...scored]
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 6);

  const brandMap = new Map<
    string,
    { name: string; scores: number[]; count: number }
  >();
  for (const p of products) {
    const entry = brandMap.get(p.brand) || {
      name: p.brand,
      scores: [],
      count: 0,
    };
    entry.count++;
    if (p.score !== null) entry.scores.push(p.score);
    brandMap.set(p.brand, entry);
  }
  const topBrands = [...brandMap.values()]
    .map((b) => ({
      name: b.name,
      count: b.count,
      avgScore:
        b.scores.length > 0
          ? Math.round(b.scores.reduce((a, c) => a + c, 0) / b.scores.length)
          : null,
    }))
    .sort((a, b) => (b.avgScore ?? 0) - (a.avgScore ?? 0));

  const catMap = new Map<string, number>();
  for (const p of products) {
    if (p.category) catMap.set(p.category, (catMap.get(p.category) || 0) + 1);
  }
  const topCategories = [...catMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  const maxCatCount = Math.max(...topCategories.map(([, c]) => c), 1);

  const avgScore =
    scored.length > 0
      ? Math.round(
          scored.reduce((a, p) => a + (p.score ?? 0), 0) / scored.length
        )
      : null;

  const card = "bg-[#0d0d1a] border border-[rgba(255,255,255,0.06)] rounded-xl p-3";
  const heading = "text-[9px] font-semibold text-muted uppercase tracking-wider mb-2.5";

  return (
    <aside className="w-60 shrink-0 space-y-3">
      {/* Overview */}
      <div className={card}>
        <div className={heading}>Catalog Overview</div>
        <div className="flex items-center gap-3">
          <ScoreRing score={avgScore} size={44} strokeWidth={3.5} />
          <div>
            <div className="text-xl font-black text-text">{total}</div>
            <div className="text-[10px] text-muted">products scored</div>
          </div>
        </div>
      </div>

      {/* Score Distribution */}
      <div className={card}>
        <div className={heading}>Score Distribution</div>
        <div className="space-y-1.5">
          {scoreDist.map((range) => (
            <button
              key={range.label}
              className="w-full flex items-center gap-1.5 group/bar cursor-pointer"
              onClick={() => onScoreRangeClick?.(range.min, range.max)}
            >
              <span className="text-[10px] font-semibold text-muted w-9 text-right shrink-0">
                {range.label}
              </span>
              <div className="flex-1 h-4 bg-white/[0.03] rounded overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-500 group-hover/bar:brightness-125"
                  style={{
                    width: `${(range.count / maxScoreCount) * 100}%`,
                    backgroundColor: range.color,
                    opacity: 0.8,
                  }}
                />
              </div>
              <span className="text-[10px] font-bold text-muted w-5 text-right shrink-0">
                {range.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Top Rated */}
      <div className={card}>
        <div className={heading}>Top Rated</div>
        <div className="space-y-0.5">
          {topProducts.map((p) => (
            <Link
              key={p.id}
              href={`/catalog/${p.slug}`}
              className="flex items-center gap-2 px-1.5 py-1 -mx-1.5 rounded-lg hover:bg-white/[0.03] transition-colors"
            >
              <ScoreRing score={p.score} size={24} strokeWidth={2} />
              <span className="text-[11px] font-medium text-text truncate flex-1">
                {p.name}
              </span>
              <span
                className="text-[9px] font-bold uppercase shrink-0"
                style={{ color: "var(--color-accent)" }}
              >
                {p.brand_slug.slice(0, 5)}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Brands */}
      <div className={card}>
        <div className={heading}>Top Brands</div>
        <div className="space-y-0.5">
          {topBrands.map((b) => (
            <button
              key={b.name}
              className="w-full flex items-center gap-2 px-1.5 py-1 -mx-1.5 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer"
              onClick={() => onBrandClick?.(b.name)}
            >
              <ScoreRing score={b.avgScore} size={24} strokeWidth={2} />
              <span
                className="text-[11px] font-extrabold uppercase tracking-wide truncate flex-1 text-left"
                style={{ color: "var(--color-accent)" }}
              >
                {b.name}
              </span>
              <span className="text-[10px] text-muted shrink-0">
                {b.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* By Category */}
      <div className={card}>
        <div className={heading}>By Category</div>
        <div className="space-y-1">
          {topCategories.map(([cat, count]) => (
            <button
              key={cat}
              className="w-full flex items-center gap-1.5 group/cat cursor-pointer"
              onClick={() => onCategoryClick?.(cat)}
            >
              <span className="text-[10px] text-muted truncate flex-1 text-left group-hover/cat:text-accent transition-colors">
                {cat}
              </span>
              <div className="w-14 h-2.5 bg-white/[0.03] rounded overflow-hidden shrink-0">
                <div
                  className="h-full rounded bg-accent/50 group-hover/cat:bg-accent/80 transition-all"
                  style={{ width: `${(count / maxCatCount) * 100}%` }}
                />
              </div>
              <span className="text-[9px] font-bold text-muted w-4 text-right shrink-0">
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
