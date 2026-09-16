import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SceneShell } from "../components/SceneShell";
import type { SceneProps } from "./types";

const TITLE = "Your year,\non the record.";

function useTypewriter(text: string, startDelay = 600, speed = 48) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const begin = setTimeout(function step() {
      if (i <= text.length) {
        setOut(text.slice(0, i));
        i += 1;
        timer = setTimeout(step, speed);
      } else {
        setDone(true);
      }
    }, startDelay);
    return () => {
      clearTimeout(begin);
      clearTimeout(timer);
    };
  }, [text, startDelay, speed]);

  return { out, done };
}

export function SceneOpen({ agent }: SceneProps) {
  const { out, done } = useTypewriter(TITLE);

  return (
    <SceneShell>
      <motion.h1
        className="title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ whiteSpace: "pre-line" }}
      >
        {out}
        <motion.span
          className="cursor"
          aria-hidden
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 0 }}
          style={{ marginLeft: "0.05em" }}
        >
          |
        </motion.span>
      </motion.h1>
      <motion.p
        className="sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {agent.agentName} · {agent.year}
      </motion.p>
    </SceneShell>
  );
}
