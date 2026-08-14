import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import { getLocale, routedLocales, SITE_URL } from "@/lib/i18n/locales";
// Reuse the English root layout's font instance and organisation JSON-LD
// verbatim. A second `Inter()` call would emit a second @font-face and a
// different CSS variable, and a hand-copied JSON-LD graph would drift.
import { inter, jsonLd } from "../../(en)/layout";

/**
 * The SECOND root layout.
 *
 * It exists for one attribute. `<html lang>` can only be set by a root layout,
 * and until this split the localised pages inherited the English tree's
 * `lang="en"` — so the static HTML for /es told every crawler and screen reader
 * that a Spanish page was English. Route groups let one app have several root
 * layouts without changing a single URL: /es resolves here, /foods/x still
 * resolves to the untouched English tree.
 *
 * The cost is that navigating between the two trees is a full document load
 * rather than a client transition. For a language switch that is correct
 * anyway — the whole document, `lang` included, has to change.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return routedLocales().map((l) => ({ locale: l.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const def = getLocale(locale);
  if (!def) return {};

  // NOINDEX UNTIL THE COPY IS REAL. The route works for a human the moment it
  // exists, but Google treats thin or bulk machine-translated pages as spam,
  // and on a domain that ranks, publishing those costs more than publishing
  // nothing. Flip `indexable` in locales.ts once the copy is done AND reviewed.
  if (!def.indexable) {
    return {
      robots: { index: false, follow: true },
      alternates: { canonical: `${SITE_URL}/${def.code}` },
    };
  }

  return {
    alternates: {
      canonical: `${SITE_URL}/${def.code}`,
      languages: Object.fromEntries([
        ["x-default", SITE_URL],
        ...routedLocales()
          .filter((l) => l.indexable)
          .map((l) => [l.code, `${SITE_URL}/${l.code}`]),
      ]),
    },
  };
}

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const def = getLocale(locale);
  if (!def) notFound();

  return (
    <SiteShell
      lang={def.code}
      dir={def.dir}
      fontVariable={inter.variable}
      jsonLd={jsonLd}
    >
      {children}
    </SiteShell>
  );
}
