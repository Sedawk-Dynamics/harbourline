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
          src={IMG.bulkCarrier}
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
        </>
      )}

      <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <Reveal variant="up">
          <span className="section-eyebrow mb-4 justify-center">Ready When You Are</span>
        </Reveal>
        <SplitText
          as="h2"
          text="Need Marine Spares Delivered Worldwide?"
          className="h-display text-3xl sm:text-5xl lg:text-6xl mb-6 max-w-3xl mx-auto block"
        />
        <Reveal variant="up" delay={0.3}>
          <p className="text-mute-2 max-w-2xl mx-auto mb-10 text-base sm:text-lg">
            Send us your enquiry and our team will respond within hours with quotes, availability and
            dispatch timelines.
          </p>
        </Reveal>
        <Reveal variant="up" delay={0.5}>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton className="btn-square is-light group" onClick={goContact}>
              Request a Quote
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton as="a" href="tel:+919825645515" className="btn-square is-ghost">
              Call +91 9825 645515
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
