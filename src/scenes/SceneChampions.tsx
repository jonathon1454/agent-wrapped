import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import type { SceneProps } from "./types";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function SceneChampions({ admin }: SceneProps) {
  return (
    <SceneShell eyebrow="Team champions">
      <motion.div className="champions scene-visual" {...fadeUp}>
        {admin.champions.map((c, i) => (
          <motion.div
            key={c.title}
            className={`champion${i === 0 ? " featured" : ""}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.2, duration: 0.5 }}
          >
            <div className="champion-avatar" aria-hidden>
              {initials(c.name)}
            </div>
            <div className="champion-body">
              <div className="champion-title">{c.title}</div>
              <div className="champion-name">{c.name}</div>
              <div className="champion-detail">{c.detail}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.2 }}>
        Solving tickets together. AI could give each of them{" "}
        <em>a copilot next year</em>.
      </motion.p>
    </SceneShell>
  );
}
