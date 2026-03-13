"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/product-card";
import { InsightsPanel } from "@/components/insights-panel";
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
  const [scoreRange, setScoreRange] = useState<[number, number] | null>(null);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);

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

    // Score range filter
    if (scoreRange) {
      result = result.filter(
        (p) =>
          p.score !== null &&
          p.score >= scoreRange[0] &&
          p.score <= scoreRange[1]
      );
    }

    // Brand filter
    if (brandFilter) {
      result = result.filter((p) => p.brand === brandFilter);
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
  }, [products, search, category, sort, sortAsc, scoreRange, brandFilter]);

  // Active filter chips
  const activeFilters: { label: string; clear: () => void }[] = [];
  if (scoreRange) {
    activeFilters.push({
      label: `Score ${scoreRange[0]}–${scoreRange[1]}`,
      clear: () => setScoreRange(null),
    });
  }
  if (brandFilter) {
    activeFilters.push({
      label: brandFilter,
      clear: () => setBrandFilter(null),
    });
  }
  if (category !== "all") {
    activeFilters.push({
      label: category,
      clear: () => setCategory("all"),
    });
  }

  return (
    <div className="flex gap-3 items-start">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Filters bar */}
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl bg-surface border border-border text-text text-sm placeholder:text-muted focus:border-accent focus:outline-none transition-colors"
          />
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
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="px-3 py-2.5 rounded-xl bg-surface border border-border text-muted text-sm hover:border-accent hover:text-accent transition-colors cursor-pointer"
            title={sortAsc ? "Ascending" : "Descending"}
          >
            {sortAsc ? "↑" : "↓"}
          </button>
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {activeFilters.map((f) => (
              <button
                key={f.label}
                onClick={f.clear}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors cursor-pointer"
              >
                {f.label}
                <span className="text-accent/60">×</span>
              </button>
            ))}
            <button
              onClick={() => {
                setScoreRange(null);
                setBrandFilter(null);
                setCategory("all");
              }}
              className="text-[11px] text-muted hover:text-accent transition-colors cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results count */}
        <div className="text-xs text-muted mb-4">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          {search && ` matching "${search}"`}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
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
      </div>

      {/* Insights sidebar — flush right, independently scrollable */}
      <div className="hidden 2xl:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <InsightsPanel
          products={products}
          onScoreRangeClick={(min, max) => {
            if (scoreRange && scoreRange[0] === min && scoreRange[1] === max) {
              setScoreRange(null);
            } else {
              setScoreRange([min, max]);
            }
          }}
          onCategoryClick={(cat) => {
            setCategory(category === cat ? "all" : cat);
          }}
          onBrandClick={(brand) => {
            setBrandFilter(brandFilter === brand ? null : brand);
          }}
        />
      </div>
    </div>
  );
}
