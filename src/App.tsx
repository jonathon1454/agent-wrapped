import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SCENES } from "./scenes";
import { mockAdmin } from "./data/admin";

export default function App() {
  const [i, setI] = useState(0);
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

  return (
    <div className="stage" onClick={next}>
      <div className="progress">
        <div style={{ width: `${((i + 1) / SCENES.length) * 100}%` }} />
      </div>

      {/* mode="wait" avoids overlapping fades (Greenhouse Motion) */}
      <AnimatePresence mode="wait">
        <Scene key={SCENES[i].id} admin={mockAdmin} />
      </AnimatePresence>

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
