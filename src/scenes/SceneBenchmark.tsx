import { motion } from "framer-motion";
import { SceneShell, fadeUp } from "../components/SceneShell";
import type { SceneProps } from "./types";

function formatValue(value: number, unit: string) {
  if (unit === "score") return value.toFixed(1);
  if (unit === "%") return `${Math.round(value)}%`;
  if (unit === "h") return `${value.toFixed(1)}h`;
  if (unit === "m") return `${Math.round(value)}m`;
  return String(value);
}

export function SceneBenchmark({ admin }: SceneProps) {
  return (
    <SceneShell eyebrow="Where you stand">
      <motion.div className="bench scene-visual" {...fadeUp}>
        {admin.benchmarks.map((row, i) => (
          <motion.div
            key={row.id}
            className={`bench-row${row.topQuartile ? " top" : ""}${row.gap ? " gap" : ""}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
          >
            <div className="bench-label">{row.label}</div>
            <div className="bench-cols">
              <div className="bench-col you">
                <span className="bench-val">{formatValue(row.you, row.unit)}</span>
                <span className="bench-cap">You</span>
              </div>
              <div className="bench-col">
                <span className="bench-val">
                  {formatValue(row.industry, row.unit)}
                </span>
                <span className="bench-cap">Industry</span>
              </div>
              <div className="bench-col">
                <span className="bench-val">
                  {formatValue(row.leaders, row.unit)}
                </span>
                <span className="bench-cap">Leaders</span>
              </div>
            </div>
            {row.topQuartile && <span className="bench-tag">Top quartile</span>}
            {row.gap && !row.topQuartile && (
              <span className="bench-tag muted">Growth gap</span>
            )}
          </motion.div>
        ))}
      </motion.div>
      <motion.p className="sub" {...fadeUp} transition={{ delay: 1.2 }}>
        Strongest in <em>{admin.benchmarkStrength}</em>. Biggest opportunity:{" "}
        {admin.benchmarkGap}.
      </motion.p>
    </SceneShell>
  );
}
