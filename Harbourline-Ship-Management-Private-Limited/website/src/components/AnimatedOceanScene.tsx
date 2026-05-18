import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { useReducedMotion } from '../animations/useReducedMotion';

/**
 * Hand-crafted animated SVG ocean scene used as the About section's primary
 * visual. Theme-aware (sunset palette in dark mode, daytime in light mode),
 * never relies on an external image, and respects prefers-reduced-motion.
 */
export default function AnimatedOceanScene() {
  const { theme } = useTheme();
  const reduced = useReducedMotion();
  const isDark = theme === 'dark';

  // Two themed palettes
  const palette = isDark
    ? {
        skyTop: '#0B1F33',
        skyMid: '#1A3A5C',
        skyBot: '#FF7847',
        sun: '#FFB36B',
        sunGlow: 'rgba(255,179,107,0.55)',
        seaTop: '#0B5C8A',
        seaMid: '#062E47',
        seaBot: '#020E16',
        wave: 'rgba(255,255,255,0.18)',
        ship: '#0B0F14',
        shipAccent: '#018EDE',
        bird: 'rgba(255,255,255,0.7)',
      }
    : {
        skyTop: '#A8DAFB',
        skyMid: '#D9EDFB',
        skyBot: '#FFE6CC',
        sun: '#FFCB68',
        sunGlow: 'rgba(255,203,104,0.55)',
        seaTop: '#4FB4F8',
        seaMid: '#1F7BB8',
        seaBot: '#0E4F7E',
        wave: 'rgba(255,255,255,0.45)',
        ship: '#11161D',
        shipAccent: '#018EDE',
        bird: 'rgba(11,15,20,0.55)',
      };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky gradient */}
          <linearGradient id="aoSky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={palette.skyTop} />
            <stop offset="60%" stopColor={palette.skyMid} />
            <stop offset="100%" stopColor={palette.skyBot} />
          </linearGradient>

          {/* Sea gradient */}
          <linearGradient id="aoSea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={palette.seaTop} />
            <stop offset="50%" stopColor={palette.seaMid} />
            <stop offset="100%" stopColor={palette.seaBot} />
          </linearGradient>

          {/* Sun radial */}
          <radialGradient id="aoSun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.sun} stopOpacity="1" />
            <stop offset="60%" stopColor={palette.sun} stopOpacity="0.5" />
            <stop offset="100%" stopColor={palette.sun} stopOpacity="0" />
          </radialGradient>

          {/* Reflection clip — wave shimmer on the water */}
          <linearGradient id="aoShimmer" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* ===== SKY ===== */}
        <rect x="0" y="0" width="800" height="380" fill="url(#aoSky)" />

        {/* Sun + soft glow halo */}
        <g>
          <circle cx="600" cy="220" r="120" fill="url(#aoSun)" opacity="0.85">
            {!reduced && (
              <animate
                attributeName="r"
                values="120;135;120"
                dur="6s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="600" cy="220" r="40" fill={palette.sun} opacity="0.95">
            {!reduced && (
              <animate
                attributeName="opacity"
                values="0.95;1;0.95"
                dur="3.5s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        </g>

        {/* Drifting cloud strips */}
        {!reduced && (
          <g opacity="0.7">
            <motion.ellipse
              cx={200}
              cy={120}
              rx={60}
              ry={8}
              fill="rgba(255,255,255,0.55)"
              animate={{ x: [0, 80, 0] }}
              transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx={400}
              cy={90}
              rx={45}
              ry={6}
              fill="rgba(255,255,255,0.5)"
              animate={{ x: [0, -60, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx={120}
              cy={160}
              rx={35}
              ry={5}
              fill="rgba(255,255,255,0.4)"
              animate={{ x: [0, 50, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        )}

        {/* Flying birds — two flocks */}
        {!reduced && (
          <>
            <motion.g
              stroke={palette.bird}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              animate={{ x: [-50, 850], y: [60, 30] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            >
              <path d="M0 0 q4 -4 8 0 q4 -4 8 0" />
              <path d="M22 8 q3 -3 6 0 q3 -3 6 0" />
              <path d="M40 4 q4 -4 8 0 q4 -4 8 0" />
            </motion.g>
            <motion.g
              stroke={palette.bird}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              animate={{ x: [-30, 830], y: [100, 75] }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear', delay: 4 }}
            >
              <path d="M0 0 q3 -3 6 0 q3 -3 6 0" />
              <path d="M18 5 q3 -3 6 0 q3 -3 6 0" />
            </motion.g>
          </>
        )}

        {/* Sun reflection on water (vertical streak) */}
        <ellipse cx="600" cy="380" rx="80" ry="6" fill={palette.sun} opacity="0.55">
          {!reduced && (
            <animate
              attributeName="opacity"
              values="0.55;0.85;0.55"
              dur="3s"
              repeatCount="indefinite"
            />
          )}
        </ellipse>

        {/* ===== SEA ===== */}
        <rect x="0" y="370" width="800" height="230" fill="url(#aoSea)" />

        {/* Big cargo ship sailing — drifts slowly L → R */}
        <motion.g
          animate={reduced ? {} : { x: [-180, 880] }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
        >
          {/* Reflection of ship on water (under hull, softened) */}
          <g opacity="0.22" transform="translate(0,80) scale(1,-0.5)">
            <rect x="-80" y="350" width="180" height="34" fill={palette.ship} />
          </g>

          {/* Hull */}
          <path
            d="M-80 380 L100 380 L88 410 L-68 410 Z"
            fill={palette.ship}
          />
          {/* Waterline accent stripe */}
          <rect x="-78" y="378" width="178" height="3" fill={palette.shipAccent} />

          {/* Stacked containers (cargo) */}
          <g>
            {[
              { x: -68, y: 348, w: 20, h: 28, fill: '#C0392B' },
              { x: -46, y: 348, w: 20, h: 28, fill: '#2980B9' },
              { x: -24, y: 348, w: 20, h: 28, fill: '#27AE60' },
              { x:  -2, y: 348, w: 20, h: 28, fill: '#F39C12' },
              { x:  20, y: 348, w: 20, h: 28, fill: '#8E44AD' },
              { x:  42, y: 348, w: 20, h: 28, fill: '#E67E22' },
              { x:  64, y: 348, w: 20, h: 28, fill: '#1ABC9C' },

              { x: -46, y: 322, w: 20, h: 24, fill: '#2980B9' },
              { x: -24, y: 322, w: 20, h: 24, fill: '#F39C12' },
              { x:  -2, y: 322, w: 20, h: 24, fill: '#C0392B' },
              { x:  20, y: 322, w: 20, h: 24, fill: '#27AE60' },
              { x:  42, y: 322, w: 20, h: 24, fill: '#8E44AD' },

              { x: -24, y: 300, w: 20, h: 20, fill: '#E67E22' },
              { x:  -2, y: 300, w: 20, h: 20, fill: '#1ABC9C' },
              { x:  20, y: 300, w: 20, h: 20, fill: '#C0392B' },
            ].map((c, i) => (
              <rect
                key={i}
                x={c.x}
                y={c.y}
                width={c.w}
                height={c.h}
                fill={c.fill}
                stroke="rgba(0,0,0,0.25)"
                strokeWidth="0.5"
              />
            ))}
          </g>

          {/* Bridge / superstructure */}
          <rect x="-78" y="340" width="14" height="40" fill={palette.ship} />
          <rect x="-76" y="346" width="10" height="3" fill={palette.shipAccent} />
          <rect x="-76" y="352" width="10" height="3" fill={palette.shipAccent} />

          {/* Funnel + smoke puffs */}
          <rect x="78" y="290" width="8" height="22" fill={palette.ship} />
          {!reduced && (
            <g>
              <motion.circle
                cx={82}
                cy={285}
                r={6}
                fill="rgba(180,180,180,0.6)"
                animate={{ cy: [285, 250, 230], r: [6, 9, 11], opacity: [0.6, 0.4, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.circle
                cx={82}
                cy={285}
                r={5}
                fill="rgba(180,180,180,0.55)"
                animate={{ cy: [285, 245, 220], r: [5, 8, 10], opacity: [0.6, 0.3, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.9 }}
              />
            </g>
          )}
        </motion.g>

        {/* Wave layers — 3 stacked, each with horizontal sway */}
        <motion.path
          d="M0,400 Q200,388 400,400 T800,400 L800,500 L0,500 Z"
          fill={palette.wave}
          animate={reduced ? {} : { x: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,430 Q200,418 400,430 T800,430 L800,520 L0,520 Z"
          fill={palette.wave}
          opacity="0.6"
          animate={reduced ? {} : { x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,460 Q200,448 400,460 T800,460 L800,540 L0,540 Z"
          fill={palette.wave}
          opacity="0.4"
          animate={reduced ? {} : { x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Surface shimmer — sweeps across */}
        {!reduced && (
          <motion.rect
            x="0"
            y="395"
            width="800"
            height="12"
            fill="url(#aoShimmer)"
            animate={{ x: [-800, 800] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Rising bubbles in the sea */}
        {!reduced &&
          Array.from({ length: 12 }).map((_, i) => {
            const cx = 40 + i * 65 + (i % 2 === 0 ? 10 : -10);
            const r = 2 + (i % 3);
            const dur = 4 + (i % 4) * 0.8;
            const delay = (i * 0.5) % 6;
            return (
              <motion.circle
                key={i}
                cx={cx}
                cy={590}
                r={r}
                fill="rgba(255,255,255,0.65)"
                animate={{ cy: [590, 400], opacity: [0, 0.8, 0] }}
                transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeOut' }}
              />
            );
          })}

        {/* Foreground subtle vignette */}
        <rect
          x="0"
          y="0"
          width="800"
          height="600"
          fill="url(#aoSky)"
          opacity="0"
        />
      </svg>
    </div>
  );
}
