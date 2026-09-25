import type { ComponentType } from "react";
import type { SceneProps } from "./types";
import { SceneWelcome } from "./SceneWelcome";
import { SceneCore, SceneCoreArt } from "./SceneCore";
import { SceneAutomationAi, SceneAutomationAiAgents } from "./SceneAutomationAi";
import { SceneChampions } from "./SceneChampions";
import { SceneOptimize } from "./SceneOptimize";
import { SceneCustomerVoice } from "./SceneCustomerVoice";
import { ScenePlaybook } from "./ScenePlaybook";

export interface SceneDef {
  id: string;
  title: string;
  Component: ComponentType<SceneProps>;
}

/** Wrapped spine: welcome → core → automation → playbook. */
export const SCENES: SceneDef[] = [
  { id: "welcome", title: "Welcome", Component: SceneWelcome },
  { id: "core", title: "Your Core Metrics", Component: SceneCore },
  { id: "core-2", title: "Your Core Metrics", Component: SceneCoreArt },
  { id: "automation-ai", title: "How Your Team Automates", Component: SceneAutomationAi },
  { id: "automation-ai-2", title: "How Your Team Automates", Component: SceneAutomationAiAgents },
  { id: "champions", title: "Your Champions", Component: SceneChampions },
  { id: "optimize", title: "Your Team's performance and optimization", Component: SceneOptimize },
  { id: "voice", title: "Your customers' voice", Component: SceneCustomerVoice },
  { id: "playbook", title: "Next Steps", Component: ScenePlaybook },
];
