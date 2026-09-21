import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import type { SceneProps } from "./types";

export function SceneAutomation({ admin }: SceneProps) {
  const max = Math.max(...admin.automationBreakdown.map((a) => a.share), 1);

  return (
    <SceneShell eyebrow="Automation at work">
      <motion.div className="auto-bars scene-visual" {...fadeUp}>
        {admin.automationBreakdown.map((a, i) => (
          <div key={a.label} className="auto-col">
            <motion.div
              className={`auto-bar${a.highlight ? " peak" : ""}`}
              initial={{ height: 0 }}
              animate={{ height: `${(a.share / max) * 100}%` }}
              transition={{
                delay: 0.25 + i * 0.15,
                duration: 0.5,
                ease: [0.85, 0, 0.15, 1],
              }}
            />
            <span className="auto-share">{a.share}%</span>
            <span className="auto-label">{a.label}</span>
          </div>
        ))}
      </motion.div>
      <motion.h2 className="number" {...fadeUp} transition={{ delay: 0.8 }}>
        <CountUp value={admin.automationRate} duration={1.2} />
        <span style={{ fontSize: "0.35em", color: "var(--muted)" }}>%</span>
      </motion.h2>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.3 }}>
        of tickets touched by macros, triggers, or workflows. AI could push the
        repeatable share <em>still higher</em>.
      </motion.p>
    </SceneShell>
  );
}
