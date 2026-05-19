import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteRight } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import SplitText from '../animations/SplitText';
import Reveal from '../animations/Reveal';
import SmartImage from './SmartImage';
import { IMG } from '../lib/images';

const testimonials = [
  {
    quote:
      'Harbourline confirmed availability inside the hour and shared photographs of the actual spare before we issued the PO. That kind of transparency is rare and exactly what an engine room needs.',
    name: 'Chief Engineer',
    company: 'Bulk Carrier Operator, Greece',
    image: IMG.testimonial1,
    fallback: [IMG.fallbackShip, IMG.cargoAerial],
  },
  {
    quote:
      'Their reconditioned 2-stroke main engine spares came with measurement records and a clear inspection sign-off. The parts performed as expected onboard with no surprises during fitment.',
    name: 'Technical Superintendent',
    company: 'International Shipping Co., Singapore',
    image: IMG.testimonial2,
    fallback: [IMG.containerSailing, IMG.oceanWaves],
  },
  {
    quote:
      'Emergency call placed late evening, components inspected, packed and on the road before midnight, delivered to the gangway by sunrise. Harbourline understands what a sailing deadline actually means.',
    name: 'Fleet Manager',
    company: 'Tanker Fleet, Gulf Region',
    image: IMG.testimonial3,
    fallback: [IMG.shipPort, IMG.fallbackPort],
  },
  {
    quote:
      'Documentation, customs paperwork and port-agent coordination were handled end-to-end. The radar PCB and bridge spares cleared customs and reached the vessel inside our planned port stay.',
    name: 'Purchasing Head',
    company: 'Dry Bulk Shipping Co., Mumbai',
    image: IMG.testimonial4,
    fallback: [IMG.bulkCarrier, IMG.fallbackShip],
  },
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const imgRef = useRef<SwiperType | null>(null);

  return (
    <section id="projects" className="surface text-white relative">
      <div className="grid lg:grid-cols-2 min-h-[80vh]">
        {/* Image swiper (synced) */}
        <div className="img-overlay relative h-[360px] sm:h-[480px] lg:h-auto overflow-hidden">
          <Swiper
            modules={[EffectFade, A11y, Autoplay]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 6500, disableOnInteraction: false }}
            loop
            allowTouchMove={false}
            onSwiper={(s) => (imgRef.current = s)}
            className="absolute inset-0 w-full h-full"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.image}>
                <motion.div
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                  className="w-full h-full"
                >
                  <SmartImage
                    src={t.image}
                    fallback={t.fallback}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/50 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="surface flex items-center px-6 sm:px-10 lg:px-16 py-16 sm:py-24 relative overflow-hidden">
          <FaQuoteRight className="absolute right-6 sm:right-10 top-10 text-[10rem] text-white/[0.04]" />

          <div className="max-w-xl relative z-10 w-full">
            <Reveal variant="up">
              <div className="flex items-center gap-3 text-mute-2 mb-6">
                <span className="h-px w-10 bg-[color:var(--color-brand)]" />
                <span className="text-xs sm:text-sm tracking-[4px] uppercase">Testimonials</span>
              </div>
            </Reveal>

            <SplitText
              as="h2"
              text="Trusted by marine professionals worldwide."
              className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-10"
            />

            <Swiper
              modules={[Autoplay, Pagination, A11y]}
              autoplay={{ delay: 6500, disableOnInteraction: false }}
              loop
              spaceBetween={32}
              slidesPerView={1}
              pagination={{ clickable: true }}
              onSlideChange={(s) => {
                setActiveIdx(s.realIndex);
                imgRef.current?.slideToLoop(s.realIndex);
              }}
              className="!pb-12 cursor-grab active:cursor-grabbing"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.name + t.company}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-mute-2 text-lg leading-relaxed mb-8 italic">"{t.quote}"</p>
                    <p className="font-heading text-white text-lg font-bold">{t.name}</p>
                    <p className="text-mute text-sm">{t.company}</p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-2 h-px w-full bg-line" />
            <p className="mt-4 text-xs text-mute tracking-[3px] uppercase">
              {String(activeIdx + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
