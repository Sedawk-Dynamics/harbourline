import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useReducedMotion } from './useReducedMotion';

type Props = {
  children: ReactNode;
  direction?: 'h' | 'v';
  className?: string;
};

export default function RevealMask({ children, direction = 'h', className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    if (reduced) {
      ref.current.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [reduced]);

  const maskClass = direction === 'v' ? 'reveal-mask-v' : 'reveal-mask';
  return (
    <div ref={ref} className={`${maskClass} ${className}`}>
      {children}
    </div>
  );
}
