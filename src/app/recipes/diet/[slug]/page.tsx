import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  recipeDietTags,
  dietByDietSlug,
  recipesByDiet,
  recipeColor,
  totalMinutes,
} from "@/lib/recipes";
import { withUtm } from "@/lib/app-url";
import { ScoreMeter } from "@/components/score-meter";

const BASE = "https://formulate-health.app";
const APP_URL = "https://app.formulate-health.app";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return recipeDietTags().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const tag = dietByDietSlug(slug);
  if (!tag) return {};
  const count = recipesByDiet(tag).length;
  const title = `${tag} Recipes — ${count} Scored & Ranked`;
  const description = `${count} ${tag.toLowerCase()} recipes, each graded on real nutritional quality and ranked best-first. Find ${tag.toLowerCase()} meals that actually score well.`;
  return {
    title: `${title} | Formulate`,
    description,
    alternates: { canonical: `${BASE}/recipes/diet/${slug}` },
    openGraph: { title, description, type: "website", url: `${BASE}/recipes/diet/${slug}` },
  };
}

export default async function DietCollection({ params }: { params: Params }) {
  const { slug } = await params;
  const tag = dietByDietSlug(slug);
  if (!tag) notFound();
  const list = recipesByDiet(tag);
  const others = recipeDietTags().filter((d) => d.slug !== slug);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${tag} Recipes, Ranked`,
    numberOfItems: list.length,
    itemListElement: list.slice(0, 30).map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/recipes/${r.id}`,
      name: r.name,
    })),
  };

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <nav className="text-xs text-muted mb-6 flex items-center gap-1.5">
        <Link href="/recipes" className="hover:text-accent transition-colors">Recipes</Link>
        <span>/</span>
        <span className="text-text">{tag}</span>
      </nav>

      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">{tag} Recipes</h1>
        <p className="text-base text-muted leading-relaxed">
          {list.length} {tag.toLowerCase()} recipes, each graded on real nutritional quality — nutrient density,
          protein, fiber, healthy fats, and beneficial compounds — and ranked best-first.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
        {list.map((r) => {
          const color = recipeColor(r);
          const mins = totalMinutes(r);
          return (
            <Link key={r.id} href={`/recipes/${r.id}`} className="group rounded-xl border border-border bg-white/[0.02] overflow-hidden hover:border-accent/40 transition-colors">
              <div className="relative aspect-[16/10] bg-white/[0.02]">
                {r.image_url && <Image src={r.image_url} alt="" fill sizes="(max-width:640px) 100vw, 360px" className="object-cover group-hover:scale-[1.03] transition-transform" />}
                <ScoreMeter score={r.score} size={38} strokeWidth={3} color={color} className="absolute top-2 right-2 bg-bg/70 backdrop-blur rounded-full" />
              </div>
              <div className="p-3.5">
                <div className="text-sm font-semibold text-text leading-snug line-clamp-1">{r.name}</div>
                <div className="text-xs text-muted mt-1 flex items-center gap-2">
                  <span>{r.category}</span>
                  {mins && <><span>·</span><span>{mins} min</span></>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <a
        href={withUtm(`${APP_URL}/meals`, { source: "landing", campaign: "recipe_diet_cta" })}
        className="flex items-center justify-between gap-4 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-4 mb-12 hover:border-accent/50 transition-colors"
      >
        <div>
          <div className="text-sm font-bold text-text">Build your {tag.toLowerCase()} meal plan — free</div>
          <div className="text-xs text-muted">Save recipes, track your macros, and see your nutrition add up in the app.</div>
        </div>
        <span className="text-sm font-semibold text-accent whitespace-nowrap">Open app →</span>
      </a>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">Browse other diets</h2>
        <ul className="flex flex-wrap gap-2">
          {others.map((d) => (
            <li key={d.slug}>
              <Link href={`/recipes/diet/${d.slug}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.02] pl-3 pr-2 py-1.5 hover:border-accent/40 transition-colors">
                <span className="text-sm font-semibold text-text">{d.tag}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-muted">{d.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
