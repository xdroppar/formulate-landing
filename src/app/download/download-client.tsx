"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { WaitlistForm } from "@/components/waitlist-form";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Status = "loading" | "approved" | "pending" | "rejected" | "not_found" | "error";

interface DownloadInfo {
  download_url: string;
  version?: string;
}

export function DownloadClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [downloadInfo, setDownloadInfo] = useState<DownloadInfo | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      validateToken(token);
    } else {
      checkEmailStatus();
    }
  }, [token]);

  async function validateToken(t: string) {
    try {
      const res = await fetch(`${API_URL}/api/v1/waitlist/download/${t}`);
      if (!res.ok) {
        setStatus("error");
        setError("This download link is invalid or has expired.");
        return;
      }
      const data: DownloadInfo = await res.json();
      setDownloadInfo(data);
      setStatus("approved");
    } catch {
      setStatus("error");
      setError("Could not validate your download link. Please try again.");
    }
  }

  async function checkEmailStatus() {
    const email = localStorage.getItem("formulate_waitlist_email");
    if (!email) {
      setStatus("not_found");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/v1/waitlist/status?email=${encodeURIComponent(email)}`
      );
      if (!res.ok) {
        setStatus("not_found");
        return;
      }
      const data = await res.json();
      setStatus(data.status as Status);

      if (data.status === "approved") {
        // Fetch the download URL via the latest release
        setDownloadInfo({
          download_url: `https://github.com/xdroppar/Formulate/releases/latest`,
        });
      }
    } catch {
      setStatus("not_found");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      <div className="w-full max-w-lg text-center">
        {status === "loading" && <LoadingState />}
        {status === "approved" && <ApprovedState downloadInfo={downloadInfo} />}
        {status === "pending" && <PendingState />}
        {status === "rejected" && <RejectedState />}
        {status === "not_found" && <NotFoundState />}
        {status === "error" && <ErrorState message={error} />}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      <p className="text-muted text-sm">Checking your access...</p>
    </div>
  );
}

function ApprovedState({ downloadInfo }: { downloadInfo: DownloadInfo | null }) {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Checkmark icon */}
      <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold mb-2">
          You&apos;re in<span className="text-accent">.</span>
        </h1>
        <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">
          Download Formulate for Windows and start building your longevity stack.
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
  );
}

function PendingState() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Clock icon */}
      <div className="w-16 h-16 rounded-full bg-warning/10 border border-warning/20 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold mb-2">
          You&apos;re on the list<span className="text-accent">.</span>
        </h1>
        <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">
          We&apos;re rolling out access in small batches. You&apos;ll get an email with your download link when your spot is ready.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-surface border border-border text-xs text-muted max-w-sm">
        Keep an eye on your inbox — we&apos;ll send you a link as soon as you&apos;re approved.
      </div>
    </div>
  );
}

function RejectedState() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-16 h-16 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </div>

      <div>
        <h1 className="text-2xl font-extrabold mb-2">Access unavailable</h1>
        <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">
          Unfortunately we&apos;re unable to grant access at this time. If you think this is a mistake, please reach out to us.
        </p>
      </div>
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div>
        <h1 className="text-3xl font-extrabold mb-2">
          Get early access<span className="text-accent">.</span>
        </h1>
        <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">
          Join the waitlist to get access to the Formulate desktop app.
          We&apos;ll send you a download link when your spot is ready.
        </p>
      </div>

      <WaitlistForm />

      <p className="text-xs text-muted/50">
        Already on the waitlist? Check your email for a download link.
      </p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-16 h-16 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <div>
        <h1 className="text-2xl font-extrabold mb-2">Something went wrong</h1>
        <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">{message}</p>
      </div>
    </div>
  );
}
