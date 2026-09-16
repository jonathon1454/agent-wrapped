import { motion } from "framer-motion";
import { SceneShell } from "../components/SceneShell";
import { fmtInt } from "../lib/useCountUp";
import type { SceneProps } from "./types";

export function SceneRecap({ agent }: SceneProps) {
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <SceneShell eyebrow="Your year, on the record">
      <motion.div
        className="recap"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={stop}
      >
        <div className="name">{agent.agentName} · {agent.year}</div>
        <div className="hero">{fmtInt(agent.ticketsSolved)}</div>
        <div className="hero-label">tickets solved</div>

        <div className="minis">
          <div className="mini">
            <div className="v">{agent.csat.toFixed(1)}</div>
            <div className="k">CSAT / 5</div>
          </div>
          <div className="mini">
            <div className="v">{agent.resolutionLabel}</div>
            <div className="k">Avg solve</div>
          </div>
          <div className="mini">
            <div className="v">{agent.longestThread.replies}</div>
            <div className="k">Longest thread</div>
          </div>
        </div>

        <div className="share-row">
          <button className="btn" onClick={stop}>Save image</button>
          <button className="btn" onClick={stop}>Share to Slack</button>
          <button
            className="btn"
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
        Thanks for showing up — every ticket, every time.
      </motion.p>
    </SceneShell>
  );
}
