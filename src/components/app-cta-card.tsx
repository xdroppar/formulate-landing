import { withUtm } from "@/lib/app-url";

const APP_URL = "https://app.formulate-health.app";

/**
 * Contextual "open the app" call-to-action card — the SEO→app conversion bridge
 * dropped onto reference pages (ingredients, brands, …) that otherwise dead-end.
 * Server component (pure); `path` is appended to the app URL, `campaign` tags UTM.
 */
export function AppCtaCard({
  title,
  sub,
  campaign,
  path = "",
  className = "",
}: {
  title: string;
  sub: string;
  campaign: string;
  path?: string;
  className?: string;
}) {
  return (
    <a
      href={withUtm(`${APP_URL}${path}`, { source: "landing", campaign })}
      className={`not-prose flex items-center justify-between gap-4 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-4 hover:border-accent/50 transition-colors ${className}`}
    >
      <div>
        <div className="text-sm font-bold text-text">{title}</div>
        <div className="text-xs text-muted">{sub}</div>
      </div>
      <span className="text-sm font-semibold text-accent whitespace-nowrap">Open app →</span>
    </a>
  );
}
