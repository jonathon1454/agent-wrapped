import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import type { SceneProps } from "./types";

export function SceneQuote({ admin }: SceneProps) {
  if (!admin.quote) {
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
        className="quote-card scene-visual"
        initial={{ opacity: 0, y: 10, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
      >
        <div className="quote-mark">"</div>
        <motion.p
          className="quote-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          You had our backs all season — and made sure the queue never
          felt impossible.
        </motion.p>
        <motion.p
          className="quote-attr"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {admin.quote.from} · ticket {admin.quote.ticketId}
        </motion.p>
      </motion.div>
    </SceneShell>
  );
}
