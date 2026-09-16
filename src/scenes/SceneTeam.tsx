import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { fmtInt } from "../lib/useCountUp";
import type { SceneProps } from "./types";

export function SceneTeam({ agent }: SceneProps) {
  const { size, teamTickets, rank } = agent.team;
  const showRank = typeof rank === "number" && rank > 0 && rank <= size;

  return (
    <SceneShell eyebrow="The team around you">
      {showRank && (
        <motion.div className="podium" {...fadeUp}>
          <div className="col">
            <span className="value">3rd</span>
            <div className="block you" style={{ height: 70 }} />
          </div>
          <div className="col">
            <span className="value">2nd</span>
            <div className="block" style={{ height: 96 }} />
          </div>
          <div className="col">
            <span className="value">1st</span>
            <div className="block" style={{ height: 120 }} />
          </div>
        </motion.div>
      )}
      <motion.p className="lead" {...fadeUp} transition={{ delay: 0.4 }}>
        Part of a team of <em>{size}</em>,
      </motion.p>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 0.7 }}>
        solving {fmtInt(teamTickets)} tickets together.
        {showRank && (
          <>
            <br />
            You placed {rank} of {size}. Quietly impressive.
          </>
        )}
      </motion.p>
    </SceneShell>
  );
}
