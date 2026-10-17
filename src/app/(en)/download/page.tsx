import { Suspense } from "react";
import { Metadata } from "next";
import { DownloadClient } from "./download-client";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: { absolute: "Download Formulate — Free Supplement Tracker for iPhone" }, // names the brand already; the template would add it twice
  description:
    "Get the free Formulate app for iPhone: scan any supplement label, build your personal stack, and track daily intake. Also free in your browser, no install.",
  alternates: { canonical: "https://formulate-health.app/download" },
  openGraph: {
    title: "Formulate — Free Supplement Tracker for iPhone",
    description:
      "Scan any label, build your stack, and track daily intake — free on iPhone and in the web app.",
    url: "https://formulate-health.app/download",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Formulate — Free Supplement Tracker for iPhone",
    description:
      "Scan any label, build your stack, and track daily intake — free on iPhone and in the web app.",
  },
};

export default function DownloadPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      }
    >
      <DownloadClient />
    </Suspense>
  );
}
