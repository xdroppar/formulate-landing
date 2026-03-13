import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-6 md:px-12 py-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-base font-extrabold">
        Formulate<span className="text-accent">.</span>
      </div>
      <div className="flex gap-6">
        <Link href="/catalog" className="text-xs text-muted hover:text-text transition-colors">
          Catalog
        </Link>
        <Link href="/brands" className="text-xs text-muted hover:text-text transition-colors">
          Brands
        </Link>
        <Link href="/methodology" className="text-xs text-muted hover:text-text transition-colors">
          Methodology
        </Link>
        <Link href="/disclosure" className="text-xs text-muted hover:text-text transition-colors">
          Disclosure
        </Link>
        <Link href="/privacy" className="text-xs text-muted hover:text-text transition-colors">
          Privacy
        </Link>
        <Link href="/terms" className="text-xs text-muted hover:text-text transition-colors">
          Terms
        </Link>
      </div>
      <div className="text-xs text-muted">© 2026 Formulate. All rights reserved.</div>
    </footer>
  );
}
