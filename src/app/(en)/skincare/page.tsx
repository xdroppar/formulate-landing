import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { listThumb } from "@/lib/thumbs";
import { skinProducts, skinTypes, skinBrands, SAFETY_FLOOR, SAFETY_SEVERITY, APP_SKIN_URL } from "@/lib/skincare";
import { withUtm } from "@/lib/app-url";
import { ScoreMeter } from "@/components/score-meter";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: `Skincare Scored by Ingredients: ${skinProducts.length} Products Ranked`,
  description: `${skinProducts.length} serums, moisturizers, sunscreens and more, scored on their actives and checked for irritants, fragrance and allergens. Ranked by type and by brand.`,
  alternates: { canonical: `${BASE}/skincare` },
};

/** Components and their maxima, read from a real breakdown rather than typed. */
const COMPONENTS = skinProducts[0].breakdown.efficacy.components.map((c) => ({ label: c.label, max: c.max }));

export default function SkincareHub() {
  const fragranceFree = skinProducts.filter((p) => !p.flags.fragrance_present).length;
  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <header className="mb-10">
        <p className="fm-eyebrow text-accent mb-3">Skincare</p>
        <h1 className="fm-display text-[clamp(26px,3.5vw,var(--text-h-argument))] text-text mb-4">
          {skinProducts.length} skincare products, scored on what is in them
        </h1>
        <p className="text-base text-muted leading-relaxed">
          Every product is scored out of 100 from its own ingredient list: which actives it uses, whether the
          label says how much, and how much research stands behind them. {fragranceFree} of{" "}
          {skinProducts.length} contain no synthetic fragrance.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-4">Best by type</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {skinTypes.map((t) => {
            const top = t.products[0];
            return (
              <Link
                key={t.slug}
                href={`/skincare/best/${t.slug}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.02] p-4 hover:border-accent/40 transition-colors"
              >
                {top.image_url ? (
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={listThumb(top.image_url)} alt="" fill sizes="48px" className="object-contain p-1" />
                  </div>
                ) : null}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-text">Best {t.plural}</div>
                  <div className="text-xs text-muted truncate">
                    {t.products.length} scored · top: {top.name}
                  </div>
                </div>
                <ScoreMeter score={top.score} size={40} strokeWidth={4} color={top.grade_color} />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-4">Brands</h2>
        <div className="flex flex-wrap gap-2">
          {skinBrands.map((b) => (
            <Link
              key={b.slug}
              href={`/skincare/brands/${b.slug}`}
              className="inline-flex items-center rounded-full border border-border bg-white/[0.02] px-3 py-1.5 text-sm text-text hover:border-accent/40 transition-colors"
            >
              {b.name} <span className="ml-1.5 text-muted">{b.products.length}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card/30 p-6 mb-10">
        <h2 className="fm-eyebrow mb-3">How a skincare score is built</h2>
        <p className="text-sm text-text leading-relaxed mb-3">
          The score is the formula&apos;s efficacy out of 100:
        </p>
        <ul className="text-sm text-muted leading-relaxed mb-3 space-y-1">
          {COMPONENTS.map((c) => (
            <li key={c.label}>
              <span className="text-text">{c.label}</span> — up to {c.max} points
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted leading-relaxed">
          Safety is checked separately: irritants, synthetic fragrance, EU-listed allergens, endocrine concerns,
          pore-clogging ingredients and conflicting actives. A product that clears {SAFETY_FLOOR} on safety loses
          nothing; below it, every point costs {SAFETY_SEVERITY} of a point. See every product in the{" "}
          <a
            href={withUtm(APP_SKIN_URL, { source: "landing", campaign: "skincare_hub" })}
            className="text-accent hover:underline"
          >
            Formulate app
          </a>
          .
        </p>
      </section>

      <p className="text-xs text-muted leading-relaxed">
        <strong className="text-text">Educational only.</strong> Scores rate a product&apos;s formula, not how it
        will suit your skin. Some links are affiliate links; they never affect a score.
      </p>
    </main>
  );
}
