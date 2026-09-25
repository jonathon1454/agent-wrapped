import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import type { SceneProps } from "./types";

export function SceneGrowth({ admin }: SceneProps) {
  const maxRate = Math.max(...admin.quarterly.map((q) => q.automationRate), 1);
  const wins = admin.quickWins.slice(0, 3);

  return (
    <SceneShell eyebrow="Quarterly growth" className="scene-growth">
      <motion.div className="spark scene-visual" {...fadeUp}>
        {admin.quarterly.map((q, i) => (
          <div key={q.label} className="spark-col">
            <div className="bar-track">
              <motion.div
                className={`spark-bar${i === admin.quarterly.length - 1 ? " peak" : ""}`}
                initial={{ height: 0 }}
                animate={{ height: `${(q.automationRate / maxRate) * 100}%` }}
                transition={{
                  delay: 0.2 + i * 0.12,
                  duration: 0.45,
                  ease: [0.85, 0, 0.15, 1],
                }}
              />
            </div>
            <span className="spark-label">{q.label}</span>
            <span className="spark-val">{q.automationRate}%</span>
          </div>
        ))}
      </motion.div>

      <motion.p className="lead" {...fadeUp} transition={{ delay: 0.7 }}>
        <CountUp value={admin.hoursSavedYtd} duration={1.2} /> hours saved · +
        {admin.csatLiftYtd.toFixed(2)} CSAT lift YTD
      </motion.p>

      <motion.div className="win-grid" {...fadeUp} transition={{ delay: 0.95 }}>
        {wins.map((w, i) => (
          <motion.div
            key={w.label}
            className="win-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 + i * 0.1, duration: 0.4 }}
          >
            <div className="win-card-label">Quick win</div>
            <div className="win-card-title">{w.label}</div>
            <div className="win-card-reason">{w.reason}</div>
          </motion.div>
        ))}
      </motion.div>
    </SceneShell>
  );
}
