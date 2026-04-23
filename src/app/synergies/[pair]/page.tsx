import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  synergies,
  synergyBySlug,
  synergySlug,
  type Synergy,
} from "@/lib/synergies";
import {
  ingredientBySlug,
  EVIDENCE_GRADE_META,
  type Ingredient,
} from "@/lib/encyclopedia";

const BASE = "https://formulate-health.app";

export async function generateStaticParams() {
  return synergies.map((s) => ({ pair: synergySlug(s) }));
}

type Params = Promise<{ pair: string }>;

function resolveSides(s: Synergy): { a: Ingredient; b: Ingredient } | null {
  const ia = ingredientBySlug(s.a);
  const ib = ingredientBySlug(s.b);
  if (!ia || !ib) return null;
  const [first, second] = [ia, ib].sort((x, y) => x.slug.localeCompare(y.slug));
  return { a: first, b: second };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { pair } = await params;
  const s = synergyBySlug(pair);
  if (!s) return { title: "Synergy not found" };
  const sides = resolveSides(s);
  if (!sides) return { title: "Synergy not found" };
  const { a, b } = sides;
  const title = `${a.name} + ${b.name}: Synergy, Dose, and Evidence`;
  const description = s.bottom_line;
  const url = `${BASE}/synergies/${pair}`;
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

export default async function SynergyPage({ params }: { params: Params }) {
  const { pair } = await params;
  const s = synergyBySlug(pair);
  if (!s) notFound();
  const sides = resolveSides(s);
  if (!sides) notFound();

  const { a, b } = sides;
  const url = `${BASE}/synergies/${pair}`;
  const gA = a.evidence_grade ? EVIDENCE_GRADE_META[a.evidence_grade] : null;
  const gB = b.evidence_grade ? EVIDENCE_GRADE_META[b.evidence_grade] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${a.name} + ${b.name} Synergy`,
    headline: `${a.name} + ${b.name}: Synergy, Dose, and Evidence`,
    description: s.bottom_line,
    url,
    mainEntityOfPage: url,
    medicalAudience: { "@type": "MedicalAudience", audienceType: "Patient" },
    inLanguage: "en-US",
    author: { "@type": "Organization", name: "Formulate Team", url: BASE },
    publisher: {
      "@type": "Organization",
      name: "Formulate",
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/logo.png`, width: 512, height: 512 },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Synergies", item: `${BASE}/synergies` },
      { "@type": "ListItem", position: 3, name: `${a.name} + ${b.name}`, item: url },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Should I take ${a.name.toLowerCase()} with ${b.name.toLowerCase()}?`,
        acceptedAnswer: { "@type": "Answer", text: s.bottom_line },
      },
      {
        "@type": "Question",
        name: `Why do ${a.name.toLowerCase()} and ${b.name.toLowerCase()} work together?`,
        acceptedAnswer: { "@type": "Answer", text: s.why_synergy },
      },
      {
        "@type": "Question",
        name: `How do I dose ${a.name.toLowerCase()} and ${b.name.toLowerCase()} together?`,
        acceptedAnswer: { "@type": "Answer", text: s.dose_protocol },
      },
    ],
  };

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/synergies" className="hover:text-text transition-colors">
          Synergies
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">
          {a.name} + {b.name}
        </span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-3">
          {s.topic}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-3">
          {a.name} <span className="text-muted font-normal">+</span> {b.name}
        </h1>
        <p className="text-base text-muted leading-relaxed">{s.bottom_line}</p>
      </header>

      <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[a, b].map((ing) => {
          const g = ing.evidence_grade ? EVIDENCE_GRADE_META[ing.evidence_grade] : null;
          return (
            <div
              key={ing.slug}
              className="rounded-xl border border-border bg-white/[0.02] p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <Link
                  href={`/ingredients/${ing.slug}`}
                  className="text-lg font-bold text-text hover:text-accent transition-colors"
                >
                  {ing.name}
                </Link>
                {g && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
                    style={{ backgroundColor: `${g.color}1a`, color: g.color }}
                    title={g.description}
                  >
                    {ing.evidence_grade}
                  </span>
                )}
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-2">
                {ing.category}
              </p>
              <p className="text-sm text-muted leading-relaxed line-clamp-4">
                {ing.summary}
              </p>
              <Link
                href={`/ingredients/${ing.slug}`}
                className="inline-block text-xs text-accent hover:underline mt-3"
              >
                Full {ing.name} profile →
              </Link>
            </div>
          );
        })}
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-3">Why they work together</h2>
        <p className="text-sm text-muted leading-relaxed">{s.why_synergy}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-3">How to dose them</h2>
        <p className="text-sm text-muted leading-relaxed">{s.dose_protocol}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-3">Evidence</h2>
        <p className="text-sm text-muted leading-relaxed">{s.evidence}</p>
      </section>

      <section className="mb-10 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-3">
          Watch-outs
        </h2>
        <p className="text-sm text-text leading-relaxed">{s.watch_outs}</p>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          Next steps
        </h2>
        <ul className="text-sm text-text space-y-2">
          <li>
            →{" "}
            <Link href={`/ingredients/${a.slug}`} className="hover:text-accent">
              Full {a.name} profile
            </Link>
          </li>
          <li>
            →{" "}
            <Link href={`/ingredients/${b.slug}`} className="hover:text-accent">
              Full {b.name} profile
            </Link>
          </li>
          <li>
            →{" "}
            <Link href="/interactions" className="hover:text-accent">
              Check for warnings with prescription medications
            </Link>
          </li>
          <li>
            →{" "}
            <Link href="/synergies" className="hover:text-accent">
              Browse all evidence-backed supplement pairings
            </Link>
          </li>
        </ul>
      </section>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Educational only.</strong> Synergy
        pairs are not prescriptions. Run any new supplement combination past
        your clinician if you take prescription medication.
      </p>
    </main>
  );
}
