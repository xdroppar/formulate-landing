"use client";

import { useState, FormEvent, useId } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputId = useId();
  const errorId = useId();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/api/v1/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ detail: "Something went wrong." }));
        throw new Error(data.detail || "Something went wrong.");
      }

      setStatus("success");
      // Save email so the /download page can check their status later
      localStorage.setItem("formulate_waitlist_email", email.trim().toLowerCase());
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-semibold" role="status">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        You&apos;re on the list! We&apos;ll be in touch.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-full max-w-[460px]">
      <div className="flex w-full gap-2.5">
        <label htmlFor={inputId} className="sr-only">Email address</label>
        <input
          id={inputId}
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          aria-describedby={status === "error" ? errorId : undefined}
          aria-invalid={status === "error"}
          className="flex-1 min-w-0 px-4 py-3.5 rounded-xl text-sm bg-surface border border-border text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-busy={status === "loading"}
          className="px-6 py-3.5 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,229,160,0.3)] transition-all disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer whitespace-nowrap"
        >
          {status === "loading" ? "Joining..." : "Join Waitlist"}
        </button>
      </div>
      {status === "error" && (
        <p id={errorId} className="text-xs text-danger" role="alert">{errorMsg}</p>
      )}
    </form>
  );
}
