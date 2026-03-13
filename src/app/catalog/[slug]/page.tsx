import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProducts, getProductBySlug } from "@/lib/catalog";
import { isDevUser } from "@/lib/roles";
import { ScoreRing } from "@/components/score-ring";
import { DevBadge } from "@/components/dev-badge";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts(true);
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not Found — Formulate" };
  return {
    title: `${product.name} by ${product.brand} — Formulate`,
    description: `Score: ${product.score}/100. ${product.explanation || ""}`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const isDev = await isDevUser();
  if (product.is_draft && !isDev) notFound();

  const scoreColor =
    product.score === null
      ? "text-muted"
      : product.score >= 75
        ? "text-accent"
        : product.score >= 50
          ? "text-warning"
          : "text-danger";

  return (
    <div className="pt-24 px-6 pb-16 max-w-[900px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted mb-8">
        <Link href="/catalog" className="hover:text-accent transition-colors">
          Catalog
        </Link>
        <span>/</span>
        <span className="text-text">{product.name}</span>
      </div>

      {/* Hero section */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Image */}
        <div className="w-full md:w-64 h-64 rounded-2xl bg-surface border border-border flex items-center justify-center shrink-0">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-contain rounded-2xl" />
          ) : (
            <span className="text-6xl opacity-15">💊</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-xs text-muted font-medium">{product.brand}</div>
            {product.is_draft && isDev && <DevBadge />}
          </div>
          <h1 className="text-3xl font-extrabold tracking-[-0.5px] mb-4">{product.name}</h1>

          <div className="flex items-center gap-6 mb-6">
            <ScoreRing score={product.score} size={80} strokeWidth={6} />
            <div>
              <div className={`text-4xl font-black ${scoreColor}`}>
                {product.score ?? "–"}
                <span className="text-lg text-muted font-medium">/100</span>
              </div>
              {product.grade && (
                <span className={`grade-${product.grade[0].toLowerCase()} inline-block mt-1 px-2.5 py-0.5 rounded-md text-xs font-bold`}>
                  Grade {product.grade}
                </span>
              )}
            </div>
          </div>

          {product.explanation && (
            <p className="text-sm text-muted leading-relaxed mb-4">{product.explanation}</p>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-surface2 text-muted border border-border">
              {product.category}
            </span>
            {product.category_tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-surface2 text-muted border border-border">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 text-xs text-muted">
            {product.price_usd && <span>${product.price_usd.toFixed(2)}</span>}
            {product.form && <span>{product.form}</span>}
            {product.serving_size && <span>{product.serving_size}</span>}
            {product.servings_per_container && <span>{product.servings_per_container} servings</span>}
          </div>
        </div>
      </div>

      {/* Score breakdown */}
      {product.score_components.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-4">Score Breakdown</h2>
          <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
            {product.score_components.map((comp) => {
              const pct = Math.round(comp.raw_score);
              const barColor =
                pct >= 75 ? "bg-accent" : pct >= 50 ? "bg-warning" : "bg-danger";
              return (
                <div key={comp.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{comp.name}</span>
                    <span className="text-muted">
                      {comp.raw_score.toFixed(0)}
                      <span className="opacity-50 ml-1">× {(comp.weight * 100).toFixed(0)}%</span>
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColor} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Ingredients */}
      {product.ingredients.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-4">Active Ingredients</h2>
          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted text-xs">
                  <th className="px-5 py-3 font-medium">Ingredient</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium hidden sm:table-cell">Form</th>
                  <th className="px-5 py-3 font-medium text-right">% DV</th>
                </tr>
              </thead>
              <tbody>
                {product.ingredients.map((ing, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="px-5 py-3 font-medium">{ing.name}</td>
                    <td className="px-5 py-3 text-muted">
                      {ing.amount !== null ? `${ing.amount} ${ing.unit || ""}` : "–"}
                    </td>
                    <td className="px-5 py-3 text-muted hidden sm:table-cell">
                      {ing.form_details || "–"}
                    </td>
                    <td className="px-5 py-3 text-muted text-right">
                      {ing.daily_value_pct !== null ? `${ing.daily_value_pct}%` : "–"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Other ingredients */}
      {product.other_ingredients.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-4">Other Ingredients</h2>
          <p className="text-sm text-muted leading-relaxed">
            {product.other_ingredients.join(", ")}
          </p>
        </section>
      )}

      {/* Certifications */}
      {product.certifications.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-4">Certifications</h2>
          <div className="flex flex-wrap gap-2">
            {product.certifications.map((cert) => (
              <span key={cert} className="px-3 py-1.5 rounded-xl text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                {cert}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="pt-4 border-t border-border">
        <Link href="/catalog" className="text-sm text-accent hover:text-[#00ffb3] transition-colors">
          ← Back to catalog
        </Link>
      </div>
    </div>
  );
}
