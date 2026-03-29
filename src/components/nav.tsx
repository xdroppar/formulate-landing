"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href
        ? "text-accent"
        : "text-muted hover:text-text"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 bg-bg/85 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-6 md:px-12 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Formulate" width={32} height={32} className="rounded-lg" />
          <span className="text-xl font-extrabold tracking-tight text-text">
            Formulate<span className="text-accent">.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="text-sm font-medium text-muted hover:text-text transition-colors">
            Features
          </Link>
          <Link href="/#methodology" className="text-sm font-medium text-muted hover:text-text transition-colors">
            Methodology
          </Link>
          <Link href="/download" className={linkClass("/download")}>
            Download
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://app.formulate-health.app"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
          >
            Open App
          </a>
          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-text transition-all ${open ? "rotate-45 translate-y-[4px]" : ""}`} />
            <span className={`block w-5 h-0.5 bg-text transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-text transition-all ${open ? "-rotate-45 -translate-y-[4px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4">
          <Link href="/#features" onClick={() => setOpen(false)} className="text-sm font-medium text-muted hover:text-text transition-colors py-1">
            Features
          </Link>
          <Link href="/#methodology" onClick={() => setOpen(false)} className="text-sm font-medium text-muted hover:text-text transition-colors py-1">
            Methodology
          </Link>
          <Link href="/download" onClick={() => setOpen(false)} className={`${linkClass("/download")} py-1`}>
            Download
          </Link>
        </div>
      )}
    </nav>
  );
}
