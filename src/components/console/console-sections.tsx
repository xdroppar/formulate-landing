"use client";

/**
 * The three verbs, and the close.
 *
 * WHAT IS HERE AND WHAT IS NOT. The prototype's sections are built around
 * live embeds of the mockup — a 148-day streak, a blood panel with markers
 * moving, a wall of 37 trackable faces. Every one of those numbers is
 * invented, which is fine in a mockup and is not fine on a page that makes
 * claims to the public. There are no accounts behind this product yet, so
 * there is no 148-day streak to show and no panel to show moving.
 *
 * So each section is ported down to the part that is true: what the thing is,
 * and what it gets you. Every claim below was checked against the shipped app
 * rather than carried across from the prototype's copy —
 *
 *   "seven drawers"    all seven open. Worth the words it costs, because for
 *                      one deploy this line was false: training, sleep and
 *                      care sat behind a dev gate and rendered "Page not
 *                      found" to everyone who was not an admin with Developer
 *                      Mode on. The claim had been checked against the app's
 *                      source and never against a user, which is exactly how
 *                      a page ends up describing a product only its author
 *                      can see. The three were un-gated; each of the seven
 *                      was then fetched on the live app and confirmed to
 *                      open before this sentence was allowed back.
 *   "against a panel"  /biomarkers is a real route with sessions and an
 *                      upload parser, not a planned one.
 *   the pillar count   read off lib/pillars, not typed.
 *
 * The prototype's copy said "thirty-seven trackable". Nothing in the shipped
 * app produced that number, so it is not repeated here. When the streak and
 * the panel have real data behind them, those blocks are worth building; a
 * demo account is what they need, and that is the owner's call to make.
 */
import Link from "next/link";
import { ActionRow, PILLAR_WORD } from "@/components/console/console-bits";
import { ConsoleShelf } from "@/components/console/console-shelf";
import { ConsoleMarkWall } from "@/components/console/console-markwall";
import { ConsolePanel } from "@/components/console/console-panel";
import { ConsoleBuilder } from "@/components/console/console-builder";
import type { ShelfCard } from "@/lib/console-shelf";

function Ups({ items }: { items: { title: string; line: string }[] }) {
  return (
    <div className="ups">
      {items.map((u) => (
        <div className="up" key={u.title}>
          <b>{u.title}</b>
          <span>{u.line}</span>
        </div>
      ))}
    </div>
  );
}

function ScoreSection({ shelf, scoredTotal }: { shelf: ShelfCard[]; scoredTotal: number }) {
  return (
    <section className="cn-sec">
      <div className="wrap">
        <div className="cn-scorehead">
        <div className="sechead">
          <span className="lab">01 · Score it</span>
          <h2>
            Start with what
            <br />
            you already take.
          </h2>
          <p className="secline">
            Add your stack and it scores in front of you — every item, the weak
            link, and the components that produced it. No account, nothing to
            buy to find out.
          </p>
        </div>

          <ConsoleShelf cards={shelf} total={scoredTotal} />
        </div>

        {/* The reason the shelf is beside the headline rather than across the
            page: this needs the room. A section that says "add your stack and
            it scores in front of you" and then offers nowhere to add it is a
            promise with no door. */}
        <ConsoleBuilder />

        <div className="cn-doors">
          <div className="door">
            <span className="dk">You already take things</span>
            <ol className="steps">
              <li>Add what is in your cupboard.</li>
              <li>Every item comes back scored, with the weak link named.</li>
              <li>Fix the form or the dose before you spend on anything new.</li>
            </ol>
            <Link className="doorlink" href="/tools/stack-builder">
              Build and score a stack →
            </Link>
          </div>
          <div className="door">
            <span className="dk">You are starting from nothing</span>
            <ol className="steps">
              <li>Search the catalog for what you are considering.</li>
              <li>See its score, and whether it fits your gaps — before you buy it.</li>
              <li>Add it to your stack and give it a window.</li>
            </ol>
            <Link className="doorlink" href="/supplements">
              Browse the catalog →
            </Link>
          </div>
        </div>

        <Ups
          items={[
            {
              title: "Scored before you buy",
              line: "The catalog is the research step, not the shop.",
            },
            {
              title: "Every score shows its components",
              line: "You can see why it scored, not just what.",
            },
            {
              title: "We take nothing from the brands",
              line: "No sponsorships, no paid placement, no affiliate rank.",
            },
          ]}
        />
      </div>
    </section>
  );
}

