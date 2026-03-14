"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useStack } from "@/lib/stack-context";
import { useAuth } from "@/lib/auth-context";
import { ProductCard } from "@/components/product-card";
import { buildFlavorGroups } from "@/lib/flavor-groups";
import type { CatalogProduct } from "@/lib/types";

interface StackPageClientProps {
  products: CatalogProduct[];
}

export function StackPageClient({ products }: StackPageClientProps) {
  const { isSignedIn, isLoading } = useAuth();
  const stack = useStack();

  const stackProducts = useMemo(() => {
    if (stack.items.length === 0) return [];
    const idSet = new Set(stack.items);
    return products.filter((p) => idSet.has(p.id));
  }, [products, stack.items]);

  const grouped = useMemo(() => buildFlavorGroups(stackProducts), [stackProducts]);

  // Monthly cost estimate
  const monthlyCost = useMemo(() => {
    let total = 0;
    for (const p of stackProducts) {
      if (p.price_usd && p.servings_per_container && p.servings_per_container > 0) {
        const perDay = p.price_usd / p.servings_per_container;
        total += perDay * 30;
      }
    }
    return total;
  }, [stackProducts]);

  // Average score
  const avgScore = useMemo(() => {
    const scored = stackProducts.filter((p) => p.score !== null);
    if (scored.length === 0) return null;
    return Math.round(scored.reduce((s, p) => s + (p.score ?? 0), 0) / scored.length);
  }, [stackProducts]);

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <div className="text-muted text-sm">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4 opacity-20">🔒</div>
        <div className="text-muted text-sm mb-4">Sign in to view your stack</div>
      </div>
    );
  }

  if (stackProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4 opacity-20">📦</div>
        <div className="text-text font-semibold mb-2">Your stack is empty</div>
        <div className="text-muted text-sm mb-6">
          Browse the catalog and add supplements to build your stack.
        </div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-bg text-sm font-semibold hover:bg-[#00ffb3] transition-all"
        >
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Stats bar */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border">
          <span className="text-muted text-xs">Products</span>
          <span className="text-text font-bold text-sm">{stackProducts.length}</span>
        </div>
        {avgScore !== null && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border">
            <span className="text-muted text-xs">Avg Score</span>
            <span className="text-accent font-bold text-sm">{avgScore}</span>
          </div>
        )}
        {monthlyCost > 0 && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border">
            <span className="text-muted text-xs">Est. Monthly</span>
            <span className="text-text font-bold text-sm">${monthlyCost.toFixed(0)}/mo</span>
          </div>
        )}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
        {grouped.map((g) => (
          <ProductCard
            key={g.product.id}
            product={g.product}
            variants={g.variants.length >= 2 ? g.variants : undefined}
          />
        ))}
      </div>
    </>
  );
}
