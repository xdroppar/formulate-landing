"use client";

import { useT } from "@/components/i18n-provider";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { useInView } from "./use-in-view";

export type HeroRow = { name: string; brand: string; score: number; image?: string; logged?: boolean };

/* ──────────────────────────────────────────────────────────────
 * Shared primitives
 * ────────────────────────────────────────────────────────────── */

function scoreColor(score: number): string {
  if (score >= 90) return "#10B981";
  if (score >= 80) return "#3B82F6";
  if (score >= 70) return "#F59E0B";
  if (score >= 60) return "#F97316";
  return "#EF4444";
}

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

// Progression tiers (4 levels each): the journey ring + pillar bars are coloured
// by the tier the level falls into, so progress reads as Bronze → … → Diamond.
const TIERS = [
  { name: "Bronze", color: "#C8803C", min: 1 },
  { name: "Silver", color: "#C3CCDA", min: 5 },
  { name: "Gold", color: "#F4C04E", min: 9 },
  { name: "Platinum", color: "#5FE3CC", min: 13 },
  { name: "Diamond", color: "#9AB6FF", min: 17 },
] as const;
function tierFor(level: number) {
  for (let i = TIERS.length - 1; i >= 0; i--) if (level >= TIERS[i].min) return TIERS[i];
  return TIERS[0];
}

/** Counts from 0 → value when scrolled into view. */
export function AnimatedNumber({
  value,
  duration = 1200,
  decimals = 0,
  suffix = "",
  prefix = "",
  className = "",
}: {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(value * easeOutCubic(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

/** SVG progress ring that draws + counts up. `score` on a 50–100 scale. */
export function AnimatedScoreRing({
  score,
  size = 132,
  strokeWidth = 9,
  duration = 1500,
  trackOpacity = 0.06,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
  duration?: number;
  trackOpacity?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [t, setT] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * radius;
  const norm = Math.max(0, Math.min(1, (score - 50) / 50));
  const color = scoreColor(score);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setT(easeOutCubic(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, duration]);

  const offset = circ - norm * circ * t;

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={`rgba(255,255,255,${trackOpacity})`} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color}55)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center leading-none">
        <span className="font-black" style={{ color, fontSize: size * 0.3 }}>
          {Math.round(score * t)}
        </span>
      </div>
    </div>
  );
}

/** Ring that fills to `pct` and reads "LVL n", tinted by the current tier. */
function LevelRing({
  level,
  pct,
  color,
  size = 88,
  strokeWidth = 7,
  duration = 1500,
}: {
  level: number;
  pct: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [t, setT] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * radius;
  const fill = Math.max(0, Math.min(1, pct / 100));

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setT(easeOutCubic(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, duration]);

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circ}
          strokeDashoffset={circ - fill * circ * t}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color}55)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center leading-none">
        <span className="font-bold tracking-[1px]" style={{ color, fontSize: size * 0.13 }}>LVL</span>
        <span className="font-black" style={{ color, fontSize: size * 0.34 }}>{level}</span>
      </div>
    </div>
  );
}

/** Horizontal meter that fills on scroll. */
export function AnimatedBar({
  label,
  value,
  sub,
  color,
  delay = 0,
}: {
  label: string;
  value: number; // 0–100 fill percent
  sub?: string;
  color?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.4 });
  const barColor = color ?? scoreColor(50 + value / 2);
  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-[12px] font-semibold text-text">{label}</span>
        {sub && <span className="text-[11px] text-muted">{sub}</span>}
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: inView ? `${value}%` : "0%",
            backgroundColor: barColor,
            transition: "width 1.1s cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

/** Small donut for a single nutrient. `pct` 0–100+. */
function NutrientDonut({ name, pct, delay = 0 }: { name: string; pct: number; delay?: number }) {
  const { ref, inView } = useInView({ threshold: 0.4 });
  const size = 58;
  const sw = 5;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const fill = Math.min(1, pct / 100);
  const color = pct >= 100 ? "#10B981" : pct >= 70 ? "#3B82F6" : pct >= 40 ? "#F59E0B" : "#EF4444";
  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={sw} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={inView ? circ - fill * circ : circ}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)", transitionDelay: `${delay}ms` }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold" style={{ color }}>
          {Math.round(pct)}%
        </span>
      </div>
      <span className="text-[10px] text-muted text-center leading-tight max-w-[64px]">{name}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * App-window chrome wrapper
 * ────────────────────────────────────────────────────────────── */

