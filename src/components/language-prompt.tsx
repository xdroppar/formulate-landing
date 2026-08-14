"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocale,
  localeFromPathname,
  localizedPath,
  negotiateLocale,
  routedLocales,
  stripLocale,
} from "@/lib/i18n/locales";
import { getMessages, translate } from "@/lib/i18n/messages";

const PROMPT_KEY = "formulate_locale_prompt";

/**
 * Routes that actually have a localised version.
 *
 * The banner must never point at a page that does not exist. `[locale]`
 * declares `dynamicParams = false`, so `/es/supplements` is a hard 404 — and
 * offering a Spanish speaker a translation that 404s is worse than not
 * offering one. Today only the homepage is localised; this set grows as pages
 * do, and the banner follows it automatically.
 */
const LOCALIZED_ROUTES = new Set(["/"]);

/**
 * Offers a localised URL to someone whose browser prefers that language.
 *
 * It OFFERS and never redirects. Googlebot crawls with `en` headers from US
 * addresses, so an Accept-Language redirect hides every localised page from
 * the crawler that is supposed to index it — and it strands anyone who
 * deliberately opened the English page.
 *
 * Every word comes from the OFFERED locale's catalog, not the active one.
 * Asking a Spanish speaker "view this in Spanish?" in English hands them the
 * problem instead of the solution.
 *
 * Renders null on the first pass and decides in an effect, so the server HTML
 * and the first client render agree — deciding during render would read
 * `navigator` on the server and throw, or mismatch and force a re-render.
 */
export function LanguagePrompt() {
  const pathname = usePathname() ?? "/";
  const [offered, setOffered] = useState<string | null>(null);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    try {
      if (localStorage.getItem(PROMPT_KEY) === "dismissed") return;
    } catch {
      // Private mode / storage disabled — fall through and offer anyway.
    }

    const bare = stripLocale(pathname);
    if (!LOCALIZED_ROUTES.has(bare)) return;

    const langs = navigator.languages?.length
      ? navigator.languages
      : [navigator.language].filter(Boolean);
    const best = negotiateLocale(langs.join(","), routedLocales());
    if (!best) return;
    if (best.code === localeFromPathname(pathname)) return;

    setOffered(best.code);
  }, [pathname]);

  const def = getLocale(offered);
  if (!def) return null;

  const m = getMessages(def.code);
  const s = (key: string) => translate(m, key);

  const dismiss = () => {
    try {
      localStorage.setItem(PROMPT_KEY, "dismissed");
    } catch {
      /* storage unavailable — the banner simply reappears next visit */
    }
    setOffered(null);
  };

  return (
    <div
      role="region"
      lang={def.code}
      dir={def.dir}
      aria-label={s("language.promptTitle")}
      className="fixed inset-x-0 bottom-0 z-50 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-border bg-bg/95 px-4 py-2.5 text-sm backdrop-blur-sm"
    >
      <p className="text-muted">
        <span className="font-semibold text-text">{s("language.promptTitle")}</span>{" "}
        <span>{s("language.promptBody")}</span>
      </p>
      <div className="flex items-center gap-2">
        <Link
          href={localizedPath(def.code, stripLocale(pathname))}
          onClick={dismiss}
          // Not an alternate for crawlers until its copy is translated.
          rel={def.indexable ? undefined : "nofollow"}
          className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-bg transition-colors hover:bg-[#00ffb3]"
        >
          {s("language.promptAccept")}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-text"
        >
          {s("language.promptDismiss")}
        </button>
      </div>
    </div>
  );
}
