import type { Metadata } from "next";
import Link from "next/link";
import { conditions } from "@/lib/conditions";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: `Supplements for Specific Conditions — Evidence-Based — Formulate`,
  description: `Supplement support for common conditions — anxiety, insomnia, joint pain, fatigue, focus, acid reflux, migraines, PCOS. Evidence-rated picks with doses and when to see a clinician.`,
  alternates: { canonical: `${BASE}/conditions` },
  openGraph: {
    title: `Supplements for Specific Conditions — Evidence-Based`,
    description: `Supplement support for common conditions with evidence grades, doses, and red flags.`,
    type: "website",
    url: `${BASE}/conditions`,
  },
};

export default function ConditionsIndex() {
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Supplements by Condition",
    description: "Evidence-rated supplement support for common conditions.",
    url: `${BASE}/conditions`,
    numberOfItems: conditions.length,
  };

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
          Supplements by Condition
        </h1>
        <p className="text-base text-muted leading-relaxed">
          If you have a specific condition, this is where to start. Every
          entry below covers the supplements with actual RCT evidence for
          that condition — not the marketing-first lists. Each includes
          dose, evidence tier, lifestyle context, and clear red-flag
          guidance on when to see a clinician instead.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {conditions.map((c) => {
          const strong = c.supplements.filter((s) => s.tier === "strong").length;
          return (
            <Link
              key={c.slug}
              href={`/conditions/${c.slug}`}
              className="rounded-xl border border-border bg-white/[0.02] p-5 hover:border-accent/40 transition-colors"
            >
              <h2 className="text-lg font-bold text-text mb-2">{c.name}</h2>
              <p className="text-sm text-muted leading-relaxed mb-3 line-clamp-3">
                {c.tagline}
              </p>
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
                <span>
                  <span className="text-accent font-bold">{strong}</span>{" "}
                  strong-evidence
                </span>
                <span>
                  <span className="text-text font-bold">{c.supplements.length}</span>{" "}
                  total picks
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Educational only.</strong> Condition
        pages are not medical advice and don&apos;t replace clinical
        evaluation. For severe or persistent symptoms, see a qualified
        healthcare provider — supplements are adjuncts, not substitutes.
      </p>
    </main>
  );
}
