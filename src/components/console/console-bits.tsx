"use client";

/**
 * The pieces the console landing uses in more than one place.
 *
 * They live here rather than in whichever section happened to need them
 * first, because the second copy of a button is how two buttons that are
 * meant to be the same stop being the same — one gets the tracking tag and
 * the other does not, and the funnel quietly measures half the clicks.
 */
import { TrackedAppLink } from "@/components/tracked-app-link";
import { TrackedDownloadLink } from "@/components/tracked-download-link";
import { APP_STORE_URL } from "@/lib/app-store";
import { withUtm } from "@/lib/app-url";
import { PILLARS } from "@/lib/pillars";

export const APP_URL = "https://app.formulate-health.app";

/** The console itself — the screen this page is a picture of. Tagged so the
 *  funnel can tell a console-landing arrival from a homepage one; that
 *  comparison is the only way to know whether this design is the better one. */
export const CONSOLE_URL = withUtm(`${APP_URL}/today`, {
  source: "landing",
  campaign: "console_preview",
});

/**
 * "six pillars", counted rather than typed.
 *
 * The number appears in the hero and again in the first section, and the
 * platform has added a pillar before. Two hand-typed copies of a count is the
 * shape of bug this site has already paid for once — the stat bar said 260
 * while the rest of the page said 290+ — so it is read off the list that
 * decides it.
 */
const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];
export const PILLAR_COUNT = PILLARS.length;
export const PILLAR_WORD = NUMBER_WORDS[PILLAR_COUNT] ?? String(PILLAR_COUNT);

export function GlobeIcon() {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8" r="6.6" stroke="#04120b" strokeWidth="1.5" />
      <path
        d="M1.9 8h13.2M8.5 1.4c1.8 2 2.7 4.2 2.7 6.6s-.9 4.6-2.7 6.6c-1.8-2-2.7-4.2-2.7-6.6S6.7 3.4 8.5 1.4z"
        stroke="#04120b"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={(size * 15) / 18}
      height={size}
      viewBox="0 0 15 18"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2.4"
        y=".9"
        width="10.2"
        height="16.2"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M6.1 14.3h2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * The two actions, equal geometry, one filled and one outlined.
 *
 * `source` is what separates the hero's click from the closing one in the
 * funnel — the whole question this page exists to answer is whether people
 * decide at the top or the bottom, and that is unanswerable if both report
 * the same name.
 */
export function ActionRow({ source }: { source: string }) {
  return (
    <div className="actrow">
      <TrackedAppLink href={CONSOLE_URL} source={source} className="act">
        <GlobeIcon />
        Open the web app
      </TrackedAppLink>
      <TrackedDownloadLink href={APP_STORE_URL} source={source} className="act alt">
        <PhoneIcon />
        Download for iOS
      </TrackedDownloadLink>
    </div>
  );
}
