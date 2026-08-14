import Home from "../page";
import { routedLocales } from "@/lib/i18n/locales";

/**
 * The localised homepage renders the SAME component as the English one.
 *
 * Wrapping rather than copying: a duplicated 939-line marketing page would
 * drift from the original within a week, and the English page is the one that
 * earns the traffic. Chrome (nav, footer) translates because the provider
 * reads the locale off the URL; the body copy is still English, which is
 * exactly why these locales are `indexable: false` and carry `noindex`.
 *
 * `generateStaticParams` has to live HERE, on the page, not only on the
 * layout. With it only on the layout the build still prints `● /[locale]` in
 * the route table, but emits zero pages — the manifest holds no `/es`, and the
 * route 404s at runtime. A green build listing a route it never generated is
 * the failure worth remembering: the table describes intent, the prerender
 * manifest describes reality.
 *
 * Translating the body is a change to this file — render a copy that pulls
 * from the catalogs instead of `<Home />` — plus flipping `indexable`.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return routedLocales().map((l) => ({ locale: l.code }));
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Locale flows down as a prop so the copy is rendered SERVER-side and
  // lands in the HTML a crawler receives.
  return <Home locale={locale} />;
}
