import type { Metadata } from "next";
import { ConsoleLanding } from "@/components/console/console-landing";
import { getShelfCards, getScoredTotal } from "@/lib/console-shelf";

/**
 * /preview — the console landing, on the real domain, beside the live one.
 *
 * The homepage it is meant to replace carries the FAQ JSON-LD, the localized
 * routes and the tracked CTAs that are the only way this product learns
 * anything about its funnel. Swapping it unseen would put all of that at risk
 * to a design nobody had looked at yet. So the new one ships at its own URL
 * first; the swap is then one import, made once somebody has seen it.
 *
 * noindex while it lives here: two pages making the same pitch on one domain
 * is the duplicate-content problem, and this one is the draft.
 */
export const metadata: Metadata = {
  title: "Formulate — Score it. Track it. Test it.",
  description:
    "What you take, eat, train and sleep — scored across six pillars, tracked day by day, and lined up against your bloodwork.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://formulate-health.app" },
};

export default function PreviewPage() {
  // read on the server: the catalogs are 2,185 rows and must not reach the client
  return <ConsoleLanding shelf={getShelfCards()} scoredTotal={getScoredTotal()} />;
}
