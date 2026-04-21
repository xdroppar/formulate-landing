import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products, scoreGrade, type Product } from "@/lib/products";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: "Supplement Reviews & Scores — Formulate",
  description: `Ingredient-level scores for ${products.length}+ supplements. Every product graded on dose accuracy, form, transparency, and third-party testing.`,
  alternates: { canonical: `${BASE}/supplements` },
  openGraph: {
    title: "Supplement Reviews & Scores — Formulate",
    description: `Ingredient-level scores for ${products.length}+ supplements.`,
    type: "website",
    url: `${BASE}/supplements`,
  },
};

function byCategory(list: Product[]): Record<string, Product[]> {
  const map: Record<string, Product[]> = {};
  for (const p of list) {
    const key = p.category || "Other";
    (map[key] ??= []).push(p);
  }
  for (const k of Object.keys(map)) {
    map[k].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  }
  return map;
}

export default function SupplementsHub() {
  const sorted = [...products].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  const grouped = byCategory(sorted);
  const categories = Object.keys(grouped).sort(
    (a, b) => grouped[b].length - grouped[a].length,
  );

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Supplement Reviews & Scores",
    description: `Ingredient-level scores for ${products.length} supplements.`,
    url: `${BASE}/supplements`,
    hasPart: sorted.slice(0, 20).map((p) => ({
      "@type": "Product",
      name: `${p.brand} ${p.name}`,
      brand: { "@type": "Brand", name: p.brand },
      url: `${BASE}/supplements/${p.slug}`,
      aggregateRating:
        p.score !== null
          ? {
              "@type": "AggregateRating",
              ratingValue: p.score,
              bestRating: 100,
              ratingCount: 1,
            }
          : undefined,
    })),
  };

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <header className="mb-12 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
          Supplement Scores
        </h1>
        <p className="text-base text-muted leading-relaxed">
          Every product below has been graded by Formulate&apos;s automated rubric:
          evidence quality, dose accuracy, bioavailability, transparency, safety,
          and manufacturing practices. {products.length} supplements indexed.
        </p>
      </header>

      {categories.map((cat) => (
        <section key={cat} className="mb-14">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-xl font-bold text-text">{cat}</h2>
            <span className="text-xs text-muted">{grouped[cat].length} products</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {grouped[cat].map((p) => {
              const g = scoreGrade(p.score);
              return (
                <Link
                  key={p.slug}
                  href={`/supplements/${p.slug}`}
                  className="flex items-center gap-4 rounded-xl border border-border bg-white/[0.02] p-4 hover:border-accent/40 transition-colors"
                >
                  {p.image_url ? (
                    <div className="relative w-14 h-14 rounded-lg bg-white/[0.02] overflow-hidden flex-shrink-0">
                      <Image
                        src={p.image_url}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-contain p-1"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-white/[0.02] border border-border flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted mb-0.5 truncate">{p.brand}</div>
                    <div className="text-sm font-semibold text-text leading-snug line-clamp-2">
                      {p.name}
                    </div>
                  </div>
                  <div
                    className="text-sm font-bold px-2.5 py-1 rounded flex-shrink-0"
                    style={{
                      backgroundColor: `${g.color}1a`,
                      color: g.color,
                    }}
                  >
                    {p.score}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
