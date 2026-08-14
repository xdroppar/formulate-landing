"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { localeFromPathname, getLocale, DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { getMessages, translate, type Messages } from "@/lib/i18n/messages";

/**
 * Locale derived from the URL, and from nothing else.
 *
 * No cookie, no header, no `cookies()`/`headers()` call. That matters twice
 * over on this surface:
 *
 *  1. SEO. The URL is what a crawler can see and index. A cookie is invisible
 *     to Googlebot, so a cookie-driven site serves one indexable language no
 *     matter how many it renders.
 *  2. Static generation. Touching a dynamic server API in the root layout opts
 *     every route out of prerendering — on the sibling app repo that took a
 *     build from 88 static pages to 5. `usePathname()` in a client component
 *     costs nothing, because the path is already part of the route identity.
 */

interface I18nValue {
  locale: string;
  dir: "ltr" | "rtl";
  messages: Messages;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";

  const value = useMemo<I18nValue>(() => {
    const locale = localeFromPathname(pathname);
    const messages = getMessages(locale);
    return {
      locale,
      dir: getLocale(locale)?.dir ?? "ltr",
      messages,
      t: (key, vars) => translate(messages, key, vars),
    };
  }, [pathname]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Never throws when the provider is absent — see the app repo's note; a
 *  missing provider must degrade to English, not to an error screen. */
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (ctx) return ctx;
  const messages = getMessages(DEFAULT_LOCALE);
  return {
    locale: DEFAULT_LOCALE,
    dir: "ltr",
    messages,
    t: (key: string, vars?: Record<string, string | number>) =>
      translate(messages, key, vars),
  };
}

export function useT() {
  return useI18n().t;
}
