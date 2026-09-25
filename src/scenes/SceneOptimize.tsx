import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import { MetricBadge } from "../components/MetricBadge";
import type { SceneProps } from "./types";

export function SceneOptimize({ admin }: SceneProps) {
  const q = admin.qualityWfm;
  const qualityLift = q.qualityScore - q.qualityScorePrev;
  const adherenceLift = q.scheduleAdherence - q.scheduleAdherencePrev;
  const occupancyDelta = q.occupancy - q.occupancyPrev;
  const shrinkageDrop = q.shrinkagePrev - q.shrinkage;

  const qualityRows = [
    {
      label: "Agents improving ≥10 pts this quarter",
      value: `${q.agentsImprovingPct}%`,
      note: `vs ${q.agentsImprovingPrevPct}% last quarter`,
    },
    {
      label: "Consistency",
      value: `${q.consistencySpreadPct}%`,
      note: `vs ${q.consistencySpreadPrevPct}% last quarter`,
    },
  ];

  return (
    <SceneShell
      eyebrow="Your Team's performance and optimization"
      className="scene-optimize"
    >
      <motion.div className="opt-stack scene-visual" {...fadeUp}>
        <section className="opt-panel">
          <div className="opt-hero opt-hero-solo">
            <div className="opt-hero-main">
              <div className="opt-panel-top">
                <div className="opt-panel-title">Average Quality Score</div>
                <MetricBadge
                  kind="big-win"
                  className="badge-inline"
                  celebrate={false}
                />
              </div>
              <div className="opt-hero-row">
                <div className="opt-hero-value">
                  <CountUp value={q.qualityScore} duration={1.2} />%
                </div>
                {qualityLift > 0 && (
                  <span className="opt-delta">↑ +{qualityLift} pts YoY</span>
                )}
                <span className="opt-compare">
                  vs{" "}
                  <span className="opt-compare-num">{q.qualityScorePrev}%</span>{" "}
                  previous year
                </span>
              </div>
            </div>
          </div>

          <ul className="opt-rows opt-rows-2">
            {qualityRows.map((row) => (
              <li key={row.label}>
                <div className="opt-row-main">
                  <span className="opt-row-label">{row.label}</span>
                  <div className="opt-row-val-line">
                    <span className="opt-row-val">{row.value}</span>
                    <span className="opt-row-note">{row.note}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="opt-panel opt-panel-wfm">
          <div className="opt-hero opt-hero-solo">
            <div className="opt-hero-main">
              <div className="opt-panel-title">Workforce Management</div>
              <div className="wfm-forecast">
                <div className="opt-hero-row">
                  <div className="opt-hero-value">{q.forecastAccuracy}%</div>
                  <span className="opt-hero-unit">forecast accuracy</span>
                  {q.forecastYoyPts > 0 && (
                    <span className="opt-delta">
                      ↑ +{q.forecastYoyPts} pts YoY
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="wfm-metrics">
            <article className="wfm-metric">
              <div className="wfm-metric-label">Schedule adherence</div>
              <div className="wfm-metric-row">
                <span className="wfm-metric-val">{q.scheduleAdherence}%</span>
                {adherenceLift > 0 && (
                  <span className="opt-delta">↑ +{adherenceLift} pts</span>
                )}
              </div>
              <div className="wfm-metric-status">On track</div>
            </article>

            <article className="wfm-metric">
              <div className="wfm-metric-label">Occupancy rate</div>
              <div className="wfm-metric-row">
                <span className="wfm-metric-val">{q.occupancy}%</span>
                <span className="opt-delta muted">
                  {occupancyDelta > 0 ? "↑" : "↓"} {Math.abs(occupancyDelta)} pts
                </span>
              </div>
              <div className="wfm-metric-status">Ideal spot</div>
            </article>

            <article className="wfm-metric">
              <div className="wfm-metric-label">Total shrinkage</div>
              <div className="wfm-metric-row">
                <span className="wfm-metric-val">{q.shrinkage}%</span>
                {shrinkageDrop > 0 && (
                  <span className="opt-delta">↓ −{shrinkageDrop} pts</span>
                )}
              </div>
              <div className="wfm-metric-status">Good</div>
            </article>
          </div>

          <div className="wfm-breakdown">
            <span>
              <strong>{q.shrinkagePlanned}%</strong> Planned absences
            </span>
            <span className="wfm-breakdown-sep" aria-hidden />
            <span>
              <strong>{q.shrinkageUnplanned}%</strong> Unplanned absences
            </span>
          </div>
        </section>
      </motion.div>

      <motion.p className="sub" {...fadeUp} transition={{ delay: 0.85 }}>
        Better coaching shows up in the work — agents scoring 80%+ on QA close
        tickets <strong>{q.insightFasterMins} minutes faster</strong>.
      </motion.p>
    </SceneShell>
  );
}
