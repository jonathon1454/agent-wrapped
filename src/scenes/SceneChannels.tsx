import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import type { SceneProps } from "./types";

export function SceneChannels({ agent }: SceneProps) {
  const top = agent.channels[0];
  const rest = agent.channels.slice(1);
  const restLabels = rest.map((c) => c.label).join(", and a little ");

  return (
    <SceneShell eyebrow="Where they came from">
      <motion.div className="chips" {...fadeUp}>
        {agent.channels.map((c, i) => (
          <motion.span
            key={c.label}
            className="chip"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2 + i * 0.12,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ fontSize: `${0.85 + c.share / 80}rem` }}
          >
            {c.label} · {c.share}%
          </motion.span>
        ))}
      </motion.div>
      <motion.p className="lead" {...fadeUp} transition={{ delay: 0.9 }}>
        You spoke fluent <em>{top.label}</em>.
      </motion.p>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.2 }}>
        And a little {restLabels}.
      </motion.p>
    </SceneShell>
  );
}
