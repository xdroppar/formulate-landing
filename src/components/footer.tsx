import Link from "next/link";
import Image from "next/image";
import { TrackedDownloadLink } from "@/components/tracked-download-link";

export function Footer() {
  return (
    <footer className="px-6 md:px-12 pt-10 pb-6 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Formulate" width={24} height={24} className="rounded-md" unoptimized />
          <span className="text-base font-extrabold">
            Formulate<span className="text-accent">.</span>
          </span>
        </div>
        <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
          <TrackedDownloadLink href="/download" source="footer" className="text-xs text-muted hover:text-text transition-colors py-2">
            Download
          </TrackedDownloadLink>
          <Link href="/guides" className="text-xs text-muted hover:text-text transition-colors py-2">
            Guides
          </Link>
          <Link href="/methodology" className="text-xs text-muted hover:text-text transition-colors py-2">
            Methodology
          </Link>
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
          <a href="mailto:support@formulate-health.app" className="text-xs text-muted hover:text-text transition-colors py-2">
            Support
          </a>
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
