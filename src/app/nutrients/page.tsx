import type { Metadata } from "next";
import Link from "next/link";
import {
  CORE_NUTRIENTS,
  CATEGORY_META,
  nutrientsByCategory,
  formatTarget,
} from "@/lib/nutrients";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: `Nutrients Reference — ${CORE_NUTRIENTS.length} Vitamins, Minerals & Amino Acids — Formulate`,
  description: `Daily targets, upper limits, best forms, and supplements for ${CORE_NUTRIENTS.length} commonly tracked nutrients — vitamins, minerals, amino acids.`,
  alternates: { canonical: `${BASE}/nutrients` },
  openGraph: {
    title: `Nutrients Reference — ${CORE_NUTRIENTS.length} Vitamins, Minerals & Amino Acids`,
    description: `Daily targets, upper limits, best forms, and supplements for ${CORE_NUTRIENTS.length} commonly tracked nutrients.`,
    type: "website",
    url: `${BASE}/nutrients`,
  },
};

export default function NutrientsIndex() {
  const groups = nutrientsByCategory();

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nutrients Reference",
    description: `Daily targets, upper limits, and best forms for ${CORE_NUTRIENTS.length} commonly tracked nutrients.`,
    url: `${BASE}/nutrients`,
    numberOfItems: CORE_NUTRIENTS.length,
  };

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
          Nutrients
        </h1>
        <p className="text-base text-muted leading-relaxed">
          Daily targets, upper limits, best forms, and matching supplements for{" "}
          {CORE_NUTRIENTS.length} commonly tracked nutrients. Targets reflect
          FDA Daily Values, Adequate Intakes, or — for amino acids and a few
          conditional nutrients — practitioner-consensus dose ranges (clearly
          labeled).
        </p>
      </header>

      <section className="mb-10 grid grid-cols-2 md:grid-cols-3 gap-3">
        {groups.map(({ category, items }) => {
          const meta = CATEGORY_META[category];
          return (
            <div
              key={category}
              className="rounded-xl border border-border bg-white/[0.02] px-4 py-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {meta.label}
                </span>
              </div>
              <div className="text-2xl font-bold text-text">{items.length}</div>
              <div className="text-xs text-muted mt-0.5">
                {items.length === 1 ? "nutrient" : "nutrients"}
              </div>
            </div>
          );
        })}
      </section>

      {groups.map(({ category, items }) => {
        const meta = CATEGORY_META[category];
        return (
          <section key={category} className="mb-10">
            <div className="flex items-baseline justify-between mb-3">
              <h2
                className="text-xl font-bold text-text flex items-center gap-2"
              >
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                {meta.label}
              </h2>
              <span className="text-xs text-muted">
                {items.length} {items.length === 1 ? "entry" : "entries"}
              </span>
            </div>
            <ul className="divide-y divide-border border border-border rounded-xl overflow-hidden">
              {items.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/nutrients/${n.slug}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-text truncate">
                        {n.name}
                      </div>
                      <div className="text-xs text-muted line-clamp-1 mt-0.5">
                        {n.role}
                      </div>
                    </div>
                    <div className="text-xs text-muted tabular-nums flex-shrink-0">
                      {formatTarget(n)}
                    </div>
                    <div
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 bg-white/[0.04] text-muted"
                      title={
                        n.reference_type === "DV"
                          ? "FDA Daily Value"
                          : n.reference_type === "AI"
                            ? "Adequate Intake"
                            : "Target Range"
                      }
                    >
                      {n.reference_type}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Reference labels.</strong> <em>DV</em> =
        FDA Daily Value (the standard label term, derived from RDA/AI). <em>AI</em>{" "}
        = Adequate Intake (used when no RDA exists). <em>TR</em> = Target Range
        — our suggested target for nutrients without a formal DV (e.g. omega-3,
        creatine, most amino acids), based on common practitioner consensus.
      </p>
    </main>
  );
}
