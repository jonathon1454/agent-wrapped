import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import type { SceneProps } from "./types";

export function SceneSpeed({ agent }: SceneProps) {
  return (
    <SceneShell eyebrow="Speed">
      <motion.p className="lead" {...fadeUp}>
        First reply in{" "}
        <em style={{ fontStyle: "normal", color: "var(--accent)" }}>
          {agent.firstResponseMins}m
        </em>
        . Solved in{" "}
        <em style={{ fontStyle: "normal", color: "var(--accent)" }}>
          {agent.resolutionLabel}
        </em>
        .
      </motion.p>
      <div className="ribbon-wrap">
        <motion.div
          className="ribbon"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
          <span className="value">{agent.firstResponseMins}m</span>
        </motion.div>
        <motion.div
          className="marker down"
          initial={{ opacity: 0, x: "-50%", y: -10 }}
          animate={{ opacity: 1, x: "-50%", y: 0 }}
          transition={{ delay: 1.4, duration: 0.4 }}
          style={{ left: "68%" }}
        >
          <span className="value">{agent.resolutionLabel}</span>
          <span className="dot2" />
          <span className="label">Solved</span>
        </motion.div>
      </motion.div>
      </div>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.8 }}>
        No rush. No dawdle. Just pace.
      </motion.p>
    </SceneShell>
  );
}
