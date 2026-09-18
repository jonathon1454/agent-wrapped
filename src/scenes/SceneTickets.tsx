import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import type { SceneProps } from "./types";

export function SceneTickets({ admin }: SceneProps) {
  const cards = 32;
  const secsPerTicket = Math.round((365 * 24 * 60 * 60) / admin.totalTickets);

  return (
    <SceneShell eyebrow="Tickets resolved" className="scene-tickets">
      <motion.div className="ticket-grid scene-visual" {...fadeUp}>
        {Array.from({ length: cards }).map((_, i) => (
          <motion.div
            key={i}
            className="ticket"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.1 + i * 0.02,
              duration: 0.3,
              ease: [0.85, 0, 0.15, 1],
            }}
          />
        ))}
      </motion.div>
      <motion.h2 className="number" {...fadeUp} transition={{ delay: 0.3, duration: 0.5 }}>
        <CountUp value={admin.totalTickets} duration={1.8} />
      </motion.h2>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.6 }}>
        Your operation resolved one every <em>{secsPerTicket} seconds</em>, all year.
        Next year, Zendesk AI could take the repeatable half off the queue.
      </motion.p>
    </SceneShell>
  );
}
