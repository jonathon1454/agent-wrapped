import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import type { SceneProps } from "./types";

export function SceneMomentum({ admin }: SceneProps) {
  const maxRate = Math.max(...admin.quarterly.map((q) => q.automationRate), 1);
  const enabled = admin.addOns.filter((a) => a.enabled);

  return (
    <SceneShell eyebrow="Quarterly momentum" className="scene-momentum">
      <motion.div className="spark scene-visual" {...fadeUp}>
        {admin.quarterly.map((q, i) => (
          <div key={q.label} className="spark-col">
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
            <span className="spark-label">{q.label}</span>
            <span className="spark-val">{q.automationRate}%</span>
          </div>
        ))}
      </motion.div>
      <motion.p className="lead" {...fadeUp} transition={{ delay: 0.8 }}>
        <CountUp value={admin.hoursSavedYtd} duration={1.2} /> hours saved · +
        {admin.csatLiftYtd.toFixed(2)} CSAT lift YTD.
      </motion.p>
      <motion.div className="chips chips-tight" {...fadeUp} transition={{ delay: 1.0 }}>
        {enabled.map((a) => (
          <span key={a.label} className="chip chip-sm">
            {a.label} · {a.adoption}%
          </span>
        ))}
      </motion.div>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.4 }}>
        Quick win: turn on <em>{admin.quickWin.label}</em> — {admin.quickWin.reason}.
      </motion.p>
    </SceneShell>
  );
}
