import { brandComparisonBySlug } from "@/lib/brand-comparisons";
import { brandBySlug } from "@/lib/products";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate brand comparison";

export default async function Image({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  const c = brandComparisonBySlug(pair);
  const a = c ? brandBySlug(c.a) : null;
  const b = c ? brandBySlug(c.b) : null;
  const title = a && b ? `${a.name} vs ${b.name}` : "Brand Comparison";

  return renderOgImage({
    topic: "Brand Review",
    title,
    subtitle: c?.bottom_line,
  });
}
