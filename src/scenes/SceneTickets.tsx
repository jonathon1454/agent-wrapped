import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import type { SceneProps } from "./types";

export function SceneTickets({ agent }: SceneProps) {
  const cards = 32;

  return (
    <SceneShell eyebrow="Tickets solved">
      <motion.div className="ticket-grid" {...fadeUp}>
        {Array.from({ length: cards }).map((_, i) => (
          <motion.div
            key={i}
            className="ticket"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.1 + i * 0.02,
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </motion.div>
      <motion.h2 className="number" {...fadeUp} transition={{ delay: 0.3, duration: 0.5 }}>
        <CountUp value={agent.ticketsSolved} duration={1.8} />
      </motion.h2>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.6 }}>
        That's one solved every <em>{agent.minutesPerTicket} minutes</em> you were
        logged in.
      </motion.p>
    </SceneShell>
  );
}
