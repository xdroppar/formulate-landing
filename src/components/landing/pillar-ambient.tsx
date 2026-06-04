"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

/**
 * PillarAmbient — a per-pillar living background for the reference pages. Same
 * proven mechanism as the homepage FallingLeaves (sparse drift down the L/R
 * margins, scroll-reactive, deterministic positions, pure CSS keyframes, low
 * opacity, reduced-motion + phone safe) so the whole site reads as ONE system —
 * but the SHAPE, COLOR, and soft glow vary per pillar so each area has its own
 * identity. Adds a subtle mouse-parallax for an interactive, premium feel.
 *
 * Tied-system rule: same within a pillar, distinct across pillars, one language.
 */

type Motif = "leaf" | "capsule" | "particle";
export type PillarKey = "supplements" | "foods" | "nutrients" | "learn";

// Teardrop leaf shared with the tree + FallingLeaves, so they read as one system.
const LEAF_PATH = "M0 0 C -7 -7 -7 -18 0 -26 C 7 -18 7 -7 0 0 Z";

const CONFIG: Record<PillarKey, { motif: Motif; hues: string[]; glow: string }> = {
  // Capsules + teal — the science/supplement branch of the tree.
  supplements: { motif: "capsule", hues: ["#00e5a0", "#2fd8a8", "#39c9b0", "#5bc8d8", "#7c6dfa"], glow: "rgba(0,229,160,0.08)" },
  // Leaves + green — the most literal "growing" branch.
  foods: { motif: "leaf", hues: ["#00e5a0", "#2fd8a8", "#5bd08a", "#86d36b", "#39c9b0"], glow: "rgba(0,229,160,0.08)" },
  // Rising specks + amber/gold — nutrients drawn up like roots feeding the tree.
  nutrients: { motif: "particle", hues: ["#f5c451", "#f0b54a", "#ffd36b", "#39c9b0", "#7c6dfa"], glow: "rgba(245,196,81,0.07)" },
  // Faint violet leaves — the quiet reference branch.
  learn: { motif: "leaf", hues: ["#7c6dfa", "#6bd0c0", "#39c9b0"], glow: "rgba(124,109,250,0.07)" },
};

/** Deterministic PRNG — stable layout across renders (mirrors FallingLeaves). */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Drift = {
  side: "l" | "r";
  edge: number;
  size: number;
  fallDur: number;
  fallDelay: number;
  swayDur: number;
  swayDelay: number;
  swayAmp: number;
  tumble: number;
  hue: string;
  opacity: number;
};

function buildDrifts(seed: number, hues: string[]): Drift[] {
  const rng = mulberry32(seed);
  const out: Drift[] = [];
  const N = 16;
  for (let i = 0; i < N; i++) {
    out.push({
      side: i % 2 === 0 ? "l" : "r",
      edge: 1 + rng() * 11,
      size: 11 + rng() * 15,
      fallDur: 16 + rng() * 16,
      fallDelay: -rng() * 32,
      swayDur: 3 + rng() * 3,
      swayDelay: -rng() * 5,
      swayAmp: 9 + rng() * 15,
      tumble: 16 + rng() * 26,
      hue: hues[Math.floor(rng() * hues.length)],
      opacity: 0.14 + rng() * 0.2,
    });
  }
  return out;
}

function Shape({ motif, hue, style }: { motif: Motif; hue: string; style: CSSProperties }) {
  if (motif === "leaf") {
    return <path className="pa-shape" style={style} d={LEAF_PATH} fill={hue} />;
  }
  if (motif === "capsule") {
    return <rect className="pa-shape" style={style} x={-4} y={-24} width={8} height={24} rx={4} fill={hue} />;
  }
  // particle
  return (
    <g className="pa-shape" style={style}>
      <circle cx={0} cy={-13} r={3.4} fill={hue} />
      <circle cx={0} cy={-13} r={6.5} fill="none" stroke={hue} strokeWidth={0.8} opacity={0.5} />
    </g>
  );
}

export function PillarAmbient({ pillar = "supplements", seed = 4242 }: { pillar?: PillarKey; seed?: number }) {
  const [enabled, setEnabled] = useState(false);
  const [falling, setFalling] = useState(false);
  const idle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const layerRef = useRef<HTMLDivElement>(null);

  const cfg = CONFIG[pillar];
  const drifts = useMemo(() => buildDrifts(seed, cfg.hues), [seed, cfg.hues]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phone = window.matchMedia("(max-width: 768px)").matches;
    if (reduce || phone) return;
    setEnabled(true);

    const onScroll = () => {
      setFalling(true);
      clearTimeout(idle.current);
      idle.current = setTimeout(() => setFalling(false), 900);
    };

    // Subtle mouse-parallax: the whole ambient layer eases toward an offset
    // opposite the cursor. rAF-smoothed; idles to zero work when settled.
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      if (layerRef.current) layerRef.current.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * -18;
      ty = (e.clientY / window.innerHeight - 0.5) * -11;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      clearTimeout(idle.current);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className={`pa-root pointer-events-none fixed inset-0 z-0 overflow-hidden${falling ? " pa-falling" : ""}`}>
      <style>{`
        .pa-fall { position: absolute; top: 0; will-change: transform; animation: pa-fall linear infinite; animation-play-state: paused; }
        .pa-root.pa-falling .pa-fall { animation-play-state: running; }
        .pa-shape { transform-box: fill-box; transform-origin: 50% 100%; animation: pa-sway ease-in-out infinite; will-change: transform; }
        .pa-glow { animation: pa-float 18s ease-in-out infinite; will-change: transform; }
        @keyframes pa-fall { from { transform: translateY(-16vh); } to { transform: translateY(116vh); } }
        @keyframes pa-sway {
          0%   { transform: translateX(calc(var(--amp) * -1)) rotate(calc(var(--tumble) * -1)); }
          50%  { transform: translateX(var(--amp)) rotate(var(--tumble)); }
          100% { transform: translateX(calc(var(--amp) * -1)) rotate(calc(var(--tumble) * -1)); }
        }
        @keyframes pa-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-26px); } }
        @media (prefers-reduced-motion: reduce) { .pa-root { display: none; } }
      `}</style>

      <div ref={layerRef} className="absolute inset-0">
        {/* Soft themed glows weighted into each gutter */}
        <div
          className="pa-glow absolute -left-[14%] top-[6%] w-[44vw] max-w-[640px] aspect-square rounded-full"
          style={{ background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)` }}
        />
        <div
          className="pa-glow absolute -right-[14%] top-[44%] w-[40vw] max-w-[600px] aspect-square rounded-full"
          style={{ background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`, animationDelay: "-8s" }}
        />

        {/* Drifting motif in the margins */}
        {drifts.map((d, i) => {
          const fallStyle: CSSProperties = {
            [d.side === "l" ? "left" : "right"]: `${d.edge}%`,
            animationDuration: `${d.fallDur.toFixed(2)}s`,
            animationDelay: `${d.fallDelay.toFixed(2)}s`,
          };
          const swayStyle = {
            animationDuration: `${d.swayDur.toFixed(2)}s`,
            animationDelay: `${d.swayDelay.toFixed(2)}s`,
            "--amp": `${d.swayAmp.toFixed(1)}px`,
            "--tumble": `${d.tumble.toFixed(0)}deg`,
          } as CSSProperties;
          return (
            <div key={i} className="pa-fall" style={fallStyle}>
              <svg width={d.size} height={d.size * 1.3} viewBox="-9 -28 18 30" style={{ overflow: "visible", opacity: d.opacity }}>
                <Shape motif={cfg.motif} hue={d.hue} style={swayStyle} />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}
