import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { fmtInt } from "../lib/useCountUp";
import type { SceneProps } from "./types";

export function ScenePlaybook({ admin }: SceneProps) {
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <SceneShell eyebrow="Your playbook">
      <motion.div
        className="recap scene-visual"
        initial={{ opacity: 0, y: 10, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
        onClick={stop}
      >
        <div className="name">
          {admin.orgName} · {admin.year}
        </div>
        <div className="hero">{fmtInt(admin.totalTickets)}</div>
        <div className="hero-label">tickets resolved by your operation</div>

        <div className="minis">
          <div className="mini">
            <div className="v">{admin.csat.toFixed(1)}</div>
            <div className="k">CSAT / 5</div>
          </div>
          <div className="mini">
            <div className="v">{admin.automationRate}%</div>
            <div className="k">Automated</div>
          </div>
          <div className="mini">
            <div className="v">{admin.selfServeRate}%</div>
            <div className="k">Self-serve</div>
          </div>
          <div className="mini">
            <div className="v">{admin.fcr}%</div>
            <div className="k">FCR</div>
          </div>
        </div>

        <div className="share-row playbook-row">
          {admin.playbookLinks.map((link) => (
            <a
              key={link.id}
              className={`btn${link.primary ? " primary" : " ghost"}`}
              href={link.href}
              onClick={stop}
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 0.8 }}>
        Dig into the full analysis, or book time to plan what AI could unlock next.
      </motion.p>
    </SceneShell>
  );
}
