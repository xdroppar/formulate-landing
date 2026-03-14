import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllBrands, getBrandBySlug, getProductsByBrand } from "@/lib/catalog";
import { BrandProducts } from "./brand-products";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const brands = await getAllBrands();
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return { title: "Not Found — Formulate" };
  return {
    title: `${brand.name} — Formulate`,
    description: `Brand grade: ${brand.grade ?? "–"}. ${brand.product_count} products scored.`,
  };
}

const COMPONENT_META = [
  { key: "integrity" as const, label: "Integrity", color: "#8B5CF6" },
  { key: "product_quality" as const, label: "Product Quality", color: "#3B82F6" },
  { key: "innovation" as const, label: "Innovation", color: "#F59E0B" },
  { key: "transparency" as const, label: "Transparency", color: "#22C55E" },
  { key: "verification" as const, label: "Verification", color: "#06B6D4" },
] as const;

const GRADE_COLORS: Record<string, string> = {
  "A+": "#22C55E", A: "#22C55E", "A-": "#4ADE80",
  "B+": "#84CC16", B: "#A3E635", "B-": "#BEF264",
  "C+": "#FBC34D", C: "#FBBF24", "C-": "#F59E0B",
  "D+": "#FB923C", D: "#F97316", "D-": "#EA580C",
  F: "#EF4444",
};

function getGradeColor(grade: string | null): string {
  if (!grade) return "#6B7280";
  return GRADE_COLORS[grade] ?? "#6B7280";
}

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) notFound();

  const products = await getProductsByBrand(slug);
  const sortedProducts = [...products].sort((a, b) => {
    const cmp = (b.score ?? 0) - (a.score ?? 0);
    if (cmp !== 0) return cmp;
    return a.name.localeCompare(b.name);
  });

  const gradeColor = getGradeColor(brand.grade);
  const score = brand.score ?? brand.avg_score;

  return (
    <div className="pt-24 px-6 pb-16 max-w-[1200px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted mb-6">
        <Link href="/brands" className="hover:text-accent transition-colors">
          Brands
        </Link>
        <span>/</span>
        <span className="text-text">{brand.name}</span>
      </div>

      {/* Hero */}
      <div className="bg-surface border border-border rounded-2xl p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Grade + Name */}
          <div className="flex items-start gap-5 flex-1">
            <div
              className="w-20 h-20 rounded-full border-[3px] flex items-center justify-center shrink-0"
              style={{ borderColor: gradeColor }}
            >
              <span
                className="text-2xl font-extrabold leading-none"
                style={{ color: gradeColor }}
              >
                {brand.grade ?? "–"}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-[-0.5px] mb-1">
                {brand.name}
              </h1>
              {brand.standout && (
                <span
                  className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-2"
                  style={{
                    color: gradeColor,
                    backgroundColor: `${gradeColor}18`,
                  }}
                >
                  {brand.standout}
                </span>
              )}
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-xl font-black" style={{ color: gradeColor }}>
                  {score}/100
                </span>
                <span className="text-sm text-muted">
                  {brand.product_count} product{brand.product_count !== 1 ? "s" : ""}
                </span>
                {brand.confidence && (
                  <span className="text-xs text-muted capitalize">
                    · {brand.confidence} confidence
                  </span>
                )}
              </div>

              {/* Tags */}
              {brand.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {brand.tags.map((tag) => (
                    <span
                      key={tag.text}
                      className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-white/[0.05] text-muted"
                    >
                      {tag.icon && <span>{tag.icon}</span>}
                      {tag.text}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      {brand.components && (
        <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-xs font-bold tracking-[2px] uppercase text-muted mb-5">
            Score Breakdown
          </h2>
          <div className="space-y-3">
            {COMPONENT_META.map(({ key, label, color }) => {
              const val = brand.components![key];
              return (
                <div key={key} className="flex items-center gap-3">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-muted w-32 shrink-0">{label}</span>
                  <div className="flex-1 h-3 bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${val}%`,
                        backgroundColor: color,
                        opacity: 0.85,
                      }}
                    />
                  </div>
                  <span className="text-sm font-bold text-text w-8 text-right shrink-0">
                    {val}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Products */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold tracking-[2px] uppercase text-muted">
            Products ({sortedProducts.length})
          </h2>
        </div>
        <BrandProducts products={sortedProducts} />
      </div>
    </div>
  );
}
