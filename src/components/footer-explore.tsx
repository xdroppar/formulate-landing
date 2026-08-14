"use client";

import Link from "next/link";
import { useT } from "@/components/i18n-provider";

/**
 * The footer's pSEO hub links, split out as a client component.
 *
 * footer.tsx is a server component and cannot call the locale hook. Converting
 * the whole footer to a client component would drag its images, badges and
 * download tracking into the client bundle to translate nine link labels;
 * lifting out just the labelled nav keeps that cost proportional.
 *
 * The hrefs stay UNPREFIXED on purpose. Only the homepage has a localised
 * route today, so `/es/ingredients` does not exist — `dynamicParams = false`
 * would 404 it. Pointing a Spanish reader at a 404 is worse than pointing them
 * at a working English page. These gain locale prefixes at the same time the
 * pages themselves do.
 */

const LINKS = [
  { href: "/ingredients", key: "ingredients", fallback: "Ingredients" },
  { href: "/nutrients", key: "nutrients", fallback: "Nutrients" },
  { href: "/conditions", key: "conditions", fallback: "Conditions" },
  { href: "/interactions", key: "interactions", fallback: "Interactions" },
  { href: "/synergies", key: "synergies", fallback: "Synergies" },
  { href: "/compare", key: "compare", fallback: "Compare" },
  { href: "/brands", key: "brands", fallback: "Brands" },
  { href: "/stacks", key: "stacks", fallback: "Stacks" },
  { href: "/research", key: "research", fallback: "Research" },
];

export function FooterExplore() {
  const t = useT();
  const label = (key: string, fallback: string) => {
    const path = `footer.links.${key}`;
    const out = t(path);
    return out === path ? fallback : out;
  };

  return (
    <nav
      aria-label={t("footer.explore")}
      className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 mb-6 pb-6 border-b border-border"
    >
      {LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="text-xs text-muted hover:text-text transition-colors py-1"
        >
          {label(l.key, l.fallback)}
        </Link>
      ))}
    </nav>
  );
}
