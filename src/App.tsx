import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SCENES } from "./scenes";
import { mockAdmin } from "./data/admin";
import { fadeUp } from "./lib/motion";

function CalcLinkIcon() {
  return (
    <svg
      className="calc-link-icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14 3h7v7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14 21 3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function sceneIndexFromUrl() {
  const scene = new URLSearchParams(window.location.search).get("scene");
  if (!scene) return 0;
  const idx = SCENES.findIndex((s) => s.id === scene);
  return idx >= 0 ? idx : 0;
}

/** Scenes that omit the calculation footer link */
const HIDE_CALC = new Set(["welcome", "playbook"]);

export default function App() {
  const [i, setI] = useState(sceneIndexFromUrl);
  const last = SCENES.length - 1;

  const next = useCallback(() => setI((p) => Math.min(p + 1, last)), [last]);
  const prev = useCallback(() => setI((p) => Math.max(p - 1, 0)), []);
  const restart = useCallback(() => setI(0), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key.toLowerCase() === "r") {
        restart();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, restart]);

  const Scene = SCENES[i].Component;
  const showCalcLink = !HIDE_CALC.has(SCENES[i].id);

  return (
    <div className="stage" onClick={next}>
      <div className="progress">
        <div style={{ width: `${((i + 1) / SCENES.length) * 100}%` }} />
      </div>

      {/* mode="wait" avoids overlapping fades (Greenhouse Motion) */}
      <AnimatePresence mode="wait">
        <Scene key={SCENES[i].id} admin={mockAdmin} />
      </AnimatePresence>

      {showCalcLink && (
        <motion.a
          key={`calc-${SCENES[i].id}`}
          className="calc-link"
          href="#how-we-calculate"
          target="_blank"
          rel="noopener noreferrer"
          {...fadeUp}
          transition={{ delay: 1.05 }}
          onClick={(e) => e.stopPropagation()}
        >
          How we calculated this
          <CalcLinkIcon />
        </motion.a>
      )}

      <div className="hud">
        <div className="dots">
          {SCENES.map((s, d) => (
            <button
              key={s.id}
              aria-label={s.title}
              className={`dot${d === i ? " on" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setI(d);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
