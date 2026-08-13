"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * The 53-second onboarding walkthrough, sat directly under the hero CTAs.
 *
 * Why here and not further down: the homepage is ~15 screens tall and the
 * measured funnel says entry pages equal exit pages — visitors are not
 * scrolling. There are CTAs at 13 and 14 screens that essentially nobody has
 * seen. Anything meant to be watched has to live in the first screen or two.
 *
 * Why a video at all: 2,200 app sessions produced 10 signups and zero stack
 * adds. People arrive without a picture of what the thing does. This is the
 * cheapest way to show them, and it ends on the same "Create free account"
 * button the CTA above points at.
 *
 * MUTED AUTOPLAY WITH CAPTIONS ON. The whole video is narration, and landing
 * video is watched muted far more often than not — without captions a muted
 * viewer gets a silent screen recording of an app they do not know yet. The
 * caption track is `default` so it shows without being asked for.
 *
 * Native controls, deliberately: they carry fullscreen on every platform, and
 * `playsInline` keeps iOS from hijacking playback while leaving its fullscreen
 * button intact. No controlsList — stripping fullscreen off a 9:16 video on a
 * desktop viewport would make it unwatchable.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const seen = useRef<Set<number>>(new Set());
  const [muted, setMuted] = useState(true);

  // Milestones, so "did anyone watch it" is answerable rather than a matter of
  // opinion. web_app_cta_click sat at zero for 30 days; this needs to be
  // measurable the same way.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const onPlay = () => {
      if (seen.current.has(0)) return;
      seen.current.add(0);
      trackEvent("hero_video_play", { placement: "home_hero" });
    };
    const onTime = () => {
      if (!v.duration) return;
      const pct = (v.currentTime / v.duration) * 100;
      for (const m of [25, 50, 75]) {
        if (pct >= m && !seen.current.has(m)) {
          seen.current.add(m);
          trackEvent("hero_video_progress", { placement: "home_hero", percent: m });
        }
      }
    };
    const onEnd = () => trackEvent("hero_video_complete", { placement: "home_hero" });

    v.addEventListener("play", onPlay);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnd);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) {
      void v.play();
      trackEvent("hero_video_unmute", { placement: "home_hero" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative rounded-[22px] overflow-hidden border border-border bg-black shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]">
        <video
          ref={ref}
          className="block w-[clamp(230px,72vw,290px)] h-auto"
          poster="/video/onboarding-poster.jpg"
          preload="metadata"
          autoPlay
          muted
          playsInline
          controls
        >
          <source src="/video/onboarding.mp4" type="video/mp4" />
          <track
            kind="captions"
            src="/video/onboarding.vtt"
            srcLang="en"
            label="English"
            default
          />
        </video>
      </div>

      <button
        type="button"
        onClick={toggleSound}
        className="text-[13px] font-medium text-muted hover:text-accent transition-colors"
      >
        {muted ? "🔇 Tap for sound · 53s walkthrough" : "🔊 Sound on"}
      </button>
    </div>
  );
}
