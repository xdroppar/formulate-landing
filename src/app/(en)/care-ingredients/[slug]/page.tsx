import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ACTIVE_CLASS_LABEL,
  LIBRARY_REVIEWED,
  activeBySlug,
  activeEntries,
  isThinLibraryEntry,
  slugOf,
} from "@/lib/shelf-library";
import { EvidenceMeter, Bullets, Claims, Prose, Studies } from "@/components/library-bits";
import { AppCtaCard } from "@/components/app-cta-card";
import { ReadingProgressBar } from "@/components/reading-progress-bar";

const BASE = "https://formulate-health.app";

export async function generateStaticParams() {
  return activeEntries.map((e) => ({ slug: slugOf(e.id) }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const e = activeBySlug(slug);
  if (!e) return { title: "Not found" };
  const url = `${BASE}/care-ingredients/${slug}`;
  const title = `${e.name}: What It Does, Strength, Evidence, Safety`;
  return {
    title,
    description: e.summary.slice(0, 160),
    alternates: { canonical: url },
    openGraph: { title, description: e.summary, type: "article", url },
    robots: isThinLibraryEntry(e) ? { index: false, follow: true } : undefined,
  };
}

export default async function CareIngredientPage({ params }: { params: Params }) {
  const { slug } = await params;
  const e = activeBySlug(slug);
  if (!e) notFound();

  const url = `${BASE}/care-ingredients/${slug}`;
  const kind = ACTIVE_CLASS_LABEL[e.class] ?? "Care ingredient";
  const related = e.related
    .map((r) => activeEntries.find((x) => x.id === r))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${e.name}: what it does and what the evidence says`,
    headline: `${e.name}: What It Does, Strength, Evidence, Safety`,
    description: e.summary,
    url,
    mainEntityOfPage: url,
    inLanguage: "en-US",
    dateModified: LIBRARY_REVIEWED,
    lastReviewed: LIBRARY_REVIEWED,
    author: { "@type": "Organization", name: "Formulate Team", url: BASE },
    publisher: { "@type": "Organization", name: "Formulate", url: BASE },
    about: { "@type": "Substance", name: e.name, alternateName: e.aliases ?? [] },
    citation: e.studies.map((s) => ({
      "@type": "ScholarlyArticle",
      headline: s.title,
      author: s.authors,
      datePublished: String(s.year),
      publisher: s.journal,
      sameAs: `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`,
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Care ingredients", item: `${BASE}/care-ingredients` },
      { "@type": "ListItem", position: 3, name: e.name, item: url },
    ],
  };

  return (
    <main id="main-content" className="max-w-[1100px] mx-auto px-6 md:px-8 pt-28 pb-20">
      <ReadingProgressBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="text-xs text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/care-ingredients" className="hover:text-accent">Care ingredients</Link>
        <span className="mx-2">/</span>
        <Link href={`/care-ingredients#${e.class}`} className="hover:text-accent">{kind}</Link>
      </nav>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-10">
        <article className="min-w-0 max-w-[760px]">
          <header className="mb-8">
            <p className="fm-eyebrow text-accent mb-3">{kind}</p>
            <h1 className="fm-display text-[clamp(28px,4vw,var(--text-h-argument))] text-text mb-3">{e.name}</h1>
            {e.aliases && e.aliases.length > 0 && (
              <p className="text-xs text-muted mb-3">Also listed as {e.aliases.join(", ")}</p>
            )}
            <p className="text-base text-muted leading-relaxed mb-4">{e.summary}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <EvidenceMeter level={e.evidence.level} />
              {e.typical && <span className="text-xs text-muted">Typical strength: {e.typical}</span>}
            </div>
          </header>

          <section className="mb-10">
            <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-4">What it is</h2>
            <Prose text={e.what} />
          </section>

          <section className="mb-10 rounded-2xl border border-border bg-white/[0.02] p-5">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 className="fm-display text-[length:var(--text-h-section)] text-text">How strong is the evidence?</h2>
              <EvidenceMeter level={e.evidence.level} />
            </div>
            <Prose text={e.evidence.summary} />
          </section>

          <Claims title="What it's used for, checked" rows={e.uses.map((u) => ({ claim: u.use, verdict: u.verdict, note: u.note }))} />
          <Bullets title="Works well with" items={e.works_with} mark="+" tone="good" />
          <Bullets title="Don't combine with" items={e.avoid_with} mark="×" tone="bad" />
          <Bullets title="Who should be careful" items={e.safety} mark="!" tone="warn" />
          <Studies studies={e.studies} />
        </article>

        <aside className="lg:sticky lg:top-28 self-start space-y-4">
          <AppCtaCard
            title={`Find products with ${e.name.toLowerCase()}`}
            sub="Every sunscreen, serum and toothpaste in the app, scored on its actives."
            campaign={`care-ingredient-${slug}`}
            path="/skin"
          />
          {related.length > 0 && (
            <div className="rounded-2xl border border-border p-4">
              <div className="fm-eyebrow text-muted mb-3">Related</div>
              <ul className="space-y-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link href={`/care-ingredients/${slugOf(r.id)}`} className="text-sm text-text hover:text-accent">
                      {r.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-[11px] text-muted leading-relaxed">
            Education, not medical advice. Patch-test anything new and ask a clinician about prescription treatments.
          </p>
        </aside>
      </div>
    </main>
  );
}
