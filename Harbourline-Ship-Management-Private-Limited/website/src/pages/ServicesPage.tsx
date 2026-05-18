import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';
import PageShell from './PageShell';
import PageHeader from './PageHeader';
import ServiceArt from '../components/ServiceArt';
import { SERVICES } from '../data/services';
import { IMG } from '../lib/images';

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="What We Do"
        title="Services Built for Maritime Excellence"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        bgImage={IMG.engineRoom}
      />

      <section className="surface section-pad">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-mute-2 max-w-2xl mb-12 text-base sm:text-lg">
            From sourcing to last-mile delivery, our integrated services keep vessels and operators
            on schedule worldwide.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="card-ring rounded-2xl overflow-hidden surface-2 border border-line group"
              >
                <Link to={`/services/${s.slug}`} className="block">
                  <div className="img-overlay relative aspect-[4/3] overflow-hidden">
                    <ServiceArt slug={s.slug} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <span className="text-white/80 text-xl font-mono tracking-[0.3em] mb-2 drop-shadow-lg">
                        {s.n}
                      </span>
                      <h3 className="h-display text-xl sm:text-2xl text-white uppercase tracking-wide drop-shadow-lg">
                        {s.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-mute-2 text-sm leading-relaxed mb-4 line-clamp-3">{s.short}</p>
                    <span className="inline-flex items-center gap-2 text-[color:var(--color-brand-light)] font-semibold text-sm group-hover:gap-3 transition-all">
                      Learn More <FaArrowRight />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
