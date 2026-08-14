"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n-provider";
import { LOCALES, getLocale, localizedPath, stripLocale } from "@/lib/i18n/locales";

/**
 * Language switcher for the SEO surface.
 *
 * Differs from the app's switcher in one structural way: these are real
 * `<Link>` navigations to `/es/...`, not a cookie write. On a marketing site
 * the URL has to change, because a crawler can only index a language it can
 * fetch at a distinct address — and real anchors are also how the crawler
 * discovers the localised pages exist at all.
 *
 * Unchanged from the app, because it is the point of the control: a globe
 * glyph plus every language in its OWN name. Someone stuck in a language they
 * cannot read cannot search for a word they cannot read.
 *
 * It switches the CURRENT page rather than sending everyone home — landing on
 * the homepage after asking to translate an ingredient page is a lost reader.
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, t } = useI18n();
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = getLocale(locale);
  const bare = stripLocale(pathname);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t("language.label")} — ${current?.nativeName ?? locale}`}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-semibold text-muted transition-colors hover:text-fg"
      >
        <GlobeIcon />
        <span className="hidden sm:inline">{current?.nativeName ?? locale}</span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label={t("language.choose")}
          className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-border bg-bg p-1 shadow-xl"
        >
          {LOCALES.map((l) => {
            const active = l.code === current?.code;
            return (
              <Link
                key={l.code}
                role="menuitem"
                href={localizedPath(l.code, bare)}
                lang={l.code}
                // A locale whose copy is not translated yet must not be fed to
                // crawlers as an alternate — see `indexable` in locales.ts.
                rel={l.indexable ? undefined : "nofollow"}
                onClick={() => setOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-border/40 font-semibold text-fg"
                    : "text-muted hover:bg-border/20 hover:text-fg"
                }`}
              >
                <span dir={l.dir}>{l.nativeName}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      aria-hidden="true" focusable="false"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
    </svg>
  );
}
