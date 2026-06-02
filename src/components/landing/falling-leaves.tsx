"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

/**
 * FallingLeaves — a sparse drift of leaves down the LEFT and RIGHT page margins
 * that comes alive WHEN YOU SCROLL. Each leaf hangs and gently flutters in place
 * while the page is still (the sway never stops, so it never looks frozen), then
 * drifts downward whenever you're scrolling — so the margins feel like they're
 * shedding leaves as you move through the page.
 *
 * Motion: two nested elements per leaf — an OUTER wrapper that falls (translateY,
 * paused while idle) and an INNER leaf that always sways + tumbles. Combined they
 * read as a leaf waving as it falls.
 *
 * Performance: a small fixed pool (deterministic positions), pure CSS keyframes,
 * one throttled scroll listener that just flips play-state. Low opacity to sit
 * under the body copy like the BackgroundTree; fully prefers-reduced-motion safe
 * and disabled on phones to save battery.
 */

type Leaf = {
  side: "l" | "r";
  edge: number; // % offset into the margin from the page edge
  size: number; // px
  fallDur: number; // s — full top→bottom drift
  fallDelay: number; // s — staggers the pool so they don't fall in lockstep
  swayDur: number; // s
  swayDelay: number;
  swayAmp: number; // px of horizontal waver
  tumble: number; // deg of rotation amplitude
  hue: string;
  opacity: number;
};

/** Deterministic PRNG — stable leaf layout across renders (mirrors BackgroundTree). */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Same teardrop as the tree's leaves, so the two effects read as one system.
const LEAF_PATH = "M0 0 C -7 -7 -7 -18 0 -26 C 7 -18 7 -7 0 0 Z";
// Crown-green → root-violet, sampled from the BackgroundTree gradient.
const HUES = ["#00e5a0", "#2fd8a8", "#39c9b0", "#6bd0c0", "#7c6dfa"];

function buildLeaves(seed: number): Leaf[] {
  const rng = mulberry32(seed);
  const leaves: Leaf[] = [];
  const N = 18;
  for (let i = 0; i < N; i++) {
    const side: "l" | "r" = i % 2 === 0 ? "l" : "r";
    leaves.push({
      side,
      edge: 1 + rng() * 11, // 1%–12% into the margin
      size: 12 + rng() * 16,
      fallDur: 15 + rng() * 16,
      fallDelay: -rng() * 30, // negative so the pool starts mid-fall, spread out
      swayDur: 2.8 + rng() * 3.2,
      swayDelay: -rng() * 5,
      swayAmp: 10 + rng() * 16,
      tumble: 18 + rng() * 26,
      hue: HUES[Math.floor(rng() * HUES.length)],
      opacity: 0.16 + rng() * 0.22,
    });
  }
  return leaves;
}

export function FallingLeaves() {
  const [enabled, setEnabled] = useState(false);
  const [falling, setFalling] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const leaves = useMemo(() => buildLeaves(7411), []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phone = window.matchMedia("(max-width: 768px)").matches;
    if (reduce || phone) return;
    setEnabled(true);

    const onScroll = () => {
      setFalling(true);
      clearTimeout(idleTimer.current);
      // Keep drifting a beat past the last scroll so a stop feels like a settle.
      idleTimer.current = setTimeout(() => setFalling(false), 900);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimer.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className={`fl-root pointer-events-none fixed inset-0 z-0 overflow-hidden${falling ? " fl-falling" : ""}`}
    >
      <style>{`
        .fl-fall {
          position: absolute;
          top: 0;
          will-change: transform;
          animation: fl-fall linear infinite;
          animation-play-state: paused; /* hangs in place until you scroll */
        }
        .fl-root.fl-falling .fl-fall { animation-play-state: running; }
        .fl-leaf {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: fl-sway ease-in-out infinite; /* always fluttering */
          will-change: transform;
        }
        @keyframes fl-fall {
          from { transform: translateY(-14vh); }
          to   { transform: translateY(114vh); }
        }
        @keyframes fl-sway {
          0%   { transform: translateX(calc(var(--amp) * -1)) rotate(calc(var(--tumble) * -1)); }
          50%  { transform: translateX(var(--amp)) rotate(var(--tumble)); }
          100% { transform: translateX(calc(var(--amp) * -1)) rotate(calc(var(--tumble) * -1)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fl-root { display: none; }
        }
      `}</style>

      {leaves.map((lf, i) => {
        const fallStyle: CSSProperties = {
          [lf.side === "l" ? "left" : "right"]: `${lf.edge}%`,
          animationDuration: `${lf.fallDur.toFixed(2)}s`,
          animationDelay: `${lf.fallDelay.toFixed(2)}s`,
        };
        const swayStyle = {
          animationDuration: `${lf.swayDur.toFixed(2)}s`,
          animationDelay: `${lf.swayDelay.toFixed(2)}s`,
          "--amp": `${lf.swayAmp.toFixed(1)}px`,
          "--tumble": `${lf.tumble.toFixed(0)}deg`,
        } as CSSProperties;
        return (
          <div key={i} className="fl-fall" style={fallStyle}>
            <svg
              width={lf.size}
              height={lf.size * 1.3}
              viewBox="-9 -28 18 30"
              style={{ overflow: "visible", opacity: lf.opacity }}
            >
              <path className="fl-leaf" style={swayStyle} d={LEAF_PATH} fill={lf.hue} />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
