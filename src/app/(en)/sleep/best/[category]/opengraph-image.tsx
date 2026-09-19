import { sleepCategoryBySlug } from "@/lib/sleep";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate sleep rankings";

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = sleepCategoryBySlug(category);
  const top = c?.peers[0]?.products[0];
  return renderOgImage({
    topic: "Sleep, compared like with like",
    title: c ? `Best ${c.name}` : "Best sleep gear",
    subtitle: top ? `Top: ${top.brand} ${top.name} — ${top.quality}/100 declared quality` : undefined,
  });
}
