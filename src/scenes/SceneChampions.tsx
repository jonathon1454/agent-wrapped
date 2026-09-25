import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { positiveDelta, type Champion } from "../data/admin";
import { fmtInt } from "../lib/useCountUp";
import type { SceneProps } from "./types";

function championStats(
  c: Champion,
  isAi: boolean,
): { label: string; value: string }[] {
  if (c.id === "whisperer") {
    return [
      {
        label: "CSAT streak",
        value: `${c.csatStreakMonths}-month`,
      },
      {
        label: "Personal best",
        value: `${c.personalBestPerDay}/day`,
      },
    ];
  }

  if (c.id === "helpful") {
    return [
      {
        label: "Tickets resolved",
        value: fmtInt(c.ticketsResolved ?? 0),
      },
      {
        label: "High-CSAT streak",
        value: `${c.highCsatStreakMonths} mo ≥4.7`,
      },
    ];
  }

  if (isAi && c.aiAdoptionPct != null) {
    return [
      { label: "AI adoption", value: `${c.aiAdoptionPct}%` },
      {
        label: "AI-assisted tickets",
        value: fmtInt(c.aiTickets ?? 0),
      },
    ];
  }
  return [
    {
      label: "Tickets closed fast",
      value: fmtInt(c.aiTickets ?? 0),
    },
    { label: "AHT", value: `${c.ahtMins}m` },
  ];
}

export function SceneChampions({ admin }: SceneProps) {
  const isAi = admin.accountType === "ai";
  const teamCsatLift =
    admin.teamCsatPrev > 0
      ? +(
          ((admin.teamCsat - admin.teamCsatPrev) / admin.teamCsatPrev) *
          100
        ).toFixed(1)
      : 0;
  const teamCsatYoy = positiveDelta(teamCsatLift);

  return (
    <SceneShell eyebrow="Your Champions" className="scene-champions">
      <motion.div
        className="champions scene-visual"
        {...fadeUp}
        transition={{ delay: 0.15 }}
      >
        {admin.champions.map((c, i) => {
          const stats = championStats(c, isAi);
          return (
            <motion.div
              key={c.id}
              className={`champion${i === 0 ? " featured" : ""}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.12, duration: 0.5 }}
            >
              <div className="champion-icon" aria-hidden>
                <img src={c.avatar} alt="" />
              </div>
              <div className="champion-body">
                <div className="champion-title">{c.title}</div>
                <div className="champion-name">{c.name}</div>
                <ul className="champion-stats">
                  {stats.map((s) => (
                    <li key={s.label}>
                      <span className="champion-stat-value">{s.value}</span>
                      <span className="champion-stat-label">{s.label}</span>
                    </li>
                  ))}
                </ul>
                <p className="champion-copy">{c.copy}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.p className="sub" {...fadeUp} transition={{ delay: 0.95 }}>
        {teamCsatYoy != null ? (
          <>
            The team's MVPs — and a big reason team CSAT is up{" "}
            <strong>+{teamCsatYoy}% YoY</strong>.
          </>
        ) : (
          <>
            The team's MVPs — and the reason your{" "}
            <strong>CSAT keeps climbing</strong>.
          </>
        )}
      </motion.p>
    </SceneShell>
  );
}
