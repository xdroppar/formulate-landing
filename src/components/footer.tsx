import Link from "next/link";
import Image from "next/image";
import { TrackedDownloadLink } from "@/components/tracked-download-link";
import { MobileAppBadges } from "@/components/mobile-app-badges";

export function Footer() {
  return (
    <footer className="px-6 md:px-12 pt-10 pb-6 border-t border-border">
      {/* Mobile-app badges — render only when ENABLED flag in
          mobile-app-badges.tsx is flipped to true post-launch. */}
      <div className="flex justify-center mb-6 empty:hidden">
        <MobileAppBadges source="footer" />
      </div>
      {/* pSEO reference hubs — surfaced site-wide for navigation + crawl
          depth (previously reachable only via in-body links / the sitemap). */}
      <nav
        aria-label="Explore"
        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 mb-6 pb-6 border-b border-border"
      >
        {[
          { href: "/ingredients", label: "Ingredients" },
          { href: "/nutrients", label: "Nutrients" },
          { href: "/conditions", label: "Conditions" },
          { href: "/interactions", label: "Interactions" },
          { href: "/synergies", label: "Synergies" },
          { href: "/compare", label: "Compare" },
          { href: "/brands", label: "Brands" },
          { href: "/stacks", label: "Stacks" },
          { href: "/research", label: "Research" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-xs text-muted hover:text-text transition-colors py-1"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Formulate" width={24} height={24} className="rounded-md" unoptimized />
          <span className="text-base font-extrabold">
            Formulate<span className="text-accent">.</span>
          </span>
        </div>
        <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
          <Link href="/supplements" className="text-xs text-muted hover:text-text transition-colors py-2">
            Supplements
          </Link>
          <Link href="/foods" className="text-xs text-muted hover:text-text transition-colors py-2">
            Foods
          </Link>
          <Link href="/recipes" className="text-xs text-muted hover:text-text transition-colors py-2">
            Recipes
          </Link>
          <Link href="/guides" className="text-xs text-muted hover:text-text transition-colors py-2">
            Guides
          </Link>
          <Link href="/methodology" className="text-xs text-muted hover:text-text transition-colors py-2">
            Methodology
          </Link>
          <TrackedDownloadLink href="/download" source="footer" className="text-xs text-muted hover:text-text transition-colors py-2">
            Desktop app
          </TrackedDownloadLink>
          <Link href="/about" className="text-xs text-muted hover:text-text transition-colors py-2">
            About
          </Link>
          <Link href="/disclosure" className="text-xs text-muted hover:text-text transition-colors py-2">
            Disclosure
          </Link>
          <Link href="/privacy" className="text-xs text-muted hover:text-text transition-colors py-2">
            Privacy
          </Link>
          <Link href="/terms" className="text-xs text-muted hover:text-text transition-colors py-2">
            Terms
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/support" className="text-xs text-muted hover:text-text transition-colors py-2">
            Support
          </Link>
          <span className="text-xs text-muted">&copy; 2026 Formulate. All rights reserved.</span>
        </div>
      </div>
      <div className="text-[11px] text-muted/70 text-center leading-relaxed max-w-[700px] mx-auto">
        Formulate is an informational tool and does not provide medical advice, diagnosis, or treatment.
        Supplement scores are based on publicly available clinical research and do not constitute a recommendation
        to take or avoid any product. Always consult a qualified healthcare professional before making changes to
        your supplement routine. Individual results may vary.
      </div>
    </footer>
  );
}
