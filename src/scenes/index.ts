import type { ComponentType } from "react";
import type { SceneProps } from "./types";
import { SceneOpen } from "./SceneOpen";
import { SceneTickets } from "./SceneTickets";
import { SceneWords } from "./SceneWords";
import { SceneCsat } from "./SceneCsat";
import { SceneSpeed } from "./SceneSpeed";
import { ScenePeakWeek } from "./ScenePeakWeek";
import { SceneChannels } from "./SceneChannels";
import { SceneLongThread } from "./SceneLongThread";
import { SceneQuote } from "./SceneQuote";
import { SceneTeam } from "./SceneTeam";
import { SceneNext } from "./SceneNext";
import { SceneRecap } from "./SceneRecap";

export interface SceneDef {
  id: string;
  title: string;
  Component: ComponentType<SceneProps>;
}

export const SCENES: SceneDef[] = [
  { id: "open", title: "Open", Component: SceneOpen },
  { id: "tickets", title: "Tickets solved", Component: SceneTickets },
  { id: "words", title: "Words written", Component: SceneWords },
  { id: "csat", title: "Customer Satisfaction", Component: SceneCsat },
  { id: "speed", title: "Speed", Component: SceneSpeed },
  { id: "peak-week", title: "Peak week", Component: ScenePeakWeek },
  { id: "channels", title: "Channels", Component: SceneChannels },
  { id: "long-thread", title: "Long thread", Component: SceneLongThread },
  { id: "quote", title: "Praise", Component: SceneQuote },
  { id: "team", title: "Team", Component: SceneTeam },
  { id: "next", title: "What's next", Component: SceneNext },
  { id: "recap", title: "Recap", Component: SceneRecap },
];
