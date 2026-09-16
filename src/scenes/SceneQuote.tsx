import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import type { SceneProps } from "./types";

export function SceneQuote({ agent }: SceneProps) {
  if (!agent.quote) {
    return (
      <SceneShell eyebrow="The nice thing someone said">
        <motion.p className="sub" {...fadeUp}>
          No written praise captured this year — but the numbers say plenty.
        </motion.p>
      </SceneShell>
    );
  }

  return (
    <SceneShell eyebrow="The nice thing someone said">
      <motion.div
        className="quote-card"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="quote-mark">"</div>
        <motion.p
          className="quote-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {agent.quote.text}
        </motion.p>
        <motion.p
          className="quote-attr"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Customer · ticket {agent.quote.ticketId}
        </motion.p>
      </motion.div>
    </SceneShell>
  );
}
