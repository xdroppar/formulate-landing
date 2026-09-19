import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate";

export default function Image() {
  return renderOgImage({
    topic: "Conditions",
    title: "Supplements by condition",
    subtitle: "Evidence-rated picks, doses, and when to see a clinician",
  });
}
