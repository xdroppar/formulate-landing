"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useStack, type StackEntry } from "@/lib/stack-context";
import { useAuth } from "@/lib/auth-context";
import { ProductCard } from "@/components/product-card";
import { buildFlavorGroups } from "@/lib/flavor-groups";
import type { CatalogProduct } from "@/lib/types";

/* ── Schedule slot config ─────────────────────────────────────── */

const SCHEDULE_SLOTS = [
  { key: "morning", label: "Morning", emoji: "☀️" },
  { key: "midday", label: "Midday", emoji: "🌤️" },
  { key: "evening", label: "Evening", emoji: "🌅" },
  { key: "bedtime", label: "Night", emoji: "🌙" },
] as const;

/* ── Tag info for filter pills ────────────────────────────────── */

const FILTER_TAGS: Record<string, { emoji: string; bg: string; text: string }> = {
  Fitness: { emoji: "💪", bg: "rgba(30,140,80,0.30)", text: "#60e0a0" },
  Energy: { emoji: "⚡", bg: "rgba(180,140,20,0.30)", text: "#f0d060" },
  Cognition: { emoji: "🧠", bg: "rgba(40,90,170,0.30)", text: "#70b0e8" },
  Heart: { emoji: "❤️", bg: "rgba(170,50,60,0.30)", text: "#f08090" },
  Sleep: { emoji: "🌙", bg: "rgba(100,60,160,0.30)", text: "#c0a0f0" },
  Immunity: { emoji: "🛡️", bg: "rgba(80,140,30,0.30)", text: "#b0e860" },
  Gut: { emoji: "🦠", bg: "rgba(60,60,160,0.30)", text: "#a0a0f0" },
};

/* ── Helpers ──────────────────────────────────────────────────── */

function getScheduleForProduct(entries: StackEntry[], productId: string): string | null {
  const entry = entries.find((e) => e.product_id === productId);
  return entry?.schedule_time ?? null;
}

function matchesFilter(product: CatalogProduct, filter: string): boolean {
  const tags = product.category_tags ?? [];
  const cat = product.category ?? "";
  const all = [...tags, cat].map((t) => t.toLowerCase());

  switch (filter) {
    case "Fitness":
      return all.some((t) => ["muscle", "sports performance", "endurance", "recovery", "fitness"].includes(t));
    case "Energy":
      return all.some((t) => ["energy"].includes(t));
    case "Cognition":
      return all.some((t) => ["cognition", "brain health", "memory", "nootropics"].includes(t));
    case "Heart":
      return all.some((t) => ["heart health", "heart", "cholesterol", "blood pressure"].includes(t));
    case "Sleep":
      return all.some((t) => ["sleep"].includes(t));
    case "Immunity":
      return all.some((t) => ["immune support", "immunity", "immune"].includes(t));
    case "Gut":
      return all.some((t) => ["gut health", "gut", "digestive", "probiotics", "prebiotics", "gi support"].includes(t));
    default:
      return true;
  }
}

/* ── Component ───────────────────────────────────────────────── */

interface StackPageClientProps {
  products: CatalogProduct[];
}

