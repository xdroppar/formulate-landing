"use client";

/**
 * The console landing's hero.
 *
 * Two decisions carried over from the prototype (scratchpad/formulate-show)
 * are worth keeping in words, because both were argued for there:
 *
 * THE SCREENSHOT IS A REAL SCREEN, AND IT SAYS WHOSE. The prototype embeds a
 * running app rather than a hand-built miniature, on the grounds that a
 * miniature has to be maintained beside the thing it depicts and drifts the
 * first time either one moves. Its comment: "this page cannot advertise a
 * product that does not exist."
 *
 * That still holds, with one correction the product forced. A picture of the
 * LIVE app is a picture of an empty one — there are no accounts yet, so it
 * photographed a single explainer card on a dark field, which advertises
 * nothing. So the picture is the demo at /v2: the authored account the design
 * was drawn around, the app at the density it is actually for. The window is
 * labelled DEMO ACCOUNT and the demo is linked under it, because the fix for
 * showing invented numbers is to say they are invented, not to hide them in a
 * picture nobody can open. See scripts/capture-console.mjs.
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
import {
  ActionRow,
  CONSOLE_URL,
  PhoneIcon,
  PILLAR_WORD,
} from "@/components/console/console-bits";

/** The console, photographed. Regenerate with `node scripts/capture-console.mjs`
 *  — that file carries the reasoning for why this is a capture rather than
 *  the live frame the prototype used, and for why it photographs the demo.
 *
 *  Short version of the second one: the live app has no accounts in it yet, so
 *  a picture of it was one explainer card on an empty field — a landing page
 *  arguing against itself. This is the demo at /v2, the authored account the
 *  design was drawn around, which is the app at the density it is FOR. */
const CONSOLE_SHOT = "/console-today.webp";
/** The same demo, walkable. Named under the picture rather than buried,
 *  because a demo you have to discover is a demo you are hiding. */
const DEMO_HREF = "/v2/index.html";

export function ConsoleNav() {
  return (
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
  );
}

export function ConsoleHero() {
  return (
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
              What you take, eat, train and sleep — scored across {PILLAR_WORD}{" "}
              pillars, tracked day by day, and lined up against your bloodwork.
            </p>
            <ActionRow source="console_hero" />
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
                <span className="cn-windemo mono">DEMO ACCOUNT</span>
              </div>
              <div className="cn-appshot">
                {/* Under a click layer, so the whole picture is one large
                    target for the primary action rather than something you
                    can only look at. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CONSOLE_SHOT}
                  alt="The Formulate console on a demo account: the day's score ring, every pillar scored against what the stack could give, and the day's windows."
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
            <p className="cn-democap">
              A demo account, so the screens have something in them.{" "}
              <a href={DEMO_HREF}>Walk through it →</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
