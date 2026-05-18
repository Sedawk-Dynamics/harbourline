import { useRef } from 'react';
import { motion } from 'framer-motion';
import RevealMask from '../animations/RevealMask';
import Reveal from '../animations/Reveal';
import SplitText from '../animations/SplitText';
import CountUp from '../animations/CountUp';
import AnimatedOceanScene from './AnimatedOceanScene';

export default function About() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={ref} className="relative surface text-white">
      <div className="grid lg:grid-cols-2 min-h-[80vh]">
        {/* Image side — custom animated SVG scene (never depends on an external image) */}
        <div className="img-overlay relative h-[420px] sm:h-[520px] lg:h-auto overflow-hidden">
          <RevealMask direction="h" className="absolute inset-0">
            <AnimatedOceanScene />
          </RevealMask>

          {/* Soft brand-blue tint over the scene */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgba(1,142,222,0.18)] pointer-events-none" />

          {/* Since 1998 floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10"
          >
            <div className="float-y-2 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[color:var(--color-brand)] text-white flex flex-col items-center justify-center shadow-2xl shadow-[color:var(--color-brand)]/40">
              <span className="text-[10px] tracking-[2px] uppercase opacity-80">Since</span>
              <span className="font-extrabold text-3xl sm:text-4xl">1998</span>
            </div>
          </motion.div>

          <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 pointer-events-none select-none z-10">
            <span className="watermark text-[3rem] sm:text-[5rem]">H-LINE</span>
          </div>
        </div>

        {/* Content side */}
        <div className="surface flex items-center px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
          <div className="max-w-xl">
            <Reveal variant="up">
              <span className="section-eyebrow mb-5 block">Why Choose Us</span>
            </Reveal>

            <SplitText
              as="h2"
              text="Trusted Marine Spares, Engineered for Performance & Reliability"
              className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-6"
              staggerMs={18}
            />

            <Reveal variant="up" delay={0.3}>
              <p className="text-mute-2 text-base sm:text-lg leading-relaxed mb-8">
                We are a dedicated marine spares supplier committed to delivering reliable, high-quality
                components that meet the demanding requirements of the marine industry. Our expertise spans
                sourcing, quality control, logistics, and customer support, ensuring seamless operations
                for vessels worldwide.
              </p>
            </Reveal>

            {/* Stats row */}
            <Reveal variant="up" delay={0.5}>
              <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-10 border-y border-line py-6">
                <Stat to={26} suffix="+" label="Years in Trade" />
                <Stat to={500} suffix="+" label="Products" />
                <Stat to={150} suffix="+" label="Global Clients" />
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.7}>
              <a
                href="#why-us"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector('#why-us');
                  if (el) {
                    const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 text-[color:var(--color-brand-light)] font-semibold hover:gap-3 transition-all"
              >
                Scroll to Explore <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>↓</motion.span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ to, suffix = '', label }: { to: number; suffix?: string; label: string }) {
  return (
    <div>
      <div className="h-display text-3xl sm:text-4xl text-white">
        <CountUp to={to} suffix={suffix} />
      </div>
      <div className="text-mute text-[11px] tracking-[2px] uppercase mt-1">{label}</div>
    </div>
  );
}
