import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

type Props = {
  to: number;
  from?: number;
  durationMs?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  format?: (n: number) => string;
};

export default function CountUp({
  to,
  from = 0,
  durationMs = 1800,
  suffix = '',
  prefix = '',
  className = '',
  format,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(from);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    if (reduced) {
      setValue(to);
      return;
    }

    let raf = 0;
    let startTs = 0;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min(1, (ts - startTs) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            raf = requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(ref.current);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [to, from, durationMs, reduced]);

  const display = format ? format(value) : Math.round(value).toString();

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
