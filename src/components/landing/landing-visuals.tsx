"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useInView } from "./use-in-view";

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

export function HeroPreview() {
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
              <div className="text-[13px] font-bold text-text leading-tight">My Stack</div>
              <div className="text-[10px] text-muted">8 supplements · 12 foods</div>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-warning/10 text-warning text-[10px] font-bold">
            🔥 14-day streak
          </div>
        </div>

        {/* Stack score hero card */}
        <div className="rounded-xl border border-accent/15 bg-surface/70 p-4 mb-3 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[radial-gradient(circle,rgba(0,229,160,0.12),transparent_70%)]" />
          <div className="flex items-center gap-4 relative">
            <AnimatedScoreRing score={88} size={104} strokeWidth={8} />
            <div className="flex-1 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wide uppercase text-muted">Stack Score</span>
                <span className="px-1.5 py-0.5 rounded bg-accent/15 text-accent text-[10px] font-bold">+6 ▲</span>
              </div>
              <AnimatedBar label="Quality" value={92} sub="avg 92" color="#10B981" delay={200} />
              <AnimatedBar label="Coverage" value={78} sub="22/31" color="#3B82F6" delay={350} />
              <AnimatedBar label="Nutrition" value={84} sub="supps + diet" color="#7c6dfa" delay={500} />
            </div>
          </div>
        </div>

        {/* logged supplement rows */}
        <div className="space-y-2">
          {[
            { name: "Creatine Monohydrate", brand: "Thorne", score: 94, logged: true },
            { name: "Magnesium Bisglycinate", brand: "Thorne", score: 88, logged: true },
            { name: "Omega-3 1600mg", brand: "Nordic Naturals", score: 82, logged: false },
          ].map((p, i) => (
            <div
              key={p.name}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface/50 px-3 py-2 animate-pop-in"
              style={{ animationDelay: `${600 + i * 130}ms` }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black border-2 shrink-0"
                style={{ color: scoreColor(p.score), borderColor: `${scoreColor(p.score)}66`, background: `${scoreColor(p.score)}14` }}
              >
                {p.score}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-text truncate">{p.name}</div>
                <div className="text-[10px] text-muted">{p.brand}</div>
              </div>
              {p.logged ? (
                <span className="text-[10px] font-bold text-accent flex items-center gap-1">✓ Logged</span>
              ) : (
                <span className="text-[10px] font-semibold text-muted border border-border rounded-full px-2 py-0.5">Log</span>
              )}
            </div>
          ))}
        </div>
      </AppWindow>

      {/* floating accent chip */}
      <div className="absolute -left-4 sm:-left-10 top-1/3 animate-float-slow hidden sm:block">
        <div className="rounded-xl border border-border bg-[#0b0b16]/95 backdrop-blur px-3 py-2 shadow-xl">
          <div className="text-[10px] text-muted">Today&apos;s coverage</div>
          <div className="text-lg font-black text-accent">
            <AnimatedNumber value={22} suffix="/31" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * SPOTLIGHT previews
 * ────────────────────────────────────────────────────────────── */

// 1 — Supplement score breakdown
export function ScoreBreakdownPreview() {
  const bars = [
    { label: "Ingredient Quality", value: 96, color: "#10B981" },
    { label: "Dose Accuracy", value: 95, color: "#10B981" },
    { label: "Label Transparency", value: 98, color: "#7c6dfa" },
    { label: "Third-Party Testing", value: 90, color: "#3B82F6" },
    { label: "Bioavailability", value: 92, color: "#3B82F6" },
  ];
  return (
    <AppWindow className="max-w-[460px]" title="Creatine Monohydrate — Thorne">
      <div className="flex items-center gap-4 pb-4 mb-4 border-b border-border">
        <AnimatedScoreRing score={94} size={84} strokeWidth={7} />
        <div>
          <div className="text-[15px] font-bold text-text">Creatine Monohydrate</div>
          <div className="text-[12px] text-muted">Thorne · NSF Certified for Sport</div>
          <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-bold">
            Grade A · Top value in category
          </div>
        </div>
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
    <AppWindow className="max-w-[460px]" title="Nutrients — coverage">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[13px] font-bold text-text">Daily nutrient coverage</div>
          <div className="text-[11px] text-muted">Supplements + meals combined</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-accent leading-none">
            <AnimatedNumber value={22} />
            <span className="text-muted text-base">/31</span>
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
  const meals = [
    { slot: "Breakfast", name: "Greek Yogurt Parfait", kcal: 320, grade: 91 },
    { slot: "Lunch", name: "Salmon & Quinoa Bowl", kcal: 540, grade: 95 },
    { slot: "Snack", name: "Almonds + Blueberries", kcal: 210, grade: 88 },
  ];
  return (
    <AppWindow className="max-w-[460px]" title="My Meals — Today">
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
            className="flex items-center gap-3 rounded-lg border border-border bg-surface/50 px-3 py-2 animate-pop-in"
            style={{ animationDelay: `${i * 140}ms` }}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-surface2 to-bg flex items-center justify-center text-sm">
              {["🥣", "🐟", "🫐"][i]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-wide text-muted">{m.slot}</div>
              <div className="text-[12px] font-semibold text-text truncate">{m.name}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-bold text-text">{m.kcal}</div>
              <div className="text-[9px]" style={{ color: scoreColor(m.grade) }}>
                {m.grade} score
              </div>
            </div>
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
  return (
    <AppWindow className="max-w-[460px]" title="My Journey">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <AnimatedScoreRing score={86} size={88} strokeWidth={7} trackOpacity={0.08} />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-accent text-bg text-[9px] font-black">LVL 12</span>
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-bold text-text">Health Pillars</div>
          <div className="text-[11px] text-muted mb-2">2,140 XP · 360 to next level</div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <AnimatedBar label="" value={72} color="#7c6dfa" />
          </div>
        </div>
      </div>
      <div className="space-y-2.5">
        <AnimatedBar label="Supplements" value={90} sub="Lvl 8" color="#10B981" delay={120} />
        <AnimatedBar label="Diet" value={74} sub="Lvl 6" color="#3B82F6" delay={260} />
        <AnimatedBar label="Nutrition" value={61} sub="Lvl 5" color="#F59E0B" delay={400} />
      </div>
      <div className="mt-4 flex gap-2">
        {["🏅 7-day streak", "🎯 First A-stack", "🔬 50 scores read"].map((b, i) => (
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
