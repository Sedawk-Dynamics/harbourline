import { motion } from 'framer-motion';
import { useReducedMotion } from '../animations/useReducedMotion';

type Variant = 'pill' | 'chip' | 'tile';
type Tone = 'brand' | 'gold' | 'ghost';

type Props = {
  /** Visual size — small inline pill, medium chip with eta, or large tile header */
  variant?: Variant;
  /** Color treatment */
  tone?: Tone;
  /** Optional date-style label (e.g. "Q2 2026") shown alongside Coming Soon */
  eta?: string;
  /** Override the leading label text (defaults to "Coming Soon") */
  label?: string;
  className?: string;
};

/**
 * Premium "Coming Soon" status badge.
 *
 * A reusable, animated marker designed to look intentional — not a placeholder.
 * - Pulsing brand-light dot signals "live work in progress"
 * - Diagonal sheen sweeps across the badge on a 6s loop
 * - Three sizes: `pill` (inline on links), `chip` (on cards), `tile` (header strap)
 *
 * Respects prefers-reduced-motion.
 */
export default function ComingSoon({
  variant = 'pill',
  tone = 'brand',
  eta,
  label = 'Coming Soon',
  className = '',
}: Props) {
  const reduced = useReducedMotion();

  const palette = {
    brand: {
      bg: 'rgba(1,142,222,0.10)',
      border: 'rgba(79,180,248,0.45)',
      text: '#A8DAFB',
      dot: '#4FB4F8',
      glow: 'rgba(79,180,248,0.65)',
    },
    gold: {
      bg: 'rgba(244,180,0,0.10)',
      border: 'rgba(244,180,0,0.45)',
      text: '#FFE6A2',
      dot: '#F4B400',
      glow: 'rgba(244,180,0,0.65)',
    },
    ghost: {
      bg: 'rgba(255,255,255,0.06)',
      border: 'rgba(255,255,255,0.22)',
      text: 'rgba(255,255,255,0.85)',
      dot: '#FFFFFF',
      glow: 'rgba(255,255,255,0.55)',
    },
  }[tone];

  const sizing =
    variant === 'pill'
      ? 'text-[9px] tracking-[2.5px] px-2 py-[3px] gap-1.5'
      : variant === 'chip'
        ? 'text-[10px] tracking-[3px] px-3 py-1.5 gap-2'
        : 'text-xs tracking-[3px] px-4 py-2 gap-2.5';

  const dotSize = variant === 'pill' ? 5 : variant === 'chip' ? 7 : 9;

  return (
    <span
      className={`relative inline-flex items-center rounded-full font-bold uppercase overflow-hidden whitespace-nowrap ${sizing} ${className}`}
      style={{
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        color: palette.text,
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      {/* Live pulsing dot */}
      <span className="relative inline-flex" aria-hidden>
        <span
          className="block rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            background: palette.dot,
            boxShadow: `0 0 8px ${palette.glow}`,
          }}
        />
        {!reduced && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ background: palette.dot }}
            animate={{ scale: [1, 2.4, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </span>

      <span className="relative z-10">{label}</span>

      {eta && (
        <>
          <span aria-hidden className="opacity-50">·</span>
          <span className="relative z-10 opacity-90">{eta}</span>
        </>
      )}

      {/* Diagonal sheen sweep — premium accent */}
      {!reduced && (
        <motion.span
          aria-hidden
          className="absolute top-0 bottom-0 w-1/3 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
            transform: 'skewX(-18deg)',
          }}
          animate={{ left: ['-50%', '150%'] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.8 }}
        />
      )}
    </span>
  );
}
