import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,229,160,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="text-[120px] font-black leading-none text-accent/10 mb-2">404</div>
      <h1 className="text-2xl font-extrabold mb-3">Page not found</h1>
      <p className="text-muted text-sm mb-8 max-w-sm leading-relaxed">
        This page doesn&apos;t exist. Maybe you were looking for a supplement score?
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <a
          href="https://app.formulate-health.app/catalog"
          className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
        >
          Browse Supplement Scores
        </a>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-xl text-sm font-medium text-muted border border-border hover:border-accent hover:text-accent transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
