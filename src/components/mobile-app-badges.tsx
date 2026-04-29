"use client";

import { trackEvent } from "@/lib/analytics";

/**
 * "Get it on the App Store / Google Play" badges. Standalone client
 * component so it can fire `mobile_badge_click` telemetry on tap and we
 * can correlate it with `mobile_install_attribution` events from the app
 * after install.
 *
 * Update the URLs below once the app records are live in App Store Connect
 * and Play Console. Until then they 404 — that's intentional, the badges
 * are functionally hidden via the `enabled` flag below.
 */

// Flip to `true` once the apps are live and the URLs below resolve.
// Until then the component renders nothing — keeps the call sites stable
// without showing dead links to users.
const ENABLED = false;

const APP_STORE_URL = "https://apps.apple.com/app/formulate-supplement-tracker/id0000000000";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.formulate.health";

interface Props {
  source: string; // e.g. "footer", "guide_cta", "supplement_detail"
  variant?: "row" | "column";
  size?: "sm" | "md";
}

export function MobileAppBadges({ source, variant = "row", size = "md" }: Props) {
  if (!ENABLED) return null;

  const handleClick = (destination: "ios" | "android") => {
    trackEvent("mobile_badge_click", { source, destination });
  };

  const layoutClass = variant === "row" ? "flex-row gap-3" : "flex-col gap-2";
  const heightClass = size === "sm" ? "h-9" : "h-12";

  return (
    <div className={`flex items-center ${layoutClass}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleClick("ios")}
        className={`flex items-center gap-2 px-4 ${heightClass} bg-text/95 text-bg rounded-lg hover:bg-text transition-colors`}
        aria-label="Download Formulate on the App Store"
      >
        <span className="text-xl"></span>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-medium opacity-70">Download on the</span>
          <span className="text-sm font-semibold">App Store</span>
        </div>
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleClick("android")}
        className={`flex items-center gap-2 px-4 ${heightClass} bg-text/95 text-bg rounded-lg hover:bg-text transition-colors`}
        aria-label="Get Formulate on Google Play"
      >
        <span className="text-xl">▶</span>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-medium opacity-70">Get it on</span>
          <span className="text-sm font-semibold">Google Play</span>
        </div>
      </a>
    </div>
  );
}

/**
 * Apple Smart App Banner meta tag. Inject in <head> on pages where iOS
 * Safari should surface the install prompt. Once the app is live, replace
 * the placeholder app-id with the real iTunes ID from App Store Connect.
 *
 * Returns null until the app is live — bad app-ids display "App not
 * available" which looks broken.
 */
export function AppleSmartBanner({ pathArgument }: { pathArgument?: string }) {
  if (!ENABLED) return null;

  const args = pathArgument
    ? `app-id=0000000000, app-argument=https://formulate-health.app${pathArgument}`
    : "app-id=0000000000";

  // Next 13+ App Router supports adding meta tags via `head` exports OR
  // direct insertion. For client components we render inline.
  return <meta name="apple-itunes-app" content={args} />;
}
