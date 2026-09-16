import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import type { SceneProps } from "./types";

export function SceneWords({ agent }: SceneProps) {
  return (
    <SceneShell eyebrow="The words you wrote">
      <motion.h2 className="number" {...fadeUp}>
        <CountUp value={agent.wordsTyped} duration={1.8} />
      </motion.h2>
      <motion.p className="lead" {...fadeUp} transition={{ delay: 0.4 }}>
        words typed.
      </motion.p>
      <motion.div className="phrases" {...fadeUp} transition={{ delay: 0.9 }}>
        {agent.topPhrases.map((p, i) => (
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
        Roughly a novella. A short, helpful novella.
      </motion.p>
    </SceneShell>
  );
}
