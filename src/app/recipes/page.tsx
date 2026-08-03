import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { recipes, recipeCount, recipeCategories, recipesByCategory, recipeColor, totalMinutes, recipeDietTags } from "@/lib/recipes";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ScoreMeter } from "@/components/score-meter";

const BASE = "https://formulate-health.app";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Breakfast:
    "Breakfasts scored on real nutritional quality — protein, fiber, healthy fats, and beneficial compounds — so you can start the day on something that actually moves the needle.",
  Mains:
    "Main dishes graded on nutrient density, protein quality, and balance. The score reacts to portions of butter, cheese, and refined ingredients — not just calories.",
  "Sides & Snacks":
    "Sides and snacks scored on what they add to your day nutritionally — whole-food, fiber- and protein-rich options rise to the top.",
  Desserts:
    "Desserts graded honestly: nutrient density and beneficial compounds versus added sugar and refined fat. Some score better than you'd expect — and some don't.",
  "Baking & Pastries":
    "Baked goods scored on whole-grain content, healthy fats, and added sugar — a window into how a recipe's ingredients stack up nutritionally.",
  Drinks:
    "Drinks scored on micronutrients and beneficial compounds against sugar — smoothies and unsweetened options lead the category.",
};

export const metadata: Metadata = {
  title: "Healthy Recipes, Scored — Nutrition & Health Ratings | Formulate",
  description: `${recipeCount}+ recipes graded on real nutritional quality — nutrient density, protein, fiber, and beneficial compounds, not just calories. Find recipes that actually score well.`,
  alternates: { canonical: `${BASE}/recipes` },
  openGraph: {
    title: "Healthy Recipes, Scored | Formulate",
    description: `${recipeCount}+ recipes graded on real nutritional quality.`,
    type: "website",
    url: `${BASE}/recipes`,
  },
};

export default function RecipesHub() {
  const categories = recipeCategories();
  const top = [...recipes].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0];

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Healthy Recipes, Scored",
    description: `Health scores for ${recipeCount} recipes.`,
    url: `${BASE}/recipes`,
  };
  const faqs: { q: string; a: string }[] = [
    {
      q: "How does Formulate score recipes?",
      a: `Each recipe's full ingredient list is analysed and graded 0–100 on nutrient density, protein quality, fiber, healthy fats, beneficial plant compounds, and glycemic impact — the same rubric applied to all ${recipeCount} recipes.`,
    },
    {
      q: "Does the recipe score account for portions?",
      a: "Yes. The score reflects the actual amounts of each ingredient per serving, so a recipe heavy on butter, cream, or refined sugar scores lower than one built on whole foods.",
    },
  ];
  if (top && top.score != null) faqs.push({ q: "What is the highest-scoring recipe?", a: `${top.name} currently scores ${top.score}/100 (grade ${top.grade}).` });
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">Healthy Recipes, Scored</h1>
        <p className="text-base text-muted leading-relaxed">
          Every recipe below is graded on real nutritional quality — nutrient density, protein, fiber,
          healthy fats, and beneficial compounds — with the score reacting to actual portions, not just
          calories. {recipeCount} recipes indexed.
        </p>
      </header>

      <ul className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <li key={c.slug}>
            <a href={`#${c.slug}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.02] pl-3 pr-2 py-1.5 hover:border-accent/40 transition-colors">
              <span className="text-sm font-semibold text-text">{c.category}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-muted">{c.count}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* diet collections (pSEO) */}
      <div className="mb-12">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Browse by diet</div>
        <ul className="flex flex-wrap gap-2">
          {recipeDietTags().map((d) => (
            <li key={d.slug}>
              <Link href={`/recipes/diet/${d.slug}`} className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.05] pl-3 pr-2 py-1.5 hover:border-accent/50 transition-colors">
                <span className="text-sm font-semibold text-accent">{d.tag}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-accent/10 text-accent">{d.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {categories.map(({ category, slug }) => (
        <section key={slug} id={slug} className="mb-14 scroll-mt-24">
          <div className="flex items-baseline justify-between mb-3 gap-3">
            <h2 className="text-xl font-bold text-text">{category}</h2>
            <span className="text-xs text-muted flex-shrink-0">{recipesByCategory(category).length} recipes</span>
          </div>
          {CATEGORY_DESCRIPTIONS[category] && (
            <p className="text-sm text-muted leading-relaxed mb-5 max-w-3xl">{CATEGORY_DESCRIPTIONS[category]}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipesByCategory(category).slice(0, 24).map((r) => {
              const color = recipeColor(r);
              const mins = totalMinutes(r);
              return (
                <Link
                  key={r.id}
                  href={`/recipes/${r.id}`}
                  className="group rounded-xl border border-border bg-white/[0.02] overflow-hidden hover:border-accent/40 transition-colors"
                >
                  <div className="relative aspect-[16/10] bg-white/[0.02]">
                    {r.image_url && <Image src={r.image_url} alt="" fill sizes="(max-width:640px) 100vw, 360px" className="object-cover group-hover:scale-[1.03] transition-transform" />}
                    <ScoreMeter score={r.score} size={38} strokeWidth={3} color={color} className="absolute top-2 right-2 bg-bg/70 backdrop-blur rounded-full" />
                  </div>
                  <div className="p-3.5">
                    <div className="text-sm font-semibold text-text leading-snug line-clamp-1">{r.name}</div>
                    <div className="text-xs text-muted mt-1 flex items-center gap-2">
                      {mins && <span>{mins} min</span>}
                      {mins && r.servings && <span>·</span>}
                      {r.servings && <span>{r.servings} serving{r.servings > 1 ? "s" : ""}</span>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {recipesByCategory(category).length > 24 && (
            <p className="text-xs text-muted mt-4">
              Showing the top 24 of {recipesByCategory(category).length}{" "}
              {category.toLowerCase()} recipes by score.{" "}
              <Link
                href={`/recipes/category/${slug}`}
                className="text-accent font-semibold hover:underline"
              >
                See all {recipesByCategory(category).length} →
              </Link>
            </p>
          )}
        </section>
      ))}

      <section className="mt-4">
        <h2 className="text-2xl font-bold text-text mb-6">Frequently asked questions</h2>
        <div className="space-y-5 max-w-3xl">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-base font-semibold text-text mb-1.5">{f.q}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <NewsletterSignup source="recipes-hub" />
    </main>
  );
}
