import { useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  ariaLabel?: string;
};

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
  as = 'button',
  href,
  target,
  rel,
  type = 'button',
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 18 });
  const sy = useSpring(my, { stiffness: 180, damping: 18 });

  const innerX = useTransform(sx, (v) => v * 0.6);
  const innerY = useTransform(sy, (v) => v * 0.6);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    mx.set(dx * strength);
    my.set(dy * strength);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const Inner = (
    <motion.span style={{ x: innerX, y: innerY, display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
      {children}
    </motion.span>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
    >
      {as === 'a' ? (
        <a href={href} target={target} rel={rel} aria-label={ariaLabel} className={className} onClick={onClick}>
          {Inner}
        </a>
      ) : (
        <button type={type} aria-label={ariaLabel} className={className} onClick={onClick}>
          {Inner}
        </button>
      )}
    </motion.div>
  );
}
