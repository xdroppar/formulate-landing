import { getAllProducts } from "@/lib/catalog";
import { StackPageClient } from "./stack-client";

export const metadata = {
  title: "My Stack — Formulate",
  description: "Your personal supplement stack",
};

export default async function StackPage() {
  const products = await getAllProducts();

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-28 pb-16">
      <h1 className="text-3xl font-bold text-text mb-2">My Stack</h1>
      <p className="text-sm text-muted mb-8">
        Your curated supplement stack. Add products from the catalog to build your regimen.
      </p>
      <StackPageClient products={products} />
    </div>
  );
}
