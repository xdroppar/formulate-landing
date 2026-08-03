import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  recipeCategories,
  categoryByCategorySlug,
  recipesByCategory,
  recipeColor,
  totalMinutes,
} from "@/lib/recipes";
import { PageConversion } from "@/components/page-conversion";
import { ScoreMeter } from "@/components/score-meter";

/**
 * Full listing for one recipe category.
 *
 * Exists because /recipes showed only `slice(0, 24)` per category and said
 * "Showing the top 24 of 141" with nothing to click. With six categories that
 * left 575 of 719 recipes linked from nowhere on the site — present in the
 * sitemap, reachable by no internal link. Search Console reported 904 pages
 * "not indexed", and orphaned recipes are the single biggest block of it:
 * Google discovers a URL from the sitemap, sees nothing links to it, and reads
 * that as a page the site itself doesn't consider worth linking.
 *
 * The lib already exported `categoryByCategorySlug` for a route that was never
 * built — this is that route.
 *
 * Lists the WHOLE category rather than paginating. ~141 links on a page is
 * well within what crawlers handle, and paginating would just move the orphan
 * problem to page 2.
 */

const BASE = "https://formulate-health.app";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return recipeCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryByCategorySlug(slug);
  if (!category) return {};
  const count = recipesByCategory(category).length;
  const title = `${category} Recipes — All ${count}, Scored & Ranked`;
  const description = `Every ${category.toLowerCase()} recipe in the Formulate catalog — ${count} in total, each graded on real nutritional quality and ranked best-first.`;
  return {
    title: title,
    description,
    alternates: { canonical: `${BASE}/recipes/category/${slug}` },
    openGraph: { title, description, type: "website", url: `${BASE}/recipes/category/${slug}` },
  };
}

export default async function CategoryCollection({ params }: { params: Params }) {
  const { slug } = await params;
  const category = categoryByCategorySlug(slug);
  if (!category) notFound();
  const list = recipesByCategory(category);
  const others = recipeCategories().filter((c) => c.slug !== slug);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category} Recipes, Ranked`,
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
        <span className="text-text">{category}</span>
      </nav>

      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
          {category} Recipes
        </h1>
        <p className="text-base text-muted leading-relaxed">
          All {list.length} {category.toLowerCase()} recipes in the catalog, each graded on real
          nutritional quality — nutrient density, protein, fiber, healthy fats and beneficial
          compounds — and ranked best-first.
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
                  {mins && <span>{mins} min</span>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">Browse other categories</h2>
        <ul className="flex flex-wrap gap-2">
          {others.map((c) => (
            <li key={c.slug}>
              <Link href={`/recipes/category/${c.slug}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.02] pl-3 pr-2 py-1.5 hover:border-accent/40 transition-colors">
                <span className="text-sm font-semibold text-text">{c.category}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-muted">{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <PageConversion kind="recipe" slug={slug} />
    </main>
  );
}
