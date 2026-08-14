import { stackBySlug } from "@/lib/stacks";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate supplement stack";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = stackBySlug(slug);

  return renderOgImage({
    topic: "Stack",
    title: s?.name ?? "Supplement Stack",
    subtitle: s?.tagline,
  });
}
