import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../animations/useReducedMotion';

type Bubble = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
};

const GREETINGS = [
  'Ahoy! Welcome aboard ⚓',
  'Tap me — let\'s set sail!',
  'Smooth seas, friend!',
  'Spotted you on deck 👋',
];

const STORAGE_KEY = 'hb-mascot-dismissed';

export default function MascotCaptain() {
  const reduced = useReducedMotion();
  const [showBubble, setShowBubble] = useState(false);
  const [greetingIdx, setGreetingIdx] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [dismissed, setDismissed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  });

  // Persist dismissal so the mascot doesn't pop back on every page load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (dismissed) window.localStorage.setItem(STORAGE_KEY, '1');
  }, [dismissed]);

  // Show the speech bubble briefly on first appearance, then again every ~14s
  useEffect(() => {
    if (dismissed) return;
    const showAndHide = () => {
      setShowBubble(true);
      const hideT = window.setTimeout(() => setShowBubble(false), 4500);
      return () => window.clearTimeout(hideT);
    };
    const first = window.setTimeout(showAndHide, 800);
    const interval = window.setInterval(() => {
      setGreetingIdx((i) => (i + 1) % GREETINGS.length);
      showAndHide();
    }, 14000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, [dismissed]);

  // Burst bubbles on click — like dropping a stone in water
  const burst = () => {
    setShowBubble(true);
    setGreetingIdx((i) => (i + 1) % GREETINGS.length);
    if (reduced) return;
    const next = Array.from({ length: 14 }, (_, i) => ({
      id: Date.now() + i,
      x: -20 + Math.random() * 40,
      y: -10 + Math.random() * 30,
      size: 6 + Math.random() * 14,
      duration: 1.2 + Math.random() * 1.4,
    }));
    setBubbles((prev) => [...prev, ...next]);
    window.setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => !next.find((n) => n.id === b.id)));
    }, 2800);
  };

  const greeting = useMemo(() => GREETINGS[greetingIdx], [greetingIdx]);

  if (dismissed) return null;

  return (
    <div
      className="fixed bottom-[120px] right-6 z-40 select-none pointer-events-none"
      style={{ filter: 'drop-shadow(0 8px 25px rgba(1,142,222,0.35))' }}
    >
      <div className="relative pointer-events-auto">
        {/* Speech bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              key={greeting}
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="absolute -top-2 right-full mr-3 w-[200px] sm:w-[230px] bg-white text-[color:var(--color-ink)] rounded-2xl rounded-br-sm px-4 py-3 shadow-xl border border-[color:var(--color-line)]"
            >
              <p className="text-xs sm:text-sm font-bold leading-snug">{greeting}</p>
              <span className="absolute top-3 -right-1.5 w-3 h-3 bg-white border-r border-b border-[color:var(--color-line)] rotate-[-45deg]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating bubbles spawned on click */}
        <AnimatePresence>
          {bubbles.map((b) => (
            <motion.span
              key={b.id}
              initial={{ x: b.x, y: 0, opacity: 0.9, scale: 0.6 }}
              animate={{ y: -90 - b.y, opacity: 0, scale: 1 }}
              transition={{ duration: b.duration, ease: 'easeOut' }}
              style={{
                width: b.size,
                height: b.size,
                left: '50%',
                bottom: '50%',
                background:
                  'radial-gradient(circle at 32% 30%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 35%, rgba(1,142,222,0.15) 70%, transparent 100%)',
                border: '1px solid rgba(255,255,255,0.6)',
              }}
              className="absolute rounded-full pointer-events-none"
            />
          ))}
        </AnimatePresence>

        {/* The captain — bobs continuously, hand waves */}
        <motion.button
          onClick={burst}
          aria-label="Captain Harbourline says hi"
          animate={reduced ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="block w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[color:var(--color-brand-light)] to-[color:var(--color-brand)] p-1 shadow-2xl"
        >
          <span className="block w-full h-full rounded-full bg-white overflow-hidden relative">
            <CaptainSVG reduced={reduced} />
          </span>
        </motion.button>

        {/* Tiny dismiss × button */}
        <button
          aria-label="Dismiss captain"
          onClick={(e) => {
            e.stopPropagation();
            setDismissed(true);
          }}
          className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[color:var(--color-ink)] text-white text-[10px] flex items-center justify-center hover:bg-[color:var(--color-brand)] transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function CaptainSVG({ reduced }: { reduced: boolean }) {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Sea behind */}
      <defs>
        <linearGradient id="sea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#A6DAFB" />
          <stop offset="100%" stopColor="#4FB4F8" />
        </linearGradient>
        <linearGradient id="hat" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E8ECF2" />
        </linearGradient>
      </defs>

      <rect x="0" y="78" width="120" height="42" fill="url(#sea)" />
      {/* Tiny waves */}
      <path d="M0 80 Q15 76 30 80 T60 80 T90 80 T120 80 V90 H0 Z" fill="rgba(255,255,255,0.35)" />

      {/* Body — sailor stripes */}
      <rect x="42" y="74" width="36" height="34" rx="6" fill="#0B1F33" />
      <rect x="42" y="80" width="36" height="3" fill="#FFFFFF" />
      <rect x="42" y="88" width="36" height="3" fill="#FFFFFF" />
      <rect x="42" y="96" width="36" height="3" fill="#FFFFFF" />

      {/* Neck */}
      <rect x="55" y="68" width="10" height="8" fill="#FFCBA0" />

      {/* Head */}
      <circle cx="60" cy="52" r="22" fill="#FFCBA0" />

      {/* Hair tuft */}
      <path d="M42 42 Q50 30 60 32 Q72 30 78 44 Q70 38 60 40 Q50 38 42 42 Z" fill="#2C2823" />

      {/* Captain hat */}
      <ellipse cx="60" cy="33" rx="28" ry="6" fill="#0B1F33" />
      <rect x="38" y="20" width="44" height="15" rx="4" fill="url(#hat)" />
      <rect x="38" y="30" width="44" height="5" fill="#0B1F33" />
      {/* Anchor on hat */}
      <g transform="translate(60 27) scale(0.7)" fill="#018EDE">
        <circle cx="0" cy="-3" r="2.5" />
        <rect x="-0.8" y="-1" width="1.6" height="6" />
        <path d="M-5 4 Q-5 8 0 8 Q5 8 5 4 L4 5 Q3 7 0 7 Q-3 7 -4 5 Z" />
      </g>

      {/* Eyes (blink) */}
      <motion.g
        animate={reduced ? {} : { scaleY: [1, 1, 0.1, 1, 1] }}
        style={{ transformOrigin: '60px 50px' }}
        transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
      >
        <circle cx="52" cy="50" r="2.4" fill="#0B0F14" />
        <circle cx="68" cy="50" r="2.4" fill="#0B0F14" />
        <circle cx="52.7" cy="49.3" r="0.7" fill="#FFFFFF" />
        <circle cx="68.7" cy="49.3" r="0.7" fill="#FFFFFF" />
      </motion.g>

      {/* Cheeks */}
      <circle cx="48" cy="58" r="3" fill="rgba(232,123,90,0.4)" />
      <circle cx="72" cy="58" r="3" fill="rgba(232,123,90,0.4)" />

      {/* Smile */}
      <path d="M52 60 Q60 68 68 60" stroke="#0B0F14" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Waving hand (animated rotation) */}
      <motion.g
        animate={reduced ? {} : { rotate: [-18, 22, -18] }}
        style={{ transformOrigin: '80px 80px' }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Arm */}
        <rect x="76" y="76" width="6" height="22" rx="3" fill="#0B1F33" />
        {/* Hand */}
        <circle cx="79" cy="100" r="6" fill="#FFCBA0" />
      </motion.g>

      {/* Left arm (resting on body) */}
      <rect x="38" y="76" width="6" height="22" rx="3" fill="#0B1F33" />
      <circle cx="41" cy="100" r="5" fill="#FFCBA0" />
    </svg>
  );
}
