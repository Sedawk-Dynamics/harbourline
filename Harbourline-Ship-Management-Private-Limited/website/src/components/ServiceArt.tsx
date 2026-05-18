import { motion } from 'framer-motion';
import {
  FaCogs,
  FaSearch,
  FaGlobe,
  FaTools,
  FaAnchor,
  FaExchangeAlt,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { useReducedMotion } from '../animations/useReducedMotion';

type Theme = {
  Icon: IconType;
  gradFrom: string;
  gradVia: string;
  gradTo: string;
  accent: string;
  label: string;
};

const THEMES: Record<string, Theme> = {
  'marine-machinery-spare-supply': {
    Icon: FaCogs,
    gradFrom: '#0E5C8C',
    gradVia: '#018EDE',
    gradTo: '#016BA8',
    accent: '#4FB4F8',
    label: 'Machinery',
  },
  'inspection-reconditioning': {
    Icon: FaSearch,
    gradFrom: '#062E47',
    gradVia: '#0B5C8A',
    gradTo: '#018EDE',
    accent: '#A8DAFB',
    label: 'Inspection',
  },
  'worldwide-shipment': {
    Icon: FaGlobe,
    gradFrom: '#1A3A5C',
    gradVia: '#1F7BB8',
    gradTo: '#4FB4F8',
    accent: '#FFFFFF',
    label: 'Worldwide',
  },
  'ship-repair-maintenance-works': {
    Icon: FaTools,
    gradFrom: '#11161D',
    gradVia: '#0B5C8A',
    gradTo: '#018EDE',
    accent: '#F4B400',
    label: 'Repair',
  },
  'marine-agency-port-services': {
    Icon: FaAnchor,
    gradFrom: '#020E16',
    gradVia: '#016BA8',
    gradTo: '#018EDE',
    accent: '#E63946',
    label: 'Emergency 24/7',
  },
  'end-to-end-service': {
    Icon: FaExchangeAlt,
    gradFrom: '#0E4F7E',
    gradVia: '#018EDE',
    gradTo: '#4FB4F8',
    accent: '#FFE6CC',
    label: 'End-to-End',
  },
};

const FALLBACK: Theme = THEMES['marine-machinery-spare-supply'];

export default function ServiceArt({ slug }: { slug: string }) {
  const reduced = useReducedMotion();
  const t = THEMES[slug] ?? FALLBACK;
  const { Icon } = t;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${t.gradFrom} 0%, ${t.gradVia} 55%, ${t.gradTo} 100%)`,
      }}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

      {/* Soft glow halo behind the icon */}
      <motion.div
        animate={reduced ? {} : { scale: [1, 1.15, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] w-72 h-72 rounded-full blur-3xl"
        style={{ background: 'rgba(255,255,255,0.35)' }}
      />

      {/* Rotating compass ring (premium decorative element) */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] w-64 h-64 opacity-25"
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="100" cy="100" r="92" fill="none" stroke="white" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="100"
            y1="8"
            x2="100"
            y2="20"
            stroke="white"
            strokeWidth="2"
            transform={`rotate(${deg} 100 100)`}
          />
        ))}
      </motion.svg>

      {/* Central icon — bobs gently */}
      <motion.div
        animate={reduced ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-white drop-shadow-2xl"
      >
        <Icon style={{ fontSize: '8rem' }} />
      </motion.div>

      {/* Accent badge */}
      <div className="absolute top-5 right-5 px-3 py-1 rounded-full text-[10px] tracking-[3px] uppercase font-bold backdrop-blur-md"
        style={{ background: 'rgba(0,0,0,0.35)', color: t.accent, border: `1px solid ${t.accent}40` }}
      >
        {t.label}
      </div>

      {/* Animated waves at the bottom */}
      <svg viewBox="0 0 400 100" className="absolute bottom-0 left-0 right-0 w-full h-24" preserveAspectRatio="none">
        <motion.path
          d="M0 60 Q100 30 200 60 T400 60 L400 100 L0 100 Z"
          fill="rgba(255,255,255,0.18)"
          animate={reduced ? {} : { x: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0 75 Q100 50 200 75 T400 75 L400 100 L0 100 Z"
          fill="rgba(255,255,255,0.28)"
          animate={reduced ? {} : { x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      {/* Rising bubbles */}
      {!reduced &&
        Array.from({ length: 10 }).map((_, i) => {
          const size = 4 + (i % 4) * 3;
          return (
            <motion.span
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${8 + i * 9}%`,
                bottom: 0,
                width: size,
                height: size,
                background:
                  'radial-gradient(circle at 32% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.3) 60%, transparent 100%)',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
              animate={{ y: ['0%', '-360%'], opacity: [0, 0.9, 0] }}
              transition={{
                duration: 4 + (i % 3),
                delay: i * 0.45,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          );
        })}

      {/* Corner ship silhouette accent */}
      <svg
        viewBox="0 0 120 40"
        className="absolute bottom-4 left-4 w-28 h-10 opacity-30 fill-white"
      >
        <path d="M2 22 L18 22 L22 14 L80 14 L86 22 L96 22 L92 30 L8 30 Z" />
        <rect x="20" y="6" width="6" height="10" />
        <rect x="32" y="2" width="14" height="14" />
        <rect x="48" y="6" width="6" height="10" />
        <circle cx="60" cy="9" r="3" />
      </svg>
    </div>
  );
}
