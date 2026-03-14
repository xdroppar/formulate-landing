"use client";

import { useMemo } from "react";
import { ProductCard } from "@/components/product-card";
import type { CatalogProduct } from "@/lib/types";
import { buildFlavorGroups } from "@/lib/flavor-groups";

interface BrandProductsProps {
  products: CatalogProduct[];
}

export function BrandProducts({ products }: BrandProductsProps) {
  const grouped = useMemo(() => buildFlavorGroups(products), [products]);

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-muted text-sm">
        No products available yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
      {grouped.map((g) => (
        <ProductCard
          key={g.product.id}
          product={g.product}
          variants={g.variants.length >= 2 ? g.variants : undefined}
        />
      ))}
    </div>
  );
}
