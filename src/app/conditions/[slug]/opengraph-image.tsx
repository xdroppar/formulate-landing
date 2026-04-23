import { conditionBySlug } from "@/lib/conditions";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate supplement guide";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = conditionBySlug(slug);

  return renderOgImage({
    topic: "Condition",
    title: c ? `Supplements for ${c.name}` : "Supplement Support",
    subtitle: c?.tagline,
  });
}
