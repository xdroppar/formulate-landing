import type { Metadata } from "next";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://formulate-api.onrender.com";

export const metadata: Metadata = {
  title: "Unsubscribe — Formulate",
  robots: { index: false, follow: false },
};

async function unsubscribe(token: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${API_URL}/api/v1/newsletter/unsubscribe/${encodeURIComponent(token)}`,
      { cache: "no-store" }
    );
    return res.ok;
  } catch {
    return false;
  }
}

export default async function UnsubscribePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const success = await unsubscribe(token);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-[480px] w-full bg-surface border border-border rounded-2xl p-10 text-center">
        {success ? (
          <>
            <div className="text-accent text-3xl mb-3">✓</div>
            <h1 className="text-xl font-bold text-text mb-2">
              You've been unsubscribed
            </h1>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              You won't receive any more emails from Formulate guides.
              Thanks for reading.
            </p>
          </>
        ) : (
          <>
            <div className="text-danger text-3xl mb-3">✕</div>
            <h1 className="text-xl font-bold text-text mb-2">
              Invalid unsubscribe link
            </h1>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              This link may have expired or already been used. If you're
              still receiving emails, reply to one and we'll remove you manually.
            </p>
          </>
        )}
        <Link
          href="/"
          className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
        >
          Back to Formulate
        </Link>
      </div>
    </div>
  );
}
