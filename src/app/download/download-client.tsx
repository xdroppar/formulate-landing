"use client";

import { useState, useEffect } from "react";

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
      // Use the API proxy to download the installer (repo is private)
      setDownloadInfo({
        download_url: `${API_URL}/api/v1/releases/download/installer`,
      });
    } catch {
      // Fallback — still show the button with the API URL
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
      <div className="w-full max-w-lg text-center flex flex-col items-center gap-6">
        {/* Checkmark icon */}
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold mb-2">
            Download Formulate<span className="text-accent">.</span>
          </h1>
          <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">
            Build your optimal longevity stack with evidence-based supplement scoring.
          </p>
        </div>

        {downloadInfo && (
          <a
            href={downloadInfo.download_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold bg-accent text-bg hover:bg-[#00ffb3] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,229,160,0.3)] transition-all"
          >
            {/* Windows icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
            </svg>
            Download for Windows
          </a>
        )}

        <div className="mt-4 p-4 rounded-xl bg-surface border border-border text-left max-w-sm">
          <p className="text-xs font-semibold text-text mb-2">Quick start</p>
          <ol className="text-xs text-muted space-y-1.5 list-decimal list-inside">
            <li>Run the installer</li>
            <li>Create an account or sign in</li>
            <li>Start adding supplements to your stack</li>
          </ol>
          <p className="text-xs text-muted/60 mt-3">
            Windows may show a SmartScreen warning — click &quot;More info&quot; then &quot;Run anyway&quot;.
          </p>
        </div>
      </div>
    </div>
  );
}
