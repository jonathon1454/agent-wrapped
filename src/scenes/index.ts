import type { ComponentType } from "react";
import type { SceneProps } from "./types";
import { SceneOpen } from "./SceneOpen";
import { SceneTickets } from "./SceneTickets";
import { SceneCsat } from "./SceneCsat";
import { SceneSpeed } from "./SceneSpeed";
import { SceneSelfServe } from "./SceneSelfServe";
import { SceneBenchmark } from "./SceneBenchmark";
import { SceneAutomation } from "./SceneAutomation";
import { SceneAi } from "./SceneAi";
import { SceneMomentum } from "./SceneMomentum";
import { SceneChannels } from "./SceneChannels";
import { ScenePeakWeek } from "./ScenePeakWeek";
import { SceneChampions } from "./SceneChampions";
import { SceneVoice } from "./SceneVoice";
import { ScenePlaybook } from "./ScenePlaybook";
import { SceneRecap } from "./SceneRecap";

export interface SceneDef {
  id: string;
  title: string;
  Component: ComponentType<SceneProps>;
}

/** Six-act spine — same personality, denser information architecture. */
export const SCENES: SceneDef[] = [
  { id: "open", title: "Open", Component: SceneOpen },
  { id: "tickets", title: "Tickets resolved", Component: SceneTickets },
  { id: "csat", title: "Customer Satisfaction", Component: SceneCsat },
  { id: "speed", title: "Speed", Component: SceneSpeed },
  { id: "self-serve", title: "Self-serve", Component: SceneSelfServe },
  { id: "benchmark", title: "Where you stand", Component: SceneBenchmark },
  { id: "automation", title: "Automation", Component: SceneAutomation },
  { id: "ai", title: "AI adoption", Component: SceneAi },
  { id: "momentum", title: "Quarterly momentum", Component: SceneMomentum },
  { id: "channels", title: "Channels", Component: SceneChannels },
  { id: "peak-week", title: "Peak week", Component: ScenePeakWeek },
  { id: "champions", title: "Team champions", Component: SceneChampions },
  { id: "voice", title: "Customer voice", Component: SceneVoice },
  { id: "playbook", title: "Playbook", Component: ScenePlaybook },
  { id: "recap", title: "Recap", Component: SceneRecap },
];
