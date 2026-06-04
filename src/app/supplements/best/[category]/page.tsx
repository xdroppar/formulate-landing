import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  bestCategories,
  categoryBySlug,
  categorySlug,
  topProductsByCategory,
  scoreGrade,
  thumbUrl,
  catalogReviewLabel,
  type Product,
} from "@/lib/products";
import { ScoreMeter } from "@/components/score-meter";

const BASE = "https://formulate-health.app";
const LIMIT = 10;

export async function generateStaticParams() {
  return bestCategories().map((c) => ({ category: c.slug }));
}

type Params = Promise<{ category: string }>;

function categoryLabel(category: string): string {
  // Categories are already title-cased ("Amino Acids"); lower-case for prose.
  return category;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  const top = topProductsByCategory(category, LIMIT);
  const count = top.length;
  const title = `Best ${category} Supplements: Top ${count} Ranked by Evidence`;
  const description =
    `Formulate's ${count} highest-scoring ${category.toLowerCase()} supplements, ranked by ` +
    `ingredient dose, bioavailable form, transparency, and third-party testing — no sponsorships.` +
    (top[0] ? ` Top pick: ${top[0].brand} ${top[0].name} (${top[0].score}/100).` : "");
  const url = `${BASE}/supplements/best/${slug}`;
  return {
    title: `${title} — Formulate`,
    description: description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: {
      title,
      description: description.slice(0, 200),
      type: "article",
      url,
    },
  };
}

function whyLine(p: Product): string {
  // Prefer the editorial explanation; fall back to the strongest component.
  const expl = (p.explanation ?? p.overview ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (expl) return expl.length > 180 ? expl.slice(0, 177).trimEnd() + "…" : expl;
  const top = [...p.score_components].sort((a, b) => b.raw_score - a.raw_score)[0];
  if (top) return `Strongest on ${top.name.toLowerCase()} (${top.raw_score}/100).`;
  return "";
}

export default async function BestCategoryPage({ params }: { params: Params }) {
  const { category: slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();

  const top = topProductsByCategory(category, LIMIT);
  if (!top.length) notFound();
  const url = `${BASE}/supplements/best/${slug}`;
  const lower = category.toLowerCase();
  const best = top[0];
  const bestGrade = scoreGrade(best.score);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${category} Supplements`,
    description: `Formulate's top ${top.length} ${lower} supplements, ranked by score.`,
    url,
    numberOfItems: top.length,
    itemListElement: top.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/supplements/${p.slug}`,
      name: `${p.brand} ${p.name}`,
    })),
  };

  const faqs = [
    {
      q: `What is the best ${lower} supplement?`,
      a: `${best.brand} ${best.name} is Formulate's highest-scoring ${lower} supplement at ${best.score}/100 (grade ${bestGrade.letter}). ${whyLine(best)}`,
    },
    {
      q: `How does Formulate rank ${lower} supplements?`,
      a: `Each product is scored 0–100 by an automated rubric covering evidence quality, dose accuracy, bioavailable form, label transparency, safety, and manufacturing. Rankings reflect the formula on the label — not advertising or sponsorships.`,
    },
    {
      q: `How many ${lower} supplements were compared?`,
      a: `This ranking shows the top ${top.length} ${lower} products Formulate has scored. Browse the full catalog for every product and its breakdown.`,
    },
  ];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Supplements", item: `${BASE}/supplements` },
      { "@type": "ListItem", position: 3, name: `Best ${category}`, item: url },
    ],
  };

  const otherCategories = bestCategories().filter((c) => c.slug !== slug).slice(0, 8);

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/supplements" className="hover:text-text transition-colors">
          Supplements
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Best {category}</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-3">
          Ranked by evidence
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-4">
          Best {categoryLabel(category)} Supplements
        </h1>
        <p className="text-base text-muted leading-relaxed">
          The {top.length} highest-scoring {lower} supplements in Formulate&apos;s catalog,
          ranked by the same automated rubric we apply to every product: ingredient dose,
          bioavailable form, label transparency, safety, and third-party testing. No
          sponsorships, no pay-to-play.
        </p>
        {catalogReviewLabel && (
          <p className="text-xs text-muted mt-3">
            Scored by the{" "}
            <Link
              href="/methodology"
              className="hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              Formulate Research Team
            </Link>{" "}
            · Last reviewed {catalogReviewLabel}
          </p>
        )}
      </header>

      <section className="mb-10">
        <ol className="space-y-3">
          {top.map((p, i) => {
            const g = scoreGrade(p.score);
            return (
              <li key={p.slug}>
                <Link
                  href={`/supplements/${p.slug}`}
                  className="flex items-start gap-4 rounded-xl border border-border bg-white/[0.02] p-4 hover:border-accent/40 transition-colors"
                >
                  <div className="flex-shrink-0 w-7 text-center text-lg font-extrabold text-muted pt-1">
                    {i + 1}
                  </div>
                  {p.image_url ? (
                    <div className="relative w-16 h-16 rounded-lg bg-white/[0.02] overflow-hidden flex-shrink-0">
                      <Image
                        src={thumbUrl(p) ?? p.image_url}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-white/[0.02] border border-border flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted mb-0.5">{p.brand}</div>
                    <div className="text-sm font-bold text-text leading-snug mb-1">{p.name}</div>
                    <p className="text-xs text-muted leading-relaxed line-clamp-2">{whyLine(p)}</p>
                  </div>
                  <ScoreMeter score={p.score} size={48} strokeWidth={4} showGrade />
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-4">Frequently asked questions</h2>
        <div className="space-y-5">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-sm font-semibold text-text mb-1.5">{f.q}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {otherCategories.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-4">Best supplements by category</h2>
          <div className="flex flex-wrap gap-2">
            {otherCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/supplements/best/${c.slug}`}
                className="inline-flex items-center rounded-full border border-border bg-white/[0.02] px-3 py-1.5 text-sm text-text hover:border-accent/40 transition-colors"
              >
                Best {c.category}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          How these are ranked
        </h2>
        <p className="text-sm text-text leading-relaxed">
          Every {lower} product is scored on dose accuracy, ingredient form, certifications,
          transparency, and third-party testing — the same rubric across the whole catalog.
          See the{" "}
          <Link href="/methodology" className="text-accent hover:underline">
            methodology page
          </Link>{" "}
          for the full breakdown, or{" "}
          <Link href="/supplements" className="text-accent hover:underline">
            browse every supplement
          </Link>
          .
        </p>
      </section>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Educational only.</strong> Rankings reflect product
        formulation quality, not personalized medical advice. Talk to a qualified healthcare
        provider before starting a new supplement, especially if you take medication.
      </p>
    </main>
  );
}
