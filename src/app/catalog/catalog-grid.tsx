"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/product-card";
import type { CatalogProduct } from "@/lib/types";

interface CatalogGridProps {
  products: CatalogProduct[];
  categories: string[];
  isDev: boolean;
}

type SortKey = "score" | "name" | "price" | "brand";

export function CatalogGrid({ products, categories, isDev }: CatalogGridProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("score");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    let result = products;

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category_tags.some((t) => t.includes(q))
      );
    }

    // Category filter
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Sort
    result = [...result].sort((a, b) => {
      let cmp = 0;
      switch (sort) {
        case "score":
          cmp = (b.score ?? 0) - (a.score ?? 0);
          break;
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "price":
          cmp = (a.price_usd ?? 999) - (b.price_usd ?? 999);
          break;
        case "brand":
          cmp = a.brand.localeCompare(b.brand);
          break;
      }
      return sortAsc ? -cmp : cmp;
    });

    return result;
  }, [products, search, category, sort, sortAsc]);

  return (
    <>
      {/* Filters bar */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl bg-surface border border-border text-text text-sm placeholder:text-muted focus:border-accent focus:outline-none transition-colors"
        />

        {/* Category dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-surface border border-border text-text text-sm focus:border-accent focus:outline-none transition-colors cursor-pointer"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Sort dropdown */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="px-4 py-2.5 rounded-xl bg-surface border border-border text-text text-sm focus:border-accent focus:outline-none transition-colors cursor-pointer"
        >
          <option value="score">Sort by Score</option>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="brand">Sort by Brand</option>
        </select>

        {/* Sort direction */}
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="px-3 py-2.5 rounded-xl bg-surface border border-border text-muted text-sm hover:border-accent hover:text-accent transition-colors cursor-pointer"
          title={sortAsc ? "Ascending" : "Descending"}
        >
          {sortAsc ? "↑" : "↓"}
        </button>
      </div>

      {/* Results count */}
      <div className="text-xs text-muted mb-4">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        {search && ` matching "${search}"`}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showDevBadge={isDev}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-4xl mb-4 opacity-20">🔍</div>
          <div className="text-muted text-sm">No products found</div>
        </div>
      )}
    </>
  );
}
