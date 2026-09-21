export type BadgeKind = "big-win" | "good-going" | null;

export interface Channel {
  label: string;
  share: number;
  csat: number;
  yoy: number;
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

export interface Champion {
  title: string;
  name: string;
  detail: string;
}

export interface Topic {
  label: string;
}

export interface PlaybookLink {
  id: string;
  label: string;
  href: string;
  primary?: boolean;
}

export interface AdminYear {
  adminName: string;
  orgName: string;
  year: number;

  /* Core */
  totalTickets: number;
  ticketsYoy: number;
  csat: number;
  csatPrev: number;
  csatPercentile: number;
  artHours: number;
  artLabel: string;
  fcr: number;
  selfServeRate: number;
  deflectedTickets: number;
  deflectionRate: number;
  selfServeSources: string[];

  /* Speed legacy-friendly */
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
  aiFeatures: AiFeature[];
  aiAdoptionYoy: number;
  aiRoiLabel: string;

  /* Quarterly + toolkit */
  quarterly: QuarterPoint[];
  hoursSavedYtd: number;
  csatLiftYtd: number;
  addOns: AddOn[];
  quickWin: { label: string; reason: string };

  /* Channels & seasonality */
  channels: Channel[];
  peakWeek: { weekLabel: string; tickets: number; context: string };
  seasonalSpikes: number[];

  /* People & voice */
  champions: Champion[];
  topics: Topic[];
  quote: { text: string; from: string; ticketId: string } | null;
  kbTrafficLift: number;
  deflectionCorrelation: string;

  /* Playbook */
  playbookLinks: PlaybookLink[];
  agentsEnabled: number;
  hires: number;
  team: { size: number; teamTickets: number };
  longestThread: { replies: number; days: number };
  aiProjection: {
    autoResolvedRate: number;
    firstReplyCut: number;
    csatLift: number;
  };
}

/** Badge from a 0–100 style rate / percentile. */
export function rateBadge(value: number): BadgeKind {
  if (value >= 80) return "big-win";
  if (value >= 50) return "good-going";
  return null;
}

export function badgeLabel(kind: BadgeKind): string | null {
  if (kind === "big-win") return "Big Win";
  if (kind === "good-going") return "Good Going";
  return null;
}

export const mockAdmin: AdminYear = {
  adminName: "Jonathon Newby",
  orgName: "À Porter",
  year: 2026,

  totalTickets: 413500,
  ticketsYoy: 18,
  csat: 4.6,
  csatPrev: 4.4,
  csatPercentile: 86,
  artHours: 17.7,
  artLabel: "17h 40m",
  fcr: 72,
  selfServeRate: 38,
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
    { label: "Workflows", share: 9 },
  ],
  automationRate: 41,
  aiFeatures: [
    { label: "Auto-Assist", adoption: 62 },
    { label: "AI agents", adoption: 28 },
    { label: "Admin Co-pilot", adoption: 41 },
  ],
  aiAdoptionYoy: 140,
  aiRoiLabel: "2.1k hours",

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
  ],
  quickWin: {
    label: "Quality Assurance",
    reason: "teams like yours see ~0.2 CSAT lift in the first quarter",
  },

  channels: [
    { label: "Email", share: 42, csat: 4.5, yoy: 4 },
    { label: "Web", share: 18, csat: 4.4, yoy: 12 },
    { label: "Messaging", share: 16, csat: 4.7, yoy: 38 },
    { label: "Phone", share: 14, csat: 4.3, yoy: -6 },
    { label: "API", share: 10, csat: 4.8, yoy: 22 },
  ],
  peakWeek: {
    weekLabel: "the week of Nov 24",
    tickets: 11800,
    context: "Black Friday week",
  },
  seasonalSpikes: [11, 28, 47],

  champions: [
    {
      title: "Customer Whisperer",
      name: "Maya Chen",
      detail: "4.9 CSAT across 1,240 tickets",
    },
    {
      title: "Helpful & Responsive",
      name: "Jordan Blake",
      detail: "First reply under 4m, all year",
    },
    {
      title: "Efficiency Leader",
      name: "Sam Ortiz",
      detail: "Highest FCR on the floor",
    },
  ],
  topics: [
    { label: "Shipping delays" },
    { label: "Size exchanges" },
    { label: "Gift cards" },
    { label: "Account access" },
    { label: "Returns window" },
  ],
  quote: {
    text: "You had our backs all season — and made sure the queue never felt impossible.",
    from: "Agent on your team",
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
    { id: "roi", label: "Open ROI calculator", href: "#roi-calculator" },
    { id: "qbr", label: "Schedule a QBR", href: "#schedule-qbr" },
    { id: "hyperarc", label: "Explore HyperArc data", href: "#hyperarc" },
  ],
  agentsEnabled: 42,
  hires: 9,
  team: { size: 42, teamTickets: 413500 },
  longestThread: { replies: 41, days: 12 },
  aiProjection: {
    autoResolvedRate: 52,
    firstReplyCut: 40,
    csatLift: 0.3,
  },
};
