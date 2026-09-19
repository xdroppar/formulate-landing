import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate";

export default function Image() {
  return renderOgImage({
    topic: "iPhone app",
    title: "Formulate for iPhone",
    subtitle: "Score what you take, log it, and see what it covers",
  });
}
