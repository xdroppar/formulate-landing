"use client";

/**
 * SiteChrome — which shell a route gets.
 *
 * This site has two designs now. The marketing chrome every page has always
 * had (the pillar nav, the footer, the language prompt), and the console
 * landing (see console.css), which brings its own nav and its own ground.
 *
 * The console page cannot simply be nested inside the marketing chrome: it
 * rendered under the pillar nav and above the footer, so the page opened on
 * the OLD design's navigation bar — the first thing a visitor sees was the
 * thing the new design replaces. Nesting cannot remove a parent layout's
 * chrome, so the decision is made here, at the one place both are rendered.
 *
 * CONSOLE is a path list rather than a flag because that is what can be read:
 * you can see which routes are on the new design by looking at it. It is
 * matched against the path with the locale prefix stripped, so /es/preview
 * gets the same treatment as /preview — otherwise the localised copy of a
 * console route would silently fall back to the marketing shell.
 */
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LanguagePrompt } from "@/components/language-prompt";
import { routedLocales } from "@/lib/i18n/locales";

/**
 * Routes that render the console design instead of the marketing shell.
 *
 * "/" is the homepage. The prefix test below appends a slash before comparing
 * — `p.startsWith(`${c}/`)` — so "/" matches only itself and never "//".
 * Written as `p.startsWith(c)` it would match EVERY path on the site and strip
 * the nav and footer from all of them, which is worth knowing before anyone
 * simplifies it.
 */
const CONSOLE = ["/"];

/** `/es/preview` → `/preview`. Read off the locale table rather than matched
 *  by shape: a two-letter pattern would also eat a real two-letter route, and
 *  a hand-listed set would stop agreeing with `LOCALES` the day one is added. */
const PREFIXES = routedLocales().map((l) => `/${l.code}`);
function stripLocale(path: string): string {
  const hit = PREFIXES.find((p) => path === p || path.startsWith(`${p}/`));
  return hit ? path.slice(hit.length) || "/" : path;
}

export function isConsoleRoute(path: string): boolean {
  const p = stripLocale(path);
  return CONSOLE.some((c) => p === c || p.startsWith(`${c}/`));
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const path = usePathname();

  /* The console brings its own everything. Rendering `children` bare is the
     point: the page owns its chrome. <main> stays — it is the landmark, not
     part of the design. */
  if (isConsoleRoute(path)) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <LanguagePrompt />
    </>
  );
}
