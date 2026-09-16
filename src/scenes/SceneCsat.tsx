import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import type { SceneProps } from "./types";

export function SceneCsat({ agent }: SceneProps) {
  const delta = +(agent.csat - agent.csatPrev).toFixed(1);
  const pct = (agent.csat / 5) * 100;
  const up = delta >= 0;

  return (
    <SceneShell eyebrow="The mood">
      <motion.div className="mood" {...fadeUp}>
        <div className="mood-ends">
          <span>😟</span>
          <span>🙂</span>
        </div>
        <div className="mood-track">
          <motion.div
            className="mood-fill"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>
      <motion.h2 className="number" {...fadeUp} transition={{ delay: 0.5 }}>
        <CountUp value={agent.csat} duration={1.4} decimals={1} />
        <span style={{ fontSize: "0.4em", color: "var(--muted)" }}> / 5</span>
      </motion.h2>
      <motion.p className="delta" {...fadeUp} transition={{ delay: 1.4 }}>
        {up ? (
          <>
            Up <strong>+{delta.toFixed(1)}</strong> from last year. You're trending.
          </>
        ) : (
          <>
            Down <strong>{delta.toFixed(1)}</strong>. Some years, holding the line is
            the win.
          </>
        )}
      </motion.p>
    </SceneShell>
  );
}
