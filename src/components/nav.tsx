"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { withUtm } from "@/lib/app-url";
import { PILLARS } from "@/lib/pillars";

type MenuItem = { href: string; title: string; desc: string; soon?: boolean };

// Read-it pages (SEO / reference) live under "Learn"; do-it tools that pull
// people toward the app live under "Tools". The flat reference pages still
// exist and rank — they just don't all crowd the top nav.
const FOODS: MenuItem[] = [
  { href: "/foods", title: "Whole Foods", desc: "Nutrition & health scores for 480+ foods" },
  { href: "/recipes", title: "Recipes", desc: "700+ recipes, scored on real nutrition" },
];
const LEARN: MenuItem[] = [
  { href: "/guides", title: "Guides", desc: "Evidence-based deep-dives & protocols" },
  { href: "/ingredients", title: "Ingredients", desc: "Look up any ingredient" },
  { href: "/brands", title: "Brands", desc: "Brand trust scores — never sponsored" },
];
const TOOLS: MenuItem[] = [
  { href: "/start", title: "Find Your Stack", desc: "Answer 2 questions, get a stack" },
  { href: "/interactions", title: "Interaction Checker", desc: "See if your supplements clash" },
  { href: "/tools/dose-calculator", title: "Dose Calculator", desc: "Find your effective dose" },
  { href: "/tools/stack-builder", title: "Stack Builder", desc: "Build & score a stack" },
];
// One dropdown that shows the whole platform vision: live pillars link to their
// methodology page, "coming soon" ones are visible but not yet clickable. Driven
// by lib/pillars so launching a pillar is a one-line status flip.
const METHODOLOGY: MenuItem[] = [
  { href: "/methodology", title: "Overview", desc: "How we score every domain" },
  ...PILLARS.map((p) => ({
    href: p.status === "live" ? `/methodology/${p.slug}` : "/methodology",
    title: p.title,
    desc: p.tagline,
    soon: p.status === "soon",
  })),
];

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/** Desktop dropdown menu (hover or click), accessible + closes on outside/Escape. */
function NavMenu({ label, items }: { label: string; items: MenuItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 text-sm font-medium text-muted hover:text-text transition-colors"
      >
        {label}
        <ChevronDown open={open} />
      </button>
      {open && (
        // pt-3 keeps the hover bridge so the menu doesn't close in the gap
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
          <div className="w-[280px] rounded-xl border border-border bg-bg/95 backdrop-blur-md shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] p-2">
            {items.map((it) =>
              it.soon ? (
                <div
                  key={it.title}
                  className="flex items-start justify-between gap-2 rounded-lg px-3 py-2.5 opacity-55"
                >
                  <div>
                    <div className="text-sm font-semibold text-text">{it.title}</div>
                    <div className="text-xs text-muted mt-0.5">{it.desc}</div>
                  </div>
                  <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-muted/60 border border-border rounded-full px-1.5 py-0.5 mt-0.5">
                    Soon
                  </span>
                </div>
              ) : (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 hover:bg-surface transition-colors"
                >
                  <div className="text-sm font-semibold text-text">{it.title}</div>
                  <div className="text-xs text-muted mt-0.5">{it.desc}</div>
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const topLinkClass = (href: string) =>
    `text-sm font-medium transition-colors ${pathname === href ? "text-accent" : "text-muted hover:text-text"}`;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && open) setOpen(false);
  }, [open]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-bg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <nav className="fixed top-0 left-0 right-0 z-100 bg-bg/85 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 md:px-12 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Formulate" width={32} height={32} className="rounded-lg" unoptimized />
            <span className="text-xl font-extrabold tracking-tight text-text">
              Formulate<span className="text-accent">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            <Link href="/supplements" className={topLinkClass("/supplements")}>
              Supplements
            </Link>
            <NavMenu label="Foods" items={FOODS} />
            <NavMenu label="Learn" items={LEARN} />
            <NavMenu label="Tools" items={TOOLS} />
            <NavMenu label="Methodology" items={METHODOLOGY} />
          </div>

          <div className="flex items-center gap-3">
            {/* New users: landing-side goal quiz (/start) that builds an
                evidence-based starter stack, then hands off into the webapp's
                guided value-first onboarding (?reset_onboarding=1). Keeping the
                first step on the landing lets visitors get value before leaving. */}
            <Link
              href="/start"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
            >
              Get started free
            </Link>
            {/* Returning users — secondary, desktop bar only (in the mobile menu otherwise). */}
            <a
              href={withUtm("https://app.formulate-health.app", { source: "landing", campaign: "nav_open_app" })}
              className="hidden md:inline-flex px-4 py-2.5 rounded-xl text-sm font-semibold border border-border text-text hover:border-accent hover:text-accent transition-all"
            >
              Open App
            </a>
            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className={`block w-5 h-0.5 bg-text transition-all ${open ? "rotate-45 translate-y-[4px]" : ""}`} />
              <span className={`block w-5 h-0.5 bg-text transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-text transition-all ${open ? "-rotate-45 -translate-y-[4px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu — grouped, no dropdowns */}
        {open && (
          <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 max-h-[80vh] overflow-y-auto" role="menu">
            <Link href="/supplements" onClick={() => setOpen(false)} className={`${topLinkClass("/supplements")} py-1`} role="menuitem">
              Supplements
            </Link>
            {[
              { label: "Foods", items: FOODS },
              { label: "Learn", items: LEARN },
              { label: "Tools", items: TOOLS },
              { label: "Methodology", items: METHODOLOGY },
            ].map((group) => (
              <div key={group.label} className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-muted/60">{group.label}</span>
                {group.items.map((it) =>
                  it.soon ? (
                    <span
                      key={it.title}
                      className="flex items-center gap-2 text-sm font-medium text-muted/50 py-1 pl-1"
                    >
                      {it.title}
                      <span className="text-[9px] font-bold uppercase tracking-wider text-muted/50 border border-border rounded-full px-1.5 py-0.5">
                        Soon
                      </span>
                    </span>
                  ) : (
                    <Link
                      key={it.href}
                      href={it.href}
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium text-muted hover:text-text transition-colors py-1 pl-1"
                      role="menuitem"
                    >
                      {it.title}
                    </Link>
                  )
                )}
              </div>
            ))}
            {/* "Get started free" is the always-visible bar CTA; surface "Open App" here for returning users. */}
            <a
              href={withUtm("https://app.formulate-health.app", { source: "landing", campaign: "nav_open_app_mobile" })}
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex justify-center px-4 py-2.5 rounded-xl text-sm font-semibold border border-border text-text hover:border-accent hover:text-accent transition-all"
              role="menuitem"
            >
              Open App
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
