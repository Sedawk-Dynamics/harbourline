import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import HorizontalScroll from '../animations/HorizontalScroll';
import Reveal from '../animations/Reveal';
import SplitText from '../animations/SplitText';
import ServiceArt from './ServiceArt';
import { SERVICES } from '../data/services';

export default function Services() {
  return (
    <section id="services" className="surface-2 text-fg relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 pb-10 relative">
        <div className="absolute left-0 top-10 z-0 select-none pointer-events-none">
          <span className="watermark text-[5rem] sm:text-[8rem] lg:text-[12rem] leading-none">WHAT WE DO</span>
        </div>
        <div className="relative z-10">
          <Reveal variant="up">
            <span className="section-eyebrow mb-4 block">Services</span>
          </Reveal>
          <SplitText
            as="h2"
            text="Services Built for Maritime Excellence"
            className="h-display text-3xl sm:text-4xl lg:text-6xl max-w-3xl"
          />
          <Reveal variant="up" delay={0.3}>
            <p className="text-mute mt-5 max-w-md text-base">
              From sourcing to last-mile delivery, our integrated services keep vessels and operators
              on schedule worldwide.
            </p>
          </Reveal>
        </div>
      </div>

      <HorizontalScroll className="pb-24" trackClassName="px-6 lg:px-10 py-6">
        {SERVICES.map((s) => (
          <motion.div
            key={s.slug}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="img-overlay card-ring shrink-0 w-[80vw] sm:w-[420px] lg:w-[480px] aspect-[4/5] rounded-2xl overflow-hidden snap-center group relative cursor-pointer"
          >
            <Link to={`/services/${s.slug}`} className="absolute inset-0">
              <ServiceArt slug={s.slug} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

              <div className="relative h-full flex flex-col justify-end p-8">
                <span className="text-white/80 text-2xl sm:text-3xl font-mono tracking-[0.4em] mb-3 select-none drop-shadow-lg">
                  {s.n}
                </span>
                <h3 className="h-display text-xl sm:text-2xl lg:text-3xl text-white uppercase tracking-wide mb-3 drop-shadow-lg">
                  {s.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 drop-shadow-lg">
                  Learn More <FaArrowRight />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
        <div className="shrink-0 w-12" />
      </HorizontalScroll>
    </section>
  );
}
