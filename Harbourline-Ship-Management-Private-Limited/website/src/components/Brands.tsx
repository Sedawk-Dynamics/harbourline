import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Reveal from '../animations/Reveal';
import SplitText from '../animations/SplitText';

const brands = [
  'WÄRTSILÄ',
  'SULZER',
  'Carrier',
  'IHI',
  'MAK',
  'MAN B&W',
  'ABB',
  'YANMAR',
  'DAIHATSU',
  'CATERPILLAR',
  'FURUNO',
  'JRC',
  'KELVIN HUGHES',
  'SIMRAD',
  'MITSUBISHI',
];

export default function Brands() {
  return (
    <section id="brands" className="surface text-white py-16 sm:py-20 border-y border-line">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Reveal variant="up">
            <span className="section-eyebrow mb-3 block justify-center">Brands We Trade</span>
          </Reveal>
          <SplitText
            as="h2"
            text="World-Class OEM Partners"
            className="h-display text-2xl sm:text-3xl lg:text-4xl block"
          />
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop
          speed={6000}
          slidesPerView={2}
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          allowTouchMove
          freeMode
          className="!overflow-visible"
        >
          {brands.map((b, i) => (
            <SwiperSlide key={`${b}-${i}`} className="!h-auto">
              <div className="aspect-[5/3] surface-2 border border-line rounded-xl flex items-center justify-center text-mute-2 hover:text-[color:var(--color-brand-light)] transition-colors duration-300 group lift-tile">
                <span className="h-display text-lg sm:text-xl lg:text-2xl font-extrabold tracking-wider group-hover:scale-110 transition-transform duration-300">
                  {b}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
