import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import { MetricBadge } from "../components/MetricBadge";
import type { SceneProps } from "./types";

export function SceneSelfServe({ admin }: SceneProps) {
  return (
    <SceneShell eyebrow="Self-serve" className="scene-words">
      <motion.div className="hero-with-badge" {...fadeUp}>
        <h2 className="number">
          <CountUp value={admin.selfServeRate} duration={1.8} />
          <span style={{ fontSize: "0.35em", color: "var(--muted)" }}>%</span>
        </h2>
        <MetricBadge value={admin.selfServeRate} />
      </motion.div>
      <motion.p className="lead" {...fadeUp} transition={{ delay: 0.4 }}>
        of tickets resolved without an agent —{" "}
        <CountUp value={admin.deflectedTickets} duration={1.4} /> deflections.
      </motion.p>
      <motion.div className="phrases scene-visual" {...fadeUp} transition={{ delay: 0.9 }}>
        {admin.selfServeSources.map((p, i) => (
          <motion.span
            key={p}
            className="phrase"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.12, duration: 0.4 }}
          >
            "{p}"
          </motion.span>
        ))}
      </motion.div>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.8 }}>
        That's leverage. Zendesk AI could resolve more on its own — so more of next
        year's volume <em>never reaches the queue</em>.
      </motion.p>
    </SceneShell>
  );
}
