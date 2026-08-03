"use client";

import { trackEvent } from "@/lib/analytics";

/**
 * "Get it on the App Store / Google Play" badges. Standalone client
 * component so it can fire `mobile_badge_click` telemetry on tap and we
 * can correlate it with `mobile_install_attribution` events from the app
 * after install.
 *
 * The two stores are gated SEPARATELY and deliberately. A single ENABLED
 * flag covering both is what kept this dead for months: iOS went live in
 * June 2026 while Android was still a closed test, so the honest state was
 * never "both off" or "both on" and the flag stayed off. Verified at the
 * time of writing — the iOS listing returns 200, the Play listing 404s.
 *
 * Flip ANDROID_LIVE when the Play listing leaves closed testing. Don't flip
 * it early: a badge pointing at a 404 is worse than no badge, because it
 * reads as a broken product rather than a missing platform.
 */

// Both OFF by design right now: the web acquisition system is being fixed
// first, and pushing readers to the App Store before that would just move the
// leak. The IDs below are correct and verified, so this is a one-word flip
// when we do want it.
const IOS_LIVE = false;
const ANDROID_LIVE = false;

const APP_STORE_ID = "6783192989";
const APP_STORE_URL =
  "https://apps.apple.com/us/app/formulate-longevity-tracker/id6783192989";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.formulate.health";

interface Props {
  source: string; // e.g. "footer", "guide_cta", "supplement_detail"
  variant?: "row" | "column";
  size?: "sm" | "md";
}

export function MobileAppBadges({ source, variant = "row", size = "md" }: Props) {
  if (!IOS_LIVE && !ANDROID_LIVE) return null;

  const handleClick = (destination: "ios" | "android") => {
    trackEvent("mobile_badge_click", { source, destination });
  };

  const layoutClass = variant === "row" ? "flex-row gap-3" : "flex-col gap-2";
  const heightClass = size === "sm" ? "h-9" : "h-12";

  return (
    <div className={`flex items-center ${layoutClass}`}>
      {IOS_LIVE && (
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
      )}
      {ANDROID_LIVE && (
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
      )}
    </div>
  );
}

/**
 * Apple Smart App Banner meta tag. Inject in <head> on pages where iOS
 * Safari should surface the install prompt.
 *
 * Gated on IOS_LIVE rather than rendered unconditionally: a bad or unknown
 * app-id renders a banner reading "App not available", which looks more
 * broken than showing nothing at all.
 */
export function AppleSmartBanner({ pathArgument }: { pathArgument?: string }) {
  if (!IOS_LIVE) return null;

  const args = pathArgument
    ? `app-id=${APP_STORE_ID}, app-argument=https://formulate-health.app${pathArgument}`
    : `app-id=${APP_STORE_ID}`;

  // Next 13+ App Router supports adding meta tags via `head` exports OR
  // direct insertion. For client components we render inline.
  return <meta name="apple-itunes-app" content={args} />;
}
