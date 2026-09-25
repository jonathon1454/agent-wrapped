import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SceneShell } from "../components/SceneShell";
import { FireworksBurst } from "../components/FireworksBurst";
import { dur, easeInOut1, easeLinear, easeOut } from "../lib/motion";
import type { SceneProps } from "./types";

const CONGRATS = "You led a year\nworth celebrating.";

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

export function ScenePlaybook({ admin }: SceneProps) {
  const { out, done } = useTypewriter(CONGRATS);
  const [burst, setBurst] = useState(false);
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  // Kick off fireworks mid-typewriter, same energy as Welcome
  useEffect(() => {
    const t = setTimeout(() => setBurst(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <SceneShell
      eyebrow="Well done"
      className="scene-playbook"
      showCalcLink={false}
    >
      <div className="playbook-title-wrap">
        <div className="playbook-fireworks" aria-hidden>
          {burst && <FireworksBurst size="lg" delay={0.15} />}
        </div>
        <motion.h1
          className="title playbook-congrats"
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
      </div>

      <motion.p
        className="sub playbook-org"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: done ? 1 : 0, y: done ? 0 : 6 }}
        transition={{ duration: dur.expressive, ease: easeInOut1 }}
      >
        {admin.orgName} · {admin.year}
      </motion.p>

      <div className="playbook-spacer" aria-hidden />

      {done && (
        <>
          <motion.p
            className="sub playbook-cta"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: dur.expressive,
              ease: easeInOut1,
              delay: 0.15,
            }}
          >
            Download the report, run the ROI math, book the QBR — or jump into
            the community and steal a few plays.
          </motion.p>

          <motion.div
            className="playbook-rows scene-visual"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: dur.expressive,
              ease: easeInOut1,
              delay: 0.3,
            }}
            onClick={stop}
          >
            {Array.from(
              { length: Math.ceil(admin.playbookLinks.length / 2) },
              (_, row) => (
                <div key={row} className="share-row playbook-row">
                  {admin.playbookLinks
                    .slice(row * 2, row * 2 + 2)
                    .map((link) => (
                      <a
                        key={link.id}
                        className="btn primary"
                        href={link.href}
                        onClick={stop}
                      >
                        {link.label}
                      </a>
                    ))}
                </div>
              ),
            )}
          </motion.div>
        </>
      )}
    </SceneShell>
  );
}
