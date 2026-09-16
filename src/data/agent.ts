export interface Channel {
  label: string;
  share: number;
}

export interface AgentYear {
  agentName: string;
  handle: string;
  year: number;
  ticketsSolved: number;
  minutesPerTicket: number;
  wordsTyped: number;
  topPhrases: string[];
  csat: number;
  csatPrev: number;
  firstResponseMins: number;
  resolutionLabel: string;
  peakWeek: { weekLabel: string; tickets: number; context: string };
  channels: Channel[];
  longestThread: { replies: number; days: number };
  quote: { text: string; ticketId: string } | null;
  team: { size: number; teamTickets: number; rank?: number };
}

export const mockAgent: AgentYear = {
  agentName: "Jonathon Newby",
  handle: "@jonathon",
  year: 2026,
  ticketsSolved: 3842,
  minutesPerTicket: 11,
  wordsTyped: 218400,
  topPhrases: [
    "Thanks for your patience",
    "Let me look into that",
    "Glad we got that sorted",
    "Anything else I can help with?",
    "I've gone ahead and",
  ],
  csat: 4.7,
  csatPrev: 4.4,
  firstResponseMins: 6,
  resolutionLabel: "17h 40m",
  peakWeek: {
    weekLabel: "the week of Nov 24",
    tickets: 212,
    context: "Black Friday week",
  },
  channels: [
    { label: "Email", share: 58 },
    { label: "Chat", share: 22 },
    { label: "Voice", share: 12 },
    { label: "Messaging", share: 8 },
  ],
  longestThread: { replies: 34, days: 9 },
  quote: {
    text: "Mira turned my worst day this week into a pretty okay one. Thank you.",
    ticketId: "#88412",
  },
  team: { size: 14, teamTickets: 41350, rank: 3 },
};
