import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  recipes,
  recipeBySlug,
  relatedRecipes,
  recipeColor,
  totalMinutes,
  RECIPE_BREAKDOWN_ROWS,
  type Recipe,
} from "@/lib/recipes";
import { withUtm } from "@/lib/app-url";
import { ScoreMeter } from "@/components/score-meter";
import { PageConversion } from "@/components/page-conversion";

const BASE = "https://formulate-health.app";
const APP_URL = "https://app.formulate-health.app";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const r = recipeBySlug(slug);
  if (!r) return {};
  const desc = (r.description || "").slice(0, 155) || `${r.name} — health score ${r.score}/${r.grade}, with full ingredients, nutrition, and method.`;
  const title = `${r.name} — Recipe, Nutrition & Health Score (${r.score}/${r.grade})`;
  return {
    title: `${title} | Formulate`,
    description: desc,
    alternates: { canonical: `${BASE}/recipes/${r.id}` },
    openGraph: {
      title,
      description: desc,
      type: "article",
      url: `${BASE}/recipes/${r.id}`,
      images: r.image_url ? [{ url: `${BASE}${r.image_url}` }] : undefined,
    },
  };
}

const NUTRITION_ROWS: { keys: string[]; label: string; unit: string }[] = [
  { keys: ["calories"], label: "Calories", unit: "" },
  { keys: ["protein_g", "protein"], label: "Protein", unit: "g" },
  { keys: ["carbs_g", "carbohydrate_g", "carbs", "carbohydrate"], label: "Carbs", unit: "g" },
  { keys: ["fat_g", "fat"], label: "Fat", unit: "g" },
  { keys: ["fiber_g", "fiber"], label: "Fiber", unit: "g" },
];

function pick(n: Record<string, unknown> | null | undefined, keys: string[]): number | null {
  if (!n) return null;
  for (const k of keys) {
    const v = n[k];
    if (typeof v === "number") return v;
  }
  return null;
}

