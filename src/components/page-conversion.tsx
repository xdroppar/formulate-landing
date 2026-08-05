"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { MobileAppBadges } from "@/components/mobile-app-badges";
import { IOS_LIVE } from "@/lib/app-store";

/**
 * End-of-page conversion block for the pSEO long tail.
 *
 * Guides (225 pages) have had a `/start` CTA, a sticky bar and a newsletter
 * form for a while. The other ~2,859 pages — ingredients, foods, supplements,
 * interactions, nutrients, recipes, research, comparisons, stacks — had
 * nothing: a reader hit the medical disclaimer and left, anonymously, with no
 * smaller step than "make an account" ever offered. That's 93% of the site,
 * and it includes most of what actually gets traffic.
 *
 * Two offers, deliberately, because they catch different readers:
 *   - `/start` for someone ready to act now (the two-question goal quiz —
 *     the only route off this domain that ends in an account, and it stays
 *     on-domain so the session isn't broken by a cross-domain hop).
 *   - the newsletter for the much larger group who are just reading. An
 *     account is a big ask for someone who wanted to know about copper and
 *     zinc; an email address is not.
 *
 * Copy is per-KIND rather than generic. A single "Build your stack" banner
 * pasted under 2,859 pages reads as boilerplate and gets banner-blindness;
 * matching the offer to what the reader was just looking at is the whole
 * reason to bother. Every CTA is tracked with its kind and slug so we can
 * tell which page types actually convert instead of guessing again.
 */

export type ConversionKind =
  | "ingredient"
  | "food"
  | "supplement"
  | "interaction"
  | "nutrient"
  | "recipe"
  | "research"
  | "compare"
  | "stack";

interface Copy {
  title: (subject?: string) => string;
  body: string;
  cta: string;
}

const COPY: Record<ConversionKind, Copy> = {
  ingredient: {
    title: (s) => (s ? `Where does ${s} fit in your stack?` : "Where does this fit in your stack?"),
    body: "Answer two questions and get a stack graded on research — every ingredient scored on the evidence behind it, not the marketing.",
    cta: "Build my stack",
  },
  food: {
    title: (s) => (s ? `What is ${s} actually covering?` : "What is this actually covering?"),
    body: "See which nutrients your diet already delivers and which ones your supplements still need to — food and pills measured on the same scale.",
    cta: "Check my nutrients",
  },
  supplement: {
    title: (s) => (s ? `Is ${s} right for your goals?` : "Is this right for your goals?"),
    body: "Two questions, then every ingredient graded against what you're actually trying to do — plus what it costs per effective dose.",
    cta: "Build my stack",
  },
  interaction: {
    title: () => "Check your whole stack, not just this pair",
    body: "Paste in everything you take — supplements and medications — and every pairing gets flagged for severity, timing and cited evidence.",
    cta: "Check my stack",
  },
  nutrient: {
    title: (s) => (s ? `Are you getting enough ${s}?` : "Are you getting enough?"),
    body: "See your coverage across every nutrient at once, counting both what you eat and what you supplement.",
    cta: "Check my coverage",
  },
  recipe: {
    title: () => "See what this meal actually delivers",
    body: "Track the nutrients your meals provide and find where your stack still has gaps to fill.",
    cta: "Check my nutrients",
  },
  research: {
    title: () => "Turn the research into a stack",
    body: "Every ingredient in our catalog carries an evidence grade from studies like this one — see which ones earn a place in yours.",
    cta: "Build my stack",
  },
  compare: {
    title: () => "Which one belongs in your stack?",
    body: "Answer two questions and see them scored side by side against your own goals, dose for dose.",
    cta: "Compare for my goals",
  },
  stack: {
    title: () => "Make this stack yours",
    body: "Start from this template and adjust it to your goals — every swap re-graded on research and cost per dose.",
    cta: "Build my stack",
  },
};

interface Props {
  kind: ConversionKind;
  /** Page slug/id — used for attribution, e.g. "vitamin-k2". */
  slug: string;
  /** Display name of what the page is about, e.g. "Vitamin K2". */
  subject?: string;
}

/**
 * Is this an iPhone/iPad?
 *
 * Starts FALSE and only flips after mount. The server has no user agent, so
 * deciding this during render would produce different HTML on the server and
 * the client and React would throw a hydration mismatch on every one of these
 * pages. The `/start` offer is therefore what search engines and the first
 * paint see; iOS visitors get the store swapped in a tick later.
 */
function useIsIOS(): boolean {
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent || "";
    // iPadOS 13+ reports itself as a Mac; the touch-point check separates a
    // real iPad from a desktop Safari, which would otherwise be sent to a
    // store it cannot install from.
    const iPadOS = /Mac/.test(ua) && navigator.maxTouchPoints > 1;
    setIsIOS(/iPhone|iPad|iPod/i.test(ua) || iPadOS);
  }, []);
  return isIOS;
}

export function PageConversion({ kind, slug, subject }: Props) {
  const copy = COPY[kind];
  const source = `${kind}:${slug}`;
  const isIOS = useIsIOS();

  // On an iPhone the App Store is the better destination and the measured one:
  // `mobile_first_run` runs ~2:1 ahead of web `auth_complete`, and the reader
  // is already holding the device the app runs on. `/start` stays on the page
  // as the secondary path so nothing is taken away — someone who would rather
  // not install can still do the two-question quiz.
  const appFirst = IOS_LIVE && isIOS;

  const startLink = (
    <Link
      href={`/start?from=${kind}&ref=${encodeURIComponent(slug)}`}
      onClick={() => trackEvent("start_click", { source })}
      className={
        appFirst
          ? "inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent transition-colors"
          : "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-[#00ffb3] transition-colors"
      }
    >
      {appFirst ? "or answer 2 questions on the web" : copy.cta}
      {!appFirst && (
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      )}
    </Link>
  );

  return (
    <>
      <section className="mt-12 rounded-2xl border border-accent/20 bg-accent/[0.04] px-6 py-7">
        <div className="max-w-[560px]">
          <h2 className="text-lg font-bold text-text mb-2">{copy.title(subject)}</h2>
          <p className="text-sm text-muted leading-relaxed mb-5">{copy.body}</p>

          {appFirst ? (
            <div className="flex flex-col gap-3 items-start">
              <MobileAppBadges source={`page_conversion:${source}`} emphasis="primary" />
              {startLink}
            </div>
          ) : (
            startLink
          )}

          <p className="text-[11px] text-muted mt-3">
            {appFirst
              ? "Free · scan any label · no account needed to start"
              : "2 questions · free · no account needed to start"}
          </p>

          {/* Desktop and Android readers can't act on a store link here, but
              they should still learn the app exists — a lot of this traffic
              reads on a laptop and installs later on their phone. Kept to one
              quiet line rather than a badge that looks tappable and isn't. */}
          {IOS_LIVE && !appFirst && (
            <p className="text-[11px] text-muted/70 mt-1.5">
              Also on iPhone —{" "}
              <a
                href="/app"
                onClick={() => trackEvent("app_page_click", { source })}
                className="underline underline-offset-2 hover:text-accent transition-colors"
              >
                get the free app
              </a>
            </p>
          )}
        </div>
      </section>

      <NewsletterSignup source={source} />
    </>
  );
}
