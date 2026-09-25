import type { ReactNode } from "react";

/** Industry / leaders benchmark chip used across metric cards. */
export function BenchmarkCallout({
  industry,
  leaders,
  you,
  percentile,
  unit = "%",
  extra,
  className,
}: {
  industry: ReactNode;
  leaders?: ReactNode | null;
  /** Optional "you" / your score value */
  you?: ReactNode | null;
  /** Optional percentile rank (e.g. 86 → 86th) */
  percentile?: number | null;
  /** Appended after industry/leaders/you values when they are numbers/strings */
  unit?: string;
  /** Optional trailing note */
  extra?: ReactNode;
  className?: string;
}) {
  const withUnit = (v: ReactNode) =>
    typeof v === "number" || typeof v === "string" ? (
      <>
        {v}
        {unit}
      </>
    ) : (
      v
    );

  return (
    <div
      className={["benchmark-callout", className].filter(Boolean).join(" ")}
      role="group"
      aria-label="Benchmark"
    >
      <span className="benchmark-callout-kicker">Benchmark</span>
      <div className="benchmark-callout-stats">
        {you != null && you !== "" && (
          <span className="benchmark-stat you">
            <span className="benchmark-stat-val">{withUnit(you)}</span>
            <span className="benchmark-stat-lab">You</span>
          </span>
        )}
        <span className="benchmark-stat">
          <span className="benchmark-stat-val">{withUnit(industry)}</span>
          <span className="benchmark-stat-lab">Industry</span>
        </span>
        {leaders != null && leaders !== "" && (
          <span className="benchmark-stat">
            <span className="benchmark-stat-val">{withUnit(leaders)}</span>
            <span className="benchmark-stat-lab">Leaders</span>
          </span>
        )}
        {percentile != null && (
          <span className="benchmark-stat percentile">
            <span className="benchmark-stat-val">{percentile}th</span>
            <span className="benchmark-stat-lab">Percentile</span>
          </span>
        )}
        {extra}
      </div>
    </div>
  );
}
