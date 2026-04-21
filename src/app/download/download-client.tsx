"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

// Prod fallback, not localhost — if NEXT_PUBLIC_API_URL is ever missing in a
// Vercel build the download page would otherwise spin forever for real users.
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
  const [downloadInfo, setDownloadInfo] = useState<DownloadInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    const p = detectPlatform();
    setPlatform(p);
    trackEvent("download_page_os_detected", { platform: p });
    fetchLatestRelease();
  }, []);

  async function fetchLatestRelease() {
    try {
      const res = await fetch(`${API_URL}/api/v1/releases/latest`, {
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error("Failed to fetch release info");
      const data = await res.json();
      setDownloadInfo({
        download_url: data.download_url ?? `${API_URL}/api/v1/releases/download/installer`,
        version: data.version,
      });
    } catch {
      // Fallback to direct download URL
      setDownloadInfo({
        download_url: `${API_URL}/api/v1/releases/download/installer`,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  const isNonWindows = platform !== "windows" && platform !== "unknown";
  const platformLabel =
    platform === "mac" ? "macOS"
    : platform === "linux" ? "Linux"
    : platform === "ios" ? "iPhone/iPad"
    : platform === "android" ? "Android"
    : "";

  const webAppHref = `${WEB_APP_URL}?utm_source=download_page&utm_medium=landing&utm_campaign=non_windows_fallback&utm_content=${platform}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      <div className="w-full max-w-lg text-center flex flex-col items-center gap-8">
        {/* Logo */}
        <Image src="/logo.png" alt="" width={72} height={72} className="rounded-2xl" aria-hidden="true" unoptimized />

        <div>
          <h1 className="text-3xl font-extrabold mb-3">
            Download Formulate<span className="text-accent">.</span>
          </h1>
          <p className="text-muted text-[15px] leading-relaxed max-w-sm mx-auto">
            The full desktop experience — deeper analysis, personal stack tracking, and your complete supplement dashboard.
          </p>
        </div>

        {/* Non-Windows alternative panel */}
        {isNonWindows && (
          <div className="w-full rounded-2xl border border-accent/40 bg-accent/5 p-6 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
              You&apos;re on {platformLabel}
            </p>
            <h2 className="text-lg font-bold text-text mb-2">
              Use Formulate in your browser — no install needed
            </h2>
            <p className="text-sm text-muted mb-4 leading-relaxed">
              The desktop app is Windows-only for now. The web app has the same
              supplement scores, stack builder, and encyclopedia — runs anywhere,
              free, no account required to browse.
            </p>
            <a
              href={webAppHref}
              onClick={() =>
                trackEvent("web_app_cta_click", {
                  source: "download_non_windows",
                  platform,
                })
              }
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
            >
              Open the web app
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <p className="text-[11px] text-muted/70 mt-3">
              A native {platformLabel} build may come later — for now, the web
              app is the full experience.
            </p>
          </div>
        )}

        {downloadInfo && (
          <a
            href={downloadInfo.download_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              const params = new URLSearchParams(window.location.search);
              trackEvent("download_start", {
                version: downloadInfo.version ?? null,
                utm_source: params.get("utm_source"),
                utm_medium: params.get("utm_medium"),
                utm_campaign: params.get("utm_campaign"),
                utm_content: params.get("utm_content"),
                referrer: document.referrer || null,
              });
            }}
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
        )}

        <p className="text-xs text-muted">~80 MB · Windows 10+ required</p>

        {/* What you get */}
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

        {/* Install info */}
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

        {/* Web app alternative */}
        <p className="text-sm text-muted">
          Don&apos;t want to install?{" "}
          <a
            href={`${WEB_APP_URL}?utm_source=download_page&utm_medium=landing&utm_campaign=download_fallback&utm_content=${platform}`}
            onClick={() =>
              trackEvent("web_app_cta_click", {
                source: "download_bottom",
                platform,
              })
            }
            className="text-accent hover:underline font-medium"
          >
            Use the web app
          </a>
        </p>
      </div>
    </div>
  );
}
