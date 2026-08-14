"use client";

import { useEffect } from "react";
import { useI18n } from "@/components/i18n-provider";

/**
 * Keeps `<html lang>` / `<html dir>` in step with the URL's locale.
 *
 * KNOWN LIMIT, and it is the reason localised locales ship `indexable: false`:
 * this runs after hydration, so the STATIC HTML for `/es` still says
 * `lang="en"`. A human gets the right value; a crawler fetching the raw
 * document does not, and neither does a screen reader that never runs the JS.
 *
 * It cannot be fixed from here. `<html>` lives in the root layout, which sits
 * ABOVE the `[locale]` segment and so cannot see the locale param — and making
 * the root layout read the locale from `cookies()`/`headers()` instead would
 * opt the entire site out of static generation (measured on the sibling app
 * repo: 88 static pages -> 5).
 *
 * The real fix is the full `src/app/[locale]/` move, which puts the root layout
 * underneath the segment and lets it render `lang` server-side. That is the
 * work that must land BEFORE any locale flips to `indexable: true` — shipping
 * an indexable page whose declared language is wrong is worse than not shipping
 * it, because it teaches the crawler the page is English.
 */
export function HtmlLangSync() {
  const { locale, dir } = useI18n();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return null;
}
