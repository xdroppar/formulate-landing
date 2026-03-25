"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.formulate-health.app";

export function Nav() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href
        ? "text-accent"
        : "text-muted hover:text-text"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-6 md:px-12 py-4 bg-bg/85 backdrop-blur-md border-b border-border">
      <Link href="/" className="text-xl font-extrabold tracking-tight text-text">
        Formulate<span className="text-accent">.</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <a href={`${APP_URL}/catalog`} className="text-sm font-medium text-muted hover:text-text transition-colors">
          Catalog
        </a>
        <a href={`${APP_URL}/brands`} className="text-sm font-medium text-muted hover:text-text transition-colors">
          Brands
        </a>
        <Link href="/download" className={linkClass("/download")}>
          Download
        </Link>
        <Link href="/#features" className="text-sm font-medium text-muted hover:text-text transition-colors">
          Features
        </Link>
        <Link href="/methodology" className={linkClass("/methodology")}>
          Methodology
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <a
          href={APP_URL}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
        >
          Open App
        </a>
      </div>
    </nav>
  );
}
