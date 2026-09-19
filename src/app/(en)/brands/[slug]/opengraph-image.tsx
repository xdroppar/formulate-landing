import { brandBySlug } from "@/lib/products";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate brand grades";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = brandBySlug(slug);
  const avg = b?.avg_score != null ? ` · average ${Math.round(b.avg_score)}/100` : "";
  return renderOgImage({ topic: "Brand", title: b?.name ?? "Supplement brand", subtitle: b ? `${b.product_count} products scored${avg}` : undefined });
}
