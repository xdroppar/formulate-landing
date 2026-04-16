/**
 * Comparison table for roundup guides. Shows products side-by-side with
 * scores and key attributes. Responsive: stacks vertically on mobile.
 *
 * Usage in a guide:
 *   <ComparisonTable
 *     products={[PRODUCTS["thorne-creatine"], PRODUCTS["nootropics-depot-creatine"]]}
 *     columns={[
 *       { label: "Form", key: "form" },
 *       { label: "Dose/serving", key: "dose" },
 *       { label: "Certifications", key: "certs" },
 *       { label: "Price/serving", key: "price" },
 *     ]}
 *     data={{
 *       "thorne-creatine": { form: "Monohydrate (Creapure)", dose: "5g", certs: "NSF Sport", price: "$0.60" },
 *       "nootropics-depot-creatine": { form: "Monohydrate", dose: "5g", certs: "In-house", price: "$0.30" },
 *     }}
 *   />
 */

import { type GuideProduct, catalogUrl } from "./products";

interface Column {
  label: string;
  key: string;
}

interface ComparisonTableProps {
  products: GuideProduct[];
  columns: Column[];
  data: Record<string, Record<string, string>>;
}

function scoreColor(score: number): string {
  if (score >= 85) return "#10B981";
  if (score >= 70) return "#3B82F6";
  if (score >= 55) return "#F59E0B";
  return "#EF4444";
}

export function ComparisonTable({ products, columns, data }: ComparisonTableProps) {
  return (
    <div className="not-prose my-8">
      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-bold text-muted tracking-wide uppercase py-3 pr-4 min-w-[140px]">
                Product
              </th>
              <th className="text-center text-xs font-bold text-muted tracking-wide uppercase py-3 px-3 w-16">
                Score
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left text-xs font-bold text-muted tracking-wide uppercase py-3 px-3"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => {
              const row = data[product.slug] ?? {};
              const color = scoreColor(product.score);
              return (
                <tr
                  key={product.slug}
                  className={`border-b border-border/50 hover:bg-surface/50 transition-colors ${
                    i === 0 ? "bg-accent/[0.03]" : ""
                  }`}
                >
                  <td className="py-3 pr-4">
                    <a
                      href={catalogUrl(product.slug)}
                      className="group flex items-center gap-2 text-text font-semibold hover:text-accent transition-colors"
                    >
                      <span className="truncate">{product.brand}</span>
                      <span className="text-muted font-normal truncate">
                        {product.name}
                      </span>
                    </a>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className="inline-block font-extrabold text-sm tabular-nums"
                      style={{ color }}
                    >
                      {product.score}
                    </span>
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className="py-3 px-3 text-muted">
                      {row[col.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-muted/60 mt-2">
        Scores are from Formulate&rsquo;s 6-pillar methodology. Tap a product
        for the full score breakdown.
      </p>
    </div>
  );
}
