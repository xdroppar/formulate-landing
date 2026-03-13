/**
 * Badge shown on features/products only visible to dev role users.
 */
export function DevBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent2/15 text-accent2 border border-accent2/30">
      <span className="w-1.5 h-1.5 rounded-full bg-accent2 animate-pulse" />
      Dev
    </span>
  );
}
