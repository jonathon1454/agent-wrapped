import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { MetricBadge } from "../components/MetricBadge";
import { BenchmarkCallout } from "../components/BenchmarkCallout";
import { CountUp } from "../components/CountUp";
import {
  csatBadge,
  csatToPercent,
  positiveDelta,
  rateBadge,
  type BadgeKind,
} from "../data/admin";
import { fmtInt } from "../lib/useCountUp";
import type { SceneProps } from "./types";

interface MetricCard {
  id: string;
  label: string;
  display: ReactNode;
  /** Inline YoY lift beside the hero number */
  delta?: ReactNode;
  detail?: ReactNode;
  badge: BadgeKind;
}

export type CoreHero = "tickets" | "art";

const WEEKS = 52;
const PEAK_INDEX = 47;
const LINE_W = 670;
const LINE_H = 72;

function trendSeries(
  mode: "up" | "down",
  magnitude: number,
  spikes: number[],
): number[] {
  return Array.from({ length: WEEKS }, (_, wi) => {
    const t = wi / (WEEKS - 1);
    const texture = Math.sin(wi / 5.5) * 5 + (wi % 8 === 0 ? 4 : 0);
    const trending =
      mode === "down"
        ? 74 - magnitude * 230 * t + texture
        : 26 + magnitude * 140 * t + texture;
    const spike = spikes.includes(wi);
    const peak = wi === PEAK_INDEX;
    if (mode === "up" && peak) return 100;
    if (spike) return Math.min(90, trending + 14);
    return Math.min(78, Math.max(14, trending));
  });
}

function MetricTrendLine({
  values,
  peakIndex,
  showPeak,
}: {
  values: number[];
  peakIndex: number;
  showPeak: boolean;
}) {
  const gradId = `metric-line-fill-${showPeak ? "up" : "down"}`;
  const padY = 6;
  const usable = LINE_H - padY * 2;
  const coords = values.map((v, i) => {
    const x = (i / (values.length - 1)) * LINE_W;
    const y = padY + (1 - v / 100) * usable;
    return { x, y };
  });

  const lineD = coords
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
  const areaD = `${lineD} L ${LINE_W} ${LINE_H} L 0 ${LINE_H} Z`;
  const peak = coords[peakIndex];

  return (
    <svg
      className="metric-line"
      viewBox={`0 0 ${LINE_W} ${LINE_H}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor="var(--progress-fill)"
            stopOpacity="0.42"
          />
          <stop
            offset="55%"
            stopColor="var(--progress-fill)"
            stopOpacity="0.16"
          />
          <stop
            offset="100%"
            stopColor="var(--progress-fill)"
            stopOpacity="0.03"
          />
        </linearGradient>
      </defs>
      <motion.path
        className="metric-line-area"
        d={areaD}
        fill={`url(#${gradId})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.7 }}
      />
      <motion.path
        className="metric-line-stroke"
        d={lineD}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.35, duration: 1.15, ease: [0.85, 0, 0.15, 1] }}
      />
      {showPeak && peak && (
        <motion.circle
          className="metric-line-peak"
          cx={peak.x}
          cy={peak.y}
          r={4.5}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.35, ease: [0.85, 0, 0.15, 1] }}
        />
      )}
    </svg>
  );
}

