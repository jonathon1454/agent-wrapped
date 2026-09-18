import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import type { SceneProps } from "./types";

export function SceneNext({ admin }: SceneProps) {
  const { autoResolvedRate, firstReplyCut, csatLift } = admin.aiProjection;

  const rows = [
    { k: "of tickets that could be auto-resolved", v: `${autoResolvedRate}%` },
    { k: "faster first reply", v: `−${firstReplyCut}%` },
    { k: "possible CSAT lift", v: `+${csatLift.toFixed(1)}` },
  ];

  return (
    <SceneShell eyebrow="What's next">
      <motion.h2 className="lead" {...fadeUp}>
        Next year, Zendesk AI could do more of the lifting.
      </motion.h2>
      <motion.div className="minis scene-visual" {...fadeUp} transition={{ delay: 0.5 }}>
        {rows.map((r, i) => (
          <motion.div
            key={r.k}
            className="mini"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
          >
            <div className="v">{r.v}</div>
            <div className="k">{r.k}</div>
          </motion.div>
        ))}
      </motion.div>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.4 }}>
        Automated resolutions, AI routing, and Copilot for every agent could mean
        <br />
        the same operation — <em>scaled without scaling headcount</em>.
      </motion.p>
    </SceneShell>
  );
}
