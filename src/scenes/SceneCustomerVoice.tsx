import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import type { SceneProps } from "./types";

export function SceneCustomerVoice({ admin }: SceneProps) {
  const topics = admin.topics.slice(0, 3);
  const bestMonths = [...admin.bestMonths].sort(
    (a, b) => (b.csat ?? 0) - (a.csat ?? 0),
  );
  const peakBest = bestMonths[0];

  return (
    <SceneShell className="scene-voice">
      <motion.div className="voice-layout scene-visual" {...fadeUp}>
        <section className="voice-topics">
          <div className="voice-section-label">Your top ticket topics</div>
          <div className="voice-topic-list" aria-label="Your top ticket topics">
            {topics.map((t, i) => {
              const yoy =
                t.yoyPct > 0
                  ? `+${t.yoyPct}%`
                  : t.yoyPct < 0
                    ? `−${Math.abs(t.yoyPct)}%`
                    : "0%";
              return (
                <motion.div
                  key={t.label}
                  className={`voice-topic-card${i === 0 ? " featured" : ""}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.45 }}
                >
                  <div className="voice-topic-rank" aria-hidden>
                    {i + 1}
                  </div>
                  <div className="voice-topic-body">
                    <div className="voice-topic-head">
                      <div className="voice-topic-name">{t.label}</div>
                      <span className="voice-topic-yoy">{yoy} YoY</span>
                    </div>
                    <ul className="voice-topic-stats">
                      <li>
                        <span className="voice-topic-stat-val">
                          {t.sharePct}%
                        </span>
                        <span className="voice-topic-stat-lab">of tickets</span>
                      </li>
                      <li>
                        <span className="voice-topic-stat-val">
                          {t.deflectedPct}%
                        </span>
                        <span className="voice-topic-stat-lab">deflected</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="voice-season">
          <div className="voice-season-head">
            <p className="voice-season-lede">Your best CSAT months</p>
          </div>

          <div className="voice-best-grid">
            {bestMonths.map((m, i) => {
              const isPeak = m.label === peakBest?.label;
              return (
                <motion.div
                  key={m.label}
                  className={`voice-best-card${isPeak ? " peak" : ""}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.08, duration: 0.4 }}
                >
                  {isPeak && <span className="voice-best-badge">Peak</span>}
                  <div className="voice-best-score">
                    {m.csat != null ? (
                      <CountUp value={m.csat} duration={1} decimals={1} />
                    ) : (
                      "—"
                    )}
                  </div>
                  <div className="voice-best-meta">
                    <span className="voice-best-month">{m.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </motion.div>

      <motion.p className="sub" {...fadeUp} transition={{ delay: 0.95 }}>
        Three topics shaped the year — more <strong>never needed an agent</strong>.
        <br />
        Your best CSAT months still felt five-star.
      </motion.p>
    </SceneShell>
  );
}
