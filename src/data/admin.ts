export type BadgeKind = "big-win" | "good-going" | null;
export type AccountType = "standard" | "ai";

export interface Channel {
  label: string;
  share: number;
  csat: number;
  yoy: number;
  /** Share of channel volume resolved by classic automation */
  automationRate?: number;
  /** Share of channel volume resolved by AI / Auto Assist / agents */
  aiAutomationRate?: number;
}

export interface BenchmarkRow {
  id: string;
  label: string;
  you: number;
  industry: number;
  leaders: number;
  unit: "%" | "h" | "m" | "score";
  /** lower is better (e.g. resolution time) */
  invert?: boolean;
  topQuartile: boolean;
  gap?: boolean;
}

export interface AutomationShare {
  label: string;
  share: number;
  highlight?: boolean;
}

export interface AiFeature {
  label: string;
  adoption: number;
}

export interface AiOpportunity {
  label: string;
  benefit: string;
  /** Optional supporting line for scannable callouts */
  detail?: string;
}

export interface QuarterPoint {
  label: string;
  automationRate: number;
  hoursSaved: number;
  csatLift: number;
}

export interface AddOn {
  label: string;
  enabled: boolean;
  adoption: number;
  csatLift: number;
  opportunity?: boolean;
}

export type ChampionId = "whisperer" | "helpful" | "efficiency";

export interface Champion {
  id: ChampionId;
  title: string;
  name: string;
  copy: string;
  /** Portrait URL for the champion avatar */
  avatar: string;
  /** Customer Whisperer */
  csatStreakMonths?: number;
  personalBestPerDay?: number;
  csatYoyPct?: number;
  /** Helpful & Responsive */
  ticketsResolved?: number;
  highCsatStreakMonths?: number;
  fcrMins?: number;
  /** Efficiency Leader */
  aiAdoptionPct?: number;
  aiTickets?: number;
  ahtMins?: number;
}

export interface Topic {
  label: string;
  /** Share of ticket volume */
  sharePct: number;
  /** Year-over-year change in volume */
  yoyPct: number;
  /** Share of this topic deflected / self-served */
  deflectedPct: number;
}

export interface SeasonMonth {
  label: string;
  /** CSAT on 0–5 scale when known */
  csat?: number;
}

export interface PlaybookLink {
  id: string;
  label: string;
  href: string;
  primary?: boolean;
}

export interface QuickWin {
  label: string;
  reason: string;
}

export interface QualityQuarter {
  label: string;
  score: number;
}

export interface QualityWfm {
  qualityScore: number;
  qualityScorePrev: number;
  qualityTarget: number;
  qualityQuarters: QualityQuarter[];
  agentsImprovingPct: number;
  agentsImprovingPrevPct: number;
  consistencySpreadPct: number;
  consistencySpreadPrevPct: number;
  scheduleAdherence: number;
  scheduleAdherencePrev: number;
  scheduleTarget: number;
  occupancy: number;
  occupancyPrev: number;
  occupancyHealthyMin: number;
  occupancyHealthyMax: number;
  shrinkage: number;
  shrinkagePrev: number;
  shrinkageHealthyMax: number;
  shrinkagePlanned: number;
  shrinkageUnplanned: number;
  forecastAccuracy: number;
  forecastDeviation: number;
  forecastYoyPts: number;
  insightFasterMins: number;
  insightCorrelation: number;
}

export interface ExecHighlight {
  label: string;
  value: string;
  badge?: BadgeKind;
}

export interface AdminYear {
  adminName: string;
  orgName: string;
  year: number;
  accountType: AccountType;

