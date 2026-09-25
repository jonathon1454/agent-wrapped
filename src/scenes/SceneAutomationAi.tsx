import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import { MetricBadge } from "../components/MetricBadge";
import { positiveDelta, rateBadge } from "../data/admin";
import type { SceneProps } from "./types";

function ordinal(n: number): string {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

type AutoFocus = "classic" | "ai";

function SceneAutomationAiView({
  admin,
  eyebrow = "How Your Team Automates",
  focus = "classic",
}: SceneProps & { eyebrow?: string; focus?: AutoFocus }) {
  const isClassic = focus === "classic";

  const automationRate = isClassic
    ? admin.automationRate
    : admin.aiAutomationRate;
  const ticketsAutomated = Math.round(
    (admin.totalTickets * automationRate) / 100,
  );
  const automationYoy = positiveDelta(
    isClassic ? admin.automationYoy : admin.aiAutomationYoy,
  );
  const macrosShare =
    admin.automationBreakdown.find((a) => a.label === "Macros")?.share ?? 0;
  const triggersShare =
    admin.automationBreakdown.find((a) => a.label === "Triggers")?.share ?? 0;
  const workflowsShare =
    admin.automationBreakdown.find((a) => a.label === "Action Flows")?.share ??
    0;
  const classicVolumeShare = macrosShare + triggersShare + workflowsShare;
  const aiVolumeShare = admin.aiAutomationBreakdown.reduce(
    (sum, row) => sum + row.share,
    0,
  );
  const volumeShare = isClassic ? classicVolumeShare : aiVolumeShare;
  const automationPercentile = isClassic
    ? admin.automationPercentile
    : admin.aiAutomationPercentile;
  const hoursSavedYtd = isClassic
    ? admin.hoursSavedYtd
    : admin.aiHoursSavedYtd;
  const hoursSavedPercentile = isClassic
    ? admin.hoursSavedPercentile
    : admin.aiHoursSavedPercentile;
  const csatLift = positiveDelta(
    isClassic ? admin.automationCsatLift : admin.aiAutomationCsatLift,
  );
  const hoursBadge = rateBadge(hoursSavedPercentile);
  const percentileBadge = rateBadge(automationPercentile);
  const topAutoChannels = [...admin.channels]
    .map((c) => ({
      label: c.label,
      automationRate: isClassic
        ? (c.automationRate ?? 0)
        : (c.aiAutomationRate ?? 0),
    }))
    .filter((c) => c.automationRate > 0)
    .sort((a, b) => b.automationRate - a.automationRate);
  const topChannelRate = topAutoChannels[0]?.automationRate ?? 100;
  const volumeParts = isClassic
    ? [
        { label: "Macros", share: macrosShare },
        { label: "Action Flows", share: workflowsShare },
      ]
    : admin.aiAutomationBreakdown.map((row) => ({
        label: row.label,
        share: row.share,
      }));

  const heroKicker = isClassic
    ? "Via macros and action flows"
    : "Via AI, Auto Assist and Custom Agents";
  const sub = isClassic
    ? <>Macros and action flows cleared the volume. Your team got <strong>hours back</strong> — and customers noticed.</>
    : <>AI is already winning tickets — <strong>more Auto Assist and custom agents</strong> could clear the rest.</>;

  return (
    <SceneShell eyebrow={eyebrow} className="scene-auto-ai">
      <motion.div className="auto-layout scene-visual" {...fadeUp}>
        <header className="auto-hero">
          <div className="auto-hero-top">
            <p className="auto-kicker">{heroKicker}</p>
            {isClassic && percentileBadge && (
              <MetricBadge
                kind={percentileBadge}
                className="badge-inline"
                celebrate={false}
              />
            )}
          </div>
          <div className="auto-hero-row">
            <div className="auto-hero-primary">
              <span className="auto-hero-val">
                <CountUp value={ticketsAutomated} duration={1.3} />
              </span>
              <span className="auto-hero-unit">tickets automated</span>
              {automationYoy != null && (
                <span className="auto-delta">(↑ +{automationYoy}% YoY)</span>
              )}
            </div>
            <p className="auto-hero-meta">
              <span>
                <strong className="auto-pct">
                  {ordinal(automationPercentile)}
                </strong>
                {"\u00A0"}percentile
              </span>
              <span>
                <strong>{volumeShare}%</strong> of volume
              </span>
              {volumeParts.map((row) => (
                <span key={row.label}>
                  <strong>{row.share}%</strong> {row.label}
                </span>
              ))}
            </p>
          </div>
        </header>

        <div className="auto-pair">
          <section className="auto-card">
            <div className="auto-card-top">
              <p className="auto-kicker">Time saved</p>
              {hoursBadge && (
                <MetricBadge
                  kind={hoursBadge}
                  className="badge-inline"
                  celebrate={false}
                />
              )}
            </div>
            <div className="auto-stat-line auto-stat-line-lg">
              <span className="auto-stat-val auto-stat-val-lg">
                <CountUp value={hoursSavedYtd} duration={1.2} />
                <span className="auto-unit"> hrs</span>
              </span>
            </div>
            <p className="auto-footnote auto-footnote-row">
              <span>
                <strong className="auto-pct">
                  {ordinal(hoursSavedPercentile)}
                </strong>
                {"\u00A0"}percentile
              </span>
              {csatLift != null && (
                <>
                  <span className="auto-sep" aria-hidden />
                  <span>
                    <strong>+{csatLift.toFixed(2)}</strong>
                    {"\u00A0"}CSAT lift
                  </span>
                </>
              )}
            </p>
          </section>

          <section className="auto-card auto-channels">
            <p className="auto-kicker">Best automation channel</p>
            <ol className="auto-channel-list" aria-label="Automation by channel">
              {topAutoChannels.map((c, i) => (
                <li key={c.label} className="auto-channel-row">
                  <span className="auto-channel-rank" aria-hidden>
                    {i + 1}
                  </span>
                  <span className="auto-channel-val">{c.automationRate}%</span>
                  <span className="auto-channel-name">{c.label}</span>
                  <span className="auto-channel-meter" aria-hidden>
                    <span
                      className="auto-channel-meter-fill"
                      style={{
                        width: `${Math.round(
                          ((c.automationRate ?? 0) / topChannelRate) * 100,
                        )}%`,
                      }}
                    />
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {isClassic && (
          <p className="auto-gap">
            <span className="auto-gap-lab">Not yet enabled</span>
            {admin.aiOpportunities.map((feat, i) => (
              <span key={feat.label}>
                {i > 0 && (
                  <span className="auto-sep" aria-hidden />
                )}
                {feat.label}
              </span>
            ))}
          </p>
        )}
      </motion.div>

      <motion.p className="sub" {...fadeUp} transition={{ delay: 0.85 }}>
        {sub}
      </motion.p>
    </SceneShell>
  );
}

/** Classic macros / action flows automation slide */
export function SceneAutomationAi(props: SceneProps) {
  return <SceneAutomationAiView {...props} focus="classic" />;
}

/** AI / Auto Assist / custom agents automation slide */
export function SceneAutomationAiAgents(props: SceneProps) {
  return <SceneAutomationAiView {...props} focus="ai" />;
}
