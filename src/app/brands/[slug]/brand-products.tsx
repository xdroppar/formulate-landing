"use client";

import { ProductCard } from "@/components/product-card";
import type { CatalogProduct } from "@/lib/types";

interface BrandProductsProps {
  products: CatalogProduct[];
}

export function BrandProducts({ products }: BrandProductsProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-muted text-sm">
        No products available yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
