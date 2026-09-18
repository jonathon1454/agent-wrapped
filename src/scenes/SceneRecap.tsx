import { motion } from "framer-motion";
import { SceneShell } from "../components/SceneShell";
import { fmtInt } from "../lib/useCountUp";
import type { SceneProps } from "./types";

export function SceneRecap({ admin }: SceneProps) {
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <SceneShell eyebrow="Your year, at the helm">
      <motion.div
        className="recap scene-visual"
        initial={{ opacity: 0, y: 10, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
        onClick={stop}
      >
        <div className="name">{admin.orgName} · {admin.year}</div>
        <div className="hero">{fmtInt(admin.totalTickets)}</div>
        <div className="hero-label">tickets resolved by your operation</div>

        <div className="minis">
          <div className="mini">
            <div className="v">{admin.csat.toFixed(1)}</div>
            <div className="k">CSAT / 5</div>
          </div>
          <div className="mini">
            <div className="v">{admin.slaCompliance}%</div>
            <div className="k">SLA hit</div>
          </div>
          <div className="mini">
            <div className="v">{admin.deflectionRate}%</div>
            <div className="k">Deflected</div>
          </div>
          <div className="mini">
            <div className="v">{admin.agentsEnabled}</div>
            <div className="k">Agents</div>
          </div>
        </div>

        <div className="share-row">
          <button className="btn primary" onClick={stop}>Save image</button>
          <button className="btn ghost" onClick={stop}>Share to Slack</button>
          <button
            className="btn ghost"
            onClick={(e) => {
              stop(e);
              window.open(
                "https://www.linkedin.com/sharing/share-offsite/?url=" +
                  encodeURIComponent(window.location.href),
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            Share to LinkedIn
          </button>
        </div>
      </motion.div>
      <motion.p
        className="sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        You kept the queue moving all year. Next year, AI could take on more of the
        repeatable half.
      </motion.p>
    </SceneShell>
  );
}
