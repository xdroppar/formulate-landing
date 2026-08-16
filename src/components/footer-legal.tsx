"use client";

import { useT } from "@/components/i18n-provider";

/**
 * The medical/affiliate disclaimer, split out as a client component.
 *
 * footer.tsx is a server component and cannot call the locale hook, and this
 * is the one string in it that must be translated — a disclaimer a Spanish
 * reader cannot read is not a disclaimer. Lifting one paragraph keeps the
 * rest of the footer (images, download tracking) off the client bundle.
 */
export function FooterLegal() {
  const t = useT();
  return (
    <div className="text-[11px] text-muted/70 text-center leading-relaxed max-w-[700px] mx-auto">
      {t("chrome.formulateIsAnInformationalTool")}
    </div>
  );
}
