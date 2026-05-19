import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import HorizontalScroll from '../animations/HorizontalScroll';
import Reveal from '../animations/Reveal';
import SplitText from '../animations/SplitText';
import SmartImage from './SmartImage';
import { PRODUCTS } from '../data/products';

export default function Products() {
  return (
    <section id="products" className="surface text-fg relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 pb-10 relative">
        <div className="absolute right-0 top-10 z-0 select-none pointer-events-none">
          <span className="watermark text-[5rem] sm:text-[8rem] lg:text-[12rem] leading-none">OUR PRODUCTS</span>
        </div>
        <div className="relative z-10">
          <Reveal variant="up">
            <span className="section-eyebrow mb-4 block">Our Products</span>
          </Reveal>
          <SplitText
            as="h2"
            text="Marine Engine, Automation & Navigation Spares"
            className="h-display text-3xl sm:text-4xl lg:text-6xl max-w-3xl"
          />
          <Reveal variant="up" delay={0.3}>
            <p className="text-mute mt-5 max-w-md text-base">
              Main engine, auxiliary engine, automation, marine navigation and radar spares &mdash;
              inspected in our Bhavnagar workshop and dispatched worldwide with full documentation.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Pinned horizontal scroll */}
      <HorizontalScroll className="pb-24" trackClassName="px-6 lg:px-10 py-6">
        {PRODUCTS.map((p, i) => (
          <motion.article
            key={p.slug}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="card-ring spot-card shrink-0 w-[85vw] sm:w-[440px] lg:w-[500px] rounded-2xl overflow-hidden surface-2 border border-line snap-center group"
            onMouseMove={(e) => {
              const t = e.currentTarget as HTMLElement;
              const r = t.getBoundingClientRect();
              t.style.setProperty('--mx', `${e.clientX - r.left}px`);
              t.style.setProperty('--my', `${e.clientY - r.top}px`);
            }}
          >
            <Link to={`/products/${p.slug}`} className="block">
              <div className="img-overlay relative h-72 overflow-hidden">
                <SmartImage
                  src={p.image}
                  fallback={p.fallback}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <span className="absolute top-4 right-4 text-[11px] tracking-[3px] text-white/70 bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                  {String(i + 1).padStart(2, '0')} / {String(PRODUCTS.length).padStart(2, '0')}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="h-display text-2xl text-white mb-3">{p.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-mute-2 text-sm leading-relaxed mb-5 line-clamp-4">{p.short}</p>
                <div className="flex items-center justify-between">
                  <span className="pill">
                    Read More <FaArrowRight />
                  </span>
                  <span className="text-mute text-xs tracking-[2px] uppercase">In Stock</span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
        <div className="shrink-0 w-12" />
      </HorizontalScroll>
    </section>
  );
}
