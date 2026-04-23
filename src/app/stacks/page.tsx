import type { Metadata } from "next";
import Link from "next/link";
import { stacks } from "@/lib/stacks";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: `Supplement Stacks for Specific Goals — Formulate`,
  description: `Curated goal-based supplement stacks: sleep, cognition, immunity, longevity, recovery, and metabolic health. Each with evidence-backed ingredients, doses, and interaction warnings.`,
  alternates: { canonical: `${BASE}/stacks` },
  openGraph: {
    title: `Supplement Stacks for Specific Goals`,
    description: `Curated goal-based supplement stacks with doses, evidence, and interaction warnings.`,
    type: "website",
    url: `${BASE}/stacks`,
  },
};

export default function StacksIndex() {
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Supplement Stacks for Specific Goals",
    description: "Curated goal-based supplement stacks with evidence-backed ingredients.",
    url: `${BASE}/stacks`,
    numberOfItems: stacks.length,
  };

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
          Supplement Stacks
        </h1>
        <p className="text-base text-muted leading-relaxed">
          Goal-based combinations of supplements that work together — picked
          from Formulate&apos;s ingredient encyclopedia by evidence grade,
          mechanism, and known safety. Each stack includes doses, timing,
          and any interaction warnings you need to know about.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stacks.map((s) => {
          const tierCounts = {
            core: s.ingredients.filter((i) => i.tier === "core").length,
            supporting: s.ingredients.filter((i) => i.tier === "supporting").length,
            optional: s.ingredients.filter((i) => i.tier === "optional").length,
          };
          return (
            <Link
              key={s.slug}
              href={`/stacks/${s.slug}`}
              className="rounded-xl border border-border bg-white/[0.02] p-5 hover:border-accent/40 transition-colors"
            >
              <h2 className="text-lg font-bold text-text mb-2">{s.name}</h2>
              <p className="text-sm text-muted leading-relaxed mb-3 line-clamp-3">
                {s.tagline}
              </p>
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
                <span>
                  <span className="text-accent font-bold">{tierCounts.core}</span>{" "}
                  core
                </span>
                {tierCounts.supporting > 0 && (
                  <span>
                    <span className="text-text font-bold">{tierCounts.supporting}</span>{" "}
                    supporting
                  </span>
                )}
                {tierCounts.optional > 0 && (
                  <span>
                    <span className="text-muted font-bold">{tierCounts.optional}</span>{" "}
                    optional
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        Every ingredient in every stack links to a full evidence-graded
        profile in the{" "}
        <Link href="/ingredients" className="text-accent hover:underline">
          ingredients encyclopedia
        </Link>
        . Before combining any stack with prescription medication, run it
        through the{" "}
        <Link href="/interactions" className="text-accent hover:underline">
          interaction checker
        </Link>
        .
      </p>
    </main>
  );
}
