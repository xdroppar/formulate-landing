"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export type ScoreItem = {
  slug: string;
  name: string;
  brand: string;
  score: number;
  color: string;
  /** Tier word from the app's own band table ("Elite" … "Building"). */
  word: string;
  /** The most decisive line from the product's score_components. */
  why: string;
  /** Product photo, resolved at build time by the page's cardImage(). */
  image: string;
};

const EXAMPLES = ["magnesium", "creatine", "vitamin d", "omega-3", "ashwagandha", "zinc"];

/**
 * Build a stack, on the landing page, before any account exists.
 *
 * This replaced a one-product score lookup, and before that a plain list of the
 * six top matches. Each step chased the same problem: the page PROMISED a
 * visitor something about their own routine and then handed them a fact about a
 * product. The claim one section below used to be "you build your whole stack
 * before you make an account" — demonstrated with a 53-second video. The page
 * was screening a film of an interaction it could simply offer.
 *
 * So it offers it. Add what you actually take; the page tells you where the weak
 * point is. The signup ask comes after that, as "keep this" — the first moment
 * an account is worth anything to the person reading.
 *
 * WHY THERE IS NO STACK SCORE HERE. The app's `supplementStackScore` is clean
 * pure logic, but it is 820 lines across four more modules, and copying it would
 * put scoring in a THIRD repo — the cross-repo drift this codebase calls its
 * number one trap. The weakest link needs none of it: it is a min() over data
 * already in the index, and it is the more useful answer anyway. Someone can act
 * on "this one is underdosed". Nobody can act on "your stack is 87".
 */
