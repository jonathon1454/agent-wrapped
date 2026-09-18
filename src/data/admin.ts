export interface Channel {
  label: string;
  share: number;
}

export interface AdminYear {
  adminName: string;
  orgName: string;
  year: number;
  totalTickets: number;
  deflectedTickets: number;
  deflectionRate: number;
  agentsEnabled: number;
  hires: number;
  csat: number;
  csatPrev: number;
  slaCompliance: number;
  firstResponseMins: number;
  resolutionLabel: string;
  peakWeek: { weekLabel: string; tickets: number; context: string };
  channels: Channel[];
  longestThread: { replies: number; days: number };
  quote: { text: string; from: string; ticketId: string } | null;
  team: { size: number; teamTickets: number };
  aiProjection: {
    autoResolvedRate: number;
    firstReplyCut: number;
    csatLift: number;
  };
}

export const mockAdmin: AdminYear = {
  adminName: "Jonathon Newby",
  orgName: "À Porter",
  year: 2026,
  totalTickets: 413500,
  deflectedTickets: 157000,
  deflectionRate: 38,
  agentsEnabled: 42,
  hires: 9,
  csat: 4.6,
  csatPrev: 4.4,
  slaCompliance: 96,
  firstResponseMins: 6,
  resolutionLabel: "17h 40m",
  peakWeek: {
    weekLabel: "the week of Nov 24",
    tickets: 11800,
    context: "Black Friday week",
  },
  channels: [
    { label: "Email", share: 54 },
    { label: "Chat", share: 24 },
    { label: "Messaging", share: 14 },
    { label: "Voice", share: 8 },
  ],
  longestThread: { replies: 41, days: 12 },
  quote: {
    text: "You had our backs all season — and made sure the queue never felt impossible.",
    from: "Agent on your team",
    ticketId: "#118422",
  },
  team: { size: 42, teamTickets: 413500 },
  aiProjection: {
    autoResolvedRate: 52,
    firstReplyCut: 40,
    csatLift: 0.3,
  },
};
