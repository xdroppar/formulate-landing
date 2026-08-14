import {
  CATEGORY_META,
  formatTarget,
  nutrientBySlug,
  referenceTypeLabel,
} from "@/lib/nutrients";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate nutrient reference card";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = nutrientBySlug(slug);

  if (!n) {
    return renderOgImage({
      topic: "Nutrient",
      title: "Nutrient reference",
    });
  }

  const meta = CATEGORY_META[n.category];
  const ulFragment =
    n.upper_limit != null ? ` · UL ${n.upper_limit} ${n.unit}` : "";
  const subtitle = `${referenceTypeLabel(n.reference_type)} ${formatTarget(n)}${ulFragment}`;

  return renderOgImage({
    topic: meta.label,
    title: n.name,
    subtitle,
    accentColor: meta.color,
  });
}
