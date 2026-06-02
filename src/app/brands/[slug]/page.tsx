import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AppCtaCard } from "@/components/app-cta-card";
import {
  brands,
  brandBySlug,
  brandCategoryBreakdown,
  productsForBrand,
  scoreGrade,
  thumbUrl,
  catalogReviewLabel,
  type BrandSummary,
  type Product,
} from "@/lib/products";

const BASE = "https://formulate-health.app";

export async function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const b = brandBySlug(slug);
  if (!b) return { title: "Brand not found" };
  const count = productsForBrand(slug).length;
  const title = `${b.name} Supplements Review: Brand Grade ${b.grade ?? "—"}, ${count} Products Scored`;
  const description =
    `Formulate graded ${count} ${b.name} supplement${count === 1 ? "" : "s"} on ingredient quality, ` +
    `dose accuracy, and third-party testing. Brand grade: ${b.grade ?? "—"} (${b.score ?? "—"}/100).`;
  const url = `${BASE}/brands/${slug}`;
  return {
    title: `${title} — Formulate`,
    description: description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: {
      title,
      description: description.slice(0, 200),
      type: "website",
      url,
    },
  };
}

function brandFaqs(b: BrandSummary, lineup: Product[]): { q: string; a: string }[] {
  const qs: { q: string; a: string }[] = [];
  const top = lineup[0];
  const cats = brandCategoryBreakdown(b.slug);

  qs.push({
    q: `How does Formulate grade ${b.name}?`,
    a: `Formulate grades ${b.name} by aggregating the ingredient-level scores of all ${lineup.length} ${b.name} product${lineup.length === 1 ? "" : "s"} it has analyzed — weighing dose accuracy, ingredient form, transparency, and third-party testing. ${b.name}'s overall brand grade is ${b.grade ?? "—"}${b.score !== null ? ` (${b.score}/100)` : ""}. It is not a paid or sponsored ranking.`,
  });

  if (b.components) {
    const v = b.components.verification;
    qs.push({
      q: `Is ${b.name} third-party tested?`,
      a:
        v >= 70
          ? `${b.name} scores ${v}/100 on third-party verification, indicating broad testing coverage (such as USP, NSF, or Informed Sport) across its lineup.`
          : `${b.name} scores ${v}/100 on third-party verification — meaning third-party testing coverage is limited across its lineup. Check individual product pages for which specific products are certified.`,
    });
  }

  if (top && top.score !== null) {
    qs.push({
      q: `What is ${b.name}'s best supplement?`,
      a: `${top.name} is ${b.name}'s highest-scoring product on Formulate at ${top.score}/100 (grade ${scoreGrade(top.score).letter}).`,
    });
  }

  if (cats.length) {
    const catList = cats.slice(0, 4).map((c) => `${c.count} ${c.category}`).join(", ");
    qs.push({
      q: `What does ${b.name} make?`,
      a: `Formulate has scored ${lineup.length} ${b.name} product${lineup.length === 1 ? "" : "s"}, including ${catList}${cats.length > 4 ? ", and more" : ""}.`,
    });
  }

  return qs;
}

