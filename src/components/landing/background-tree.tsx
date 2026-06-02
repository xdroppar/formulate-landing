"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * BackgroundTree — a full tree-and-root system that lives BEHIND the page
 * content and visibly BUILDS itself top-to-bottom as you scroll. A leafy crown
 * sits behind the hero, a trunk runs the length of the page sprouting a branch
 * at each section, and the whole thing splays into spreading roots at the
 * bottom. The metaphor: deep roots = a foundation that compounds — longevity.
 *
 * Motion: each branch is its own group that gently sways in the "wind" (pivoting
 * where it joins the trunk — the trunk itself stays put so nothing detaches),
 * and the leaves flutter on top of that. Build: each branch strokes itself on
 * and each leaf sprouts as the growth front passes it.
 *
 * Performance: generated once (deterministic); the build is driven by a single
 * scroll handler that activates only newly-passed elements; ~40 branch-sway
 * groups + capped leaf flutter. Low-opacity so body copy stays readable; fully
 * prefers-reduced-motion safe (revealed at once, no motion).
 */

type Seg = { gi: number; d: string; w: number; len: number; ry: number };
type Leaf = { li: number; x: number; y: number; s: number; r: number; w: boolean; dur: number; delay: number; ry: number };
type Flower = { fi: number; x: number; y: number; s: number; r: number; ry: number; dur: number; delay: number };
type Branch = { bx: number; by: number; flex: number; dur: number; phase: number; segs: Seg[]; leaves: Leaf[]; flowers: Flower[] };

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

