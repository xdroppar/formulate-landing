"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { withUtm } from "@/lib/app-url";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href
        ? "text-accent"
        : "text-muted hover:text-text"
    }`;

  // Close mobile menu on Escape key
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

          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm font-medium text-muted hover:text-text transition-colors">
              Features
            </Link>
            <Link href="/guides" className={linkClass("/guides")}>
              Guides
            </Link>
            <Link href="/interactions" className={linkClass("/interactions")}>
              Interactions
            </Link>
            <Link href="/methodology" className={linkClass("/methodology")}>
              Methodology
            </Link>
            <Link href="/about" className={linkClass("/about")}>
              About
            </Link>
            <Link href="/download" className={linkClass("/download")}>
              Download
            </Link>
            <a
              href="mailto:support@formulate-health.app?subject=Formulate%20Feedback"
              className="text-sm font-medium text-muted hover:text-text transition-colors"
            >
              Feedback
            </a>
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

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4" role="menu">
            <Link href="/#features" onClick={() => setOpen(false)} className="text-sm font-medium text-muted hover:text-text transition-colors py-1" role="menuitem">
              Features
            </Link>
            <Link href="/guides" onClick={() => setOpen(false)} className={`${linkClass("/guides")} py-1`} role="menuitem">
              Guides
            </Link>
            <Link href="/interactions" onClick={() => setOpen(false)} className={`${linkClass("/interactions")} py-1`} role="menuitem">
              Interactions
            </Link>
            <Link href="/methodology" onClick={() => setOpen(false)} className={`${linkClass("/methodology")} py-1`} role="menuitem">
              Methodology
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className={`${linkClass("/about")} py-1`} role="menuitem">
              About
            </Link>
            <Link href="/download" onClick={() => setOpen(false)} className={`${linkClass("/download")} py-1`} role="menuitem">
              Download
            </Link>
            <a
              href="mailto:support@formulate-health.app?subject=Formulate%20Feedback"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-muted hover:text-text transition-colors py-1"
              role="menuitem"
            >
              Feedback
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
