import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import SplitText from '../animations/SplitText';
import MagneticButton from '../animations/MagneticButton';
import Reveal from '../animations/Reveal';
import SmartImage from './SmartImage';
import { IMG } from '../lib/images';
import { useReducedMotion } from '../animations/useReducedMotion';

// High-quality "bulk cargo ship at sea" still — used as poster AND visible fallback
const POSTER = IMG.heroBulk;
// Local mp4 (already in /public). Replace this file to swap the hero clip.
const LOCAL_VIDEO = '/harbourline-hero.mp4';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [videoOk, setVideoOk] = useState(true);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '20%']);
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-12%']);
  const wmX = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  // Pause the video when offscreen to save CPU/battery
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause())),
      { threshold: 0.1 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  const goAnchor = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // 24 particles in 3 color "schools" (brand, brand-light, white) for depth.
  const particleColors = [
    'rgba(1,142,222,0.55)',
    'rgba(79,180,248,0.65)',
    'rgba(255,255,255,0.45)',
  ];
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 5,
    duration: 12 + Math.random() * 18,
    delay: Math.random() * 14,
    color: particleColors[i % particleColors.length],
  }));

  return (
    <section
      id="home"
      ref={ref}
      className="dark-zone relative -mt-[88px] pt-[88px] min-h-[100svh] overflow-hidden"
    >
      {/* Background layer — video of a fully-loaded bulk cargo ship at sea */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {/* Poster image: always renders. Sits beneath the video so when the
            video is loading / hidden / errored, the ship still shows. */}
        <SmartImage
          src={POSTER}
          fallback={[IMG.heroFallback, IMG.bulkCarrier]}
          alt="Container cargo ship hauling bulk freight across the ocean"
          className="absolute inset-0 w-full h-[115%] object-cover bg-zoom"
          loading="eager"
          fetchPriority="high"
        />

        {/* Video overlay — plays for everyone */}
        {videoOk && !reduced && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={POSTER}
            onError={() => setVideoOk(false)}
            className="absolute inset-0 w-full h-[115%] object-cover"
          >
            <source src={LOCAL_VIDEO} type="video/mp4" />
          </video>
        )}

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(1,142,222,0.28),transparent_60%)]" />
        {/* Subtle scanline overlay for the "futuristic" feel */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 3px)' }} />
        {/* Mesh grid */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{
          backgroundImage:
            'linear-gradient(rgba(1,142,222,0.5) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(1,142,222,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
        }} />

        {/* SVG watermark logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.svg
            viewBox="0 0 200 200"
            className="w-[55vmin] h-[55vmin] opacity-[0.08]"
            animate={reduced ? {} : { rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="100" cy="100" r="92" fill="none" stroke="white" strokeWidth="2.5" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="6 6" />
            <text x="100" y="115" textAnchor="middle" fontFamily="Hanken Grotesk, sans-serif" fontWeight="800" fontSize="60" fill="white">H</text>
          </motion.svg>
        </div>
      </motion.div>

      {/* Drifting particles + glow orbs (futuristic accent) */}
      {!reduced && (
        <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
          {/* Three orbs in different sizes/positions for layered depth */}
          <div className="glow-orb" style={{ left: '15%', top: '30%', width: 360, height: 360, background: 'rgba(1,142,222,0.55)' }} />
          <div className="glow-orb" style={{ left: '80%', top: '70%', width: 280, height: 280, background: 'rgba(79,180,248,0.45)', animationDelay: '2s' }} />
          <div className="glow-orb" style={{ left: '50%', top: '20%', width: 200, height: 200, background: 'rgba(255,255,255,0.18)', animationDelay: '4s' }} />
          {particles.map((p) => (
            <span
              key={p.id}
              className="particle"
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                background: p.color,
              }}
            />
          ))}
          {/* Sea-foam horizon glow at the very bottom of the hero */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(1,142,222,0.18) 60%, rgba(79,180,248,0.30) 100%)',
              filter: 'blur(20px)',
            }}
          />
        </div>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-10 sm:pt-20 lg:pt-28 pb-40 sm:pb-56"
        style={{ y: fgY, opacity: heroOpacity }}
      >
        <Reveal variant="left" duration={0.7}>
          <div className="flex items-center gap-3 text-mute-2 mb-6">
            <span className="h-px w-10 bg-[color:var(--color-brand)]" />
            <span className="text-xs sm:text-sm tracking-[4px] uppercase">Navigating Excellence at Sea</span>
          </div>
        </Reveal>

        <SplitText
          as="h1"
          text="Harbourline"
          className="h-display text-white text-[3.25rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] block"
          staggerMs={32}
          trigger="mount"
        />
        <SplitText
          as="h1"
          text="Ship Management"
          className="h-display text-[color:var(--color-brand-light)] text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] block mb-5"
          staggerMs={28}
          delayMs={400}
          trigger="mount"
        />

        <Reveal variant="up" delay={0.9}>
          <p className="max-w-2xl text-white/90 text-sm sm:text-base font-semibold tracking-[3px] uppercase mb-6">
            Ship Management · Marine Repairs · Spares Supplier
          </p>
        </Reveal>

        <Reveal variant="up" delay={1}>
          <p className="max-w-2xl text-mute-2 text-base sm:text-lg leading-relaxed mb-10">
            Where maritime reliability meets global service excellence. Harbourline Ship Management
            delivers ship management, marine repair services and worldwide supply of main engine,
            auxiliary engine and automation spares — all backed by{' '}
            <span className="text-white font-semibold">technically sound, dependable service</span>{' '}
            and components inspected before they ever leave our store.
          </p>
        </Reveal>

        <Reveal variant="up" delay={1.2}>
          <div className="flex flex-wrap gap-4">
            <MagneticButton className="btn-square is-light group" onClick={() => goAnchor('#about')}>
              Explore More
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton className="btn-square is-ghost group" onClick={() => navigate('/products')}>
              View Products
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>
        </Reveal>
      </motion.div>

      {/* Bottom watermark text — only visible on large screens to avoid overlap with content */}
      <motion.div
        className="absolute bottom-2 left-6 z-1 pointer-events-none select-none hidden lg:block"
        style={{ x: wmX }}
      >
        <span className="watermark text-[6rem] xl:text-[9rem] leading-none">HARBOURLINE</span>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 right-10 z-10 hidden md:flex flex-col items-center gap-2 text-mute-2">
        <span className="text-[10px] tracking-[3px] uppercase">Scroll</span>
        <span className="scroll-cue" />
      </div>
    </section>
  );
}
