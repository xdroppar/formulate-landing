import Link from "next/link";
import { getAllBrands } from "@/lib/catalog";
import { ScoreRing } from "@/components/score-ring";

export const metadata = {
  title: "Brands — Formulate",
  description: "See how supplement brands stack up based on product quality scores.",
};

export default async function BrandsPage() {
  const brands = await getAllBrands();
  const sorted = [...brands].sort((a, b) => (b.avg_score ?? 0) - (a.avg_score ?? 0));

  return (
    <div className="pt-24 px-6 pb-16 max-w-[1200px] mx-auto">
      <div className="mb-10">
        <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">Brands</div>
        <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] mb-2">
          Brand Rankings
        </h1>
        <p className="text-muted text-base max-w-[500px]">
          Scores derived from product data, not marketing. Higher average = more consistent quality.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((brand, i) => (
          <Link
            key={brand.slug}
            href={`/catalog?brand=${brand.slug}`}
            className="group bg-surface border border-border rounded-2xl p-6 hover:border-accent/30 hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center gap-4">
              <ScoreRing score={brand.avg_score} size={56} strokeWidth={4} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted font-mono">#{i + 1}</span>
                  <h3 className="text-base font-bold group-hover:text-accent transition-colors">
                    {brand.name}
                  </h3>
                </div>
                <div className="text-xs text-muted mt-1">
                  {brand.product_count} product{brand.product_count !== 1 ? "s" : ""}
                  {brand.top_category && <span className="ml-2 opacity-60">· {brand.top_category}</span>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
