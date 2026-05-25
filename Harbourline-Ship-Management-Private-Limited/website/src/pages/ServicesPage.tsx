import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';
import PageShell from './PageShell';
import PageHeader from './PageHeader';
import ServiceArt from '../components/ServiceArt';
import SmartImage from '../components/SmartImage';
import { SERVICES } from '../data/services';
import { IMG } from '../lib/images';
import { usePageMeta } from '../lib/usePageMeta';

export default function ServicesPage() {
  usePageMeta({
    title: 'Marine Services — Ship Management, Repairs & Worldwide Dispatch',
    description:
      'Harbourline services: ship management, marine repair works, spares supply, inspection & reconditioning, worldwide dispatch and port-side support — one accountable point of contact.',
    path: '/services',
  });

  return (
    <PageShell>
      <PageHeader
        eyebrow="What We Do"
        title="Services Built for Maritime Excellence"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        bgImage={IMG.servicesHeader}
      />

      <section className="surface section-pad">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-mute-2 max-w-2xl mb-12 text-base sm:text-lg">
            Ship management, marine repair works, spares supply, overhaul, worldwide dispatch and
            port-side support &mdash; coordinated by a marine-engineer-led team so the owner deals
            with one accountable point of contact through the entire job.
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
                    <SmartImage
                      src={s.image}
                      fallback={s.fallback}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Brand-tinted gradient wash so the photo feels on-brand */}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,15,20,0.10)_0%,rgba(11,15,20,0.55)_55%,rgba(11,15,20,0.92)_100%)] pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(1,142,222,0.30),transparent_55%)] pointer-events-none mix-blend-screen" />

                    {/* Small ServiceArt badge — pulls the icon language into the card */}
                    <div className="absolute top-4 left-4 w-14 h-14 rounded-xl overflow-hidden border border-white/15 shadow-xl">
                      <ServiceArt slug={s.slug} />
                    </div>

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