function buildTree(W: number, H: number, seed: number): { branches: Branch[] } {
  const rng = mulberry32(seed);
  const branches: Branch[] = [];
  let cur!: Branch; // the branch currently being built into (set by mkBranch)
  let segGi = 0;
  let leafLi = 0;
  let flowerFi = 0;
  const cx = W * 0.5;

  // Start a new branch group. `flex` (deg) is its wind-sway amplitude; it pivots
  // at (bx, by) — its attachment point — so it swings without detaching.
  const mkBranch = (bx: number, by: number, flex: number) => {
    cur = { bx, by, flex, dur: 4.5 + rng() * 4, phase: rng() * 6, segs: [], leaves: [], flowers: [] };
    branches.push(cur);
  };
  const addSeg = (x1: number, y1: number, x2: number, y2: number, curve: number, w: number) => {
    cur.segs.push({
      gi: segGi++,
      d: seg(x1, y1, x2, y2, curve),
      w: Math.max(0.6, w),
      len: Math.hypot(x2 - x1, y2 - y1) * 1.2 + 4,
      ry: Math.min(y1, y2),
    });
  };
  const pushLeaf = (x: number, y: number, s: number, r: number) => {
    const windy = rng() < 0.35; // share that flutters individually — capped for perf
    cur.leaves.push({ li: leafLi++, x, y, s, r, w: windy, dur: windy ? 3.2 + rng() * 3.6 : 0, delay: windy ? rng() * 5 : 0, ry: y });
  };
  // A few blossoms on the outgoing limbs — sparse accents, not foliage.
  const pushFlower = (x: number, y: number, s: number, r: number) => {
    cur.flowers.push({ fi: flowerFi++, x, y, s, r, ry: y, dur: 4 + rng() * 3, delay: rng() * 4 });
  };

  // Recursive limb that forks and tapers. `density` (0..1) controls how leafy it
  // is — leaves drop ALONG the branch (not just at tips) so no span looks bare.
  const limb = (x: number, y: number, ang: number, len: number, wid: number, depth: number, density: number) => {
    const ex = x + Math.cos(ang) * len;
    const ey = y + Math.sin(ang) * len;
    addSeg(x, y, ex, ey, (rng() - 0.5) * len * 0.3, wid);

    if (density > 0 && len > 14 && rng() < density * 0.7) {
      const t = 0.4 + rng() * 0.55;
      pushLeaf(x + Math.cos(ang) * len * t, y + Math.sin(ang) * len * t, 0.5 + rng() * 0.55, rng() * 360);
    }

    if (depth <= 0 || len < 16) {
      if (density > 0) {
        pushLeaf(ex, ey, 0.6 + rng() * 0.55, ang / DEG + 90 + (rng() - 0.5) * 50);
        if (rng() < density) pushLeaf(ex, ey, 0.5 + rng() * 0.5, rng() * 360);
        if (rng() < 0.1) pushFlower(ex, ey, 0.7 + rng() * 0.5, rng() * 360); // an occasional bloom at a tip
      }
      return;
    }

    const spread = (16 + rng() * 22) * DEG;
    limb(ex, ey, ang - spread * (0.6 + rng() * 0.6), len * (0.68 + rng() * 0.14), wid * 0.68, depth - 1, density);
    limb(ex, ey, ang + spread * (0.6 + rng() * 0.6), len * (0.68 + rng() * 0.14), wid * 0.68, depth - 1, density);
    if (rng() < 0.35) limb(ex, ey, ang + (rng() - 0.5) * spread, len * 0.55, wid * 0.55, depth - 2, density);
  };

  const top = 64;
  const rootRoom = Math.min(H * 0.16, 1000);
  const trunkBottom = H - rootRoom;
  const trunkLen = Math.max(400, trunkBottom - top);

  const cbx = cx;
  const cby = top + 96; // the hub: crown grows UP from here, trunk grows DOWN — one point.

  // Trunk spine geometry (computed first; shared by branches + roots).
  const STEPS = Math.max(7, Math.floor(trunkLen / 240));
  const trunkPts: { x: number; y: number }[] = [];
  const swayBase = Math.sin(0.5);
  for (let i = 0; i <= STEPS; i++) {
    const y = cby + (trunkBottom - cby) * (i / STEPS);
    const x = cx + (Math.sin(i * 0.7 + 0.5) - swayBase) * (W * 0.045); // first point sits on the hub
    trunkPts.push({ x, y });
  }

  // Trunk branch — STATIC (flex 0): a long spine pivoting would fling its base.
  // Tapered like a real trunk: slim at the crown hub, thickening as it descends
  // toward the ground where it splays into roots. The round-capped segments blend
  // into a smooth taper. A trunk that GROUNDS reads far less like a "stick" than a
  // uniform-width line — without resorting to a margin-to-margin slab.
  const HUB_W = 13;
  const BASE_W = 27;
  mkBranch(cbx, cby, 0);
  addSeg(cbx, cby + 40, cbx, cby, 6, HUB_W - 1); // neck tapers up into the crown
  for (let i = 0; i < trunkPts.length - 1; i++) {
    const a = trunkPts[i];
    const b = trunkPts[i + 1];
    // ease-in widening so the bulk sits low (a buttressed base), not linear.
    const t = i / (trunkPts.length - 1);
    const w = HUB_W + (BASE_W - HUB_W) * (t * t * (3 - 2 * t)); // smoothstep 13 → 27
    addSeg(a.x, a.y, b.x, b.y, (rng() - 0.5) * 10, w);
  }

  // Crown: each main limb is its own swaying branch radiating from the hub.
  // Thicker at the base (to match the heavier trunk) and reaching a touch further
  // so the canopy spreads toward the margins rather than huddling over center.
  const mainN = 9;
  for (let i = 0; i < mainN; i++) {
    const f = i / (mainN - 1);
    const a = (-172 + f * 164) * DEG; // wide upward fan, up-left → up-right
    mkBranch(cbx, cby, 1.8 + rng() * 1.0);
    limb(cbx, cby, a, W * 0.105 * (0.85 + rng() * 0.5), 8, 4, 0.6);
  }
  for (let i = 0; i < 5; i++) {
    const a = (-150 + rng() * 120) * DEG;
    mkBranch(cbx, cby, 2.0 + rng() * 0.8);
    limb(cbx, cby, a, W * 0.06 * (0.7 + rng() * 0.5), 4, 4, 0.6);
  }

  // Loose canopy foliage — its own gently-drifting group (no branches, leaves only).
  mkBranch(cbx, cby - 36, 1.3);
  const canopyRx = W * 0.3;
  const canopyRy = 200;
  const scatterN = 120;
  for (let i = 0; i < scatterN; i++) {
    const ang = rng() * Math.PI * 2;
    const rad = Math.sqrt(rng());
    pushLeaf(cbx + Math.cos(ang) * canopyRx * rad, cby - 36 + Math.sin(ang) * canopyRy * rad, 0.55 + rng() * 0.65, rng() * 360);
  }

  // Side branches — each its own well-swaying group, pivoting at its trunk node.
  trunkPts.forEach((p, i) => {
    if (i < 1 || i >= trunkPts.length - 1 || i % 2 === 0) return;
    const side = i % 4 === 1 ? 1 : -1;
    const base = (side > 0 ? 38 : 142) * DEG + (rng() - 0.5) * 22 * DEG;
    const len = W * 0.12 * (0.7 + rng() * 0.7); // reach further toward the margins
    // thicker where it joins the (now heavier) trunk so it doesn't look pinned-on.
    mkBranch(p.x, p.y, 2.4 + rng() * 1.6); // the lower/mid branches the eye follows
    limb(p.x, p.y, base, len, 5, 3, 0.45);
  });

  // Roots — STATIC (flex 0): they're grounded, so they must not sway. They pivot
  // at the trunk base (their TOP), so even a tiny rotation would fling the buried
  // tips in an arc — reads as "roots flowing in the wind". Same reason the trunk
  // spine is flex 0.
  const trunkBase = trunkPts[trunkPts.length - 1];
  const rootN = 5 + Math.floor(rng() * 3);
  for (let k = 0; k < rootN; k++) {
    const a = (62 + (k / (rootN - 1)) * 56) * DEG; // 62°..118° downward fan
    mkBranch(trunkBase.x, trunkBase.y, 0);
    // thick where they leave the buttressed base (≈ BASE_W) so the trunk flows
    // into the roots instead of stepping down abruptly.
    limb(trunkBase.x + (rng() - 0.5) * 22, trunkBase.y, a, rootRoom * 0.44 * (0.8 + rng() * 0.6), 13, 5, 0);
  }

  return { branches };
}

