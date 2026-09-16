import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import type { SceneProps } from "./types";

const PEAK_INDEX = 47;

function barHeight(i: number): number {
  // deterministic pseudo-random-ish baseline with a swell toward the peak
  const base = 30 + (Math.sin(i * 1.7) * 0.5 + 0.5) * 35;
  const swell = Math.max(0, 1 - Math.abs(i - PEAK_INDEX) / 8) * 60;
  return Math.min(100, base + swell);
}

export function ScenePeakWeek({ agent }: SceneProps) {
  return (
    <SceneShell eyebrow="The longest week">
      <motion.div className="histo" {...fadeUp}>
        {Array.from({ length: 52 }).map((_, i) => (
          <motion.div
            key={i}
            className={`bar${i === PEAK_INDEX ? " peak" : ""}`}
            initial={{ height: 0 }}
            animate={{ height: `${barHeight(i)}%` }}
            transition={{
              delay: 0.2 + i * 0.012,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </motion.div>
      <motion.h2 className="number" {...fadeUp} transition={{ delay: 0.9 }}>
        <CountUp value={agent.peakWeek.tickets} duration={1.2} />
      </motion.h2>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.4 }}>
        tickets, {agent.peakWeek.weekLabel}. {agent.peakWeek.context}.
        <br />
        You showed up. So did the coffee.
      </motion.p>
    </SceneShell>
  );
}