export function AppWindow({
  children,
  title = "app.formulate-health.app",
  className = "",
  float = false,
}: {
  children: ReactNode;
  title?: string;
  className?: string;
  float?: boolean;
}) {
  return (
    <div className={`relative ${float ? "animate-float" : ""} ${className}`}>
      <div className="rounded-2xl border border-border bg-[#0b0b16] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* chrome bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface/60">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <div className="flex-1 mx-3 hidden sm:flex items-center justify-center">
            <div className="px-3 py-0.5 rounded-md bg-bg/60 text-[10px] text-muted/70 max-w-[240px] truncate">{title}</div>
          </div>
        </div>
        <div className="p-4 sm:p-5">{children}</div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * HERO preview — "My Stack" dashboard
 * ────────────────────────────────────────────────────────────── */

const DEFAULT_HERO_ROWS: HeroRow[] = [
  { name: "Creatine Monohydrate", brand: "Thorne", score: 98, logged: true },
  { name: "Magnesium", brand: "MegaFood", score: 94, logged: true },
  { name: "L-Theanine", brand: "BulkSupplements", score: 94, logged: false },
];

export function HeroPreview({ products }: { products?: HeroRow[] }) {
  const t = useT();
  const rows = products && products.length ? products : DEFAULT_HERO_ROWS;
  return (
    <div className="relative">
      {/* glow behind */}
      <div className="absolute -inset-8 rounded-[40px] bg-[radial-gradient(circle_at_50%_30%,rgba(0,229,160,0.14),transparent_65%)] blur-2xl pointer-events-none" />
      <AppWindow float className="relative max-w-[440px] mx-auto">
        {/* greeting row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-[11px] font-black text-bg">JD</div>
            <div>
              <div className="text-[13px] font-bold text-text leading-tight">{t("chrome.myStack")}</div>
              <div className="text-[10px] text-muted">{t("visuals.8Supplements12Foods")}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-warning/10 text-warning text-[10px] font-bold">{t("visuals.14DayStreak")}</div>
        </div>

        {/* Stack score hero card */}
        <div className="rounded-xl border border-accent/15 bg-surface/70 p-4 mb-3 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[radial-gradient(circle,rgba(0,229,160,0.12),transparent_70%)]" />
          <div className="flex items-center gap-4 relative">
            <AnimatedScoreRing score={88} size={104} strokeWidth={8} />
            <div className="flex-1 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wide uppercase text-muted">{t("visuals.stackScoreLabel")}</span>
                <span className="px-1.5 py-0.5 rounded bg-accent/15 text-accent text-[10px] font-bold">+6 ▲</span>
              </div>
              <AnimatedBar label={t("visuals.quality")} value={92} sub="avg 92" color="#10B981" delay={200} />
              <AnimatedBar label={t("visuals.coverage")} value={78} sub="20/26" color="#3B82F6" delay={350} />
              <AnimatedBar label={t("visuals.nutritionLabel")} value={84} sub={t("visuals.suppsDiet")} color="#7c6dfa" delay={500} />
            </div>
          </div>
          {/* plain-language legend so the three metrics self-explain */}
          <div className="relative mt-3 pt-3 border-t border-border/60 text-[10px] leading-relaxed text-muted">
            <span className="text-text font-semibold">{t("visuals.quality")}</span>{" "}{t("visuals.ofYourProducts")} ·{" "}
            <span className="text-text font-semibold">{t("visuals.coverage")}</span>{" "}{t("visuals.ofYourNeeds")} ·{" "}
            <span className="text-text font-semibold">{t("visuals.nutritionLabel")}</span>{" "}{t("visuals.fromFoodSupps")}</div>
        </div>

        {/* logged supplement rows */}
        <div className="space-y-2">
          {rows.map((p, i) => (
            <div
              key={p.name}
              className="flex items-center gap-2.5 rounded-lg border border-border bg-surface/50 px-2.5 py-2 animate-pop-in"
              style={{ animationDelay: `${600 + i * 130}ms` }}
            >
              {p.image ? (
                <div className="w-9 h-9 rounded-lg bg-surface2 flex items-center justify-center p-1 shrink-0">
                  <Image src={p.image} alt={p.name} width={30} height={30} className="object-contain max-h-[28px] w-auto" />
                </div>
              ) : (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-black border-2 shrink-0"
                  style={{ color: scoreColor(p.score), borderColor: `${scoreColor(p.score)}66`, background: `${scoreColor(p.score)}14` }}
                >
                  {p.score}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-text truncate">{p.name}</div>
                <div className="text-[10px] text-muted truncate">{p.brand}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[13px] font-black leading-none" style={{ color: scoreColor(p.score) }}>{p.score}</div>
                {p.logged ? (
                  <span className="text-[9px] font-bold text-accent">{t("visuals.logged")}</span>
                ) : (
                  <span className="text-[9px] font-semibold text-muted">{t("visuals.tapToLog")}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </AppWindow>

      {/* floating accent chip */}
      <div className="absolute -left-4 sm:-left-10 top-1/3 animate-float-slow hidden sm:block">
        <div className="rounded-xl border border-border bg-[#0b0b16]/95 backdrop-blur px-3 py-2 shadow-xl">
          <div className="text-[10px] text-muted">{t("visuals.todaysCoverage")}</div>
          <div className="text-lg font-black text-accent">
            <AnimatedNumber value={20} suffix="/26" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * SPOTLIGHT previews
 * ────────────────────────────────────────────────────────────── */

// 1 — Supplement score breakdown (real data: Thorne Creatine, 98/A+)
export function ScoreBreakdownPreview({ image }: { image?: string }) {
  const t = useT();
  const bars = [
    { label: "Clinical Evidence", value: 100, color: "#10B981" },
    { label: "Dose Accuracy", value: 95, color: "#10B981" },
    { label: "Bioavailability", value: 100, color: "#3B82F6" },
    { label: "Label Transparency", value: 100, color: "#7c6dfa" },
    { label: "Third-Party Testing", value: 92, color: "#3B82F6" },
  ];
  return (
    <AppWindow className="max-w-[460px]" title="Creatine Monohydrate — Thorne">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border">
        {image && (
          <div className="w-16 h-16 rounded-xl bg-surface2 flex items-center justify-center p-1.5 shrink-0">
            <Image src={image} alt="Thorne Creatine Monohydrate" width={56} height={56} className="object-contain max-h-[52px] w-auto" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-bold text-text truncate">Creatine Monohydrate</div>
          <div className="text-[12px] text-muted truncate">Thorne · NSF Certified for Sport</div>
          <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-bold">{t("visuals.gradeATopValueIn")}</div>
        </div>
        <AnimatedScoreRing score={98} size={72} strokeWidth={6} />
      </div>
      <div className="space-y-3">
        {bars.map((b, i) => (
          <AnimatedBar key={b.label} label={b.label} value={b.value} sub={`${b.value}`} color={b.color} delay={i * 110} />
        ))}
      </div>
    </AppWindow>
  );
}

// 2 — Nutrient coverage rings
export function NutrientCoveragePreview() {
  const t = useT();
  const nutrients = [
    { name: "Vitamin D", pct: 100 },
    { name: "Omega-3", pct: 88 },
    { name: "Magnesium", pct: 76 },
    { name: "Vitamin B12", pct: 100 },
    { name: "Zinc", pct: 64 },
    { name: "Vitamin C", pct: 100 },
    { name: "Iron", pct: 42 },
    { name: "Calcium", pct: 58 },
  ];
  return (
    <AppWindow className="max-w-[460px]" title={t("visuals.nutrientsCoverage")}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[13px] font-bold text-text">{t("visuals.dailyCoverage")}</div>
          <div className="text-[11px] text-muted">{t("visuals.supplementsMealsCombined")}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-accent leading-none">
            <AnimatedNumber value={20} />
            <span className="text-muted text-base">/26</span>
          </div>
          <div className="text-[10px] text-muted">on target</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {nutrients.map((n, i) => (
          <NutrientDonut key={n.name} name={n.name} pct={n.pct} delay={i * 90} />
        ))}
      </div>
    </AppWindow>
  );
}

// 3 — Meal / food day log (MFP / Cronometer style)
export function MealLogPreview() {
  const t = useT();
  const meals = [
    { slot: "Breakfast", name: t("visuals.greekYogurtParfait"), kcal: 320, grade: 91, image: "/images/foods/greek-yogurt.webp" },
    { slot: "Lunch", name: t("visuals.salmonQuinoaBowl"), kcal: 540, grade: 95, image: "/images/foods/salmon.webp" },
    { slot: "Snack", name: t("visuals.almondsBlueberries"), kcal: 210, grade: 88, image: "/images/foods/almonds.webp" },
  ];
  return (
    <AppWindow className="max-w-[460px]" title={t("visuals.myMealsToday")}>
      {/* macro summary */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { k: "Calories", v: 1070, t: "/ 2,100", c: "#00e5a0" },
          { k: "Protein", v: 92, t: "g", c: "#3B82F6" },
          { k: "Carbs", v: 104, t: "g", c: "#F59E0B" },
          { k: "Fat", v: 38, t: "g", c: "#7c6dfa" },
        ].map((m) => (
          <div key={m.k} className="rounded-lg border border-border bg-surface/50 p-2 text-center">
            <div className="text-[14px] font-black leading-none" style={{ color: m.c }}>
              <AnimatedNumber value={m.v} />
            </div>
            <div className="text-[9px] text-muted mt-0.5">{m.k}</div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {meals.map((m, i) => (
          <div
            key={m.name}
            className="flex items-center gap-3 rounded-lg border border-border bg-surface/50 px-2.5 py-2 animate-pop-in"
            style={{ animationDelay: `${i * 140}ms` }}
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface2 shrink-0">
              <Image src={m.image} alt={m.name} width={40} height={40} className="object-cover w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-wide text-muted">{m.slot}</div>
              <div className="text-[12px] font-semibold text-text truncate">{m.name}</div>
              <div className="text-[10px] text-muted">{m.kcal} kcal</div>
            </div>
            <AnimatedScoreRing score={m.grade} size={40} strokeWidth={4} trackOpacity={0.08} />
          </div>
        ))}
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <AnimatedBar label="" value={51} color="#00e5a0" />
      </div>
    </AppWindow>
  );
}

// 4 — Journey / progress
export function JourneyPreview() {
  const t = useT();
  const level = 12;
  const pct = 86; // progress to next level
  const tier = tierFor(level);
  const next = level + 1;
  const nextTier = tierFor(next);
  const pillars = [
    { emoji: "💊", name: "Supplements", lvl: 11, value: 80 },
    { emoji: "🍽️", name: "Diet", lvl: 8, value: 62 },
    { emoji: "🥦", name: "Nutrition", lvl: 4, value: 46 },
  ];
  return (
    <AppWindow className="max-w-[460px]" title={t("visuals.myJourney")}>
      <div className="flex items-start gap-4 mb-4">
        <div className="relative shrink-0">
          <LevelRing level={level} pct={pct} color={tier.color} size={88} strokeWidth={7} />
          <span
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-black"
            style={{ background: tier.color, color: "#08080f" }}
          >
            {tier.name.toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-bold text-text">{t("visuals.healthPillars")}</div>
          <div className="text-[11px] text-muted mb-2">{t("visuals.2140Xp360To")}</div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <AnimatedBar label="" value={pct} color={tier.color} />
          </div>
        </div>
        {/* next level + the tier it unlocks */}
        <div className="flex flex-col items-center shrink-0">
          <span className="text-[8px] uppercase tracking-wide text-muted mb-1">{t("visuals.next")}</span>
          <div
            className="w-11 h-11 rounded-full border-2 flex items-center justify-center text-[15px] font-black"
            style={{ borderColor: nextTier.color, color: nextTier.color }}
          >
            {next}
          </div>
          <span className="text-[8px] font-bold mt-1" style={{ color: nextTier.color }}>
            {nextTier.name}
          </span>
        </div>
      </div>
      <div className="space-y-2.5">
        {pillars.map((p, i) => {
          const pt = tierFor(p.lvl);
          return (
            <AnimatedBar
              key={p.name}
              label={`${p.emoji} ${p.name}`}
              value={p.value}
              sub={`${pt.name} · Lvl ${p.lvl}`}
              color={pt.color}
              delay={120 + i * 140}
            />
          );
        })}
      </div>
      <div className="mt-4 flex gap-2">
        {[t("visuals.7DayStreak"), t("visuals.firstAStack"), t("visuals.50ScoresRead")].map((b, i) => (
          <div
            key={b}
            className="flex-1 text-center rounded-lg border border-border bg-surface/50 py-2 text-[9px] font-semibold text-muted animate-pop-in"
            style={{ animationDelay: `${i * 130}ms` }}
          >
            {b}
          </div>
        ))}
      </div>
    </AppWindow>
  );
}