  /* Core */
  totalTickets: number;
  ticketsPrev: number;
  ticketsYoy: number;
  csat: number;
  csatPrev: number;
  csatPercentile: number;
  artHours: number;
  artLabel: string;
  artHoursPrev: number;
  artLabelPrev: string;
  artImproved: boolean;
  artPercentile: number;
  fcr: number;
  fcrPrev: number;
  fcrPercentile: number;
  selfServeRate: number;
  selfServeRatePrev: number;
  selfServeYoy: number;
  kbViews: number;
  createdTickets: number;
  selfServeIndustry: number;
  selfServeLeaders: number;
  selfServePercentile: number;
  deflectedTickets: number;
  deflectionRate: number;
  selfServeSources: string[];

  /* Speed */
  slaCompliance: number;
  firstResponseMins: number;
  resolutionLabel: string;

  /* Benchmarks */
  benchmarks: BenchmarkRow[];
  benchmarkStrength: string;
  benchmarkGap: string;

  /* Automation & AI */
  automationBreakdown: AutomationShare[];
  automationRate: number;
  automationRatePrev: number;
  automationYoy: number;
  automationIndustry: number;
  /** Rank vs industry peers for classic automation (macros / triggers / flows) */
  automationPercentile: number;
  hoursSavedPercentile: number;
  automationCsatLift: number;
  /** AI / Auto Assist / custom agents slide — distinct from classic automation */
  aiAutomationRate: number;
  aiAutomationYoy: number;
  aiAutomationPercentile: number;
  aiHoursSavedYtd: number;
  aiHoursSavedPercentile: number;
  aiAutomationCsatLift: number;
  aiAutomationBreakdown: AutomationShare[];
  aiFeatures: AiFeature[];
  aiOpportunities: AiOpportunity[];
  aiAdoptionYoy: number;
  aiRoiLabel: string;
  containedResolutions: number;
  containedResolutionsPrev: number;
  containedIndustry: number;
  containedLeaders: number;
  containedPercentile: number;
  /** CSAT on contained / zero-touch resolutions (0–5) */
  containedCsat: number;
  /** Contained CSAT lift vs overall, in percentage points of the 0–5 scale */
  containedCsatLiftPct: number;
  /** Share of peers using AI agents */
  aiAgentsIndustry: number;
  copilotAdoption: number;
  voiceAiSuccess: number;
  macrosResolved: number;
  actionFlowsResolved: number;

  /* Quarterly + toolkit */
  quarterly: QuarterPoint[];
  hoursSavedYtd: number;
  csatLiftYtd: number;
  addOns: AddOn[];
  quickWins: QuickWin[];

  /* Channels & seasonality */
  channels: Channel[];
  peakWeek: { weekLabel: string; tickets: number; context: string };
  seasonalSpikes: number[];
  /** High-CSAT months (CSAT ≥ 4.7) */
  bestMonths: SeasonMonth[];
  /** Highest ticket-volume months */
  busyMonths: SeasonMonth[];

  /* People & voice */
  champions: Champion[];
  teamCsat: number;
  teamCsatPrev: number;
  teamQaScore: number;
  teamQaPrev: number;
  qualityWfm: QualityWfm;
  topics: Topic[];
  quote: { text: string; from: string; ticketId: string } | null;
  kbTrafficLift: number;
  deflectionCorrelation: string;

  /* Playbook */
  playbookLinks: PlaybookLink[];
  agentsEnabled: number;
  hires: number;
  team: { size: number; teamTickets: number };
  aiProjection: {
    autoResolvedRate: number;
    firstReplyCut: number;
    csatLift: number;
  };

  /* Welcome roll-up */
  execTagline: string;
  execHighlights: ExecHighlight[];
}

/** Badge from a 0–100 style rate / percentile. */
export function rateBadge(value: number): BadgeKind {
  if (value >= 80) return "big-win";
  if (value >= 50) return "good-going";
  return null;
}

/** CSAT YoY: Big Win only when absolute increase exceeds 4% of prior score. */
export function csatBadge(csat: number, csatPrev: number): BadgeKind {
  if (csatPrev <= 0) return null;
  const pct = ((csat - csatPrev) / csatPrev) * 100;
  if (pct > 4) return "big-win";
  return null;
}

