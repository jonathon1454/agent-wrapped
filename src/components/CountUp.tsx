import { useCountUp, fmtInt } from "../lib/useCountUp";

export function CountUp({
  value,
  duration = 1.6,
  decimals = 0,
}: {
  value: number;
  duration?: number;
  decimals?: number;
}) {
  const v = useCountUp(value, duration);
  if (decimals > 0) {
    return <>{v.toFixed(decimals)}</>;
  }
  return <>{fmtInt(v)}</>;
}
