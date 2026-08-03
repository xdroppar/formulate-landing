import type { Metadata } from "next";
import Link from "next/link";
import {
  brandComparisons,
  brandComparisonSlug,
} from "@/lib/brand-comparisons";
import { brandBySlug, scoreGrade } from "@/lib/products";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: `Supplement Brand Comparisons`,
  description: `Head-to-head comparisons of premium supplement brands — Thorne, Momentous, Nootropics Depot, Transparent Labs and more. Brand grades, when to pick each, and the verdict.`,
  alternates: { canonical: `${BASE}/brand-compare` },
  openGraph: {
    title: `Supplement Brand Comparisons`,
    description: `Head-to-head comparisons of premium supplement brands, scored on quality, dose accuracy, and third-party testing.`,
    type: "website",
    url: `${BASE}/brand-compare`,
  },
};

export default function BrandCompareIndex() {
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Supplement Brand Comparisons",
    description:
      "Head-to-head comparisons of premium supplement brands, scored on quality, dose accuracy, and third-party testing.",
    url: `${BASE}/brand-compare`,
    numberOfItems: brandComparisons.length,
  };

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
          Supplement Brand Comparisons
        </h1>
        <p className="text-base text-muted leading-relaxed">
          How the premium supplement brands actually stack up against each
          other. Each comparison uses Formulate&apos;s brand grades — aggregated
          from every product&apos;s ingredient quality, dose accuracy,
          transparency, and third-party testing — plus editorial guidance on
          when to pick one brand over the other. No brand pays to rank.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {brandComparisons.map((c) => {
          const a = brandBySlug(c.a);
          const b = brandBySlug(c.b);
          if (!a || !b) return null;
          const href = `/brand-compare/${brandComparisonSlug(c)}`;
          const gA = scoreGrade(a.score);
          const gB = scoreGrade(b.score);
          return (
            <Link
              key={brandComparisonSlug(c)}
              href={href}
              className="rounded-xl border border-border bg-white/[0.02] p-5 hover:border-accent/40 transition-colors"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-2">
                {c.tags[0] ?? "Brand Comparison"}
              </p>
              <h2 className="text-lg font-bold text-text mb-2">
                {a.name} <span className="text-muted font-normal">vs</span>{" "}
                {b.name}
              </h2>
              <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-3">
                {c.bottom_line}
              </p>
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider">
                <span
                  className="px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: `${gA.color}1a`, color: gA.color }}
                >
                  {a.grade ?? gA.letter} · {a.name.split(" ")[0]}
                </span>
                <span
                  className="px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: `${gB.color}1a`, color: gB.color }}
                >
                  {b.grade ?? gB.letter} · {b.name.split(" ")[0]}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        Comparing ingredients rather than brands? See{" "}
        <Link href="/compare" className="text-accent hover:underline">
          supplement comparisons
        </Link>
        . For every brand we grade, browse the{" "}
        <Link href="/brands" className="text-accent hover:underline">
          brand directory
        </Link>
        .
      </p>
    </main>
  );
}
