import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import type { SceneProps } from "./types";

export function SceneAi({ admin }: SceneProps) {
  return (
    <SceneShell eyebrow="AI adoption">
      <motion.div className="chips scene-visual" {...fadeUp}>
        {admin.aiFeatures.map((f, i) => (
          <motion.span
            key={f.label}
            className="chip"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2 + i * 0.12,
              duration: 0.4,
              ease: [0.85, 0, 0.15, 1],
            }}
          >
            {f.label} · {f.adoption}%
          </motion.span>
        ))}
      </motion.div>
      <motion.h2 className="number" {...fadeUp} transition={{ delay: 0.7 }}>
        +<CountUp value={admin.aiAdoptionYoy} duration={1.2} />
        <span style={{ fontSize: "0.35em", color: "var(--muted)" }}>%</span>
      </motion.h2>
      <motion.p className="lead" {...fadeUp} transition={{ delay: 1.0 }}>
        YoY growth in AI feature usage.
      </motion.p>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.4 }}>
        Estimated time returned this year: <em>{admin.aiRoiLabel}</em>. Copilot and
        agents could compound that next year.
      </motion.p>
    </SceneShell>
  );
}
