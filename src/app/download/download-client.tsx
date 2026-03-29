"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface DownloadInfo {
  download_url: string;
  version?: string;
}

export function DownloadClient() {
  const [downloadInfo, setDownloadInfo] = useState<DownloadInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestRelease();
  }, []);

  async function fetchLatestRelease() {
    try {
      setDownloadInfo({
        download_url: `${API_URL}/api/v1/releases/download/installer`,
      });
    } catch {
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      <div className="w-full max-w-lg text-center flex flex-col items-center gap-8">
        {/* Logo */}
        <Image src="/logo.png" alt="Formulate" width={72} height={72} className="rounded-2xl" />

        <div>
          <h1 className="text-3xl font-extrabold mb-3">
            Download Formulate<span className="text-accent">.</span>
          </h1>
          <p className="text-muted text-[15px] leading-relaxed max-w-sm mx-auto">
            The full desktop experience — deeper analysis, personal stack tracking, and your complete supplement dashboard.
          </p>
        </div>

        {downloadInfo && (
          <a
            href={downloadInfo.download_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold bg-accent text-bg hover:bg-[#00ffb3] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,229,160,0.3)] transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
            </svg>
            Download for Windows
          </a>
        )}

        {/* What you get */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {[
            { icon: "📊", text: "Full score breakdowns" },
            { icon: "💊", text: "Personal stack builder" },
            { icon: "📅", text: "Daily schedule & tracking" },
            { icon: "🔬", text: "Supplement encyclopedia" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2.5 bg-surface border border-border rounded-lg px-3.5 py-3 text-left">
              <span className="text-base">{item.icon}</span>
              <span className="text-xs font-medium text-text">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Install info */}
        <div className="p-5 rounded-xl bg-surface border border-border text-left w-full max-w-sm">
          <p className="text-xs font-semibold text-text mb-3">Quick start</p>
          <ol className="text-xs text-muted space-y-2 list-decimal list-inside">
            <li>Run the installer (~80 MB)</li>
            <li>Create an account or sign in</li>
            <li>Start adding supplements to your stack</li>
          </ol>
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-[11px] text-muted/60">
              Windows 10+ required. Windows may show a SmartScreen warning — click &quot;More info&quot; then &quot;Run anyway&quot;.
            </p>
          </div>
        </div>

        {/* Web app alternative */}
        <p className="text-sm text-muted">
          Don&apos;t want to install?{" "}
          <a href="https://app.formulate-health.app" className="text-accent hover:underline font-medium">
            Use the web app
          </a>
        </p>
      </div>
    </div>
  );
}
