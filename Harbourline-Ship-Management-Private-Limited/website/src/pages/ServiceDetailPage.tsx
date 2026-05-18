import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheck } from 'react-icons/fa6';
import PageShell from './PageShell';
import PageHeader from './PageHeader';
import ServiceArt from '../components/ServiceArt';
import Reveal from '../animations/Reveal';
import { findService, SERVICES } from '../data/services';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? findService(slug) : undefined;

  if (!service) return <Navigate to="/services" replace />;

  return (
    <PageShell>
      <PageHeader
        eyebrow={`Service ${service.n}`}
        title={service.title}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.title },
        ]}
        bgArt={<ServiceArt slug={service.slug} />}
      />

      <section className="surface section-pad">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-5 gap-10">
          {/* Image */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="img-overlay relative rounded-2xl overflow-hidden aspect-[4/5] border border-line"
            >
              <ServiceArt slug={service.slug} />
            </motion.div>
          </div>

          {/* Description */}
          <div className="lg:col-span-3 space-y-6">
            <Reveal variant="up">
              {service.long.map((p, i) => (
                <p key={i} className="text-mute-2 text-base sm:text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal variant="up" delay={0.2}>
              <h2 className="h-display text-2xl mt-8 mb-4 text-fg">Scope & Capability</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-mute-2 text-sm">
                    <span className="mt-1 w-5 h-5 rounded-full bg-[color:var(--color-brand)]/15 text-[color:var(--color-brand-light)] flex items-center justify-center shrink-0">
                      <FaCheck className="text-[10px]" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="up" delay={0.4}>
              <div className="pt-6 flex flex-wrap gap-4 border-t border-line mt-6">
                <Link to="/#contact" className="cta-primary">
                  Request a Quote <FaArrowRight />
                </Link>
                <a href="tel:+919825645515" className="cta-ghost">
                  Call +91 9825 645515
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* All services strip */}
      <section className="surface-2 section-pad border-t border-line">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <h2 className="h-display text-2xl sm:text-3xl mb-8 text-fg">All Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className={`p-5 rounded-xl border ${
                  s.slug === service.slug
                    ? 'border-[color:var(--color-brand)] bg-[color:var(--color-brand)]/10'
                    : 'border-line hover:border-[color:var(--color-brand)]/50 hover:bg-[color:var(--color-brand)]/5'
                } transition-all flex items-center gap-4`}
              >
                <span className="numeric-fill text-2xl">{s.n}</span>
                <span className="font-bold uppercase tracking-wide text-sm text-fg">{s.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
