import { motion } from "framer-motion";
import { SceneShell } from "../components/SceneShell";
import type { SceneProps } from "./types";

export function SceneOpen({ agent }: SceneProps) {
  return (
    <SceneShell>
      <motion.p
        className="cursor"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.2, times: [0, 0.2, 0.8, 1] }}
      >
        |
      </motion.p>
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        Your year,
        <br />
        on the record.
      </motion.h1>
      <motion.p
        className="sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        {agent.agentName} · {agent.year}
      </motion.p>
    </SceneShell>
  );
}
