"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

// Prod fallback, not localhost — if NEXT_PUBLIC_API_URL is ever missing in a
// Vercel build the page would otherwise spin forever for real users.
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://formulate-api.onrender.com";
const WEB_APP_URL = "https://app.formulate-health.app";

interface DownloadInfo {
  download_url: string;
  version?: string;
}

type Platform = "windows" | "mac" | "linux" | "ios" | "android" | "unknown";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  if (/Mac/i.test(ua)) return "mac";
  if (/Linux|CrOS/i.test(ua)) return "linux";
  if (/Win/i.test(ua)) return "windows";
  return "unknown";
}

export function DownloadClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [platform, setPlatform] = useState<Platform>("unknown");
  // Token-gated download (only set when an approval token validates)
  const [downloadInfo, setDownloadInfo] = useState<DownloadInfo | null>(null);
  const [tokenChecking, setTokenChecking] = useState<boolean>(!!token);
  const [tokenInvalid, setTokenInvalid] = useState(false);

  // Request form state
  const [email, setEmail] = useState("");
  const [requestStatus, setRequestStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");
  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    const p = detectPlatform();
    setPlatform(p);
    trackEvent("download_page_os_detected", { platform: p });

    if (token) {
      validateToken(token);
    }
  }, [token]);

  async function validateToken(t: string) {
    setTokenChecking(true);
    try {
      const res = await fetch(
        `${API_URL}/api/v1/waitlist/download/${encodeURIComponent(t)}`,
        { signal: AbortSignal.timeout(8000) }
      );
      if (!res.ok) throw new Error("invalid");
      const data = await res.json();
      setDownloadInfo({
        download_url:
          data.download_url ??
          `${API_URL}/api/v1/releases/download/installer?token=${encodeURIComponent(t)}`,
        version: data.version,
      });
      trackEvent("download_token_valid", {});
    } catch {
      setTokenInvalid(true);
      trackEvent("download_token_invalid", {});
    } finally {
      setTokenChecking(false);
    }
  }

  async function handleRequest(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setRequestStatus("loading");
    setRequestError("");
    try {
      const res = await fetch(`${API_URL}/api/v1/waitlist/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        const data = await res
          .json()
          .catch(() => ({ detail: "Something went wrong." }));
        throw new Error(data.detail || "Something went wrong.");
      }
      setRequestStatus("success");
      localStorage.setItem(
        "formulate_waitlist_email",
        email.trim().toLowerCase()
      );
      trackEvent("desktop_access_requested", { platform });
      setEmail("");
    } catch (err) {
      setRequestStatus("error");
      setRequestError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  const platformLabel =
    platform === "mac" ? "macOS"
    : platform === "linux" ? "Linux"
    : platform === "ios" ? "iPhone/iPad"
    : platform === "android" ? "Android"
    : "";

  const webAppHref = `${WEB_APP_URL}?utm_source=download_page&utm_medium=landing&utm_campaign=request_access&utm_content=${platform}`;

  // While validating an approval token, hold the page.
  if (tokenChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      <div className="w-full max-w-lg text-center flex flex-col items-center gap-8">
        {/* Logo */}
        <Image src="/logo.png" alt="" width={72} height={72} className="rounded-2xl" aria-hidden="true" unoptimized />

        {/* ── Approved download (valid token) ───────────────────── */}
        {downloadInfo ? (
          <>
            <div>
              <h1 className="text-3xl font-extrabold mb-3">
                You&apos;re in<span className="text-accent">.</span>
              </h1>
              <p className="text-muted text-[15px] leading-relaxed max-w-sm mx-auto">
                Your desktop access has been approved. Download the Windows app below.
              </p>
            </div>

            <a
              href={downloadInfo.download_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("download_start", {
                  version: downloadInfo.version ?? null,
                })
              }
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold bg-accent text-bg hover:bg-[#00ffb3] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,229,160,0.3)] transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
              </svg>
              Download for Windows
              {downloadInfo.version && (
                <span className="text-bg/60 text-sm font-normal">v{downloadInfo.version}</span>
              )}
            </a>

            <p className="text-xs text-muted">~80 MB · Windows 10+ required</p>

            <div className="p-5 rounded-xl bg-surface border border-border text-left w-full max-w-sm">
              <p className="text-xs font-semibold text-text mb-3">Quick start</p>
              <ol className="text-xs text-muted space-y-2 list-decimal list-inside">
                <li>Run the installer</li>
                <li>Create an account or sign in</li>
                <li>Start adding supplements to your stack</li>
              </ol>
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-[11px] text-muted/70">
                  Windows may show a SmartScreen warning — click &quot;More info&quot; then &quot;Run anyway&quot;.
                </p>
              </div>
            </div>
          </>
        ) : (
          /* ── Request access (default / no or invalid token) ───── */
          <>
            <div>
              <h1 className="text-3xl font-extrabold mb-3">
                Use Formulate in your browser<span className="text-accent">.</span>
              </h1>
              <p className="text-muted text-[15px] leading-relaxed max-w-sm mx-auto">
                The web app has the full experience — supplement scores, your
                personal stack, daily tracking, and the encyclopedia. No
                install, runs anywhere, free.
              </p>
            </div>

            {/* Primary CTA: web app */}
            <a
              href={webAppHref}
              onClick={() =>
                trackEvent("web_app_cta_click", { source: "download_primary", platform })
              }
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold bg-accent text-bg hover:bg-[#00ffb3] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,229,160,0.3)] transition-all"
            >
              Open the web app
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            {/* What you get (web app) */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {[
                { icon: "📊", text: "Full score breakdowns" },
                { icon: "💊", text: "Personal stack builder" },
                { icon: "📅", text: "Daily schedule & tracking" },
                { icon: "🔬", text: "Supplement encyclopedia" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5 bg-surface border border-border rounded-lg px-3.5 py-3 text-left">
                  <span className="text-base" aria-hidden="true">{item.icon}</span>
                  <span className="text-xs font-medium text-text">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Desktop request panel */}
            <div className="w-full rounded-2xl border border-border bg-surface p-6 text-left">
              {tokenInvalid && (
                <p className="text-xs font-semibold text-danger mb-3">
                  That download link is invalid or has expired. Request access again below.
                </p>
              )}
              <h2 className="text-lg font-bold text-text mb-2">
                Want the Windows desktop app?
              </h2>
              <p className="text-sm text-muted mb-4 leading-relaxed">
                The desktop app is in limited access while we polish it. Request
                access and we&apos;ll email you a download link once it&apos;s approved.
              </p>

              {requestStatus === "success" ? (
                <div className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-semibold" role="status">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Request received — we&apos;ll email you a download link.
                </div>
              ) : (
                <form onSubmit={handleRequest} className="flex flex-col gap-2.5">
                  <div className="flex gap-2.5">
                    <label htmlFor="desktop-request-email" className="sr-only">Email address</label>
                    <input
                      id="desktop-request-email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="flex-1 min-w-0 px-4 py-3 rounded-xl text-sm bg-bg border border-border text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={requestStatus === "loading"}
                      aria-busy={requestStatus === "loading"}
                      className="px-5 py-3 rounded-xl text-sm font-bold bg-text/10 text-text border border-border hover:border-accent hover:text-accent transition-all disabled:opacity-60 whitespace-nowrap cursor-pointer"
                    >
                      {requestStatus === "loading" ? "Sending…" : "Request access"}
                    </button>
                  </div>
                  {requestStatus === "error" && (
                    <p className="text-xs text-danger" role="alert">{requestError}</p>
                  )}
                </form>
              )}

              {platformLabel && platform !== "windows" && (
                <p className="text-[11px] text-muted/70 mt-3">
                  Heads up — the desktop app is Windows-only. On {platformLabel}, the web app is the full experience.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
