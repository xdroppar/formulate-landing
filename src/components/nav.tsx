"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { withUtm } from "@/lib/app-url";

type MenuItem = { href: string; title: string; desc: string };

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
  { href: "/interactions", title: "Interaction Checker", desc: "See if your supplements clash" },
  { href: "/tools/dose-calculator", title: "Dose Calculator", desc: "Find your effective dose" },
  { href: "/tools/stack-builder", title: "Stack Builder", desc: "Build & score a stack" },
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
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 hover:bg-surface transition-colors"
              >
                <div className="text-sm font-semibold text-text">{it.title}</div>
                <div className="text-xs text-muted mt-0.5">{it.desc}</div>
              </Link>
            ))}
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
            <Link href="/methodology" className={topLinkClass("/methodology")}>
              Methodology
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={withUtm("https://app.formulate-health.app", { source: "landing", campaign: "nav_open_app" })}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
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
            ].map((group) => (
              <div key={group.label} className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-muted/60">{group.label}</span>
                {group.items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-muted hover:text-text transition-colors py-1 pl-1"
                    role="menuitem"
                  >
                    {it.title}
                  </Link>
                ))}
              </div>
            ))}
            <Link href="/methodology" onClick={() => setOpen(false)} className={`${topLinkClass("/methodology")} py-1`} role="menuitem">
              Methodology
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
