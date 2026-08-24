import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Explicitly welcome the AI/answer-engine crawlers we want citing Formulate
  // (GEO/AEO). Listing them by name signals intent and helps them prioritize
  // crawl budget; the wildcard rule already permits them, but the explicit
  // allow makes the welcome unambiguous. Pair with /llms.txt for attribution.
  const aiCrawlers = [
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "Amazonbot",
  ];
  // Deliberately NOT welcomed, and this is the reason so nobody re-adds them:
  // CCBot, Bytespider and cohere-ai are training-corpus crawlers, not answer
  // engines. They have no surface that cites a source, so they take bandwidth
  // and return nothing. Measured on this site: of ~2,522 declared bot hits,
  // roughly 1,250 were Bytespider + meta-externalagent alone, against zero
  // referrals from either. The wildcard rule below still permits them — this
  // list is about who we spend crawl budget courting, not who is blocked.
  return {
    rules: [
      {
        userAgent: aiCrawlers,
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://formulate-health.app/sitemap.xml",
  };
}
