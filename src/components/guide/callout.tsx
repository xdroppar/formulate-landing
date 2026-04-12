/**
 * Callout box — visually distinct blocks for warnings, tips, and evidence.
 * Breaks up text walls and makes important info unmissable for skimmers.
 */

type CalloutVariant = "warning" | "tip" | "evidence" | "info";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}

const config: Record<CalloutVariant, { icon: string; defaultTitle: string; border: string; bg: string; titleColor: string }> = {
  warning: {
    icon: "⚠️",
    defaultTitle: "Watch out",
    border: "border-[#F59E0B]/25",
    bg: "bg-[#F59E0B]/[0.04]",
    titleColor: "text-[#F59E0B]",
  },
  tip: {
    icon: "💡",
    defaultTitle: "Tip",
    border: "border-accent/25",
    bg: "bg-accent/[0.04]",
    titleColor: "text-accent",
  },
  evidence: {
    icon: "📊",
    defaultTitle: "What the research says",
    border: "border-[#3B82F6]/25",
    bg: "bg-[#3B82F6]/[0.04]",
    titleColor: "text-[#3B82F6]",
  },
  info: {
    icon: "ℹ️",
    defaultTitle: "Note",
    border: "border-border",
    bg: "bg-surface",
    titleColor: "text-muted",
  },
};

export function Callout({ variant = "info", title, children }: CalloutProps) {
  const c = config[variant];
  return (
    <div className={`not-prose my-6 rounded-xl ${c.bg} border ${c.border} px-5 py-4`}>
      <div className={`flex items-center gap-2 mb-2 text-xs font-bold tracking-wide uppercase ${c.titleColor}`}>
        <span>{c.icon}</span>
        {title || c.defaultTitle}
      </div>
      <div className="text-sm text-text/80 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
