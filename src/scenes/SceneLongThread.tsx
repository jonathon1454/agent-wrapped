import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import type { SceneProps } from "./types";

const BUBBLES: { who: "them" | "you"; text: string }[] = [
  { who: "them", text: "Hi, I'm still seeing the same error as Monday…" },
  { who: "you", text: "Let me dig into the logs again — staying on this." },
  { who: "them", text: "Okay, appreciate it." },
  { who: "you", text: "Found something. Trying a different route now." },
  { who: "them", text: "Fingers crossed." },
  { who: "you", text: "How's it looking on your end?" },
  { who: "them", text: "…oh. It worked." },
  { who: "you", text: "Glad we got there. I'll note the fix for the team." },
  { who: "them", text: "Thank you for not giving up on this one." },
  { who: "you", text: "Anytime." },
];

export function SceneLongThread({ agent }: SceneProps) {
  return (
    <SceneShell eyebrow="The one that stuck">
      <motion.div className="thread" {...fadeUp}>
        {BUBBLES.map((b, i) => (
          <motion.div
            key={i}
            className={`bubble ${b.who}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.18, duration: 0.4 }}
          >
            {b.text}
          </motion.div>
        ))}
      </motion.div>
      <motion.p className="lead" {...fadeUp} transition={{ delay: 2 }}>
        <CountUp value={agent.longestThread.replies} duration={1} /> replies over{" "}
        <CountUp value={agent.longestThread.days} duration={1} /> days.
      </motion.p>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 2.6 }}>
        Some conversations just <em>need</em> time.
      </motion.p>
    </SceneShell>
  );
}
