import { comparisonBySlug } from "@/lib/comparisons";
import { ingredientBySlug } from "@/lib/encyclopedia";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate supplement comparison";

export default async function Image({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  const c = comparisonBySlug(pair);
  const a = c ? ingredientBySlug(c.a) : null;
  const b = c ? ingredientBySlug(c.b) : null;
  const title = a && b ? `${a.name} vs ${b.name}` : "Supplement Comparison";

  return renderOgImage({
    topic: "Compare",
    title,
    subtitle: c?.bottom_line,
  });
}
