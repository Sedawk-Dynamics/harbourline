import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../animations/useReducedMotion';

const STATUS_PHRASES = ['Casting off', 'Charting course', 'All hands on deck'];

type Bubble = {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
};

type Ray = {
  id: number;
  left: string;
  width: string;
  delay: number;
  skew: number;
};

export default function Preloader({ isLoading }: { isLoading: boolean }) {
  const reduced = useReducedMotion();

  // Crossfade through 3 micro status phrases over the dive — gives the
  // loader a sense of actionable progression instead of feeling idle.
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!isLoading) return;
    const t1 = window.setTimeout(() => setPhase(1), 1300);
    const t2 = window.setTimeout(() => setPhase(2), 2500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [isLoading]);

  // 48 bubbles total, in 2 depth layers — back layer is smaller / dimmer, front layer is larger / brighter.
  const bubbles = useMemo<Bubble[]>(() => {
    const back = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 4 + Math.random() * 12,
      duration: 3.0 + Math.random() * 2.4,
      delay: Math.random() * 3.5,
    }));
    const front = Array.from({ length: 20 }, (_, i) => ({
      id: 1000 + i,
      left: `${Math.random() * 100}%`,
      size: 10 + Math.random() * 22,
      duration: 2.4 + Math.random() * 2.8,
      delay: Math.random() * 3,
    }));
    return [...back, ...front];
  }, []);

  // Light rays from the surface
  const rays = useMemo<Ray[]>(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: `${10 + i * 18 + (Math.random() * 6 - 3)}%`,
      width: `${10 + Math.random() * 10}vw`,
      delay: Math.random() * 1.5,
      skew: -4 + Math.random() * 8,
    }));
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.7, 0, 0.3, 1] } }}
          className="dive-bg fixed inset-0 z-9999 overflow-hidden flex items-center justify-center"
        >
          {/* Surface waves at the very top — visible only at the start of the dive */}
          <svg
            className="surface-wave"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="rgba(255,255,255,0.35)"
              d="M0,48L80,42.7C160,37,320,27,480,32C640,37,800,59,960,64C1120,69,1280,59,1360,53.3L1440,48L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            />
            <path
              fill="rgba(255,255,255,0.6)"
              d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,42.7C1120,43,1280,53,1360,58.7L1440,64L1440,0L0,0Z"
            />
          </svg>

          {/* Cinematic letterbox bars — slide in, then retract on exit for a
              widescreen "frame opening" moment. */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
            className="absolute top-0 inset-x-0 h-[10vh] sm:h-[12vh] bg-black z-30 pointer-events-none"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
            className="absolute bottom-0 inset-x-0 h-[10vh] sm:h-[12vh] bg-black z-30 pointer-events-none"
          />

          {/* Sun-shafts piercing down through the water */}
          {!reduced && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {rays.map((r) => (
                <span
                  key={r.id}
                  className="light-ray"
                  style={{
                    left: r.left,
                    width: r.width,
                    animationDelay: `${r.delay}s`,
                    transform: `skewX(${r.skew}deg)`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Bubbles rising from the seabed */}
          {!reduced && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {bubbles.map((b) => (
                <span
                  key={b.id}
                  className="bubble"
                  style={{
                    left: b.left,
                    width: b.size,
                    height: b.size,
                    animationDuration: `${b.duration}s`,
                    animationDelay: `${b.delay}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Silhouette fish that swims across mid-dive */}
          {!reduced && (
            <motion.svg
              initial={{ x: '-25vw' }}
              animate={{ x: '125vw' }}
              transition={{ duration: 3.4, ease: 'linear', delay: 0.6 }}
              viewBox="0 0 64 32"
              className="absolute top-[55%] w-16 h-8 fill-white/40"
            >
              <path d="M2 16 Q14 4 32 8 Q50 12 56 4 L56 28 Q50 20 32 24 Q14 28 2 16 Z" />
              <circle cx="46" cy="13" r="1.5" fill="rgba(11,15,20,0.6)" />
            </motion.svg>
          )}

          {/* Dolphin gliding across deeper in the scene */}
          {!reduced && (
            <motion.svg
              initial={{ x: '120vw', y: 0 }}
              animate={{ x: '-30vw', y: [0, -20, 10, -10, 0] }}
              transition={{
                x: { duration: 4.2, ease: 'linear', delay: 1.2 },
                y: { duration: 4.2, ease: 'easeInOut', delay: 1.2 },
              }}
              viewBox="0 0 120 60"
              className="absolute top-[68%] w-28 h-14 fill-white/30"
            >
              <path d="M5 36 Q18 12 50 18 Q72 22 92 14 L100 4 L102 18 Q116 22 116 36 Q104 44 80 42 Q56 40 40 50 Q22 56 14 50 Q8 44 5 36 Z" />
              <circle cx="80" cy="22" r="1.6" fill="rgba(11,15,20,0.55)" />
            </motion.svg>
          )}

          {/* Tiny school of fish darting right → left in the foreground */}
          {!reduced && (
            <motion.svg
              initial={{ x: '110vw' }}
              animate={{ x: '-15vw' }}
              transition={{ duration: 5.0, ease: 'linear', delay: 1.8 }}
              viewBox="0 0 180 60"
              className="absolute top-[78%] w-44 h-14"
            >
              {[
                [10, 30], [30, 22], [44, 36], [58, 26], [74, 40], [88, 30], [104, 22], [120, 36], [136, 28],
              ].map(([cx, cy], i) => (
                <g key={i} transform={`translate(${cx} ${cy}) scale(0.6)`} fill="rgba(255,255,255,0.55)">
                  <path d="M0 0 Q6 -4 12 0 Q6 4 0 0 Z" />
                  <path d="M-4 0 L-8 -3 L-8 3 Z" />
                </g>
              ))}
            </motion.svg>
          )}

          {/* Brand reveal — appears as the camera reaches the depths */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.9, ease: [0.2, 0.7, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
          >
            {/* Slow-rotating dashed compass ring orbiting behind the panel */}
            {!reduced && (
              <motion.span
                aria-hidden
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 0.35, rotate: 360 }}
                transition={{
                  opacity: { delay: 2.0, duration: 0.8 },
                  rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22rem] h-[22rem] sm:w-[26rem] sm:h-[26rem] rounded-full border border-dashed border-white/30 pointer-events-none"
              />
            )}

            {/* Logo panel with breathing outer glow + one-time shimmer sheen */}
            <motion.div
              animate={
                reduced
                  ? undefined
                  : {
                      boxShadow: [
                        '0 20px 60px -15px rgba(0,0,0,0.55), 0 0 0 0 rgba(79,180,248,0)',
                        '0 20px 60px -15px rgba(0,0,0,0.55), 0 0 70px 10px rgba(79,180,248,0.45)',
                        '0 20px 60px -15px rgba(0,0,0,0.55), 0 0 0 0 rgba(79,180,248,0)',
                      ],
                    }
              }
              transition={{ delay: 2.0, duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
              className="relative overflow-hidden rounded-2xl bg-white/95 p-5 sm:p-7 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.55)] backdrop-blur-sm"
            >
              <img
                src="/logo.png"
                alt="Harbourline Ship Management"
                /* Height-based sizing so the wide HSM logo keeps its aspect
                   ratio. The wrapping card auto-grows to fit. */
                className="relative z-10 h-32 sm:h-40 w-auto object-contain"
              />
              {/* Shimmer sheen — sweeps once after the logo settles */}
              {!reduced && (
                <motion.span
                  aria-hidden
                  initial={{ x: '-120%' }}
                  animate={{ x: '220%' }}
                  transition={{ delay: 2.4, duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/70 to-transparent pointer-events-none"
                />
              )}
            </motion.div>

            {/* Cycling micro-status — gives a sense of progress */}
            <div className="h-4 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phase}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.7, 0.3, 1] }}
                  className="text-[color:var(--color-brand-light)] text-[10px] sm:text-[11px] tracking-[5px] uppercase font-semibold"
                >
                  {STATUS_PHRASES[phase]}
                </motion.span>
              </AnimatePresence>
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4, duration: 0.5 }}
              className="text-white/85 text-[11px] tracking-[4px] uppercase"
            >
              Diving into Marine Excellence
            </motion.span>
          </motion.div>

          {/* Soft vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.55)_100%)]" />

          {/* Progress hairline — sits above the bottom letterbox, fills over
              the dive so the loader never feels idle. */}
          <div className="absolute left-0 right-0 bottom-[10vh] sm:bottom-[12vh] h-[2px] bg-white/10 z-40 overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3.4, ease: [0.4, 0, 0.2, 1] }}
              className="h-full bg-gradient-to-r from-[color:var(--color-brand-light)] via-white to-[color:var(--color-brand)] shadow-[0_0_12px_rgba(79,180,248,0.7)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
