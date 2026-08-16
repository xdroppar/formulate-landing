"use client";

import { useT } from "@/components/i18n-provider";

import { trackEvent } from "@/lib/analytics";
import {
  ANDROID_LIVE,
  APP_STORE_URL,
  IOS_LIVE,
  PLAY_STORE_URL,
} from "@/lib/app-store";

/**
 * "Download on the App Store / Get it on Google Play" badges.
 *
 * Fires `mobile_badge_click` on tap so store taps correlate with the
 * `mobile_install_attribution` event the app fires on first run — that pair is
 * the only honest install measurement we have until an Apple provider token
 * makes `ct=` campaign attribution real (see lib/app-store.ts).
 *
 * Store availability now lives in lib/app-store.ts rather than here, because
 * the Smart App Banner needs the same facts on the SERVER and a client
 * component cannot write to the document head.
 */

interface Props {
  source: string; // e.g. "footer", "page_conversion:ingredient:vitamin-k2"
  variant?: "row" | "column";
  size?: "sm" | "md";
  /** Render as the page's primary action rather than a secondary badge. */
  emphasis?: "primary" | "default";
}

/** Apple's mark. This was an empty <span> holding a stripped glyph, so the
 *  badge rendered with a blank gap where the logo belongs on any platform
 *  whose font lacked the character — which is most of them. A hole in the
 *  badge reads as a broken build, so it is drawn rather than typed. */
function AppleMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.54c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.42-.14-2.76.83-3.48.83-.72 0-1.82-.81-2.99-.79-1.54.02-2.96.89-3.75 2.27-1.6 2.77-.41 6.88 1.15 9.13.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.39 0 1.78.74 2.99.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.65zM14.8 5.4c.63-.77 1.06-1.83.94-2.9-.91.04-2.01.61-2.67 1.37-.59.68-1.1 1.76-.96 2.8 1.01.08 2.05-.51 2.69-1.27z" />
    </svg>
  );
}

function PlayMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l9.4-9.4L3.6 2.3zm12.5 6.2L5.9 2.7l7.6 7.6 2.5-1.8zm2.7 1.5c.7.4 1.1.9 1.1 1.6s-.4 1.2-1.1 1.6l-2.2 1.3-2.8-2.9 2.8-2.9 2.2 1.3zM5.9 21.3l10.2-5.8-2.5-1.8-7.7 7.6z" />
    </svg>
  );
}

export function MobileAppBadges({
  source,
  variant = "row",
  size = "md",
  emphasis = "default",
}: Props) {
  const t = useT();
  if (!IOS_LIVE && !ANDROID_LIVE) return null;

  const handleClick = (destination: "ios" | "android") => {
    trackEvent("mobile_badge_click", { source, destination });
  };

  const layoutClass = variant === "row" ? "flex-row gap-3" : "flex-col gap-2";
  const heightClass = size === "sm" ? "h-10" : "h-12";
  const toneClass =
    emphasis === "primary"
      ? "bg-accent text-bg hover:bg-[#00ffb3] shadow-[0_8px_30px_-8px_rgba(0,229,160,0.5)]"
      : "bg-text/95 text-bg hover:bg-text";

  return (
    <div className={`flex items-center ${layoutClass}`}>
      {IOS_LIVE && (
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick("ios")}
          className={`flex items-center gap-2.5 px-4 ${heightClass} ${toneClass} rounded-xl transition-colors`}
          aria-label="Download Formulate on the App Store"
        >
          <AppleMark className="w-6 h-6 shrink-0" />
          <span className="flex flex-col items-start leading-tight">
            <span className="text-[10px] font-medium opacity-70">{t("chrome.downloadOnThe")}</span>
            <span className="text-sm font-semibold">App Store</span>
          </span>
        </a>
      )}
      {ANDROID_LIVE && (
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick("android")}
          className={`flex items-center gap-2.5 px-4 ${heightClass} ${toneClass} rounded-xl transition-colors`}
          aria-label="Get Formulate on Google Play"
        >
          <PlayMark className="w-5 h-5 shrink-0" />
          <span className="flex flex-col items-start leading-tight">
            <span className="text-[10px] font-medium opacity-70">Get it on</span>
            <span className="text-sm font-semibold">Google Play</span>
          </span>
        </a>
      )}
    </div>
  );
}
