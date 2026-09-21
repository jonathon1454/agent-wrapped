import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import { MetricBadge } from "../components/MetricBadge";
import { dur, easeOut } from "../lib/motion";
import type { SceneProps } from "./types";

export function SceneCsat({ admin }: SceneProps) {
  const delta = +(admin.csat - admin.csatPrev).toFixed(1);
  const pct = (admin.csat / 5) * 100;
  const up = delta >= 0;

  return (
    <SceneShell eyebrow="Customer Satisfaction" className="scene-csat">
      <motion.div className="mood scene-visual" {...fadeUp}>
        <div className="mood-ends">
          <span className="mood-label">Low</span>
          <span className="mood-label">High</span>
        </div>
        <div className="mood-track">
          <motion.div
            className="mood-fill"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
          />
        </div>
      </motion.div>
      <motion.div className="hero-with-badge" {...fadeUp} transition={{ delay: 0.5 }}>
        <h2 className="number">
          <CountUp value={admin.csatPercentile} duration={1.4} />
          <span style={{ fontSize: "0.4em", color: "var(--muted)" }}>th</span>
        </h2>
        <MetricBadge value={admin.csatPercentile} />
      </motion.div>
      <motion.p className="lead" {...fadeUp} transition={{ delay: 0.9 }}>
        percentile — {admin.csat.toFixed(1)} / 5 overall.
      </motion.p>
      <motion.p
        className="sub scene-csat-comment"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: dur.moderate, ease: easeOut }}
      >
        {up ? (
          <>
            Up <em>+{delta.toFixed(1)}</em> from last year. AI Copilot drafted the
            replies that helped. Next year, it could write more of them.
          </>
        ) : (
          <>
            Down <em>{delta.toFixed(1)}</em>. Some years, holding the line is the win.
            AI Copilot could help lift it back.
          </>
        )}
      </motion.p>
    </SceneShell>
  );
}