export function HeroStackBuilder({
  index,
  appUrl,
  emptyFooter,
}: {
  index: ScoreItem[];
  appUrl: string;
  /**
   * The hint line and the secondary CTAs, shown ONLY while the stack is empty.
   * Once someone has built a stack, "Build my free stack" is asking them to do
   * the thing they just did, and the hint still says "type a product name"
   * under a list of products. Five stacked calls to action was the busiest
   * thing on the page — the component owns that transition because only it
   * knows whether a stack exists.
   */
  emptyFooter?: React.ReactNode;
}) {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const [stack, setStack] = useState<ScoreItem[]>([]);

  const term = q.trim().toLowerCase();
  const chosen = useMemo(() => new Set(stack.map((p) => p.slug)), [stack]);

  /**
   * One row per actual choice.
   *
   * Searching "creatine" returned five rows of which four were Thorne: the
   * product, then Strawberry, then Travel Packs, then + Alpha GPC — 98, 98, 98,
   * 97. Flavour and format are not a decision anyone needs help with, and a
   * single brand owning the whole list reads like a paid placement on a page
   * whose main claim is that nobody pays for placement.
   *
   * The catalog cannot answer this itself: `variants` is populated on 8 of 315
   * products, so these ship as separate rows. Collapse on the name instead —
   * everything before a " - " is the same product wearing a different label,
   * while a "+" formula is genuinely different and survives. Then cap any one
   * brand at two, so the list shows the market rather than a supplier.
   */
  const results = useMemo(() => {
    if (!term) return [];
    const hits = index
      .filter((p) => !chosen.has(p.slug) && (p.name + " " + p.brand).toLowerCase().includes(term))
      .sort((a, b) => b.score - a.score);

    const bestPerProduct = new Map<string, ScoreItem>();
    for (const p of hits) {
      const base = p.name.split(" - ")[0].split(" – ")[0].trim().toLowerCase();
      const key = p.brand.toLowerCase() + "|" + base;
      if (!bestPerProduct.has(key)) bestPerProduct.set(key, p);
    }

    const perBrand = new Map<string, number>();
    const out: ScoreItem[] = [];
    for (const p of bestPerProduct.values()) {
      const n = perBrand.get(p.brand) ?? 0;
      if (n >= 2) continue;
      perBrand.set(p.brand, n + 1);
      out.push(p);
      if (out.length >= 5) break;
    }
    return out;
  }, [term, index, chosen]);

  const weakest = useMemo(() => {
    if (stack.length < 2) return null;
    return [...stack].sort((a, b) => a.score - b.score)[0];
  }, [stack]);

  const lo = stack.length ? Math.min(...stack.map((p) => p.score)) : 0;
  const hi = stack.length ? Math.max(...stack.map((p) => p.score)) : 0;

  function add(p: ScoreItem) {
    setStack((s) => (s.some((x) => x.slug === p.slug) ? s : [...s, p]));
    setQ("");
    trackEvent("hero_stack_add", { slug: p.slug, size: stack.length + 1 });
  }

  return (
    <div className="max-w-[680px] mx-auto">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => window.setTimeout(() => setFocused(false), 140)}
        placeholder={stack.length ? "Add another…" : "Type something you take — magnesium, creatine, vitamin D…"}
        aria-label="Search a supplement to add to your stack"
        className="w-full px-5 py-4 rounded-xl bg-surface border border-border text-text text-[15px] placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
      />

      {/* Clicking the box used to do nothing at all until a key was pressed —
          an empty field with no affordance and no hint of what lives behind it.
          Focus now opens the same starting points the chips offer, as a real
          menu, so the first click is already progress. */}
      {focused && !term && (
        <div className="mt-2 rounded-xl border border-border bg-surface overflow-hidden divide-y divide-border text-left">
          <div className="px-4 py-2 fm-eyebrow">Common searches</div>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setQ(ex)}
              className="w-full px-4 py-2.5 text-left text-[14px] text-text hover:bg-surface2 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {!focused && !term && stack.length === 0 && (
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setQ(ex)}
              className="px-3 py-1.5 rounded-full bg-surface border border-border text-xs font-medium text-muted hover:border-accent hover:text-accent transition-all"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {term && (
        <div className="mt-2 rounded-xl border border-border bg-surface overflow-hidden divide-y divide-border text-left">
          {results.length === 0 ? (
            <div className="px-5 py-4 text-[13px] text-muted">
              Nothing matching &ldquo;{q}&rdquo; yet — the catalog is still growing.
            </div>
          ) : (
            results.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => add(p)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface2 transition-colors"
              >
                <span className="w-11 h-11 rounded-lg bg-[#e9ece8] grid place-items-center overflow-hidden flex-shrink-0">
                  {p.image ? (
                    <Image src={p.image} alt="" width={44} height={44} className="object-contain max-h-[38px] w-auto" />
                  ) : (
                    <span className="text-[13px] font-bold" style={{ color: p.color }}>{p.score}</span>
                  )}
                </span>
                <span
                  className="text-[13px] font-bold tabular-nums w-7 flex-shrink-0"
                  style={{ color: p.color }}
                >
                  {p.score}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold text-text truncate">{p.name}</span>
                  <span className="block text-[12px] text-muted truncate">{p.brand}</span>
                </span>
                <span className="text-[12px] font-semibold text-accent flex-shrink-0">Add +</span>
              </button>
            ))
          )}
        </div>
      )}

      {stack.length > 0 && (
        <div className="mt-4 text-left">
          <div className="fm-eyebrow mb-2">
            Your stack · {stack.length} {stack.length === 1 ? "product" : "products"}
            {stack.length > 1 ? ` · ${lo}–${hi}` : ""}
          </div>

          <div className="fm-panel divide-y divide-border overflow-hidden">
            {stack.map((p) => (
              <div key={p.slug} className="flex items-center gap-3 px-4 py-3">
                <span className="w-10 h-10 rounded-lg bg-[#e9ece8] grid place-items-center overflow-hidden flex-shrink-0">
                  {p.image ? (
                    <Image src={p.image} alt="" width={40} height={40} className="object-contain max-h-[34px] w-auto" />
                  ) : null}
                </span>
                <span className="fm-figure text-[19px]" style={{ color: p.color }}>
                  {p.score}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold text-text truncate">{p.name}</span>
                  <span className="block text-[12px] text-muted truncate">{p.brand}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setStack((s) => s.filter((x) => x.slug !== p.slug))}
                  aria-label={`Remove ${p.name}`}
                  className="text-muted hover:text-danger transition-colors text-[16px] leading-none px-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {weakest ? (
            <div className="mt-3 fm-panel p-5" style={{ borderColor: `${weakest.color}55` }}>
              <div className="fm-eyebrow mb-3">The weak point in your stack</div>
              {weakest.image ? (
                <span className="inline-grid place-items-center w-14 h-14 rounded-lg bg-[#e9ece8] overflow-hidden mb-3">
                  <Image src={weakest.image} alt="" width={56} height={56} className="object-contain max-h-[48px] w-auto" />
                </span>
              ) : null}
              <div className="flex items-baseline gap-2.5 mb-1.5">
                <span className="fm-figure" style={{ color: weakest.color }}>
                  {weakest.score}
                </span>
                <span className="text-[13px] font-semibold" style={{ color: weakest.color }}>
                  {weakest.word}
                </span>
              </div>
              <div className="text-[14px] font-semibold text-text">{weakest.name}</div>
              <div className="text-[12px] text-muted mb-3">{weakest.brand}</div>
              <div className="text-[13px] text-muted leading-relaxed border-t border-border pt-3">
                {weakest.why}
              </div>
            </div>
          ) : (
            <p className="mt-3 text-[13px] text-muted/80">
              Add one more and we&rsquo;ll show you the weak point.
            </p>
          )}

          <a
            href={`${appUrl}/start?utm_source=landing&utm_medium=hero_stack`}
            onClick={() => trackEvent("web_app_cta_click", { source: "hero_stack_save", size: stack.length })}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold bg-accent text-bg hover:brightness-110 transition-all"
          >
            Keep this stack — free, no card
          </a>
        </div>
      )}

      {stack.length === 0 && emptyFooter}
    </div>
  );
}
