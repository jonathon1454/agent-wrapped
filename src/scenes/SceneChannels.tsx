import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import type { SceneProps } from "./types";

export function SceneChannels({ admin }: SceneProps) {
  const top = [...admin.channels].sort((a, b) => b.share - a.share)[0];
  const standout = [...admin.channels].sort((a, b) => b.yoy - a.yoy)[0];

  return (
    <SceneShell eyebrow="Where they reached you">
      <motion.div className="chips scene-visual" {...fadeUp}>
        {admin.channels.map((c, i) => (
          <motion.span
            key={c.label}
            className={`chip${c.label === standout.label ? " chip-hot" : ""}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2 + i * 0.1,
              duration: 0.4,
              ease: [0.85, 0, 0.15, 1],
            }}
          >
            {c.label} · {c.share}% · {c.csat.toFixed(1)} ·{" "}
            {c.yoy >= 0 ? `+${c.yoy}%` : `${c.yoy}%`}
          </motion.span>
        ))}
      </motion.div>
      <motion.p className="lead" {...fadeUp} transition={{ delay: 0.9 }}>
        Your operation ran fluent <em>{top.label}</em>.
      </motion.p>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.2 }}>
        Fastest growth: <em>{standout.label}</em> at +{standout.yoy}% YoY. AI agents
        could answer across all of them — at once.
      </motion.p>
    </SceneShell>
  );
}
