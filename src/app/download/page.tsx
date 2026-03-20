import { Metadata } from "next";
import { DownloadClient } from "./download-client";

export const metadata: Metadata = {
  title: "Download",
  description: "Download Formulate for Windows — build your optimal longevity stack.",
};

export default function DownloadPage() {
  return <DownloadClient />;
}
