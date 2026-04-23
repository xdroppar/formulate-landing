import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  stacks,
  stackBySlug,
  type Stack,
  type StackIngredient,
} from "@/lib/stacks";
import {
  ingredientBySlug,
  EVIDENCE_GRADE_META,
  type Ingredient,
} from "@/lib/encyclopedia";
import {
  checkStack as checkInteractionStack,
  findSubstance,
  SEVERITY_META,
} from "@/lib/interactions";

const BASE = "https://formulate-health.app";

export async function generateStaticParams() {
  return stacks.map((s) => ({ slug: s.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const s = stackBySlug(slug);
  if (!s) return { title: "Stack not found" };
  const title = `${s.name}: Evidence-Based Supplement Protocol`;
  const description = s.tagline;
  const url = `${BASE}/stacks/${slug}`;
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

function tierLabel(tier: StackIngredient["tier"]): string {
  return tier === "core" ? "Core" : tier === "supporting" ? "Supporting" : "Optional";
}

function tierColor(tier: StackIngredient["tier"]): string {
  return tier === "core"
    ? "#10B981"
    : tier === "supporting"
      ? "#3B82F6"
      : "#6B7280";
}

export default async function StackPage({ params }: { params: Params }) {
  const { slug } = await params;
  const s = stackBySlug(slug);
  if (!s) notFound();

  const url = `${BASE}/stacks/${slug}`;

  // Resolve each ingredient against the encyclopedia for depth data.
  const resolved = s.ingredients.map((i) => ({
    entry: i,
    ing: ingredientBySlug(i.slug),
  }));

  // Compute internal interaction warnings between stack members — the
  // "if you add this, watch this" layer that tells users if the stack
  // itself is internally consistent.
  const substanceInputs = resolved
    .map((r) => r.ing?.name)
    .filter((n): n is string => typeof n === "string");
  const internalInteractions = checkInteractionStack(substanceInputs);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: s.name,
    headline: `${s.name}: Evidence-Based Supplement Protocol`,
    description: s.tagline,
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
      { "@type": "ListItem", position: 2, name: "Stacks", item: `${BASE}/stacks` },
      { "@type": "ListItem", position: 3, name: s.name, item: url },
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

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/stacks" className="hover:text-text transition-colors">
          Stacks
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{s.name}</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-3">
          Evidence-Based Stack
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-4">
          {s.name}
        </h1>
        <p className="text-base text-muted leading-relaxed">{s.tagline}</p>
      </header>

      <section className="mb-10">
        <p className="text-sm text-text leading-relaxed">{s.summary}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-4">What&apos;s in it</h2>
        <div className="space-y-3">
          {resolved.map(({ entry, ing }) => {
            const grade = ing?.evidence_grade;
            const gradeMeta = grade ? EVIDENCE_GRADE_META[grade] : null;
            const tColor = tierColor(entry.tier);
            return (
              <div
                key={entry.slug}
                className="rounded-xl border border-border bg-white/[0.02] p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{ backgroundColor: `${tColor}1a`, color: tColor }}
                      >
                        {tierLabel(entry.tier)}
                      </span>
                      {gradeMeta && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: `${gradeMeta.color}1a`,
                            color: gradeMeta.color,
                          }}
                          title={gradeMeta.description}
                        >
                          Evidence {grade}
                        </span>
                      )}
                    </div>
                    {ing ? (
                      <Link
                        href={`/ingredients/${ing.slug}`}
                        className="text-lg font-bold text-text hover:text-accent transition-colors"
                      >
                        {ing.name}
                      </Link>
                    ) : (
                      <span className="text-lg font-bold text-text">{entry.slug}</span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-3">{entry.role}</p>
                <p className="text-xs text-text">
                  <span className="font-semibold uppercase tracking-wider text-[10px] text-muted">
                    Dose:
                  </span>{" "}
                  {entry.dose}
                </p>
                {ing && (
                  <Link
                    href={`/ingredients/${ing.slug}`}
                    className="inline-block text-xs text-accent hover:underline mt-3"
                  >
                    Full {ing.name} profile →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-3">How to take it</h2>
        <p className="text-sm text-muted leading-relaxed">{s.protocol}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-3">Cautions</h2>
        <p className="text-sm text-muted leading-relaxed">{s.cautions}</p>
      </section>

      {internalInteractions.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">
            Interactions between stack members
          </h2>
          <p className="text-xs text-muted mb-4">
            These are interactions Formulate has catalogued between the
            substances above. Review before combining if any apply.
          </p>
          <ul className="space-y-2">
            {internalInteractions.slice(0, 8).map((i) => {
              const meta = SEVERITY_META[i.severity];
              const a = findSubstance(i.substance_a);
              const b = findSubstance(i.substance_b);
              if (!a || !b) return null;
              const [first, second] = [a.slug, b.slug].sort();
              const href = `/interactions/${first}-and-${second}`;
              return (
                <li key={i.pair_key}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${meta.border} ${meta.bg} hover:bg-white/5 transition-colors`}
                  >
                    <span className="text-lg" aria-hidden>
                      {meta.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider ${meta.color}`}
                        >
                          {meta.label}
                        </span>
                        <span className="text-sm font-semibold text-text capitalize">
                          {i.substance_a} + {i.substance_b}
                        </span>
                      </div>
                      <p className="text-xs text-muted mt-0.5 line-clamp-1">
                        {i.summary}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="mt-10 rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          Next steps
        </h2>
        <ul className="text-sm text-text space-y-2">
          <li>
            →{" "}
            <Link href="/interactions" className="hover:text-accent">
              Check this stack against your prescription medications
            </Link>
          </li>
          <li>
            →{" "}
            <Link href="/ingredients" className="hover:text-accent">
              Browse all 969 ingredients with evidence grades
            </Link>
          </li>
          <li>
            →{" "}
            <Link href="/stacks" className="hover:text-accent">
              See other goal-based stacks
            </Link>
          </li>
        </ul>
      </section>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Educational only.</strong> Stack
        recommendations are not medical advice. Discuss any new supplement
        protocol with your clinician, especially if you take prescription
        medication or have a chronic condition.
      </p>
    </main>
  );
}