/** Convert a 0–5 CSAT score to a whole-number percentage. */
export function csatToPercent(score: number): number {
  return Math.round((score / 5) * 100);
}

export function badgeLabel(kind: BadgeKind): string | null {
  if (kind === "big-win") return "Big Win";
  return null;
}

/** Positive deltas only — hide negatives from the narrative. */
export function positiveDelta(n: number): number | null {
  return n > 0 ? n : null;
}

export const mockAdmin: AdminYear = {
  adminName: "Jonathon Newby",
  orgName: "À Porter",
  year: 2026,
  accountType: "ai",

  totalTickets: 413500,
  ticketsPrev: 350424,
  ticketsYoy: 18,
  csat: 4.6,
  csatPrev: 4.4,
  csatPercentile: 86,
  artHours: 17.7,
  artLabel: "17h 40m",
  artHoursPrev: 21.5,
  artLabelPrev: "21h 30m",
  artImproved: true,
  artPercentile: 68,
  fcr: 72,
  fcrPrev: 65,
  fcrPercentile: 82,
  selfServeRate: 38,
  selfServeRatePrev: 31,
  selfServeYoy: 23,
  kbViews: 2140000,
  createdTickets: 413500,
  selfServeIndustry: 29,
  selfServeLeaders: 52,
  selfServePercentile: 78,
  deflectedTickets: 157000,
  deflectionRate: 38,
  selfServeSources: ["AI Agent", "Help Center", "Answer Bot", "Community"],

  slaCompliance: 96,
  firstResponseMins: 6,
  resolutionLabel: "17h 40m",

  benchmarks: [
    {
      id: "csat",
      label: "CSAT",
      you: 4.6,
      industry: 4.2,
      leaders: 4.8,
      unit: "score",
      topQuartile: true,
    },
    {
      id: "art",
      label: "Resolution time",
      you: 17.7,
      industry: 22,
      leaders: 12,
      unit: "h",
      invert: true,
      topQuartile: false,
      gap: true,
    },
    {
      id: "automation",
      label: "Automation rate",
      you: 41,
      industry: 28,
      leaders: 55,
      unit: "%",
      topQuartile: true,
    },
    {
      id: "ai",
      label: "AI usage",
      you: 34,
      industry: 19,
      leaders: 62,
      unit: "%",
      topQuartile: false,
      gap: true,
    },
    {
      id: "fcr",
      label: "First contact resolution",
      you: 72,
      industry: 58,
      leaders: 81,
      unit: "%",
      topQuartile: true,
    },
  ],
  benchmarkStrength: "CSAT",
  benchmarkGap: "AI usage",

  automationBreakdown: [
    { label: "Macros", share: 18 },
    { label: "Triggers", share: 14, highlight: true },
    { label: "Action Flows", share: 9 },
  ],
  automationRate: 41,
  automationRatePrev: 33,
  automationYoy: 24,
  automationIndustry: 28,
  automationPercentile: 88,
  hoursSavedPercentile: 82,
  automationCsatLift: 0.35,
  aiAutomationRate: 14,
  aiAutomationYoy: 86,
  aiAutomationPercentile: 74,
  aiHoursSavedYtd: 640,
  aiHoursSavedPercentile: 69,
  aiAutomationCsatLift: 0.18,
  aiAutomationBreakdown: [
    { label: "AI", share: 4 },
    { label: "Auto Assist", share: 6 },
    { label: "Custom Agents", share: 4 },
  ],
  aiFeatures: [
    { label: "Auto-Assist", adoption: 62 },
    { label: "AI agents", adoption: 28 },
    { label: "Admin Co-pilot", adoption: 41 },
  ],
  aiOpportunities: [
    {
      label: "Agent Auto-Assist",
      benefit: "Saves 5–10 minutes per ticket",
      detail:
        "Drafts replies and next steps in-thread so agents stay in control.",
    },
    {
      label: "Advanced AI Agent",
      benefit: "Could save 400 hours per year",
      detail:
        "Takes repeatable workflows end-to-end so agents focus on exceptions.",
    },
    {
      label: "Admin co-pilot",
      benefit: "Proactive workflow recommendations",
      detail:
        "Surfaces setup gaps and tuning tips before they become backlog.",
    },
  ],
  aiAdoptionYoy: 140,
  aiRoiLabel: "2.1k hours",
  containedResolutions: 48200,
  containedResolutionsPrev: 31400,
  containedIndustry: 8,
  containedLeaders: 18,
  containedPercentile: 71,
  containedCsat: 4.8,
  containedCsatLiftPct: 7,
  aiAgentsIndustry: 18,
  copilotAdoption: 67,
  voiceAiSuccess: 81,
  macrosResolved: 74400,
  actionFlowsResolved: 37200,

  quarterly: [
    { label: "Q1", automationRate: 28, hoursSaved: 320, csatLift: 0.05 },
    { label: "Q2", automationRate: 33, hoursSaved: 410, csatLift: 0.08 },
    { label: "Q3", automationRate: 37, hoursSaved: 480, csatLift: 0.1 },
    { label: "Q4", automationRate: 41, hoursSaved: 560, csatLift: 0.12 },
  ],
  hoursSavedYtd: 1770,
  csatLiftYtd: 0.35,
  addOns: [
    { label: "Answer Bot", enabled: true, adoption: 78, csatLift: 0.12 },
    { label: "Side Conversations", enabled: true, adoption: 54, csatLift: 0.04 },
    {
      label: "Quality Assurance",
      enabled: false,
      adoption: 0,
      csatLift: 0.18,
      opportunity: true,
    },
    { label: "Workforce Management", enabled: true, adoption: 61, csatLift: 0.06 },
    {
      label: "Advanced AI",
      enabled: false,
      adoption: 0,
      csatLift: 0.22,
      opportunity: true,
    },
  ],
  quickWins: [
    {
      label: "Macros on fire",
      reason: "18% of ticket volume closed without a human touch",
    },
    {
      label: "Messaging surge handled",
      reason: "+38% YoY volume with CSAT still at 4.7",
    },
    {
      label: "Copilot drafts landed",
      reason: "67% of agents lean on AI for first replies",
    },
  ],

  channels: [
    {
      label: "Email",
      share: 42,
      csat: 4.5,
      yoy: 4,
      automationRate: 35,
      aiAutomationRate: 11,
    },
    {
      label: "Web",
      share: 18,
      csat: 4.4,
      yoy: 12,
      automationRate: 42,
      aiAutomationRate: 19,
    },
    {
      label: "Messaging",
      share: 16,
      csat: 4.7,
      yoy: 38,
      automationRate: 58,
      aiAutomationRate: 44,
    },
    {
      label: "Phone",
      share: 14,
      csat: 4.3,
      yoy: -6,
      automationRate: 12,
      aiAutomationRate: 6,
    },
    {
      label: "API",
      share: 10,
      csat: 4.8,
      yoy: 22,
      automationRate: 71,
      aiAutomationRate: 28,
    },
  ],
  peakWeek: {
    weekLabel: "the week of Nov 24",
    tickets: 11800,
    context: "Black Friday week",
  },
  seasonalSpikes: [11, 28, 47],
  bestMonths: [
    { label: "Mar", csat: 4.8 },
    { label: "Apr", csat: 4.7 },
    { label: "Jun", csat: 4.9 },
  ],
  busyMonths: [
    { label: "Jan" },
    { label: "Nov" },
    { label: "Dec" },
  ],

  champions: [
    {
      id: "whisperer",
      title: "Customer Whisperer",
      name: "Maya Chen",
      avatar: `${import.meta.env.BASE_URL}avatars/maya-chen.png`,
      copy: "You turn one-star days into five-star stories.",
      csatStreakMonths: 5,
      personalBestPerDay: 47,
      csatYoyPct: 6.2,
    },
    {
      id: "helpful",
      title: "Helpful & Responsive",
      name: "Jordan Blake",
      avatar: `${import.meta.env.BASE_URL}avatars/jordan-blake.png`,
      copy: "Customers don't just get answers — they get you.",
      ticketsResolved: 1840,
      highCsatStreakMonths: 5,
      fcrMins: 4,
    },
    {
      id: "efficiency",
      title: "Efficiency Leader",
      name: "Sam Ortiz",
      avatar: `${import.meta.env.BASE_URL}avatars/sam-ortiz.png`,
      copy: "Macros fear you. Tickets surrender on contact.",
      aiAdoptionPct: 94,
      aiTickets: 1260,
      ahtMins: 6,
    },
  ],
  teamCsat: 92,
  teamCsatPrev: 88,
  teamQaScore: 82,
  teamQaPrev: 79,
  qualityWfm: {
    qualityScore: 82,
    qualityScorePrev: 79,
    qualityTarget: 80,
    qualityQuarters: [
      { label: "Q1", score: 79 },
      { label: "Q2", score: 80 },
      { label: "Q3", score: 81 },
      { label: "Q4", score: 82 },
    ],
    agentsImprovingPct: 52,
    agentsImprovingPrevPct: 38,
    consistencySpreadPct: 12,
    consistencySpreadPrevPct: 18,
    scheduleAdherence: 92,
    scheduleAdherencePrev: 89,
    scheduleTarget: 90,
    occupancy: 81,
    occupancyPrev: 84,
    occupancyHealthyMin: 75,
    occupancyHealthyMax: 85,
    shrinkage: 17,
    shrinkagePrev: 19,
    shrinkageHealthyMax: 20,
    shrinkagePlanned: 11,
    shrinkageUnplanned: 6,
    forecastAccuracy: 91,
    forecastDeviation: 5,
    forecastYoyPts: 3,
    insightFasterMins: 12,
    insightCorrelation: -0.42,
  },
  topics: [
    {
      label: "Shipping delays",
      sharePct: 22,
      yoyPct: 14,
      deflectedPct: 31,
    },
    {
      label: "Size exchanges",
      sharePct: 18,
      yoyPct: 8,
      deflectedPct: 44,
    },
    {
      label: "Gift cards",
      sharePct: 15,
      yoyPct: 27,
      deflectedPct: 52,
    },
    {
      label: "Account access",
      sharePct: 12,
      yoyPct: -4,
      deflectedPct: 61,
    },
    {
      label: "Returns window",
      sharePct: 9,
      yoyPct: 11,
      deflectedPct: 38,
    },
  ],
  quote: {
    text: "You had our backs all season — and made sure the queue never felt impossible.",
    from: "A customer who stuck around",
    ticketId: "#118422",
  },
  kbTrafficLift: 27,
  deflectionCorrelation: "more tickets never reached the queue",

  playbookLinks: [
    {
      id: "pdf",
      label: "Download full analysis",
      href: "#download-pdf",
      primary: true,
    },
    { id: "exec", label: "Executive summary", href: "#exec-summary" },
    { id: "roi", label: "ROI calculator", href: "#roi-calculator" },
    { id: "qbr", label: "Schedule a QBR", href: "#schedule-qbr" },
    { id: "community", label: "Join the community", href: "#community" },
  ],
  agentsEnabled: 42,
  hires: 9,
  team: { size: 42, teamTickets: 413500 },
  aiProjection: {
    autoResolvedRate: 52,
    firstReplyCut: 40,
    csatLift: 0.3,
  },

  execTagline: "A year of sharper ops, happier customers, and AI that finally earned its keep.",
  execHighlights: [
    { label: "Tickets resolved", value: "413.5k", badge: "good-going" },
    { label: "CSAT", value: "4.6 · 86th", badge: "big-win" },
    { label: "Automated", value: "41%", badge: "good-going" },
    { label: "Hours saved", value: "1,770", badge: "big-win" },
  ],
};
