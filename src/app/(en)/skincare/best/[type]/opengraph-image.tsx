import { skinTypeBySlug } from "@/lib/skincare";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate skincare rankings";

export default async function Image({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const t = skinTypeBySlug(type);
  const top = t?.products[0];
  return renderOgImage({
    topic: "Skincare, ranked by ingredients",
    title: t ? `Best ${t.plural}` : "Best skincare",
    subtitle: top ? `Top of ${t!.products.length}: ${top.name} — ${top.score}/100` : undefined,
  });
}
