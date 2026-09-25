import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import type { SceneProps } from "./types";

export function SceneToolkit({ admin }: SceneProps) {
  const enabled = admin.addOns.filter((a) => a.enabled);
  const opportunities = admin.addOns.filter((a) => a.opportunity);

  return (
    <SceneShell eyebrow="Toolkit & add-ons" className="scene-toolkit">
      <motion.div className="toolkit-grid scene-visual" {...fadeUp}>
        {enabled.map((a, i) => (
          <motion.div
            key={a.label}
            className="toolkit-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
          >
            <div className="toolkit-status on">Enabled</div>
            <div className="toolkit-name">{a.label}</div>
            <div className="toolkit-meta">
              <span>{a.adoption}% adoption</span>
              {a.csatLift > 0 && <span>+{a.csatLift.toFixed(2)} CSAT</span>}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {opportunities.length > 0 && (
        <>
          <motion.p className="lead" {...fadeUp} transition={{ delay: 0.55 }}>
            Untapped upside
          </motion.p>
          <motion.div className="toolkit-grid" {...fadeUp} transition={{ delay: 0.65 }}>
            {opportunities.map((a, i) => (
              <motion.div
                key={a.label}
                className="toolkit-card opportunity"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
              >
                <div className="toolkit-status opp">Opportunity</div>
                <div className="toolkit-name">{a.label}</div>
                <div className="toolkit-meta">
                  <span>Peers see ~+{a.csatLift.toFixed(2)} CSAT</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}

      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.1 }}>
        Turn on what&apos;s already in your stack — or unlock the next add-on.
      </motion.p>
    </SceneShell>
  );
}
