import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { dur, easeIn, easeInOut2, easeOut, fadeUp } from "../lib/motion";

export function SceneShell({
  children,
  eyebrow,
  className,
}: {
  children: ReactNode;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <motion.section
      className={["scene", className].filter(Boolean).join(" ")}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: -8,
        transition: { duration: dur.moderate, ease: easeIn },
      }}
      transition={{ duration: dur.expressive, ease: easeInOut2 }}
    >
      {eyebrow && (
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.moderate, ease: easeOut, delay: 0.05 }}
        >
          {eyebrow}
        </motion.p>
      )}
      {children}
    </motion.section>
  );
}

export { fadeUp, dur, easeIn, easeOut, easeInOut2 };
