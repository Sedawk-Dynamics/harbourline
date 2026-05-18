import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from './useReducedMotion';

type Variant = 'up' | 'left' | 'right' | 'fade' | 'scale';

type Props = {
  children: ReactNode;
  as?: 'div' | 'section' | 'article' | 'span' | 'li';
  variant?: Variant;
  delay?: number;
  duration?: number;
  amount?: number;
  className?: string;
  once?: boolean;
};

const variants: Record<Variant, { hidden: Record<string, number>; visible: Record<string, number> }> = {
  up:    { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
  fade:  { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
};

export default function Reveal({
  children,
  as = 'div',
  variant = 'up',
  delay = 0,
  duration = 0.7,
  amount = 0.2,
  className = '',
  once = true,
}: Props) {
  const reduced = useReducedMotion();
  const v = variants[variant];

  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.2, 0.7, 0.3, 1] }}
      variants={v}
    >
      {children}
    </MotionTag>
  );
}
