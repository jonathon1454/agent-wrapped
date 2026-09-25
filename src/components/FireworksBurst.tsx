import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "../lib/motion";

const COLORS = [
  "var(--matcha)",
  "var(--matcha-0)",
  "var(--pineapple)",
  "var(--sky-soft)",
  "var(--coconut)",
  "var(--cactus)",
];

const SIZE = {
  sm: { pieces: 28, distBase: 48, distStep: 14 },
  lg: { pieces: 56, distBase: 110, distStep: 26 },
} as const;

function pieceStyle(
  i: number,
  count: number,
  distBase: number,
  distStep: number,
  large: boolean,
) {
  const angle = (i / count) * Math.PI * 2 + (i % 5) * 0.22;
  const dist = distBase + (i % 7) * distStep;
  const drift = ((i % 5) - 2) * (large ? 18 : 10);
  return {
    x: Math.cos(angle) * dist + drift,
    y: Math.sin(angle) * dist * 0.55 + dist * 0.45 + (i % 4) * 8,
    color: COLORS[i % COLORS.length],
    w: large ? 5 + (i % 4) * 2 : 3 + (i % 3) * 1.5,
    h: large ? 9 + (i % 5) * 2 : 6 + (i % 4) * 1.5,
    rot: (i * 47) % 360,
    spin: ((i % 2 === 0 ? 1 : -1) * (120 + (i % 5) * 40)),
    delay: (i % 8) * 0.02,
  };
}

/** One-shot confetti burst — no rings or circular flashes. */
export function FireworksBurst({
  delay = 0,
  className,
  size = "sm",
}: {
  delay?: number;
  className?: string;
  size?: keyof typeof SIZE;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const cfg = SIZE[size];
  const large = size === "lg";

  return (
    <span
      className={["fireworks", large ? "fireworks-lg" : "", className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      {Array.from({ length: cfg.pieces }).map((_, i) => {
        const p = pieceStyle(i, cfg.pieces, cfg.distBase, cfg.distStep, large);
        return (
          <motion.span
            key={i}
            className="fireworks-confetti"
            style={{
              width: p.w,
              height: p.h,
              background: p.color,
            }}
            initial={{
              opacity: 0,
              x: 0,
              y: 0,
              scale: 0.6,
              rotate: p.rot,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: p.x,
              y: p.y,
              scale: [0.6, 1.05, 1, 0.85],
              rotate: p.rot + p.spin,
            }}
            transition={{
              delay: delay + p.delay,
              duration: large ? 1.35 : 1.05,
              ease: easeOut,
            }}
          />
        );
      })}
    </span>
  );
}