export function SceneCore({
  admin,
  hero = "tickets",
}: SceneProps & { hero?: CoreHero }) {
  const ticketsYoy = positiveDelta(admin.ticketsYoy);
  const selfServeYoy = positiveDelta(admin.selfServeYoy);
  const containedLift =
    admin.containedResolutionsPrev > 0
      ? +(
          ((admin.containedResolutions - admin.containedResolutionsPrev) /
            admin.containedResolutionsPrev) *
          100
        ).toFixed(1)
      : 0;
  const containedYoy = positiveDelta(containedLift);

  const artDrop =
    admin.artHoursPrev > 0 && admin.artHours < admin.artHoursPrev
      ? +(
          ((admin.artHoursPrev - admin.artHours) / admin.artHoursPrev) *
          100
        ).toFixed(1)
      : null;
  const artIndustry = admin.benchmarks.find((b) => b.id === "art");

  const csatPct = csatToPercent(admin.csat);
  const csatPrevPct = csatToPercent(admin.csatPrev);
  const csatLift =
    admin.csatPrev > 0
      ? +(((admin.csat - admin.csatPrev) / admin.csatPrev) * 100).toFixed(1)
      : 0;
  const csatYoy = positiveDelta(csatLift);
  const csatIndustry = admin.benchmarks.find((b) => b.id === "csat");
  const topCsatChannels = [...admin.channels]
    .sort((a, b) => b.csat - a.csat)
    .slice(0, 3);

  const fcrLift =
    admin.fcrPrev > 0
      ? +(((admin.fcr - admin.fcrPrev) / admin.fcrPrev) * 100).toFixed(1)
      : 0;
  const fcrYoy = fcrLift !== 0 ? fcrLift : null;
  const fcrIndustry = admin.benchmarks.find((b) => b.id === "fcr");

  const heroCard: MetricCard =
    hero === "art"
      ? {
          id: "art",
          label: "Average resolution time",
          display: admin.artLabel,
          delta: (
            <span className="metric-hero-trail">
              {artDrop != null && (
                <span className="metric-delta">(↓ −{artDrop}%)</span>
              )}
              <span className="metric-compare metric-compare-inline">
                vs{" "}
                <span className="metric-vs-num">{admin.artLabelPrev}</span>{" "}
                previous year
              </span>
            </span>
          ),
          detail: artIndustry ? (
            <div className="metric-card-stack metric-card-stack-tight">
              <BenchmarkCallout
                industry={artIndustry.industry}
                leaders={artIndustry.leaders}
                unit={artIndustry.unit}
                percentile={admin.artPercentile}
              />
            </div>
          ) : undefined,
          badge: null,
        }
      : {
          id: "tickets",
          label: "Tickets resolved",
          display: <CountUp value={admin.totalTickets} duration={1.4} />,
          detail: (
            <span>
              vs{" "}
              <span className="metric-vs-num">{fmtInt(admin.ticketsPrev)}</span>{" "}
              previous year
            </span>
          ),
          badge: ticketsYoy && ticketsYoy >= 10 ? "good-going" : null,
        };

  const secondaryCard: MetricCard =
    hero === "art"
      ? {
          id: "contained",
          label: "Contained resolutions",
          display: (
            <CountUp value={admin.containedResolutions} duration={1.3} />
          ),
          delta: (
            <span className="metric-hero-trail">
              {containedYoy != null && (
                <span className="metric-delta">(↑ +{containedYoy}%)</span>
              )}
              <span className="metric-compare metric-compare-inline">
                vs{" "}
                <span className="metric-vs-num">
                  {fmtInt(admin.containedResolutionsPrev)}
                </span>{" "}
                previous year
              </span>
            </span>
          ),
          detail: (
            <div className="metric-card-stack">
              <BenchmarkCallout
                industry={admin.containedIndustry}
                leaders={admin.containedLeaders}
                percentile={admin.containedPercentile}
              />
            </div>
          ),
          badge: null,
        }
      : {
          id: "csat",
          label: "CSAT",
          display: (
            <>
              <CountUp value={csatPct} duration={1.2} />
              <span className="metric-unit">%</span>
            </>
          ),
          delta: (
            <span className="metric-hero-trail">
              {csatYoy != null && (
                <span className="metric-delta">(↑ +{csatYoy}%)</span>
              )}
              <span className="metric-compare metric-compare-inline">
                vs <span className="metric-vs-num">{csatPrevPct}%</span>{" "}
                previous year
              </span>
            </span>
          ),
          detail: (
            <div className="metric-card-stack">
              <div className="metric-channels">
                <span className="metric-channels-label">Best channels</span>
                <div className="metric-channel-list">
                  {topCsatChannels.map((c) => (
                    <span key={c.label} className="metric-channel">
                      {c.label}{" "}
                      <span className="metric-channel-val">
                        {csatToPercent(c.csat)}%
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              {csatIndustry && (
                <BenchmarkCallout
                  industry={csatToPercent(csatIndustry.industry)}
                  leaders={csatToPercent(csatIndustry.leaders)}
                  percentile={admin.csatPercentile}
                />
              )}
            </div>
          ),
          badge: csatBadge(admin.csat, admin.csatPrev),
        };

  const tertiaryCard: MetricCard =
    hero === "art"
      ? {
          id: "fcr",
          label: "First contact resolution",
          display: (
            <>
              <CountUp value={admin.fcr} duration={1.2} />
              <span className="metric-unit">%</span>
            </>
          ),
          delta: (
            <span className="metric-hero-trail">
              {fcrYoy != null && (
                <span className="metric-delta">
                  ({fcrYoy > 0 ? "↑" : "↓"} {fcrYoy > 0 ? "+" : ""}
                  {fcrYoy}%)
                </span>
              )}
              <span className="metric-compare metric-compare-inline">
                vs <span className="metric-vs-num">{admin.fcrPrev}%</span>{" "}
                previous year
              </span>
            </span>
          ),
          detail: fcrIndustry ? (
            <div className="metric-card-stack">
              <BenchmarkCallout
                industry={fcrIndustry.industry}
                leaders={fcrIndustry.leaders}
                percentile={admin.fcrPercentile}
              />
            </div>
          ) : undefined,
          badge: rateBadge(admin.fcr),
        }
      : {
          id: "self-serve",
          label: "Self-serve",
          display: (
            <>
              <CountUp value={admin.selfServeRate} duration={1.2} />
              <span className="metric-unit">%</span>
            </>
          ),
          delta: (
            <span className="metric-hero-trail">
              {selfServeYoy != null && (
                <span className="metric-delta">(↑ +{selfServeYoy}%)</span>
              )}
              <span className="metric-compare metric-compare-inline">
                vs{" "}
                <span className="metric-vs-num">
                  {admin.selfServeRatePrev}%
                </span>{" "}
                previous year
              </span>
            </span>
          ),
          detail: (
            <div className="metric-card-stack">
              <div className="metric-channels">
                <span className="metric-channels-label">Volume</span>
                <div className="metric-channel-list">
                  <span className="metric-channel">
                    <span className="metric-channel-val">
                      {fmtInt(admin.kbViews)}
                    </span>{" "}
                    KB views
                  </span>
                  <span className="metric-channel">
                    <span className="metric-channel-val">
                      {fmtInt(admin.createdTickets)}
                    </span>{" "}
                    created tickets
                  </span>
                </div>
              </div>
              <BenchmarkCallout
                industry={admin.selfServeIndustry}
                leaders={admin.selfServeLeaders}
                percentile={admin.selfServePercentile}
              />
            </div>
          ),
          badge: rateBadge(admin.selfServeRate + 20),
        };

  const cards: MetricCard[] = [heroCard, secondaryCard, tertiaryCard];

  const peakIndex = PEAK_INDEX;
  const ticketsSeries = trendSeries(
    "up",
    (ticketsYoy ?? admin.ticketsYoy) / 100,
    admin.seasonalSpikes,
  );
  const artSeries = trendSeries(
    "down",
    (artDrop ?? 18) / 100,
    admin.seasonalSpikes,
  );

  return (
    <SceneShell eyebrow="Your Core Metrics" className="scene-core">
      <motion.div
        className="metric-grid scene-visual"
        {...fadeUp}
      >
        {cards.map((card, i) => {
          const isFeatureCard = card.id === "tickets" || card.id === "art";
          return (
          <motion.div
            key={card.id}
            className={`metric-card metric-card-${card.id}${isFeatureCard ? " metric-card-tickets" : ""}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
          >
            <div className="metric-card-top">
              <span className="metric-card-label">{card.label}</span>
              {card.badge && (
                <MetricBadge
                  kind={card.badge}
                  className="badge-inline"
                  celebrate={false}
                  celebrateDelay={0.55 + i * 0.12}
                />
              )}
            </div>

            {isFeatureCard ? (
              <>
                <div className="metric-hero-row">
                  <div className="metric-card-value">{card.display}</div>
                  {card.id === "tickets" && ticketsYoy != null && (
                    <span className="metric-delta">↑ +{ticketsYoy}% YoY</span>
                  )}
                  {card.id === "art" && card.delta}
                </div>
                <div className="metric-histo-wrap">
                  <MetricTrendLine
                    values={card.id === "art" ? artSeries : ticketsSeries}
                    peakIndex={peakIndex}
                    showPeak={card.id === "tickets"}
                  />
                  <div className="metric-histo-years" aria-hidden>
                    <span>{admin.year - 1}</span>
                    <span>{admin.year}</span>
                  </div>
                </div>
                {card.detail && (
                  <div className="metric-card-detail">{card.detail}</div>
                )}
              </>
            ) : (
              <>
                <div className="metric-hero-row">
                  <div className="metric-card-value">{card.display}</div>
                  {card.delta}
                </div>
                {card.detail && (
                  <div className="metric-card-detail">{card.detail}</div>
                )}
              </>
            )}
          </motion.div>
          );
        })}
      </motion.div>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 0.9 }}>
        {hero === "art"
          ? <>Faster resolves and more zero-touch closes — <strong>lean on AI</strong> to clear more first contacts and catch up to the leaders.</>
          : <>Tickets closed, customers happier, more answers found<br /><strong>before a ticket ever landed</strong>.</>}
      </motion.p>
    </SceneShell>
  );
}

export function SceneCoreArt(props: SceneProps) {
  return <SceneCore {...props} hero="art" />;
}