export default async function RecipeDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const r: Recipe | undefined = recipeBySlug(slug);
  if (!r) notFound();

  const color = recipeColor(r);
  const mins = totalMinutes(r);
  const breakdown = RECIPE_BREAKDOWN_ROWS.map((row) => ({ ...row, value: r.score_breakdown?.[row.key] as number | null | undefined })).filter(
    (row) => typeof row.value === "number",
  );
  const topNutrients = r.score_breakdown?.top_nutrients ?? [];
  const related = relatedRecipes(r, 6);
  const cal = pick(r.nutrition as Record<string, unknown>, ["calories"]);

  const recipeLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: r.name,
    description: r.description || undefined,
    image: r.image_url ? [`${BASE}${r.image_url}`] : undefined,
    recipeCategory: r.category,
    recipeCuisine: r.cuisine || undefined,
    keywords: (r.diet_tags ?? []).join(", ") || undefined,
    prepTime: r.prep_min ? `PT${r.prep_min}M` : undefined,
    cookTime: r.cook_min ? `PT${r.cook_min}M` : undefined,
    totalTime: mins ? `PT${mins}M` : undefined,
    recipeYield: r.servings ? `${r.servings} serving${r.servings > 1 ? "s" : ""}` : undefined,
    recipeIngredient: r.ingredients ?? undefined,
    recipeInstructions: (r.steps ?? []).map((s) => ({ "@type": "HowToStep", text: s })),
    nutrition: cal != null ? { "@type": "NutritionInformation", calories: `${Math.round(cal)} calories` } : undefined,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Recipes", item: `${BASE}/recipes` },
      { "@type": "ListItem", position: 2, name: r.name, item: `${BASE}/recipes/${r.id}` },
    ],
  };

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="text-xs text-muted mb-6 flex items-center gap-1.5">
        <Link href="/recipes" className="hover:text-accent transition-colors">Recipes</Link>
        <span>/</span>
        <span className="text-text">{r.name}</span>
      </nav>

      {/* hero */}
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-white/[0.02] border border-border mb-6">
        {r.image_url && <Image src={r.image_url} alt={r.name} fill sizes="(max-width:896px) 100vw, 896px" className="object-cover" priority />}
        <span className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bg/80 backdrop-blur border" style={{ borderColor: `${color}44` }}>
          <ScoreMeter score={r.score} size={46} strokeWidth={4} color={color} />
          <span className="text-[10px] text-muted leading-tight">Health<br />Score</span>
        </span>
      </div>

      <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
        {r.category}{r.cuisine ? ` · ${r.cuisine}` : ""}
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-3">{r.name}</h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted mb-4">
        <span className="text-lg font-bold px-2 py-0.5 rounded-lg" style={{ backgroundColor: `${color}1a`, color }}>Grade {r.grade}</span>
        {mins && <span>⏱ {mins} min</span>}
        {r.servings && <span>🍽 {r.servings} serving{r.servings > 1 ? "s" : ""}</span>}
        {r.difficulty && <span className="capitalize">{r.difficulty}</span>}
      </div>
      {r.description && <p className="text-sm text-muted leading-relaxed mb-4 max-w-2xl">{r.description}</p>}
      {(r.diet_tags ?? []).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {r.diet_tags!.map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-accent/20 bg-accent/[0.06] text-accent">{t}</span>
          ))}
        </div>
      )}

      <a
        href={withUtm(`${APP_URL}/meals`, { source: "landing", campaign: "recipe_detail_cta" })}
        className="flex items-center justify-between gap-4 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-4 mb-12 hover:border-accent/50 transition-colors"
      >
        <div>
          <div className="text-sm font-bold text-text">Save {r.name} to your meals — free</div>
          <div className="text-xs text-muted">Log it, see its macros roll into your day, and track your nutrition over time.</div>
        </div>
        <span className="text-sm font-semibold text-accent whitespace-nowrap">Open app →</span>
      </a>

      {/* ingredients + method */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {(r.ingredients ?? []).length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-text mb-4">Ingredients</h2>
            <ul className="space-y-2.5">
              {r.ingredients!.map((ing, i) => (
                <li key={i} className="text-sm text-text leading-relaxed flex gap-2.5">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  {ing}
                </li>
              ))}
            </ul>
          </section>
        )}
        {(r.steps ?? []).length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-text mb-4">Method</h2>
            <ol className="space-y-3">
              {r.steps!.map((s, i) => (
                <li key={i} className="text-sm text-muted leading-relaxed flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/5 text-text text-[11px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>

      {/* nutrition */}
      {r.nutrition && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-1">Nutrition</h2>
          {r.nutrition.serving_size && <p className="text-xs text-muted mb-5">Per {r.nutrition.serving_size}</p>}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {NUTRITION_ROWS.map((m) => {
              const val = pick(r.nutrition as Record<string, unknown>, m.keys);
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

      {/* score breakdown */}
      {breakdown.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-5">Why {r.name} scores {r.score}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {breakdown.map((row) => (
              <div key={row.key as string}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm text-text">{row.label}</span>
                  <span className="text-xs text-muted">{Math.round(row.value as number)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${Math.max(0, Math.min(100, row.value as number))}%`, backgroundColor: color }} />
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

      {/* tips */}
      {(r.tips ?? []).length > 0 && (
        <section className="mb-12">
          <h2 className="text-base font-bold text-text mb-3">Tips</h2>
          <ul className="space-y-2">
            {r.tips!.slice(0, 6).map((t, i) => (
              <li key={i} className="text-sm text-muted leading-relaxed flex gap-2"><span className="text-accent">·</span>{t}</li>
            ))}
          </ul>
        </section>
      )}

      {/* related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-text mb-5">More {r.category.toLowerCase()} recipes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {related.map((x) => {
              const rc = recipeColor(x);
              return (
                <Link key={x.id} href={`/recipes/${x.id}`} className="group rounded-xl border border-border bg-white/[0.02] overflow-hidden hover:border-accent/40 transition-colors">
                  <div className="relative aspect-[16/10] bg-white/[0.02]">
                    {x.image_url && <Image src={x.image_url} alt="" fill sizes="240px" className="object-cover group-hover:scale-[1.03] transition-transform" />}
                    <ScoreMeter score={x.score} size={34} strokeWidth={3} color={rc} className="absolute top-1.5 right-1.5 bg-bg/70 backdrop-blur rounded-full" />
                  </div>
                  <div className="p-2.5 text-sm font-semibold text-text leading-snug line-clamp-1">{x.name}</div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <PageConversion kind="recipe" slug={slug} subject={r.name} />
    </main>
  );
}
