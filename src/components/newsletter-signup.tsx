"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://formulate-api.onrender.com";

interface NewsletterSignupProps {
  /** e.g. "guide:supplement-timing-guide" — helps track where signups come from */
  source?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterSignup({ source }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/v1/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Something went wrong");
      }

      trackEvent("newsletter_subscribe", { source: source || "unknown" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-14 rounded-2xl bg-accent/[0.04] border border-accent/20 px-6 py-8 text-center">
        <div className="text-accent text-2xl mb-2">✓</div>
        <h3 className="text-base font-bold text-text mb-1">You're subscribed</h3>
        <p className="text-sm text-muted">
          We'll send you a digest whenever we publish new evidence-based guides.
          Check your inbox for a welcome email.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-14 rounded-2xl bg-surface border border-border px-6 py-8">
      <div className="max-w-[440px] mx-auto text-center">
        <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-accent mb-3">
          📬 Get new guides in your inbox
        </div>
        <h3 className="text-lg font-bold text-text mb-2">
          Evidence-based supplement guides, no spam
        </h3>
        <p className="text-sm text-muted mb-5 leading-relaxed">
          We send a short digest when new guides drop &mdash; nothing else.
          No affiliate pushes, no sponsored content, unsubscribe anytime.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "submitting"}
            className="flex-1 px-4 py-2.5 rounded-xl bg-bg border border-border text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === "submitting" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>

        {error && (
          <p className="text-xs text-danger mt-3">{error}</p>
        )}
      </div>
    </div>
  );
}
