import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { bestFoodGroups, groupByGroupSlug, foodsByGroup, foodColor } from "@/lib/foods";
import { withUtm } from "@/lib/app-url";

const BASE = "https://formulate-health.app";
const APP_URL = "https://app.formulate-health.app";

type Params = Promise<{ slug: string }>;

// "Vegetable" -> "Vegetables"; leave already-plural / uncountable groups as-is.
function plural(group: string): string {
  if (/s$/.test(group) || group === "Dairy" || group === "Seafood") return group;
  return `${group}s`;
}

export function generateStaticParams() {
  return bestFoodGroups().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const group = groupByGroupSlug(slug);
  if (!group) return {};
  const count = foodsByGroup(group).length;
  const gp = plural(group);
  const title = `The Healthiest ${gp}, Ranked (${count} Scored)`;
  const description = `The ${count} healthiest ${gp.toLowerCase()}, ranked by a nutrition score covering nutrient density, fiber, healthy fats, and beneficial plant compounds.`;
  return {
    title: `${title} | Formulate`,
    description,
    alternates: { canonical: `${BASE}/foods/best/${slug}` },
    openGraph: { title, description, type: "website", url: `${BASE}/foods/best/${slug}` },
  };
}

export default async function BestFoodGroup({ params }: { params: Params }) {
  const { slug } = await params;
  const group = groupByGroupSlug(slug);
  if (!group) notFound();
  const list = foodsByGroup(group);
  const others = bestFoodGroups().filter((g) => g.slug !== slug);
  const gp = plural(group);
  const gpl = gp.toLowerCase();

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `The Healthiest ${gp}, Ranked`,
    numberOfItems: list.length,
    itemListElement: list.slice(0, 30).map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/foods/${f.base_id}`,
      name: f.name,
    })),
  };

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <nav className="text-xs text-muted mb-6 flex items-center gap-1.5">
        <Link href="/foods" className="hover:text-accent transition-colors">Whole Foods</Link>
        <span>/</span>
        <span className="text-text">Healthiest {gp}</span>
      </nav>

      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">The Healthiest {gp}, Ranked</h1>
        <p className="text-base text-muted leading-relaxed">
          All {list.length} {gpl} in the Formulate catalog, ranked by a nutrition score covering
          nutrient density, fiber, healthy fats, and beneficial plant compounds.
        </p>
      </header>

      <ol className="space-y-3 mb-14">
        {list.map((f, i) => {
          const color = foodColor(f);
          return (
            <li key={f.base_id}>
              <Link href={`/foods/${f.base_id}`} className="flex items-center gap-4 rounded-xl border border-border bg-white/[0.02] p-3 hover:border-accent/40 transition-colors">
                <span className="w-7 text-center text-sm font-bold text-muted flex-shrink-0">{i + 1}</span>
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/[0.02] flex-shrink-0">
                  {f.image_url && <Image src={f.image_url} alt="" fill sizes="48px" className="object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-text leading-snug truncate">{f.name}</div>
                  {f.subgroup && <div className="text-xs text-muted truncate">{f.subgroup}</div>}
                </div>
                <span className="text-sm font-bold px-2.5 py-1 rounded flex-shrink-0" style={{ backgroundColor: `${color}1a`, color }}>{f.score}</span>
              </Link>
            </li>
          );
        })}
      </ol>

      <a
        href={withUtm(`${APP_URL}/meals`, { source: "landing", campaign: "food_best_cta" })}
        className="flex items-center justify-between gap-4 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-4 mb-12 hover:border-accent/50 transition-colors"
      >
        <div>
          <div className="text-sm font-bold text-text">Track the {gpl} you eat — free</div>
          <div className="text-xs text-muted">Log foods, watch your nutrient coverage fill in, and build a scored day.</div>
        </div>
        <span className="text-sm font-semibold text-accent whitespace-nowrap">Open app →</span>
      </a>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">Healthiest by group</h2>
        <ul className="flex flex-wrap gap-2">
          {others.map((g) => (
            <li key={g.slug}>
              <Link href={`/foods/best/${g.slug}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.02] pl-3 pr-2 py-1.5 hover:border-accent/40 transition-colors">
                <span className="text-sm font-semibold text-text">{g.group}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-muted">{g.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
