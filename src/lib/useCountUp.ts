import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

export function useCountUp(target: number, duration = 1.6): number {
  const [val, setVal] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setVal(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [target, duration, reduce]);

  return val;
}

export function fmtInt(n: number): string {
  return Math.round(n).toLocaleString();
}
