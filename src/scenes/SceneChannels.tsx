import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import type { SceneProps } from "./types";

export function SceneChannels({ admin }: SceneProps) {
  const top = admin.channels[0];
  const rest = admin.channels.slice(1);
  const restLabels = rest.map((c) => c.label).join(", and a little ");

  return (
    <SceneShell eyebrow="Where they reached you">
      <motion.div className="chips scene-visual" {...fadeUp}>
        {admin.channels.map((c, i) => (
          <motion.span
            key={c.label}
            className="chip"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2 + i * 0.12,
              duration: 0.4,
              ease: [0.85, 0, 0.15, 1],
            }}
          >
            {c.label} · {c.share}%
          </motion.span>
        ))}
      </motion.div>
      <motion.p className="lead" {...fadeUp} transition={{ delay: 0.9 }}>
        Your operation ran fluent <em>{top.label}</em>.
      </motion.p>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.2 }}>
        And a little {restLabels}. AI agents could answer across all of them —{" "}
        <em>at once</em>.
      </motion.p>
    </SceneShell>
  );
}
