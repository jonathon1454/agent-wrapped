import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import type { SceneProps } from "./types";

const SOURCES = ["AI Agent", "Help Center", "Answer Bot", "Community"];

export function SceneWords({ admin }: SceneProps) {
  return (
    <SceneShell eyebrow="Deflection" className="scene-words">
      <motion.h2 className="number" {...fadeUp}>
        <CountUp value={admin.deflectedTickets} duration={1.8} />
      </motion.h2>
      <motion.p className="lead" {...fadeUp} transition={{ delay: 0.4 }}>
        tickets resolved without an agent — <em>{admin.deflectionRate}%</em> of the queue.
      </motion.p>
      <motion.div className="phrases scene-visual" {...fadeUp} transition={{ delay: 0.9 }}>
        {SOURCES.map((p, i) => (
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
