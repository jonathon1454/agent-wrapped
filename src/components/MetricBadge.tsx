import { rateBadge, badgeLabel, type BadgeKind } from "../data/admin";

export function MetricBadge({
  value,
  kind,
}: {
  value?: number;
  kind?: BadgeKind;
}) {
  const resolved = kind !== undefined ? kind : value != null ? rateBadge(value) : null;
  const label = badgeLabel(resolved);
  if (!label) return null;
  return (
    <span className={`metric-badge${resolved === "big-win" ? " win" : " going"}`}>
      {label}
    </span>
  );
}
