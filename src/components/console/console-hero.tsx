"use client";

/**
 * The console landing's hero.
 *
 * Ported from the prototype (scratchpad/formulate-show). Two decisions in it
 * are worth keeping in words, because both were argued for there:
 *
 * THE SCREENSHOT IS THE REAL APP. The prototype embeds the running app rather
 * than a hand-built miniature, on the grounds that a miniature has to be
 * maintained beside the thing it depicts and drifts the first time either one
 * moves. Its comment: "this page cannot advertise a product that does not
 * exist." That principle is kept — the picture below is a capture of
 * app.formulate-health.app/today, taken by a script, not drawn — but not the
 * iframe, which the app refuses outright. See scripts/capture-console.mjs.
 *
 * TWO ACTIONS, EQUAL GEOMETRY. One filled and one outlined rather than a
 * button and a text link: two filled buttons of the same colour read as a
 * duplicate, and a text link reads as a demotion, which is what it was.
 *
 * The CTAs go through the existing tracked components, not bare anchors. The
 * funnel instrumentation on this site is how the product learns whether any
 * of this works, and a new design is exactly when you want to still be
 * measuring.
 */
import { TrackedAppLink } from "@/components/tracked-app-link";
import { TrackedDownloadLink } from "@/components/tracked-download-link";
import { APP_STORE_URL } from "@/lib/app-store";
import { withUtm } from "@/lib/app-url";

const APP_URL = "https://app.formulate-health.app";
/** The console itself — the screen this page is a picture of. Tagged so the
 *  funnel can tell a console-landing arrival from a homepage one; that
 *  comparison is the only way to know whether this design is the better one. */
const CONSOLE_URL = withUtm(`${APP_URL}/today`, {
  source: "landing",
  campaign: "console_preview",
});
/** The console, photographed. Regenerate with `node scripts/capture-console.mjs`
 *  — that file carries the reasoning for why this is a capture and not the
 *  live frame the prototype used (short version: the app answers
 *  `X-Frame-Options: DENY`, so the frame was a permanent grey box). */
const CONSOLE_SHOT = "/console-today.webp";

function GlobeIcon() {
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

function PhoneIcon({ size = 18 }: { size?: number }) {
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

export function ConsoleHero() {
  return (
    <div className="cn">
      <nav className="cn-nav">
        <div className="wrap">
          <span className="brand">Formulate</span>
          <span className="hint" style={{ letterSpacing: ".2em" }}>
            LONGEVITY, SCORED
          </span>
          <span className="navacts">
            <TrackedAppLink href={CONSOLE_URL} source="console_nav" className="act">
              Open the web app
            </TrackedAppLink>
            <TrackedDownloadLink href={APP_STORE_URL} source="console_nav" className="act alt">
              <PhoneIcon size={15} />
              iOS
            </TrackedDownloadLink>
          </span>
        </div>
      </nav>

      <section className="cn-hero">
        <div className="wrap">
          <div className="cn-herogrid">
            <div>
              <h1>
                Score it. Track it. Test it.
                <br />
                <span className="soft">Then you know if it worked.</span>
              </h1>
              <p className="cn-sub">
                What you take, eat, train and sleep — scored across six pillars,
                tracked day by day, and lined up against your bloodwork.
              </p>
              <div className="actrow">
                <TrackedAppLink href={CONSOLE_URL} source="console_hero" className="act">
                  <GlobeIcon />
                  Open the web app
                </TrackedAppLink>
                <TrackedDownloadLink href={APP_STORE_URL} source="console_hero" className="act alt">
                  <PhoneIcon />
                  Download for iOS
                </TrackedDownloadLink>
              </div>
              <p className="trust">
                NOTHING TO INSTALL · FREE TO START
                <br />
                WE TAKE NOTHING FROM THE BRANDS WE SCORE
              </p>
            </div>

            <div className="cn-lockup">
              <div className="cn-win">
                <div className="cn-winbar">
                  <span className="wd" />
                  <span className="wd" />
                  <span className="wd" />
                  <span className="cn-winurl mono">formulate-health.app/today</span>
                </div>
                <div className="cn-appshot">
                  {/* Under a click layer, so the whole picture is one large
                      target for the primary action rather than something you
                      can only look at. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CONSOLE_SHOT}
                    alt="The Formulate console: today's pillars, the log rail and the ask bar."
                    width={1560}
                    height={900}
                    fetchPriority="high"
                  />
                  <TrackedAppLink
                    href={CONSOLE_URL}
                    source="console_shot"
                    className="cn-appclick"
                    aria-label="Open the web app"
                  >
                    <span className="sr-only">Open the web app</span>
                  </TrackedAppLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