const LEAF_PATH = "M0 0 C -7 -7 -7 -18 0 -26 C 7 -18 7 -7 0 0 Z";

export function BackgroundTree() {
  const rootRef = useRef<HTMLDivElement>(null);
  const segRefs = useRef<Array<SVGPathElement | null>>([]);
  const leafRefs = useRef<Array<SVGGElement | null>>([]);
  const flowerRefs = useRef<Array<SVGGElement | null>>([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [tree, setTree] = useState<{ branches: Branch[] } | null>(null);
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

  // Visibly BUILD as the growth front descends: each branch strokes itself on and
  // each leaf sprouts the moment the front reaches it (ordered by reveal-y, with a
  // small per-batch stagger). Grow-once: the front is a high-water mark.
  useEffect(() => {
    if (!tree || !dims.h) return;

    const segByRy: { i: number; ry: number }[] = [];
    const leafByRy: { i: number; ry: number }[] = [];
    const flowerByRy: { i: number; ry: number }[] = [];
    for (const b of tree.branches) {
      for (const s of b.segs) segByRy.push({ i: s.gi, ry: s.ry });
      for (const l of b.leaves) leafByRy.push({ i: l.li, ry: l.ry });
      for (const f of b.flowers) flowerByRy.push({ i: f.fi, ry: f.ry });
    }
    segByRy.sort((a, b) => a.ry - b.ry);
    leafByRy.sort((a, b) => a.ry - b.ry);
    flowerByRy.sort((a, b) => a.ry - b.ry);

    const growSeg = (gi: number) => {
      const el = segRefs.current[gi];
      if (el) el.style.strokeDashoffset = "0";
    };
    const growLeaf = (li: number) => {
      const el = leafRefs.current[li];
      if (el) el.classList.add("grown");
    };
    const growFlower = (fi: number) => {
      const el = flowerRefs.current[fi];
      if (el) el.classList.add("grown");
    };

    if (reduce.current) {
      segByRy.forEach((s) => growSeg(s.i));
      leafByRy.forEach((l) => growLeaf(l.i));
      flowerByRy.forEach((f) => growFlower(f.i));
      return;
    }

    // Activate only a bounded number of elements PER FRAME, then keep pumping on
    // subsequent frames until caught up to the front. This is what makes the crown
    // flourish smoothly — draining the whole crown's style writes + transition
    // starts in one frame is what caused the load-time hitch.
    let raf = 0;
    let pumping = false;
    let target = 0; // high-water front — only grows
    let segPtr = 0;
    let leafPtr = 0;
    let flowerPtr = 0;
    const PER_FRAME = 14; // of each type

    const pump = () => {
      raf = 0;
      let n = 0;
      while (n < PER_FRAME && segPtr < segByRy.length && segByRy[segPtr].ry <= target) {
        growSeg(segByRy[segPtr].i);
        segPtr++;
        n++;
      }
      let m = 0;
      while (m < PER_FRAME && leafPtr < leafByRy.length && leafByRy[leafPtr].ry <= target) {
        growLeaf(leafByRy[leafPtr].i);
        leafPtr++;
        m++;
      }
      let k = 0;
      while (k < PER_FRAME && flowerPtr < flowerByRy.length && flowerByRy[flowerPtr].ry <= target) {
        growFlower(flowerByRy[flowerPtr].i);
        flowerPtr++;
        k++;
      }
      const more =
        (segPtr < segByRy.length && segByRy[segPtr].ry <= target) ||
        (leafPtr < leafByRy.length && leafByRy[leafPtr].ry <= target) ||
        (flowerPtr < flowerByRy.length && flowerByRy[flowerPtr].ry <= target);
      if (more) raf = requestAnimationFrame(pump);
      else pumping = false;
    };
    const schedule = () => {
      if (!pumping) {
        pumping = true;
        raf = requestAnimationFrame(pump);
      }
    };
    const onScroll = () => {
      const front = Math.min(dims.h, window.scrollY + window.innerHeight * 0.92);
      if (front > target) {
        target = front;
        schedule();
      }
    };

    target = Math.min(dims.h, window.scrollY + window.innerHeight * 0.92);
    schedule();
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
          </defs>

          <style>{`
            .bt-seg { transition: stroke-dashoffset 0.7s ease; }
            .bt-sprout {
              transform-box: fill-box; transform-origin: 50% 100%;
              transform: scale(0);
              transition: transform 0.5s cubic-bezier(0.2, 1, 0.4, 1);
            }
            .bt-sprout.grown { transform: scale(1); }
            .bt-leaf { transform-box: fill-box; transform-origin: 50% 100%; }
            .bt-leaf.bt-sway { animation: bt-sway 5s ease-in-out infinite; }
            .bt-wind {
              transform-box: view-box;
              animation-name: bt-wind;
              animation-timing-function: ease-in-out;
              animation-iteration-count: infinite;
            }
            @keyframes bt-sway {
              0%, 100% { transform: rotate(-4deg); }
              50% { transform: rotate(4.5deg); }
            }
            @keyframes bt-wind {
              0%, 100% { transform: rotate(calc(var(--amp, 2deg) * -1)); }
              50% { transform: rotate(var(--amp, 2deg)); }
            }
            @media (prefers-reduced-motion: reduce) {
              .bt-leaf.bt-sway, .bt-wind { animation: none; }
              .bt-seg, .bt-sprout { transition: none; }
            }
            @media (max-width: 768px) {
              .bt-leaf.bt-sway, .bt-wind { animation: none; } /* save battery on phones */
            }
          `}</style>

          {/* soft glow pooling around the crown for depth */}
          <ellipse cx={dims.w / 2} cy={130} rx={dims.w * 0.32} ry={220} fill="url(#bt-grad)" opacity={0.05} />

          {tree.branches.map((b, bi) => {
            const windStyle: CSSProperties | undefined =
              b.flex > 0
                ? ({
                    transformOrigin: `${b.bx.toFixed(1)}px ${b.by.toFixed(1)}px`,
                    animationDuration: `${b.dur.toFixed(2)}s`,
                    animationDelay: `${(-b.phase).toFixed(2)}s`,
                    "--amp": `${b.flex.toFixed(2)}deg`,
                  } as CSSProperties)
                : undefined;
            return (
              <g key={bi} className={b.flex > 0 ? "bt-wind" : undefined} style={windStyle}>
                {/* branch + trunk + root strokes — each draws itself on when revealed */}
                <g stroke="url(#bt-grad)" fill="none" strokeLinecap="round" opacity={0.26}>
                  {b.segs.map((s) => (
                    <path
                      key={s.gi}
                      ref={(el) => { segRefs.current[s.gi] = el; }}
                      className="bt-seg"
                      d={s.d}
                      strokeWidth={s.w}
                      style={{ strokeDasharray: String(s.len), strokeDashoffset: String(s.len) }}
                    />
                  ))}
                </g>
                {/* leaves — sprout on reveal, then flutter (and ride the branch sway) */}
                {b.leaves.length > 0 && (
                  <g fill="url(#bt-grad)" opacity={0.34}>
                    {b.leaves.map((l) => (
                      <g key={l.li} transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.r.toFixed(0)}) scale(${l.s.toFixed(2)})`}>
                        <g ref={(el) => { leafRefs.current[l.li] = el; }} className="bt-sprout">
                          <path
                            d={LEAF_PATH}
                            className={l.w ? "bt-leaf bt-sway" : "bt-leaf"}
                            style={l.w ? { animationDuration: `${l.dur.toFixed(2)}s`, animationDelay: `${l.delay.toFixed(2)}s` } : undefined}
                          />
                        </g>
                      </g>
                    ))}
                  </g>
                )}
                {/* flowers — a few warm blossoms on the outgoing limbs; sprout on reveal, sway softly */}
                {b.flowers.length > 0 && (
                  <g opacity={0.55}>
                    {b.flowers.map((fl) => (
                      <g key={fl.fi} transform={`translate(${fl.x.toFixed(1)} ${fl.y.toFixed(1)}) rotate(${fl.r.toFixed(0)}) scale(${fl.s.toFixed(2)})`}>
                        <g ref={(el) => { flowerRefs.current[fl.fi] = el; }} className="bt-sprout">
                          <g
                            className="bt-leaf bt-sway"
                            style={{ animationDuration: `${fl.dur.toFixed(2)}s`, animationDelay: `${fl.delay.toFixed(2)}s` }}
                          >
                            {[0, 1, 2, 3, 4].map((p) => (
                              <ellipse key={p} cx={0} cy={-7} rx={3} ry={5.5} fill="#f7a8cf" transform={`rotate(${p * 72})`} />
                            ))}
                            <circle r={2.6} fill="#ffd36b" />
                          </g>
                        </g>
                      </g>
                    ))}
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