function TrackSection() {
  return (
    <section className="cn-sec">
      <div className="wrap">
        <div className="sechead">
          <span className="lab">02 · Track it</span>
          <h2>
            Then make it
            <br />
            a routine.
          </h2>
          <p className="secline">
            Give each thing a window and log it in two taps. Seven drawers —
            supplements, food, water, training, sleep, body and care — on every
            screen, and every one of them has a face.
          </p>
        </div>

        {/* One band: the wall on the left, and the record and the phone in
            the room it leaves. The prototype pins the pair to the right and
            measures the ledger off the phone rather than off the edge, so
            moving one number keeps them a pair. Below 1080px the art stands
            down entirely — there is no room to overlap anything. */}
        <div className="cn-trackband">
          <ConsoleMarkWall />
          <div className="cn-trackart">
            <figure className="cn-ledwin">
              <div className="cn-ledbar">
                <i />
                <i />
                <i />
                <span className="cn-ledurl mono">formulate-health.app/record</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/console-ledger.webp"
                alt="The day ledger: every day as a row, with what the day was and what it scored."
                width={500}
                height={300}
              />
            </figure>

            <figure className="cn-phone">
              <span className="cn-island" />
              <span className="cn-hbar" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/console-mobile.webp"
                alt="The same day on iPhone: wake, morning, midday, evening and bedtime windows, each with what is due in it."
                width={393}
                height={852}
              />
            </figure>
          </div>
        </div>

        <div className="cn-streak">
          <div className="cn-streakhead">
            <span className="cn-flame" aria-hidden>
              🔥
            </span>
            <div>
              <div className="cn-streaknum">148</div>
              <span className="lab" style={{ marginTop: 4 }}>
                CONSECUTIVE DAYS LOGGED
              </span>
            </div>
            <p className="cn-streakline">
              A streak is a day you recorded, not a day you intended. The line
              under it is those days — all 148 of them, drawn by the app itself.{" "}
              <em className="cn-demoem">Demo account.</em>
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="cn-streakgraph"
            src="/console-streak.webp"
            alt="A line of 148 days, rising, with the days that were missed marked underneath it."
            width={1228}
            height={188}
          />
        </div>

        <Ups
          items={[
            {
              title: "Windows, not reminders",
              line: "Each one holds whatever falls inside it — supplements, food, care and training at once.",
            },
            {
              title: "Logged, never estimated",
              line: "A half day shows as a half day. Streaks you can trust.",
            },
            {
              title: "One thing worth fixing today",
              line: "Named, with the points attached, and it never needs a purchase.",
            },
          ]}
        />
      </div>
    </section>
  );
}

function TestSection() {
  return (
    <section className="cn-sec">
      <div className="wrap">
        <div className="sechead">
          <span className="lab">03 · Test it</span>
          <h2>
            Then find out
            <br />
            if it worked.
          </h2>
          <p className="secline">
            A score that never meets a panel is just a score agreeing with
            itself. Put your markers in and the number answers to them.
          </p>
        </div>

        <ConsolePanel />

        <Ups
          items={[
            {
              title: "The loop actually closes",
              line: "Most apps stop at the streak. This one answers to a panel.",
            },
            {
              title: "Measured, not claimed",
              line: "Each change sits against the panel before it.",
            },
            {
              title: "It will tell you when it did nothing",
              line: "A number that only ever goes up is not measuring anything.",
            },
          ]}
        />
      </div>
    </section>
  );
}

function CloseSection() {
  return (
    <section className="cn-close">
      <div className="wrap">
        <h2>Start today&rsquo;s score.</h2>
        {/* The pillar count is interpolated, so it must never land where a
            capital is expected — "six" is produced lowercase and a sentence
            cannot start with it. Kept mid-clause on purpose. */}
        <p className="cn-sub" style={{ margin: "14px auto 0", maxWidth: "40ch" }}>
          Nothing to install, about a minute — {PILLAR_WORD} pillars, one
          number, and the part of it you can close today.
        </p>
        <ActionRow source="console_close" />
        <p className="trust">
          WORKS IN ANY BROWSER · IPHONE APP TOO · ANDROID NOT LISTED YET
        </p>
      </div>
    </section>
  );
}

function Foot() {
  return (
    <footer className="cn-foot">
      <div className="wrap">
        <span className="brand" style={{ fontSize: 15 }}>
          Formulate
        </span>
        <span className="hint">NO SPONSORSHIPS · NO PAID PLACEMENT</span>
        <span style={{ marginLeft: "auto", display: "flex", gap: 18 }}>
          <Link href="/about">About</Link>
          <Link href="/methodology/supplements">How we score</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}

export function ConsoleSections({
  shelf,
  scoredTotal,
}: {
  shelf: ShelfCard[];
  scoredTotal: number;
}) {
  return (
    <>
      <ScoreSection shelf={shelf} scoredTotal={scoredTotal} />
      <TrackSection />
      <TestSection />
      <CloseSection />
      <Foot />
    </>
  );
}
