"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GrowingVine — a scroll-driven "living vine" that grows down the left gutter
 * of the landing page, sprouting brand-green leaves as it passes and trailing a
 * glowing growth-bud at its tip. The metaphor: as you go deeper into Formulate,
 * life grows — longevity made literal with the brand leaf.
 *
 * Implementation notes:
 *  - Fixed full-height overlay (survives every section's background band).
 *  - The vine's drawn length is mapped to total page-scroll progress, so it
 *    "grows" as you read. Leaves open with an eased spring as the growth front
 *    passes them; the bud glows at the front.
 *  - All per-frame work is done imperatively via refs (no React re-render in the
 *    scroll loop) and behind a single rAF, so it's cheap.
 *  - Desktop-only (`min-[1336px]`) where there's real gutter beside the centered
 *    1100px content; respects prefers-reduced-motion (snaps to grown state).
 */

const LEAF_COUNT = 13;
const W = 88; // gutter width (px)
const CX = 46; // vine centre-x
const AMP = 20; // wave amplitude
const TOP_PAD = 104; // start below the fixed nav
const BOT_PAD = 56;
const WAVES = 3.2; // sine cycles over the viewport height
const OPEN_WINDOW = 0.035; // how much scroll-progress a leaf takes to unfurl

const LEAF_FRACTIONS = Array.from({ length: LEAF_COUNT }, (_, i) =>
  // spread leaves from 7% → 95% of the vine
  0.07 + (i / (LEAF_COUNT - 1)) * 0.88
);

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

export function GrowingVine() {
  const [h, setH] = useState(0);
  const trackRef = useRef<SVGPathElement>(null);
  const litRef = useRef<SVGPathElement>(null);
  const budRef = useRef<SVGGElement>(null);
  const bloomRef = useRef<SVGGElement>(null);
  const bloomInnerRef = useRef<SVGGElement>(null);
  const leafOuter = useRef<Array<SVGGElement | null>>([]);
  const leafInner = useRef<Array<SVGGElement | null>>([]);
  const reduce = useRef(false);

  // Measure viewport height (the overlay is fixed, so geometry depends on it).
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const measure = () => setH(window.innerHeight);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Build the path + leaf placements, then drive everything from scroll.
  useEffect(() => {
    if (!h) return;
    const track = trackRef.current;
    const lit = litRef.current;
    if (!track || !lit) return;

    const top = TOP_PAD;
    const bot = h - BOT_PAD;
    const span = Math.max(1, bot - top);

    // Sine wave running straight down the gutter.
    let d = "";
    const STEP = 6;
    for (let y = top; y <= bot; y += STEP) {
      const x = CX + AMP * Math.sin(((y - top) / span) * Math.PI * 2 * WAVES);
      d += (y === top ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
    }
    track.setAttribute("d", d);
    lit.setAttribute("d", d);

    const len = lit.getTotalLength();
    lit.style.strokeDasharray = String(len);

    // The bloom sits at the very end of the vine — the flourish at journey's end.
    const endPt = lit.getPointAtLength(len);
    if (bloomRef.current) {
      bloomRef.current.setAttribute("transform", `translate(${endPt.x.toFixed(2)} ${endPt.y.toFixed(2)})`);
    }

    // Anchor each leaf on the vine, leaning outward + upward, sides alternating.
    LEAF_FRACTIONS.forEach((p, i) => {
      const outer = leafOuter.current[i];
      if (!outer) return;
      const pt = lit.getPointAtLength(len * p);
      const side = i % 2 === 0 ? 1 : -1;
      const wobble = ((i * 37) % 16) - 8; // deterministic -8..7
      const angle = side > 0 ? 40 + wobble : -40 + wobble;
      const scale = 0.78 + ((i * 53) % 22) / 100; // 0.78..0.99, organic variety
      outer.setAttribute(
        "transform",
        `translate(${pt.x.toFixed(2)} ${pt.y.toFixed(2)}) rotate(${angle}) scale(${scale.toFixed(2)})`
      );
    });

    // Reduced motion: present the fully-grown vine, no scroll work.
    if (reduce.current) {
      lit.style.strokeDashoffset = "0";
      leafInner.current.forEach((g) => {
        if (g) {
          g.setAttribute("transform", "scale(1)");
          g.setAttribute("opacity", "1");
        }
      });
      if (budRef.current) budRef.current.setAttribute("opacity", "0");
      if (bloomInnerRef.current) {
        bloomInnerRef.current.setAttribute("opacity", "1");
        bloomInnerRef.current.setAttribute("transform", "scale(1)");
      }
      return;
    }

    let raf = 0;
    let pending = false;
    const render = () => {
      pending = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const prog = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const grown = Math.max(0.05, prog); // a small sprout is visible from the top

      lit.style.strokeDashoffset = String(len * (1 - grown));

      // Bloom unfurls over the last stretch; the bud fades out as it takes over.
      const bloomT = easeOutCubic(Math.min(1, Math.max(0, (grown - 0.92) / 0.08)));

      if (budRef.current) {
        const bp = lit.getPointAtLength(len * grown);
        budRef.current.setAttribute("transform", `translate(${bp.x.toFixed(2)} ${bp.y.toFixed(2)})`);
        budRef.current.setAttribute("opacity", (1 - bloomT).toFixed(3));
      }

      if (bloomInnerRef.current) {
        bloomInnerRef.current.setAttribute("transform", `scale(${(0.2 + 0.8 * bloomT).toFixed(3)})`);
        bloomInnerRef.current.setAttribute("opacity", bloomT.toFixed(3));
      }

      LEAF_FRACTIONS.forEach((p, i) => {
        const inner = leafInner.current[i];
        if (!inner) return;
        const t = Math.min(1, Math.max(0, (grown - p) / OPEN_WINDOW));
        const e = easeOutCubic(t);
        inner.setAttribute("transform", `scale(${(0.15 + 0.85 * e).toFixed(3)})`);
        inner.setAttribute("opacity", e.toFixed(3));
      });
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
  }, [h]);

  return (
    <div
      aria-hidden
      className="hidden min-[1336px]:block pointer-events-none fixed top-0 left-0 z-40 h-screen"
      style={{ width: W }}
    >
      <svg
        width={W}
        height={h || "100%"}
        viewBox={`0 0 ${W} ${h || 1000}`}
        fill="none"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="fv-vine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00e5a0" />
            <stop offset="55%" stopColor="#2fe0a8" />
            <stop offset="100%" stopColor="#7c6dfa" />
          </linearGradient>
          <radialGradient id="fv-bud">
            <stop offset="0%" stopColor="#00e5a0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00e5a0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* faint ghost of where the vine will grow */}
        <path ref={trackRef} stroke="rgba(255,255,255,0.05)" strokeWidth={2} strokeLinecap="round" />

        {/* the grown vine, revealed by scroll */}
        <path
          ref={litRef}
          stroke="url(#fv-vine)"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 5px rgba(0,229,160,0.45))" }}
        />

        {/* leaves — unfurl as the growth front passes */}
        {LEAF_FRACTIONS.map((_, i) => (
          <g key={i} ref={(el) => { leafOuter.current[i] = el; }}>
            <g
              ref={(el) => { leafInner.current[i] = el; }}
              opacity={0}
              transform="scale(0.15)"
            >
              <path
                d="M0 0 C -7 -7 -7 -18 0 -26 C 7 -18 7 -7 0 0 Z"
                fill="url(#fv-vine)"
                style={{ filter: "drop-shadow(0 0 3px rgba(0,229,160,0.4))" }}
              />
              <path d="M0 -3 L0 -22" stroke="#05130d" strokeWidth={0.9} strokeOpacity={0.4} strokeLinecap="round" />
            </g>
          </g>
        ))}

        {/* glowing growth-bud at the tip */}
        <g ref={budRef} opacity={0}>
          <circle r={14} fill="url(#fv-bud)">
            <animate attributeName="r" values="11;16;11" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle r={3.4} fill="#00e5a0" style={{ filter: "drop-shadow(0 0 5px rgba(0,229,160,0.9))" }} />
        </g>

        {/* bloom — the flourish at the vine's end (translate set in JS) */}
        <g ref={bloomRef}>
          <g ref={bloomInnerRef} opacity={0} transform="scale(0.2)">
            <circle r={24} fill="url(#fv-bud)">
              <animate attributeName="r" values="20;28;20" dur="3s" repeatCount="indefinite" />
            </circle>
            {[-78, -40, 0, 40, 78].map((a, i) => (
              <g key={a} transform={`rotate(${a}) scale(${(0.72 + (i % 2) * 0.16).toFixed(2)})`}>
                <path
                  d="M0 0 C -7 -7 -7 -18 0 -26 C 7 -18 7 -7 0 0 Z"
                  fill="url(#fv-vine)"
                  style={{ filter: "drop-shadow(0 0 3px rgba(0,229,160,0.45))" }}
                />
                <path d="M0 -3 L0 -22" stroke="#05130d" strokeWidth={0.9} strokeOpacity={0.4} strokeLinecap="round" />
              </g>
            ))}
            <circle r={3.2} fill="#00e5a0" style={{ filter: "drop-shadow(0 0 6px rgba(0,229,160,0.95))" }} />
          </g>
        </g>
      </svg>
    </div>
  );
}
