import { rateBadge, badgeLabel, type BadgeKind } from "../data/admin";
import { FireworksBurst } from "./FireworksBurst";

function TrophyIcon() {
  return (
    <svg
      className="metric-badge-icon"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 6H5.5A2.5 2.5 0 0 0 3 8.5C3 11 5 12 7 12M17 6h1.5A2.5 2.5 0 0 1 21 8.5C21 11 19 12 17 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 17h6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MetricBadge({
  value,
  kind,
  className,
  celebrate,
  celebrateDelay = 0.45,
}: {
  value?: number;
  kind?: BadgeKind;
  className?: string;
  /**
   * Fireworks on mount for Big Win. Defaults to true; pass false to suppress
   * (e.g. wait for an intro to finish, then remount with celebrate).
   */
  celebrate?: boolean;
  celebrateDelay?: number;
}) {
  const resolved = kind !== undefined ? kind : value != null ? rateBadge(value) : null;
  const label = badgeLabel(resolved);
  if (!label) return null;
  const isWin = resolved === "big-win";
  const shouldCelebrate = isWin && celebrate !== false;
  return (
    <span className="metric-badge-wrap">
      {shouldCelebrate && <FireworksBurst delay={celebrateDelay} />}
      <span
        className={[
          "metric-badge",
          isWin ? "win" : "going",
          shouldCelebrate ? "celebrating" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {isWin && <TrophyIcon />}
        <span className="metric-badge-label">{label}</span>
      </span>
    </span>
  );
}
