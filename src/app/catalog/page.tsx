import { getAllProducts, getAllCategories } from "@/lib/catalog";
import { isDevUser } from "@/lib/roles";
import { CatalogGrid } from "./catalog-grid";

export const metadata = {
  title: "Supplement Catalog — Formulate",
  description: "Browse 500+ supplements scored against clinical research.",
};

export default async function CatalogPage() {
  const isDev = await isDevUser();
  const products = await getAllProducts(isDev);
  const categories = await getAllCategories();

  return (
    <div className="pt-24 px-4 pb-16 max-w-[1920px] mx-auto">
      <div className="mb-10">
        <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">Catalog</div>
        <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] mb-2">
          Supplement Scores
        </h1>
        <p className="text-muted text-base max-w-[500px]">
          Every product scored 0–100 on efficacy, dose quality, form, brand trust, and safety.
        </p>
      </div>

      <CatalogGrid
        products={products}
        categories={categories}
        isDev={isDev}
      />
    </div>
  );
}
