import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import Reveal from '../animations/Reveal';
import SmartImage from '../components/SmartImage';
import { IMG } from '../lib/images';

type Crumb = { label: string; to?: string };

type Props = {
  eyebrow?: string;
  title: string;
  crumbs?: Crumb[];
  /** Photo URL for the header background. Use one or the other. */
  bgImage?: string;
  /** Custom JSX/SVG background — takes precedence over bgImage. */
  bgArt?: ReactNode;
  /** Optional fallback URLs for the bgImage (passed to SmartImage). */
  bgFallback?: string[];
};

export default function PageHeader({ eyebrow, title, crumbs, bgImage, bgArt, bgFallback }: Props) {
  return (
    <header className="dark-zone relative overflow-hidden -mt-[88px] pt-[140px] pb-16 lg:pt-[180px] lg:pb-24">
      {/* Background layer */}
      <div className="absolute inset-0 z-0">
        {bgArt ? (
          bgArt
        ) : bgImage ? (
          <SmartImage
            src={bgImage}
            fallback={bgFallback ?? [IMG.engineRoom, IMG.containerSailing]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden
          />
        ) : (
          // Fallback gradient when neither image nor art provided
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #062E47 0%, #0E5C8C 50%, #016BA8 100%)' }}
          />
        )}
        {/* Strong dark overlay so the title is always readable */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,15,20,0.85),rgba(11,15,20,0.55))]" />
      </div>

      {/* Brand colour wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(1,142,222,0.30),transparent_60%)] pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(11,15,20,0.6))] pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        {crumbs && crumbs.length > 0 && (
          <Reveal variant="up">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-mute-2">
                {crumbs.map((c, i) => (
                  <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                    {c.to ? (
                      <Link to={c.to} className="hover:text-[color:var(--color-brand-light)] transition-colors">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-white">{c.label}</span>
                    )}
                    {i < crumbs.length - 1 && <span className="text-mute">/</span>}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        {eyebrow && (
          <Reveal variant="up" delay={0.05}>
            <span className="section-eyebrow mb-4 block">{eyebrow}</span>
          </Reveal>
        )}

        {/* Title — plain h1 with a single fade-up. No per-char animation so
            the title is ALWAYS fully visible regardless of intersection timing. */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.3, 1], delay: 0.1 }}
          className="h-display text-4xl sm:text-5xl lg:text-7xl text-white block"
        >
          {title}
        </motion.h1>
      </div>
    </header>
  );
}
