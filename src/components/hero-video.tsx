"use client";

import { useT } from "@/components/i18n-provider";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * The 53-second onboarding walkthrough, sat directly under the hero CTAs.
 *
 * Why here: the homepage is ~15 screens tall and the funnel says entry pages
 * equal exit pages — visitors are not scrolling, and there are CTAs at 13 and
 * 14 screens that essentially nobody has seen. Anything meant to be watched has
 * to live in the first screen or two.
 *
 * Why a video: 2,200 app sessions produced 10 signups and zero stack adds.
 * People arrive without a picture of what the app does. This shows them, and it
 * ends on the same "Create free account" button the hero CTA points at.
 *
 * TWO SHAPES, ONE DOWNLOAD. A 9:16 phone recording is right on a phone and a
 * small letterboxed window on a monitor, so desktop gets a genuinely different
 * take — the same seven steps recorded at 1600x900, where the app lays its goal
 * chips out in rows against a full-bleed background instead of stacking them.
 * Both <video> elements render, CSS hides one, and NEITHER preloads: the effect
 * below starts only the one that is actually visible. Marking one `autoPlay`
 * would make the browser fetch it regardless of `display:none`, so every phone
 * visitor would pay for a desktop video they never see.
 *
 * MUTED, WITH CAPTIONS ON. The whole video is narration and landing video is
 * watched muted far more often than not; without captions a muted viewer gets a
 * silent screen recording of an app they do not know yet.
 *
 * Native controls and no controlsList, so fullscreen survives on every platform
 * — a 9:16 video on a desktop viewport is unwatchable without it — and
 * playsInline stops iOS hijacking playback while keeping its fullscreen button.
 */
export function HeroVideo() {
  const t = useT();
  const portraitRef = useRef<HTMLVideoElement>(null);
  const wideRef = useRef<HTMLVideoElement>(null);
  const seen = useRef<Set<number>>(new Set());
  const [muted, setMuted] = useState(true);

  /** Whichever one CSS is currently showing. */
  const visible = useCallback((): HTMLVideoElement | null => {
    for (const el of [wideRef.current, portraitRef.current]) {
      if (el && el.offsetParent !== null) return el;
    }
    return null;
  }, []);

  useEffect(() => {
    const v = visible();
    if (!v) return;

    const shape = v === wideRef.current ? "wide" : "portrait";
    v.muted = true;
    void v.play().catch(() => { /* autoplay refused; the poster and controls remain */ });

    // Milestones, so "did anyone watch it" is answerable rather than a matter
    // of opinion. web_app_cta_click sat at 0 for 30 days; this has to be
    // measurable the same way or there is no telling whether it helped.
    const onPlay = () => {
      if (seen.current.has(0)) return;
      seen.current.add(0);
      trackEvent("hero_video_play", { placement: "home_hero", shape });
    };
    const onTime = () => {
      if (!v.duration) return;
      const pct = (v.currentTime / v.duration) * 100;
      for (const m of [25, 50, 75]) {
        if (pct >= m && !seen.current.has(m)) {
          seen.current.add(m);
          trackEvent("hero_video_progress", { placement: "home_hero", shape, percent: m });
        }
      }
    };
    const onEnd = () => trackEvent("hero_video_complete", { placement: "home_hero", shape });

    v.addEventListener("play", onPlay);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnd);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnd);
    };
  }, [visible]);

  const toggleSound = () => {
    const v = visible();
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) {
      void v.play();
      trackEvent("hero_video_unmute", {
        placement: "home_hero",
        shape: v === wideRef.current ? "wide" : "portrait",
      });
    }
  };

  const shared = "block w-full h-auto";

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="relative rounded-[22px] overflow-hidden border border-border bg-black shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] w-[clamp(230px,72vw,290px)] md:w-full md:max-w-[860px]">
        {/* phone shape — hidden from md up */}
        <video
          ref={portraitRef}
          className={`${shared} md:hidden`}
          poster="/video/onboarding-poster.jpg"
          preload="none"
          muted
          playsInline
          controls
        >
          <source src="/video/onboarding.mp4" type="video/mp4" />
          <track kind="captions" src="/video/onboarding.vtt" srcLang="en" label="English" default />
        </video>

        {/* desktop shape — hidden below md */}
        <video
          ref={wideRef}
          className={`${shared} hidden md:block`}
          poster="/video/onboarding-wide-poster.jpg"
          preload="none"
          muted
          playsInline
          controls
        >
          <source src="/video/onboarding-wide.mp4" type="video/mp4" />
          <track kind="captions" src="/video/onboarding-wide.vtt" srcLang="en" label="English" default />
        </video>
      </div>

      <button
        type="button"
        onClick={toggleSound}
        className="text-[13px] font-medium text-muted hover:text-accent transition-colors"
      >
        {muted ? t("chrome.tapForSound") : "🔊 Sound on"}
      </button>
    </div>
  );
}
