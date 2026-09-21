import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import type { SceneProps } from "./types";

export function SceneVoice({ admin }: SceneProps) {
  return (
    <SceneShell eyebrow="Customer voice">
      <motion.div className="phrases scene-visual" {...fadeUp}>
        {admin.topics.map((t, i) => (
          <motion.span
            key={t.label}
            className="phrase"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
          >
            {t.label}
          </motion.span>
        ))}
      </motion.div>

      {admin.quote && (
        <motion.div
          className="quote-card quote-card-compact"
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.55, ease: [0.85, 0, 0.15, 1] }}
        >
          <div className="quote-mark">"</div>
          <p className="quote-text">{admin.quote.text}</p>
          <p className="quote-attr">
            {admin.quote.from} · ticket {admin.quote.ticketId}
          </p>
        </motion.div>
      )}

      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.4 }}>
        Help Center traffic rose <em>+{admin.kbTrafficLift}%</em> —{" "}
        {admin.deflectionCorrelation}.
      </motion.p>
    </SceneShell>
  );
}
