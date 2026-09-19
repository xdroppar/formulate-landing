import { skinBrandBySlug } from "@/lib/skincare";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate skincare brands";

export default async function Image({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const b = skinBrandBySlug(brand);
  const avg = b ? Math.round(b.products.reduce((s, p) => s + p.score, 0) / b.products.length) : null;
  return renderOgImage({ topic: "Skincare brand", title: b?.name ?? "Skincare brand", subtitle: b ? `${b.products.length} products scored · average ${avg}/100` : undefined });
}
