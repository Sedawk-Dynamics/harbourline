import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router-dom';
import MagneticButton from '../animations/MagneticButton';
import SplitText from '../animations/SplitText';
import Reveal from '../animations/Reveal';
import SmartImage from './SmartImage';
import { IMG } from '../lib/images';
import { useReducedMotion } from '../animations/useReducedMotion';

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', reduced ? '-10%' : '20%']);

  const goContact = () => {
    if (pathname === '/') {
      const el = document.querySelector('#contact');
      if (el) {
        const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else {
      navigate('/#contact');
    }
  };

  return (
    <section ref={ref} className="dark-zone relative section-pad text-white overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <SmartImage
          src={IMG.ctaBg}
          fallback={[IMG.cargoAerial, IMG.containerSailing]}
          alt=""
          className="w-full h-[120%] object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(11,15,20,0.95)] via-[rgba(11,15,20,0.85)] to-[rgba(1,142,222,0.5)]" />
      </motion.div>

      {/* Floating shapes */}
      {!reduced && (
        <>
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 rounded-full border border-[color:var(--color-brand)]/30 z-10"
            animate={{ y: [0, -20, 0], rotate: 360 }}
            transition={{ y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 40, repeat: Infinity, ease: 'linear' } }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-[color:var(--color-brand)]/10 z-10"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Decorative orbit ring (mid-right) */}
          <motion.div
            className="absolute top-1/2 right-10 -translate-y-1/2 w-72 h-72 rounded-full border border-[color:var(--color-brand-light)]/15 z-10 pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[color:var(--color-brand-light)] shadow-[0_0_18px_rgba(79,180,248,0.8)]" />
          </motion.div>
        </>
      )}

      {/* Animated wave divider at the bottom */}
      <div className="wave-divider bottom-0 z-10 opacity-60">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z"
            fill="rgba(1,142,222,0.35)"
          />
          <path
            d="M0,40 C240,15 480,55 720,40 C960,15 1200,55 1440,40 L1440,60 L0,60 Z"
            fill="rgba(11,15,20,0.6)"
          />
        </svg>
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <Reveal variant="up">
          <span className="section-eyebrow mb-4 justify-center">Ready When You Are</span>
        </Reveal>
        <SplitText
          as="h2"
          text="Vessel Needs Spares, Repair or Port Support?"
          className="h-display text-3xl sm:text-5xl lg:text-6xl mb-6 max-w-3xl mx-auto block"
        />
        <Reveal variant="up" delay={0.3}>
          <p className="text-mute-2 max-w-2xl mx-auto mb-10 text-base sm:text-lg">
            Send the engine make, the part description and the port of delivery. Our marine team
            confirms availability, quotes and dispatch timeline within the same working day &mdash;
            and faster when the requirement is urgent.
          </p>
        </Reveal>
        <Reveal variant="up" delay={0.5}>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton className="btn-square is-light group" onClick={goContact}>
              Request a Quote
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton as="a" href="tel:+919825645515" className="btn-square is-ghost">
              Call +91 98256 45515
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
