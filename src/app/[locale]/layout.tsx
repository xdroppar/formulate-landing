import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, routedLocales, SITE_URL } from "@/lib/i18n/locales";

/**
 * Localised route tree, added ALONGSIDE the English routes rather than
 * replacing them.
 *
 * The conventional move is to relocate every page under `src/app/[locale]/`.
 * Here that would mean moving 49 pages, 20 of which are programmatic-SEO
 * routes with their own `generateStaticParams` — a large refactor of the pages
 * that earn the traffic, in the same change as a language picker. Adding the
 * tree instead means `/foods/x` keeps resolving to the untouched English
 * route (Next.js prefers a static segment over a dynamic one), while `/es`
 * resolves here. Nothing that currently ranks is touched.
 *
 * `dynamicParams = false` is the guard that makes this safe. Without it a
 * root-level `[locale]` swallows every unmatched top-level path — `/typo`
 * would render as locale "typo" instead of a 404. With it, only the locales
 * listed below exist and everything else falls through to the normal 404.
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

  // NOINDEX UNTIL THE COPY IS REAL.
  //
  // The route works for a human the moment it exists — chrome is translated
  // and the page is reachable. But the body copy is still English, and Google
  // treats bulk machine-translated or thin localised pages as spam. On a
  // domain that ranks, publishing those costs more than publishing nothing.
  // So an untranslated locale is served, and hidden from crawlers, until
  // `indexable` flips in locales.ts.
  if (!def.indexable) {
    return {
      robots: { index: false, follow: true },
      alternates: { canonical: `${SITE_URL}/${def.code}` },
    };
  }

  return {
    alternates: {
      canonical: `${SITE_URL}/${def.code}`,
      languages: Object.fromEntries(
        [
          ["x-default", SITE_URL],
          ...routedLocales()
            .filter((l) => l.indexable)
            .map((l) => [l.code, `${SITE_URL}/${l.code}`]),
        ],
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!getLocale(locale)) notFound();
  return <>{children}</>;
}
