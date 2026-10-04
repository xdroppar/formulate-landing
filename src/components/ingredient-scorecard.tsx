import Link from "next/link";
import { scoreGrade, type Product } from "@/lib/products";

/**
 * Every scored product carrying this ingredient, ranked, with what a serving
 * costs.
 *
 * WHY THIS EXISTS. The ingredient page already knew which product scored
 * highest and offered that one — but a reader who searched the ingredient name
 * is deciding between products, and we were answering with a single pick and
 * four cards further down. The sites that outrank us on these exact queries
 * (supplementscored, thesupplementatlas, getevident) all put a scorecard of
 * ten to fifteen named products on the ingredient page itself. Splitting
 * "what is it" from "which one" across two page types means neither page
 * answers what was typed.
 *
 * WHY COST PER SERVING. It is the column none of them compute from a real
 * catalog, and it is the one that changes a decision: across 969 scored
 * products, cost per serving correlates NEGATIVELY with score (r = -0.19),
 * because the premium is mostly buying extra ingredients and extra
 * ingredients land under their studied dose. Showing price beside score on
 * every ingredient page is that finding, made local and useful.
 *
 * Price and servings are both nullable in the catalog, so the column is
 * rendered per row rather than gated for the whole table — a product with no
 * price still belongs in a ranking by score.
 */
export function IngredientScorecard({
  products,
  ingredientName,
}: {
  products: Product[];
  ingredientName: string;
}) {
  const scored = products.filter((p) => p.score != null);
  if (scored.length < 2) return null;

  const perServing = (p: Product): number | null => {
    if (p.price_usd == null || p.servings_per_container == null) return null;
    if (p.servings_per_container <= 0 || p.price_usd <= 0) return null;
    return p.price_usd / p.servings_per_container;
  };

  return (
    <section className="mb-10">
      <h2 className="text-sm font-bold uppercase tracking-wider text-accent mb-3">
        Every {ingredientName} product we have scored
      </h2>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-muted border-b border-border">
              <th className="py-2.5 px-3 font-semibold">#</th>
              <th className="py-2.5 px-3 font-semibold">Product</th>
              <th className="py-2.5 px-3 font-semibold text-right">Score</th>
              <th className="py-2.5 px-3 font-semibold text-right">Per serving</th>
            </tr>
          </thead>
          <tbody>
            {scored.map((p, i) => {
              const cps = perServing(p);
              return (
                <tr key={p.slug} className="border-b border-border/60 last:border-0">
                  <td className="py-2.5 px-3 text-muted tabular-nums">{i + 1}</td>
                  <td className="py-2.5 px-3">
                    <Link href={`/supplements/${p.slug}`} className="hover:text-accent">
                      <span className="text-muted">{p.brand}</span>{" "}
                      <span className="text-text font-medium">{p.name}</span>
                    </Link>
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums font-semibold">
                    {p.score}
                    <span className="text-muted font-normal"> {scoreGrade(p.score).letter}</span>
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums text-muted">
                    {cps == null ? "—" : `$${cps.toFixed(2)}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-muted/80 mt-2">
        Scored on dose accuracy, form, label transparency and third-party
        testing. Per-serving cost is list price divided by servings per
        container. No brand pays to be listed or ranked.
      </p>
    </section>
  );
}
