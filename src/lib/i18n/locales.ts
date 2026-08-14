/**
 * Locale registry for the SEO surface.
 *
 * This is deliberately NOT the same model as the app (formulate-web), and the
 * difference is the whole reason this file exists separately:
 *
 *   app      -> locale lives in a cookie. There is no SEO surface behind auth,
 *               so one URL serving many languages costs nothing.
 *   landing  -> locale lives in the URL (`/es/...`). A crawler has to be able
 *               to fetch a Spanish page at a stable, distinct address, and a
 *               cookie is invisible to it. One URL serving many languages means
 *               only one of them is ever indexed.
 *
 * `indexable` is the safety catch. A locale's route can exist and work for a
 * human long before its page COPY is translated. Google's spam policy treats
 * bulk machine-translated pages as spam, and a thin translation on a domain
 * that ranks is a liability to the whole domain rather than an asset. So a
 * locale ships as noindex until its body copy is genuinely done, and only then
 * does it enter the sitemap and start emitting hreflang.
 *
 * Flipping a locale live is therefore a one-field change here, once the copy
 * exists — not a code change.
 */

export interface LocaleDef {
  code: string;
  /** The language's name IN that language. Never an English exonym. */
  nativeName: string;
  englishName: string;
  dir: "ltr" | "rtl";
  /**
   * May search engines index this locale's pages?
   *
   * false => the route renders (chrome translated, body still English), is
   * excluded from the sitemap, emits no hreflang, and carries `noindex`.
   * Set true ONLY when the page copy for that locale is actually translated.
   */
  indexable: boolean;
}

export const LOCALES: readonly LocaleDef[] = [
  { code: "en", nativeName: "English", englishName: "English", dir: "ltr", indexable: true },
  { code: "es", nativeName: "Español", englishName: "Spanish", dir: "ltr", indexable: false },
  { code: "de", nativeName: "Deutsch", englishName: "German", dir: "ltr", indexable: false },
] as const;

export const DEFAULT_LOCALE = "en";
export const SITE_URL = "https://formulate-health.app";

const BY_CODE = new Map(LOCALES.map((l) => [l.code, l]));

export function getLocale(code: string | undefined | null): LocaleDef | undefined {
  if (!code) return undefined;
  return BY_CODE.get(code.toLowerCase().split("-")[0]);
}

/** Locales that get a `/xx` route. English stays at the bare root. */
export function routedLocales(): LocaleDef[] {
  return LOCALES.filter((l) => l.code !== DEFAULT_LOCALE);
}

/** Locales search engines may see. Drives sitemap entries and hreflang. */
export function indexableLocales(): LocaleDef[] {
  return LOCALES.filter((l) => l.indexable);
}

/** Prefix a path for a locale. English is unprefixed so existing URLs never move. */
export function localizedPath(locale: string, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

/**
 * Pull the locale out of a pathname.
 *
 * The URL is the single source of truth on this surface. Deriving locale from
 * the path (rather than a cookie or a header) is what keeps every page
 * statically generated: no dynamic server API is touched, so nothing opts out
 * of prerendering.
 */
export function localeFromPathname(pathname: string): string {
  const first = pathname.split("/").filter(Boolean)[0];
  const def = getLocale(first);
  // Only treat the segment as a locale if it is one we actually route.
  return def && def.code !== DEFAULT_LOCALE ? def.code : DEFAULT_LOCALE;
}

/** Strip a locale prefix, returning the underlying route. */
export function stripLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  const def = getLocale(parts[0]);
  if (def && def.code !== DEFAULT_LOCALE) parts.shift();
  return `/${parts.join("/")}`;
}

/**
 * Best supported locale for an Accept-Language header, q-weighted.
 *
 * `en;q=0.5,de;q=0.9` is a German speaker; header order is not preference
 * order. Same algorithm as formulate-api's `_preferred_language` and the app's
 * negotiator, on purpose — three implementations that disagree would produce
 * three different answers to one question.
 *
 * NOTE: this is used only to OFFER a language, never to redirect. Google
 * explicitly warns against Accept-Language redirects: Googlebot crawls with
 * en headers from US addresses, so auto-redirecting hides every localised page
 * from the crawler that is supposed to index it.
 */
export function negotiateLocale(
  acceptLanguage: string | null | undefined,
  allowed: readonly LocaleDef[],
): LocaleDef | undefined {
  if (!acceptLanguage) return undefined;
  const allowedCodes = new Set(allowed.map((l) => l.code));

  const parsed: { code: string; q: number; i: number }[] = [];
  acceptLanguage.split(",").forEach((part, i) => {
    const [tagRaw, ...params] = part.trim().split(";");
    const tag = tagRaw.trim().toLowerCase();
    if (!tag || tag === "*") return;
    let q = 1;
    for (const p of params) {
      const t = p.trim();
      if (t.startsWith("q=")) {
        const v = Number.parseFloat(t.slice(2));
        q = Number.isFinite(v) ? v : 0;
      }
    }
    parsed.push({ code: tag.split("-")[0], q, i });
  });

  parsed.sort((a, b) => b.q - a.q || a.i - b.i);
  for (const p of parsed) {
    if (allowedCodes.has(p.code)) return BY_CODE.get(p.code);
  }
  return undefined;
}
