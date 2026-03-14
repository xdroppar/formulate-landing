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

const BRAND_GRADES = [
  { letter: "A", color: "#00e5a0" },
  { letter: "B", color: "#22d3ee" },
  { letter: "C", color: "#7c6dfa" },
  { letter: "D", color: "#ffa94d" },
  { letter: "F", color: "#ff4f6a" },
] as const;

function gradeFromScore(score: number): string {
  if (score >= 80) return "A";
  if (score >= 60) return "B";
  if (score >= 40) return "C";
  if (score >= 27) return "D";
  return "F";
}

const CATEGORY_EMOJI: Record<string, string> = {
  sleep: "🌙",
  cognition: "🧠",
  cognitive: "🧠",
  energy: "⚡",
  performance: "🏆",
  recovery: "🔄",
  mood: "😊",
  longevity: "🧬",
  immune: "🛡️",
  "immune support": "🛡️",
  stress: "🧘",
  weight: "⚖️",
  "weight management": "⚖️",
  detox: "🌿",
  beauty: "✨",
  general: "💊",
  "general health": "💊",
  heart: "❤️",
  "heart health": "❤️",
  cardiovascular: "❤️",
  gut: "🦠",
  "gut health": "🦠",
  digestive: "🦠",
  "gi support": "🦠",
  liver: "🫁",
  "liver support": "🫁",
  kidney: "🫘",
  skin: "💎",
  "skin / hair": "💎",
  hair: "💇",
  bone: "🦴",
  "bone support": "🦴",
  joints: "🦵",
  joint: "🦵",
  "joint support": "🦵",
  eye: "👁️",
  "eye health": "👁️",
  vision: "👁️",
  brain: "🎯",
  "brain health": "🎯",
  muscle: "💪",
  hormones: "🔬",
  thyroid: "🦋",
  blood: "🩸",
  "blood pressure": "🩸",
  inflammation: "🔥",
  "anti-inflammatory": "🔥",
  "blood sugar": "🩸",
  cholesterol: "📊",
  focus: "🎯",
  memory: "🧠",
  vitamins: "💊",
  vitamin: "💊",
  multivitamins: "💊",
  minerals: "⚪",
  mineral: "⚪",
  "amino acids": "🔗",
  omega: "🐟",
  "fish oil": "🐟",
  "omega-fatty-acids": "🐟",
  probiotics: "🦠",
  probiotic: "🦠",
  prebiotics: "🌾",
  enzymes: "⚗️",
  herbs: "🌿",
  herbal: "🌿",
  botanical: "🌿",
  mushrooms: "🍄",
  mushroom: "🍄",
  adaptogen: "🌿",
  nootropic: "🧠",
  antioxidant: "🍇",
  antioxidants: "🍇",
  fiber: "🌾",
  protein: "💪",
  collagen: "✨",
  creatine: "⚡",
  "sports performance": "🏃",
  sports: "🏃",
  women: "👩",
  "women's": "👩",
  "women's health": "👩",
  men: "👨",
  "men's": "👨",
  "men's health": "👨",
  prenatal: "🤰",
  senior: "👴",
  vegan: "🌱",
  "healthy aging": "🧬",
  foundational: "💊",
  metabolism: "⚡",
  methylation: "🔬",
  endurance: "🏆",
  fertility: "🤰",
  respiratory: "🌬️",
  "iron supplements": "🩸",
};

function getCategoryEmoji(cat: string): string {
  const key = cat.toLowerCase().trim();
  if (CATEGORY_EMOJI[key]) return CATEGORY_EMOJI[key];
  // Try without trailing 's'
  if (key.endsWith("s") && CATEGORY_EMOJI[key.slice(0, -1)])
    return CATEGORY_EMOJI[key.slice(0, -1)];
  return "📦";
}

interface InsightsPanelProps {
  products: CatalogProduct[];
  onScoreRangeClick?: (min: number, max: number) => void;
  onCategoryClick?: (category: string) => void;
  onBrandClick?: (brand: string) => void;
  onBrandGradeClick?: (grade: string) => void;
}

export function InsightsPanel({
  products,
  onScoreRangeClick,
  onCategoryClick,
  onBrandClick,
  onBrandGradeClick,
}: InsightsPanelProps) {
  const scored = products.filter((p) => p.score !== null);
  const total = products.length;

  // --- Score Distribution ---
  const scoreDist = SCORE_RANGES.map((r) => {
    const count = scored.filter(
      (p) => p.score! >= r.min && p.score! <= r.max
    ).length;
    return { ...r, count };
  });
  const maxScoreCount = Math.max(...scoreDist.map((d) => d.count), 1);

  // --- Brand Grades ---
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

  const brandGradeDist = BRAND_GRADES.map((g) => {
    let count = 0;
    for (const b of brandMap.values()) {
      if (b.scores.length === 0) continue;
      const avg = Math.round(
        b.scores.reduce((a, c) => a + c, 0) / b.scores.length
      );
      if (gradeFromScore(avg) === g.letter) count++;
    }
    return { ...g, count };
  });
  const maxGradeCount = Math.max(...brandGradeDist.map((d) => d.count), 1);

  // --- Top Products (8) ---
  const topProducts = [...scored]
    .sort((a, b) => {
      const cmp = (b.score ?? 0) - (a.score ?? 0);
      if (cmp !== 0) return cmp;
      return a.name.localeCompare(b.name);
    })
    .slice(0, 8);

  // --- Top Brands ---
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

  // --- By Type (from category_tags, top 10) ---
  const tagMap = new Map<string, number>();
  const IGNORED = new Set(["general", "other", "supplements"]);
  for (const p of products) {
    const tags = p.category_tags?.length ? p.category_tags : p.category ? [p.category] : [];
    for (const tag of tags) {
      if (IGNORED.has(tag.toLowerCase())) continue;
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }
  const topCategories = [...tagMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const maxCatCount = Math.max(...topCategories.map(([, c]) => c), 1);

  // --- Avg Score ---
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

      {/* Brand Grades */}
      <div className={card}>
        <div className={heading}>Brand Grades</div>
        <div className="space-y-1.5">
          {brandGradeDist.map((g) => (
            <button
              key={g.letter}
              className="w-full flex items-center gap-1.5 group/bar cursor-pointer disabled:opacity-30 disabled:cursor-default"
              disabled={g.count === 0}
              onClick={() => onBrandGradeClick?.(g.letter)}
            >
              <span
                className="text-[11px] font-extrabold w-4 text-right shrink-0"
                style={{ color: g.count > 0 ? g.color : undefined }}
              >
                {g.letter}
              </span>
              <div className="flex-1 h-4 bg-white/[0.03] rounded overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-500 group-hover/bar:brightness-125"
                  style={{
                    width: `${(g.count / maxGradeCount) * 100}%`,
                    backgroundColor: g.color,
                    opacity: 0.8,
                  }}
                />
              </div>
              <span className="text-[10px] font-bold text-muted w-5 text-right shrink-0">
                {g.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Scores */}
      <div className={card}>
        <div className={heading}>Product Scores</div>
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

      {/* By Type */}
      <div className={card}>
        <div className={heading}>By Type</div>
        <div className="space-y-1">
          {topCategories.map(([cat, count]) => (
            <button
              key={cat}
              className="w-full flex items-center gap-1.5 group/cat cursor-pointer"
              onClick={() => onCategoryClick?.(cat)}
            >
              <span className="text-[10px] shrink-0">{getCategoryEmoji(cat)}</span>
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
