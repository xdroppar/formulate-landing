import { getAllBrands } from "@/lib/catalog";
import { BrandCard } from "@/components/brand-card";

export const metadata = {
  title: "Brands — Formulate",
  description: "See how supplement brands stack up based on product quality scores.",
};

export default async function BrandsPage() {
  const brands = await getAllBrands();
  const sorted = [...brands].sort((a, b) => (b.score ?? b.avg_score ?? 0) - (a.score ?? a.avg_score ?? 0));

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
          <BrandCard key={brand.slug} brand={brand} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}
