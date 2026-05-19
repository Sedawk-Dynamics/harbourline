import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';
import PageShell from './PageShell';
import PageHeader from './PageHeader';
import SmartImage from '../components/SmartImage';
import { PRODUCTS } from '../data/products';
import { IMG } from '../lib/images';

export default function ProductsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Our Catalogue"
        title="Marine Machinery & Spare Parts"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Products' }]}
        bgImage={IMG.productsHeader}
      />

      <section className="surface section-pad">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-mute-2 max-w-2xl mb-12 text-base sm:text-lg">
            Main engine, auxiliary engine, automation, navigation and radar spares &mdash;
            sourced through certified suppliers and the Alang ship recycling yard, inspected
            in our workshop and dispatched with the documentation your vessel actually needs.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="card-ring rounded-2xl overflow-hidden surface-2 border border-line group"
              >
                <Link to={`/products/${p.slug}`} className="block">
                  <div className="img-overlay relative h-64 overflow-hidden">
                    <SmartImage
                      src={p.image}
                      fallback={p.fallback}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <h3 className="absolute bottom-4 left-5 right-5 h-display text-xl text-white">
                      {p.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-mute-2 text-sm leading-relaxed mb-5 line-clamp-3">{p.short}</p>
                    <span className="inline-flex items-center gap-2 text-[color:var(--color-brand-light)] font-semibold text-sm group-hover:gap-3 transition-all">
                      View Details <FaArrowRight />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
