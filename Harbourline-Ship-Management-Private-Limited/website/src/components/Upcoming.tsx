import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';
import { HiOutlineCubeTransparent, HiOutlineSignal, HiOutlineWrenchScrewdriver } from 'react-icons/hi2';
import Reveal from '../animations/Reveal';
import SplitText from '../animations/SplitText';
import ComingSoon from './ComingSoon';
import { useReducedMotion } from '../animations/useReducedMotion';

type Item = {
  eta: string;
  title: string;
  body: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const ITEMS: Item[] = [
  {
    eta: 'Q2 2026',
    title: 'Online Spare-Parts Portal',
    body:
      'A live inventory and quick-quote portal for chief engineers and superintendents — search by engine make, request a photograph and get a confirmed quotation within the watch.',
    Icon: HiOutlineCubeTransparent,
  },
  {
    eta: 'Q3 2026',
    title: 'Live Vessel Dispatch Sync',
    body:
      'Real-time consignment tracking from our Bhavnagar store to the gangway — port-agent updates, customs status and photo confirmation pushed direct to the operator on duty.',
    Icon: HiOutlineSignal,
  },
  {
    eta: 'Q4 2026',
    title: 'Bhavnagar Workshop Expansion',
    body:
      'A dedicated reconditioning bay for turbocharger overhaul, crankshaft inspection and fuel-pump calibration — extending in-house capability for 2-stroke and 4-stroke engines.',
    Icon: HiOutlineWrenchScrewdriver,
  },
];

export default function Upcoming() {
  const reduced = useReducedMotion();

  return (
    <section id="upcoming" className="surface-2 text-fg section-pad relative overflow-hidden">
      {/* Decorative ambient field */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="glow-orb"
          style={{ left: '6%', top: '20%', width: 360, height: 360, background: 'rgba(1,142,222,0.28)' }}
        />
        <div
          className="glow-orb"
          style={{ right: '8%', bottom: '15%', width: 280, height: 280, background: 'rgba(244,180,0,0.18)', animationDelay: '3s' }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header — eyebrow + badge + headline */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <Reveal variant="up">
              <div className="flex items-center gap-3 mb-4">
                <span className="section-eyebrow !mb-0">What&apos;s Next</span>
                <ComingSoon variant="chip" tone="gold" label="Roadmap" />
              </div>
            </Reveal>
            <SplitText
              as="h2"
              text="Three Initiatives Launching This Year."
              className="h-display text-3xl sm:text-4xl lg:text-5xl text-fg block"
            />
            <Reveal variant="up" delay={0.3}>
              <p className="text-mute mt-5 text-base sm:text-lg leading-relaxed">
                A short-form look at what the Harbourline team is building next &mdash; better tools
                for our clients, deeper in-house capability, and faster turnaround on the requirements
                that matter most.
              </p>
            </Reveal>
          </div>

          <Reveal variant="up" delay={0.4}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[color:var(--color-brand-light)] font-semibold text-sm hover:gap-3 transition-all"
            >
              Get Early Access <FaArrowRight />
            </a>
          </Reveal>
        </div>

        {/* Three timeline cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.2, 0.7, 0.3, 1] }}
              className="card-ring spot-card relative rounded-2xl border border-line surface p-6 sm:p-7 overflow-hidden group"
              onMouseMove={(e) => {
                const t = e.currentTarget as HTMLElement;
                const r = t.getBoundingClientRect();
                t.style.setProperty('--mx', `${e.clientX - r.left}px`);
                t.style.setProperty('--my', `${e.clientY - r.top}px`);
              }}
            >
              {/* Subtle corner glow */}
              <div
                className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(1,142,222,0.20), transparent 70%)',
                  filter: 'blur(10px)',
                }}
              />

              {/* Pulsing corner indicator */}
              {!reduced && (
                <span
                  aria-hidden
                  className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full pulse-brand"
                  style={{ background: 'var(--color-brand-light)' }}
                />
              )}

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-12 h-12 rounded-xl bg-[color:var(--color-brand)]/12 border border-[color:var(--color-brand)]/30 flex items-center justify-center text-[color:var(--color-brand-light)]">
                    <item.Icon className="text-2xl" />
                  </span>
                  <ComingSoon variant="pill" tone="brand" eta={item.eta} label="ETA" />
                </div>

                <h3 className="h-display text-xl sm:text-2xl text-fg mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-mute-2 text-sm leading-relaxed mb-6">{item.body}</p>

                {/* Progress hairline — gives a "build is in progress" feeling */}
                <div className="relative h-px bg-line overflow-hidden">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: `${30 + i * 20}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4 + i * 0.12, ease: 'easeOut' }}
                    className="absolute top-0 left-0 h-full"
                    style={{
                      background:
                        'linear-gradient(90deg, var(--color-brand-dark), var(--color-brand), var(--color-brand-light))',
                      boxShadow: '0 0 10px rgba(79,180,248,0.6)',
                    }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] tracking-[2px] uppercase text-mute">
                  <span>Build Status</span>
                  <span className="text-[color:var(--color-brand-light)]">In Progress</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
