"use client";

import { useEffect } from "react";
import { getAnonId, trackEvent } from "@/lib/analytics";
import { ANON_PARAM, ctaSource, isAppLink, withAnonId } from "@/lib/app-link";

/**
 * Track every link into the web app, and hand the anon_id across with it.
 *
 * Mounted once in the site shell rather than wrapped around each link, because
 * the per-link approach has already failed once here: `TrackedAppLink` exists,
 * was applied to the homepage on 2026-08-13, and 157 links across 62 files —
 * 61 of them guide bodies, which is exactly what search traffic lands on — went
 * on firing nothing. `web_app_cta_click` read 8 clicks in 90 days and 0 in the
 * last 30, which is a statement about instrumentation, not about visitors.
 *
 * A delegated listener fixes the ones that exist and the ones nobody has
 * written yet. The next guide is tracked because it links to the app, not
 * because its author remembered a component.
 *
 * Renders nothing.
 */
export function AppLinkTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const a = target.closest("a");
      if (!a) return;

      // Read the literal attribute: `a.href` is already absolutised by the DOM,
      // which would make a same-origin /start link look like an app link on the
      // app's own domain. The attribute is what the author wrote.
      const raw = a.getAttribute("href");
      if (!isAppLink(raw)) return;

      const href = a.href;
      trackEvent("web_app_cta_click", {
        source: ctaSource(href, a.getAttribute("data-cta-source")),
        from: window.location.pathname,
      });

      // Stamp the anon_id on the way out. Mutating href during the click is
      // what makes this work without preventDefault: the browser reads the
      // anchor's href when the event finishes, so the navigation — including
      // ctrl/middle-click into a new tab — carries the id.
      const stamped = withAnonId(href, getAnonId());
      if (stamped !== href) a.href = stamped;
    };

    // Capture phase so a component's own onClick cannot stop this by calling
    // stopPropagation, and auxclick so middle-click into a new tab counts too.
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return null;
}

export { ANON_PARAM };
