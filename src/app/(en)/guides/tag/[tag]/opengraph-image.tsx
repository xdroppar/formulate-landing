import { getGuidesByTagSlug } from "@/lib/guides";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate guides";

export default async function Image({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const r = getGuidesByTagSlug(tag);
  return renderOgImage({ topic: "Guides", title: r ? `${r.tag} guides` : "Guides", subtitle: r ? `${r.guides.length} evidence-cited guides` : undefined });
}
