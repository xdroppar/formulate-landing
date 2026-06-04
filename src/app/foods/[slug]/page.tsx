import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  foods,
  foodBySlug,
  defaultVariant,
  relatedFoods,
  foodColor,
  timingText,
  FOOD_BREAKDOWN_ROWS,
  type Food,
} from "@/lib/foods";
import { ScoreMeter } from "@/components/score-meter";
import { withUtm } from "@/lib/app-url";

const BASE = "https://formulate-health.app";
const APP_URL = "https://app.formulate-health.app";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return foods.map((f) => ({ slug: f.base_id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const f = foodBySlug(slug);
  if (!f) return {};
  const desc =
    (f.description || f.overview || "").slice(0, 155) ||
    `${f.name} scores ${f.score}/100 for nutritional quality. See its benefits, nutrition, and health score.`;
  const title = `${f.name} — Nutrition, Benefits & Health Score (${f.score}/${f.grade})`;
  return {
    title: `${title} | Formulate`,
    description: desc,
    alternates: { canonical: `${BASE}/foods/${f.base_id}` },
    openGraph: {
      title,
      description: desc,
      type: "article",
      url: `${BASE}/foods/${f.base_id}`,
      images: f.image_url ? [{ url: `${BASE}${f.image_url}` }] : undefined,
    },
  };
}

const MACRO_LABELS: { keys: string[]; label: string; unit: string }[] = [
  { keys: ["protein", "protein_g"], label: "Protein", unit: "g" },
  { keys: ["carbs", "carbohydrate", "carbohydrates", "carbs_g"], label: "Carbs", unit: "g" },
  { keys: ["fat", "total_fat", "fat_g"], label: "Fat", unit: "g" },
  { keys: ["fiber", "dietary_fiber", "fiber_g"], label: "Fiber", unit: "g" },
  { keys: ["sugar", "sugars", "total_sugars"], label: "Sugars", unit: "g" },
];

function pickMacro(macros: Record<string, number | null> | null | undefined, keys: string[]): number | null {
  if (!macros) return null;
  for (const k of keys) if (macros[k] != null) return macros[k] as number;
  return null;
}

function asList(v: string[] | string | null | undefined): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v.filter(Boolean) : [v];
}

const EVIDENCE_COLOR: Record<string, string> = {
  strong: "#22C55E",
  moderate: "#3B82F6",
  limited: "#F59E0B",
  weak: "#F59E0B",
};

export default async function FoodDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const f: Food | undefined = foodBySlug(slug);
  if (!f) notFound();

  const color = foodColor(f);
  const v = defaultVariant(f);
  const benefits = (f.health_benefits ?? []).slice(0, 6);
  const breakdown = FOOD_BREAKDOWN_ROWS.map((r) => ({ ...r, value: f.score_breakdown?.[r.key] as number | null | undefined })).filter(
    (r) => typeof r.value === "number",
  );
  const topNutrients = f.score_breakdown?.top_nutrients ?? [];
  const related = relatedFoods(f, 6);
  const pairings = asList(f.food_pairings);
  const tips = asList(f.practical_tips);
  const timing = timingText(f.optimal_timing);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Whole Foods", item: `${BASE}/foods` },
      { "@type": "ListItem", position: 2, name: f.name, item: `${BASE}/foods/${f.base_id}` },
    ],
  };

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="text-xs text-muted mb-6 flex items-center gap-1.5">
        <Link href="/foods" className="hover:text-accent transition-colors">Whole Foods</Link>
        <span>/</span>
        <span className="text-text">{f.name}</span>
      </nav>

      {/* header */}
      <div className="flex flex-col sm:flex-row gap-6 mb-10">
        <div className="relative w-full sm:w-48 h-48 rounded-2xl overflow-hidden bg-white/[0.02] border border-border flex-shrink-0">
          {f.image_url ? (
            <Image src={f.image_url} alt={f.name} fill sizes="(max-width:640px) 100vw, 192px" className="object-cover" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-6xl">{f.icon ?? "🍽️"}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            {f.group}{f.subgroup ? ` · ${f.subgroup}` : ""}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-3">{f.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <ScoreMeter score={f.score} size={72} strokeWidth={6} color={color} className="-ml-1" />
            <span className="text-xs text-muted leading-tight">Health<br />Score</span>
            <span className="text-lg font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: `${color}1a`, color }}>
              {f.grade}
            </span>
          </div>
          {(f.description || f.overview) && (
            <p className="text-sm text-muted leading-relaxed">{f.description || f.overview}</p>
          )}
        </div>
      </div>

      {/* app CTA */}
      <a
        href={withUtm(`${APP_URL}/meals`, { source: "landing", campaign: "food_detail_cta" })}
        className="flex items-center justify-between gap-4 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-4 mb-12 hover:border-accent/50 transition-colors"
      >
        <div>
          <div className="text-sm font-bold text-text">Track {f.name} in Formulate — free</div>
          <div className="text-xs text-muted">Log it, see it roll into your daily nutrient coverage, and build a scored stack.</div>
        </div>
        <span className="text-sm font-semibold text-accent whitespace-nowrap">Open app →</span>
      </a>

      {/* score breakdown */}
      {breakdown.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-5">Why {f.name} scores {f.score}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {breakdown.map((r) => (
              <div key={r.key as string}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm text-text">{r.label}</span>
                  <span className="text-xs text-muted">{Math.round(r.value as number)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.max(0, Math.min(100, r.value as number))}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            ))}
          </div>
          {topNutrients.length > 0 && (
            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Top nutrients</div>
              <div className="flex flex-wrap gap-2">
                {topNutrients.slice(0, 10).map((n) => (
                  <span key={n} className="text-xs px-2.5 py-1 rounded-full border border-border bg-white/[0.02] text-text">{n}</span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* nutrition */}
      {v && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-1">Nutrition</h2>
          {v.serving_basis && <p className="text-xs text-muted mb-5">{v.serving_basis}</p>}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {v.calories != null && (
              <div className="rounded-xl border border-border bg-white/[0.02] p-4 text-center">
                <div className="text-xl font-black text-text">{Math.round(v.calories)}</div>
                <div className="text-[11px] text-muted mt-0.5">Calories</div>
              </div>
            )}
            {MACRO_LABELS.map((m) => {
              const val = pickMacro(v.macros, m.keys);
              if (val == null) return null;
              return (
                <div key={m.label} className="rounded-xl border border-border bg-white/[0.02] p-4 text-center">
                  <div className="text-xl font-black text-text">{Math.round(val * 10) / 10}{m.unit}</div>
                  <div className="text-[11px] text-muted mt-0.5">{m.label}</div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* health benefits */}
      {benefits.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-5">Health benefits</h2>
          <div className="space-y-5">
            {benefits.map((b, i) => (
              <div key={i} className="rounded-xl border border-border bg-white/[0.02] p-5">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3 className="text-sm font-bold text-text">{b.benefit}</h3>
                  {b.evidence_strength && (
                    <span
                      className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full whitespace-nowrap"
                      style={{
                        backgroundColor: `${EVIDENCE_COLOR[b.evidence_strength.toLowerCase()] ?? "#7a7a9a"}1a`,
                        color: EVIDENCE_COLOR[b.evidence_strength.toLowerCase()] ?? "#7a7a9a",
                      }}
                    >
                      {b.evidence_strength} evidence
                    </span>
                  )}
                </div>
                {b.mechanism && <p className="text-sm text-muted leading-relaxed">{b.mechanism}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* pairings + tips */}
      {(pairings.length > 0 || tips.length > 0 || timing) && (
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {pairings.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-text mb-3">Pairs well with</h2>
              <ul className="space-y-2">
                {pairings.slice(0, 6).map((p, i) => (
                  <li key={i} className="text-sm text-muted leading-relaxed flex gap-2"><span className="text-accent">·</span>{p}</li>
                ))}
              </ul>
            </div>
          )}
          {(tips.length > 0 || timing) && (
            <div>
              <h2 className="text-base font-bold text-text mb-3">Practical tips</h2>
              <ul className="space-y-2">
                {timing && <li className="text-sm text-muted leading-relaxed flex gap-2"><span className="text-accent">·</span>Best timing: {timing}</li>}
                {tips.slice(0, 6).map((t, i) => (
                  <li key={i} className="text-sm text-muted leading-relaxed flex gap-2"><span className="text-accent">·</span>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-text mb-5">Related foods</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {related.map((r) => {
              const rc = foodColor(r);
              return (
                <Link key={r.base_id} href={`/foods/${r.base_id}`} className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.02] p-3 hover:border-accent/40 transition-colors">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/[0.02] flex-shrink-0">
                    {r.image_url && <Image src={r.image_url} alt="" fill sizes="40px" className="object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0 text-sm font-semibold text-text truncate">{r.name}</div>
                  <ScoreMeter score={r.score} size={36} strokeWidth={3} color={rc} />
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
