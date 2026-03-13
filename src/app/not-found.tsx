import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="text-8xl mb-4 opacity-10">404</div>
      <h1 className="text-2xl font-extrabold mb-3">Page not found</h1>
      <p className="text-muted text-sm mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
      >
        Go Home
      </Link>
    </div>
  );
}