export function StackPageClient({ products }: StackPageClientProps) {
  const { isSignedIn, isLoading: authLoading } = useAuth();
  const stack = useStack();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const stackProducts = useMemo(() => {
    if (stack.items.length === 0) return [];
    const idSet = new Set(stack.items);
    return products.filter((p) => idSet.has(p.id));
  }, [products, stack.items]);

  // Products per schedule slot
  const slotCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const slot of SCHEDULE_SLOTS) counts[slot.key] = 0;
    for (const entry of stack.entries) {
      const key = entry.schedule_time || "morning";
      counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }, [stack.entries]);

  // Unique benefit tags across all stack products
  const availableFilters = useMemo(() => {
    const filterKeys = Object.keys(FILTER_TAGS);
    return filterKeys.filter((f) => stackProducts.some((p) => matchesFilter(p, f)));
  }, [stackProducts]);

  // Filtered + searched products
  const filteredProducts = useMemo(() => {
    let result = stackProducts;
    if (activeFilter) {
      result = result.filter((p) => matchesFilter(p, activeFilter));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          (p.category ?? "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [stackProducts, activeFilter, searchQuery]);

  const grouped = useMemo(() => buildFlavorGroups(filteredProducts), [filteredProducts]);

  // Cost calculations
  const totalStackCost = useMemo(() => {
    return stackProducts.reduce((sum, p) => sum + (p.price_usd ?? 0), 0);
  }, [stackProducts]);

  const dailyCost = useMemo(() => {
    let total = 0;
    for (const p of stackProducts) {
      if (p.price_usd && p.servings_per_container && p.servings_per_container > 0) {
        total += p.price_usd / p.servings_per_container;
      }
    }
    return total;
  }, [stackProducts]);

  const monthlyCost = useMemo(() => dailyCost * 30, [dailyCost]);

  const avgScore = useMemo(() => {
    const scored = stackProducts.filter((p) => p.score !== null);
    if (scored.length === 0) return null;
    return Math.round(scored.reduce((s, p) => s + (p.score ?? 0), 0) / scored.length);
  }, [stackProducts]);

  // ── Loading / auth states ─────────────────────────────────────

  if (authLoading || stack.isLoading) {
    return (
      <div className="text-center py-20">
        <div className="text-muted text-sm">Loading your stack...</div>
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

  // ── Main stack view ───────────────────────────────────────────

  return (
    <>
      {/* Cost summary bar — matches desktop app */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border">
          <span className="text-muted text-xs">Total Stack</span>
          <span className="text-accent font-bold text-sm">${totalStackCost.toFixed(0)}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border">
          <span className="text-muted text-xs">Daily Cost</span>
          <span className="text-text font-bold text-sm">${dailyCost.toFixed(0)}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border">
          <span className="text-muted text-xs">Monthly Est.</span>
          <span className="text-accent font-bold text-sm">${monthlyCost.toFixed(0)}</span>
        </div>
      </div>

      {/* Schedule timeline — matches desktop app time slot cards */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {SCHEDULE_SLOTS.map((slot) => {
          const count = slotCounts[slot.key] || 0;
          return (
            <div
              key={slot.key}
              className="flex-shrink-0 w-[120px] rounded-xl border border-border bg-surface p-3 text-center"
            >
              <div className="text-xs font-semibold text-text mb-1">
                {slot.emoji} {slot.label}
              </div>
              <div className="text-2xl font-bold text-text">{count}</div>
            </div>
          );
        })}
        {/* Add new slot placeholder */}
        <div className="flex-shrink-0 w-[120px] rounded-xl border border-dashed border-border/50 bg-surface/30 p-3 flex items-center justify-center">
          <span className="text-muted text-xl">+</span>
        </div>
      </div>

      {/* In Stack count + Add Supplement + Search */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="text-muted text-sm">In Stack:</span>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold">
            {stackProducts.length}
          </span>
        </div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-accent/40 text-accent text-xs font-semibold hover:bg-accent/10 transition-all"
        >
          + Add Supplement
        </Link>
        <div className="ml-auto">
          <input
            type="text"
            placeholder="🔍 Search supplements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-surface border border-border text-text text-xs placeholder:text-muted/60 w-[200px] focus:outline-none focus:border-accent/50"
          />
        </div>
      </div>

      {/* Filter tags — matches desktop app category pills */}
      {availableFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {availableFilters.map((filter) => {
            const info = FILTER_TAGS[filter]!;
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(isActive ? null : filter)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all"
                style={{
                  backgroundColor: isActive ? info.bg : "rgba(100,116,139,0.12)",
                  color: isActive ? info.text : "#94A3B8",
                  border: isActive ? `1px solid ${info.text}40` : "1px solid transparent",
                }}
              >
                {info.emoji} {filter}
              </button>
            );
          })}
        </div>
      )}

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

      {filteredProducts.length === 0 && stackProducts.length > 0 && (
        <div className="text-center py-12">
          <div className="text-muted text-sm">No supplements match your filter.</div>
        </div>
      )}
    </>
  );
}
