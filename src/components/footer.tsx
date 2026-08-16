"use client";

import { useT } from "@/components/i18n-provider";
import Link from "next/link";
import Image from "next/image";
import { TrackedDownloadLink } from "@/components/tracked-download-link";
import { MobileAppBadges } from "@/components/mobile-app-badges";
import { FooterExplore } from "@/components/footer-explore";
import { FooterLegal } from "@/components/footer-legal";

export function Footer() {
  const t = useT();
  return (
    <footer className="px-6 md:px-12 pt-10 pb-6 border-t border-border">
      {/* Mobile-app badges — render only when ENABLED flag in
          mobile-app-badges.tsx is flipped to true post-launch. */}
      <div className="flex justify-center mb-6 empty:hidden">
        <MobileAppBadges source="footer" />
      </div>
      {/* pSEO reference hubs — surfaced site-wide for navigation + crawl
          depth (previously reachable only via in-body links / the sitemap). */}
      <FooterExplore />
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Formulate" width={24} height={24} className="rounded-md" unoptimized />
          <span className="text-base font-extrabold">
            Formulate<span className="text-accent">.</span>
          </span>
        </div>
        <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
          <Link href="/supplements" className="text-xs text-muted hover:text-text transition-colors py-2">{t("footerLinks.supplements")}</Link>
          <Link href="/foods" className="text-xs text-muted hover:text-text transition-colors py-2">{t("footerLinks.foods")}</Link>
          <Link href="/recipes" className="text-xs text-muted hover:text-text transition-colors py-2">{t("footerLinks.recipes")}</Link>
          <Link href="/guides" className="text-xs text-muted hover:text-text transition-colors py-2">{t("footerLinks.guides")}</Link>
          <Link href="/methodology" className="text-xs text-muted hover:text-text transition-colors py-2">{t("footerLinks.methodology")}</Link>
          <TrackedDownloadLink href="/download" source="footer" className="text-xs text-muted hover:text-text transition-colors py-2">{t("footerLinks.desktopApp")}</TrackedDownloadLink>
          <Link href="/about" className="text-xs text-muted hover:text-text transition-colors py-2">{t("footerLinks.about")}</Link>
          <Link href="/disclosure" className="text-xs text-muted hover:text-text transition-colors py-2">{t("footerLinks.disclosure")}</Link>
          <Link href="/privacy" className="text-xs text-muted hover:text-text transition-colors py-2">{t("footerLinks.privacy")}</Link>
          <Link href="/terms" className="text-xs text-muted hover:text-text transition-colors py-2">{t("footerLinks.terms")}</Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/support" className="text-xs text-muted hover:text-text transition-colors py-2">{t("footerLinks.support")}</Link>
          <span className="text-xs text-muted">&copy; 2026 Formulate. All rights reserved.</span>
        </div>
      </div>
      <FooterLegal />
    </footer>
  );
}
