import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { MetricBadge } from "../components/MetricBadge";
import type { SceneProps } from "./types";

export function SceneSpeed({ admin }: SceneProps) {
  return (
    <SceneShell eyebrow="SLA & speed">
      <motion.div className="hero-with-badge" {...fadeUp}>
        <p className="lead" style={{ margin: 0 }}>
          Average resolution{" "}
          <em style={{ fontStyle: "normal", color: "var(--accent)" }}>
            {admin.artLabel}
          </em>
          . First contact resolution{" "}
          <em style={{ fontStyle: "normal", color: "var(--accent)" }}>
            {admin.fcr}%
          </em>
          .
        </p>
        <MetricBadge value={admin.fcr} />
      </motion.div>
      <div className="ribbon-wrap scene-visual">
        <motion.div
          className="ribbon"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
          style={{ transformOrigin: "left" }}
        >
          <motion.div
            className="marker up"
            initial={{ opacity: 0, x: "-50%", y: 10 }}
            animate={{ opacity: 1, x: "-50%", y: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            style={{ left: "12%" }}
          >
            <span className="label">First reply</span>
            <span className="dot2" />
            <span className="value">{admin.firstResponseMins}m</span>
          </motion.div>
          <motion.div
            className="marker down"
            initial={{ opacity: 0, x: "-50%", y: -10 }}
            animate={{ opacity: 1, x: "-50%", y: 0 }}
            transition={{ delay: 1.4, duration: 0.4 }}
            style={{ left: "68%" }}
          >
            <span className="dot2" />
            <div className="marker-meta">
              <span className="value">{admin.artLabel}</span>
              <span className="label">Solved</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.8 }}>
        AI routing and auto-resolution could cut first reply by{" "}
        <em>{admin.aiProjection.firstReplyCut}%</em> next year.
      </motion.p>
    </SceneShell>
  );
}
