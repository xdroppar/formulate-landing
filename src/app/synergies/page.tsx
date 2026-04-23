import type { Metadata } from "next";
import Link from "next/link";
import { synergies, synergySlug } from "@/lib/synergies";
import { ingredientBySlug } from "@/lib/encyclopedia";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: `Supplement Synergies: Evidence-Backed Pairings — Formulate`,
  description: `Supplements that work better together — evidence-backed synergies with mechanism, dose, and watch-outs. Vitamin D + K2, iron + vitamin C, turmeric + piperine, and more.`,
  alternates: { canonical: `${BASE}/synergies` },
  openGraph: {
    title: `Supplement Synergies: Evidence-Backed Pairings`,
    description: `The inverse of interaction warnings — supplement pairs that amplify each other.`,
    type: "website",
    url: `${BASE}/synergies`,
  },
};

export default function SynergiesIndex() {
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Supplement Synergies",
    description: "Evidence-backed supplement pairings that amplify each other.",
    url: `${BASE}/synergies`,
    numberOfItems: synergies.length,
  };

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
          Supplement Synergies
        </h1>
        <p className="text-base text-muted leading-relaxed">
          The inverse of interaction warnings. These are supplement
          combinations that amplify each other: precursor + cofactor pairs,
          bioavailability boosters, non-overlapping mechanism pairs, and the
          partitioning pairs that make single-supplement regimens incomplete.
          Each entry covers the why, the dose protocol, and watch-outs.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {synergies.map((s) => {
          const a = ingredientBySlug(s.a);
          const b = ingredientBySlug(s.b);
          if (!a || !b) return null;
          return (
            <Link
              key={synergySlug(s)}
              href={`/synergies/${synergySlug(s)}`}
              className="rounded-xl border border-border bg-white/[0.02] p-5 hover:border-accent/40 transition-colors"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-2">
                {s.topic}
              </p>
              <h2 className="text-lg font-bold text-text mb-2">
                {a.name}{" "}
                <span className="text-muted font-normal text-sm">+</span>{" "}
                {b.name}
              </h2>
              <p className="text-sm text-muted leading-relaxed line-clamp-2">
                {s.bottom_line}
              </p>
            </Link>
          );
        })}
      </div>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        Looking for warnings instead of beneficial pairings? See the{" "}
        <Link href="/interactions" className="text-accent hover:underline">
          interaction checker
        </Link>
        . For goal-based combinations, see{" "}
        <Link href="/stacks" className="text-accent hover:underline">
          supplement stacks
        </Link>
        .
      </p>
    </main>
  );
}
