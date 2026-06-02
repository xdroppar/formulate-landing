"use client";

import { useEffect, useRef, useState } from "react";

/**
 * BackgroundTree — a full tree-and-root system that lives BEHIND the page
 * content and is revealed top-to-bottom as you scroll. A leafy crown sits
 * behind the hero, a trunk runs the length of the page sprouting a branch at
 * each section, and the whole thing splays into spreading roots at the bottom.
 * The metaphor: deep roots = a foundation that compounds over time — longevity.
 *
 * Performance: the tree is generated once (a few hundred static <path>s) and
 * revealed by animating a SINGLE clip-rect height per scroll frame (O(1) work),
 * so scrolling stays smooth no matter how big the tree is. Subtle + low-opacity
 * so body copy stays readable; fully prefers-reduced-motion safe.
 */

type Seg = { d: string; w: number };
type Leaf = { x: number; y: number; s: number; r: number };

/** Deterministic PRNG so the tree shape is stable across resizes/regeneration. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DEG = Math.PI / 180;

/** Gently-curved path between two points (quadratic with a perpendicular bow). */
function seg(x1: number, y1: number, x2: number, y2: number, curve: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const nl = Math.hypot(-dy, dx) || 1;
  const cx = mx + (-dy / nl) * curve;
  const cy = my + (dx / nl) * curve;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

function buildTree(W: number, H: number, seed: number): { segs: Seg[]; leaves: Leaf[] } {
  const rng = mulberry32(seed);
  const segs: Seg[] = [];
  const leaves: Leaf[] = [];
  const cx = W * 0.5;

  // Recursive limb that forks and tapers, dropping leaves at its tips.
  const limb = (
    x: number,
    y: number,
    ang: number,
    len: number,
    wid: number,
    depth: number,
    leafy: boolean
  ) => {
    const ex = x + Math.cos(ang) * len;
    const ey = y + Math.sin(ang) * len;
    segs.push({ d: seg(x, y, ex, ey, (rng() - 0.5) * len * 0.3), w: Math.max(0.6, wid) });

    if (depth <= 0 || len < 16) {
      if (leafy) leaves.push({ x: ex, y: ey, s: 0.55 + rng() * 0.55, r: ang / DEG + 90 + (rng() - 0.5) * 50 });
      return;
    }
    if (leafy && rng() < 0.16) leaves.push({ x: ex, y: ey, s: 0.45 + rng() * 0.4, r: rng() * 360 });

    const spread = (16 + rng() * 22) * DEG;
    limb(ex, ey, ang - spread * (0.6 + rng() * 0.6), len * (0.68 + rng() * 0.14), wid * 0.68, depth - 1, leafy);
    limb(ex, ey, ang + spread * (0.6 + rng() * 0.6), len * (0.68 + rng() * 0.14), wid * 0.68, depth - 1, leafy);
    if (rng() < 0.3) limb(ex, ey, ang + (rng() - 0.5) * spread, len * 0.55, wid * 0.55, depth - 2, leafy);
  };

  const top = 64;
  const rootRoom = Math.min(H * 0.16, 1000);
  const trunkBottom = H - rootRoom;
  const trunkLen = Math.max(400, trunkBottom - top);

  // Leafy crown behind the hero — a few limbs reaching up and out.
  const crownN = 5;
  for (let i = 0; i < crownN; i++) {
    const a = (-150 + (i / (crownN - 1)) * 120) * DEG; // fan upward
    limb(cx + (rng() - 0.5) * 40, top + 70, a, W * 0.06 * (0.8 + rng() * 0.5), 3, 5, true);
  }

  // Trunk: points down the centre with a gentle organic sway.
  const STEPS = Math.max(7, Math.floor(trunkLen / 240));
  const trunkPts: { x: number; y: number }[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const y = top + 70 + (trunkLen - 70) * (i / STEPS);
    const x = cx + Math.sin(i * 0.7 + 0.5) * (W * 0.045);
    trunkPts.push({ x, y });
  }
  for (let i = 0; i < trunkPts.length - 1; i++) {
    const a = trunkPts[i];
    const b = trunkPts[i + 1];
    const w = 8 - (i / (trunkPts.length - 1)) * 4.5; // taper 8 → 3.5
    segs.push({ d: seg(a.x, a.y, b.x, b.y, (rng() - 0.5) * 10), w });
  }

  // One branch at each trunk node, alternating sides — roughly one per section.
  trunkPts.forEach((p, i) => {
    if (i < 1 || i >= trunkPts.length - 1) return;
    const side = i % 2 === 0 ? 1 : -1;
    const base = (side > 0 ? 38 : 142) * DEG + (rng() - 0.5) * 22 * DEG;
    const len = W * 0.1 * (0.7 + rng() * 0.7);
    limb(p.x, p.y, base, len, 3.4, 4, true);
  });

  // Roots: from the trunk's base, fanning downward and outward.
  const rootN = 5 + Math.floor(rng() * 3);
  for (let k = 0; k < rootN; k++) {
    const a = (58 + (k / (rootN - 1)) * 64) * DEG; // 58°..122° (downward fan)
    limb(cx + (rng() - 0.5) * 36, trunkBottom, a, rootRoom * 0.42 * (0.8 + rng() * 0.6), 4, 5, false);
  }

  return { segs, leaves };
}

const LEAF_PATH = "M0 0 C -7 -7 -7 -18 0 -26 C 7 -18 7 -7 0 0 Z";

export function BackgroundTree() {
  const rootRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<SVGRectElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [tree, setTree] = useState<{ segs: Seg[]; leaves: Leaf[] } | null>(null);
  const reduce = useRef(false);

  // Measure the content height (our absolute parent) + viewport width.
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parent = rootRef.current?.parentElement;
    if (!parent) return;

    let timer: ReturnType<typeof setTimeout>;
    const measure = () => {
      const w = Math.min(window.innerWidth, 1700);
      const h = parent.offsetHeight;
      setDims((d) => (Math.abs(d.h - h) > 24 || d.w !== w ? { w, h } : d));
    };
    const debounced = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, 150);
    };

    measure();
    const ro = new ResizeObserver(debounced);
    ro.observe(parent);
    window.addEventListener("resize", debounced);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener("resize", debounced);
    };
  }, []);

  // (Re)generate the tree when dimensions settle.
  useEffect(() => {
    if (dims.w && dims.h) setTree(buildTree(dims.w, dims.h, 1337));
  }, [dims.w, dims.h]);

  // Reveal top-to-bottom by growing a single clip rect as you scroll.
  useEffect(() => {
    if (!tree || !dims.h) return;
    const rect = clipRef.current;
    if (!rect) return;

    if (reduce.current) {
      rect.setAttribute("height", String(dims.h));
      return;
    }

    let raf = 0;
    let pending = false;
    const render = () => {
      pending = false;
      // Reveal a little below the fold so the tree "grows to meet" the reader.
      const front = Math.min(dims.h, window.scrollY + window.innerHeight * 0.95);
      rect.setAttribute("height", front.toFixed(0));
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [tree, dims.h]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 w-full overflow-hidden"
      style={{ height: dims.h || undefined }}
    >
      {tree && (
        <svg
          width={dims.w}
          height={dims.h}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          fill="none"
          className="absolute top-0 left-1/2 -translate-x-1/2"
        >
          <defs>
            <linearGradient id="bt-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={dims.h}>
              <stop offset="0%" stopColor="#00e5a0" />
              <stop offset="45%" stopColor="#2fd8a8" />
              <stop offset="100%" stopColor="#7c6dfa" />
            </linearGradient>
            <clipPath id="bt-grow">
              <rect ref={clipRef} x="0" y="0" width={dims.w} height="0" />
            </clipPath>
          </defs>

          <g clipPath="url(#bt-grow)">
            {/* soft glow pooling around the crown for depth */}
            <ellipse cx={dims.w / 2} cy={130} rx={dims.w * 0.32} ry={220} fill="url(#bt-grad)" opacity={0.05} />

            {/* branches + trunk + roots — kept subtle so body copy stays readable */}
            <g stroke="url(#bt-grad)" fill="none" strokeLinecap="round" opacity={0.26}>
              {tree.segs.map((s, i) => (
                <path key={i} d={s.d} strokeWidth={s.w} />
              ))}
            </g>

            {/* leaves */}
            <g fill="url(#bt-grad)" opacity={0.32}>
              {tree.leaves.map((l, i) => (
                <path key={i} d={LEAF_PATH} transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.r.toFixed(0)}) scale(${l.s.toFixed(2)})`} />
              ))}
            </g>
          </g>
        </svg>
      )}
    </div>
  );
}
