"use client";

/**
 * The console landing, whole.
 *
 * `.cn` is the scope every rule in console.css hangs off, so it is set once
 * here and nowhere else — a section that set its own would be styled when
 * rendered alone and unstyled when composed, which is the kind of bug that
 * only shows up in the arrangement nobody screenshotted.
 */
import { ConsoleNav, ConsoleHero } from "@/components/console/console-hero";
import { ConsoleSections } from "@/components/console/console-sections";

export function ConsoleLanding({ faq }: { faq?: React.ReactNode }) {
  return (
    <div className="cn">
      <ConsoleNav />
      <ConsoleHero />
      <ConsoleSections faq={faq} />
    </div>
  );
}
