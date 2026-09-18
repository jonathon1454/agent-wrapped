import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SceneShell } from "../components/SceneShell";
import { dur, easeInOut1, easeLinear, easeOut } from "../lib/motion";
import type { SceneProps } from "./types";

const TITLE = "Your year,\nat the helm.";

function useTypewriter(text: string, startDelay = 400, speed = 40) {
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

export function SceneOpen({ admin }: SceneProps) {
  const { out, done } = useTypewriter(TITLE);

  return (
    <SceneShell>
      <motion.h1
        className="title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: dur.moderate, ease: easeOut }}
        style={{ whiteSpace: "pre-line" }}
      >
        {out}
        <motion.span
          className="cursor"
          aria-hidden
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: easeLinear,
          }}
          style={{ marginLeft: "0.05em" }}
        >
          |
        </motion.span>
      </motion.h1>
      <motion.p
        className="sub"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: done ? 1 : 0, y: done ? 0 : 6 }}
        transition={{ duration: dur.expressive, ease: easeInOut1 }}
      >
        {admin.orgName} · {admin.year}
      </motion.p>
    </SceneShell>
  );
}