export default async function BrandHub({ params }: { params: Params }) {
  const { slug } = await params;
  const b = brandBySlug(slug);
  if (!b) notFound();

  const lineup = productsForBrand(slug);
  const breakdown = brandCategoryBreakdown(slug);
  const topPicks = lineup.slice(0, 6);
  const url = `${BASE}/brands/${slug}`;
  const bg = scoreGrade(b.score ?? b.avg_score ?? null);
  const faqs = brandFaqs(b, lineup);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: b.name,
    url,
    description:
      `${b.name} is a supplement brand graded ${b.grade ?? "—"} by Formulate across ` +
      `${lineup.length} product${lineup.length === 1 ? "" : "s"}.`,
    aggregateRating:
      b.score !== null
        ? {
            "@type": "AggregateRating",
            ratingValue: b.score,
            bestRating: 100,
            ratingCount: lineup.length,
          }
        : undefined,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Brands", item: `${BASE}/brands` },
      { "@type": "ListItem", position: 3, name: b.name, item: url },
    ],
  };

  const faqLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/brands" className="hover:text-text transition-colors">
          Brands
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{b.name}</span>
      </nav>

      <header className="mb-10 flex items-start justify-between gap-6 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {b.standout && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent bg-accent/10 px-2 py-1 rounded">
                {b.standout}
              </span>
            )}
            {b.confidence && b.confidence !== "high" && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted bg-white/[0.03] border border-border px-2 py-1 rounded">
                {b.confidence} confidence
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-3">
            {b.name}
          </h1>
          <p className="text-muted text-base leading-relaxed max-w-2xl">
            {lineup.length} {lineup.length === 1 ? "product" : "products"} scored by
            Formulate&apos;s ingredient-level rubric. Brand grade reflects a weighted
            average across the full lineup.
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
        </div>
        <div
          className="text-3xl font-bold px-5 py-3 rounded-xl flex-shrink-0"
          style={{ backgroundColor: `${bg.color}1a`, color: bg.color }}
        >
          {b.grade ?? bg.letter}
          {b.score !== null && (
            <div className="text-xs font-normal opacity-80 mt-1">{b.score}/100</div>
          )}
        </div>
      </header>

      <AppCtaCard
        className="mb-10"
        title={`Browse all ${b.name} products scored — free`}
        sub={`Compare ${b.name}'s lineup on dose, form & testing, then build your stack in the app.`}
        campaign="brand_cta"
        path="/catalog"
      />

      {b.components && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-4">How {b.name} scored</h2>
          <div className="space-y-3">
            {([
              ["Integrity", b.components.integrity, "Accurate labels, no proprietary blends hiding doses, consistent sourcing"],
              ["Product Quality", b.components.product_quality, "Ingredient form, bioavailability, dose accuracy across the lineup"],
              ["Transparency", b.components.transparency, "Published testing, ingredient origins, full disclosure"],
              ["Verification", b.components.verification, "USP, NSF, Informed Sport, or comparable third-party testing coverage"],
              ["Innovation", b.components.innovation, "New formulations, new forms, research-driven development"],
            ] as const).map(([label, value, description]) => {
              const pct = Math.max(0, Math.min(100, value));
              const color =
                pct >= 85 ? "#10B981" : pct >= 70 ? "#3B82F6" : pct >= 55 ? "#F59E0B" : "#EF4444";
              return (
                <div key={label}>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-sm font-semibold text-text">{label}</span>
                    <span className="text-sm font-bold" style={{ color }}>
                      {value}
                    </span>
                  </div>
                  <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{description}</p>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted mt-4">
            Component scores are derived from the product lineup, not from
            marketing materials. See the{" "}
            <Link href="/methodology" className="text-accent hover:underline">
              methodology page
            </Link>{" "}
            for how each component is computed.
          </p>
        </section>
      )}

      {breakdown.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-4">What {b.name} makes</h2>
          <ul className="flex flex-wrap gap-2">
            {breakdown.map((row) => (
              <li
                key={row.category}
                className="text-sm text-muted bg-white/[0.03] border border-border rounded-full px-3 py-1"
              >
                <span className="text-text font-semibold">{row.count}</span> {row.category}
              </li>
            ))}
          </ul>
        </section>
      )}

      {topPicks.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-4">Top-scoring products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topPicks.map((p) => {
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
                        src={thumbUrl(p) ?? p.image_url}
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
                    <div className="text-sm font-semibold text-text leading-snug line-clamp-2">
                      {p.name}
                    </div>
                  </div>
                  <div
                    className="text-sm font-bold px-2.5 py-1 rounded flex-shrink-0"
                    style={{ backgroundColor: `${g.color}1a`, color: g.color }}
                  >
                    {p.score}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {lineup.length > topPicks.length && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-4">
            All {b.name} products ({lineup.length})
          </h2>
          <ul className="divide-y divide-border border border-border rounded-xl overflow-hidden">
            {lineup.map((p) => {
              const g = scoreGrade(p.score);
              return (
                <li key={p.slug}>
                  <Link
                    href={`/supplements/${p.slug}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-text line-clamp-1">{p.name}</span>
                      <span className="text-xs text-muted">{p.category}</span>
                    </div>
                    <div
                      className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
                      style={{ backgroundColor: `${g.color}1a`, color: g.color }}
                    >
                      {p.score ?? "—"}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-4">
            {b.name}: frequently asked questions
          </h2>
          <div className="space-y-5">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-sm font-semibold text-text mb-1.5">{f.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          About the grading
        </h2>
        <p className="text-sm text-text leading-relaxed">
          Every {b.name} product above is scored on dose accuracy, ingredient form,
          certifications, transparency, and third-party testing. The brand grade
          aggregates those product scores — it isn&apos;t a marketing claim or a pay-for-play
          ranking. See the{" "}
          <Link href="/methodology" className="text-accent hover:underline">
            methodology page
          </Link>{" "}
          for the full rubric.
        </p>
      </section>
    </main>
  );
}
