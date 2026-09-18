import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import { fmtInt } from "../lib/useCountUp";
import type { SceneProps } from "./types";

export function SceneTeam({ admin }: SceneProps) {
  const { size, teamTickets } = admin.team;

  return (
    <SceneShell eyebrow="The team you built">
      <motion.div className="podium scene-visual" {...fadeUp}>
        <div className="col">
          <span className="value">
            <CountUp value={size} duration={1.2} />
          </span>
          <div className="block you" style={{ height: 120 }} />
        </div>
        <div className="col">
          <span className="value">
            <CountUp value={admin.hires} duration={1.2} />
          </span>
          <div className="block" style={{ height: 70 }} />
        </div>
      </motion.div>
      <motion.p className="lead" {...fadeUp} transition={{ delay: 0.4 }}>
        <em>{size}</em> agents enabled, <em>{admin.hires}</em> hired this year.
      </motion.p>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 0.7 }}>
        Solving {fmtInt(teamTickets)} tickets together. AI could give each of them{" "}
        <em>a copilot next year</em>.
      </motion.p>
    </SceneShell>
  );
}
