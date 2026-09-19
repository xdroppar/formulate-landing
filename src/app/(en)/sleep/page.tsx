import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { listThumb } from "@/lib/thumbs";
import { sleepCategories, sleepScored, sleepCatalogSize } from "@/lib/sleep";
import { ScoreMeter } from "@/components/score-meter";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: `Sleep Gear Compared: ${sleepScored.length} Products Ranked Against Their Own Kind`,
  description: `Mattresses, pillows, sheets, sleep masks, white noise machines and more — ${sleepScored.length} products scored on what their makers declare, each compared only with the same kind.`,
  alternates: { canonical: `${BASE}/sleep` },
};

export default function SleepHub() {
  const groups = [...new Set(sleepCategories.map((c) => c.group))];
  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <header className="mb-10">
        <p className="fm-eyebrow text-accent mb-3">Sleep</p>
        <h1 className="fm-display text-[clamp(26px,3.5vw,var(--text-h-argument))] text-text mb-4">
          Sleep gear, compared like with like
        </h1>
        <p className="text-base text-muted leading-relaxed">
          {sleepScored.length} of {sleepCatalogSize} products we track state enough about their materials, support,
          cooling and certifications to be scored — each against its own kind only. There is no overall sleep
          leaderboard, because a mattress and a pair of earplugs share nothing to rank.
        </p>
      </header>

      {groups.map((group) => (
        <section key={group} className="mb-12">
          <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-4">{group}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sleepCategories
              .filter((c) => c.group === group)
              .map((c) => {
                const top = c.peers[0].products[0];
                return (
                  <Link
                    key={c.slug}
                    href={`/sleep/best/${c.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.02] p-4 hover:border-accent/40 transition-colors"
                  >
                    {top.image_url ? (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={listThumb(top.image_url)} alt="" fill sizes="48px" className="object-contain p-1" />
                      </div>
                    ) : null}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-text">Best {c.name}</div>
                      <div className="text-xs text-muted truncate">
                        {c.products.length} scored · top: {top.brand} {top.name}
                      </div>
                    </div>
                    <ScoreMeter score={top.quality} size={40} strokeWidth={4} />
                  </Link>
                );
              })}
          </div>
        </section>
      ))}

      <p className="text-xs text-muted leading-relaxed">
        Scores rate what a maker declares, not a lab test. Some links are affiliate links; they never affect a score.
      </p>
    </main>
  );
}
