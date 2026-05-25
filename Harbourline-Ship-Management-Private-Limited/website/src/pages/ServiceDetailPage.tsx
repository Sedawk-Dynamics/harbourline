import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheck } from 'react-icons/fa6';
import PageShell from './PageShell';
import PageHeader from './PageHeader';
import ServiceArt from '../components/ServiceArt';
import SmartImage from '../components/SmartImage';
import Reveal from '../animations/Reveal';
import { findService, SERVICES } from '../data/services';
import { usePageMeta } from '../lib/usePageMeta';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? findService(slug) : undefined;

  usePageMeta({
    title: service ? service.title : 'Service',
    description: service?.short,
    path: service ? `/services/${service.slug}` : '/services',
  });

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
        bgImage={service.image}
        bgFallback={service.fallback}
      />

      <section className="surface section-pad">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-5 gap-10">
          {/* Image — premium photo + subtle decorative SVG accent */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="img-overlay card-ring relative rounded-2xl overflow-hidden aspect-[4/5] border border-line group"
            >
              <SmartImage
                src={service.image}
                fallback={service.fallback}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover bg-zoom transition-transform duration-700"
                loading="lazy"
              />
              {/* Brand gradient overlay for a premium tonal wash */}
              <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(11,15,20,0.55)_0%,rgba(1,142,222,0.35)_60%,rgba(11,15,20,0.75)_100%)] pointer-events-none" />
              {/* Service number marker */}
              <div className="absolute top-5 left-5 z-10 flex items-center gap-3">
                <span className="numeric-fill text-2xl drop-shadow">{service.n}</span>
                <span className="text-white/85 text-[10px] tracking-[3px] uppercase">Service</span>
              </div>
              {/* Floating SVG accent ring — anchored bottom-right, a quiet nod to the icon-art */}
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-12 -right-12 w-44 h-44 rounded-full border border-[color:var(--color-brand-light)]/30 pointer-events-none"
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[color:var(--color-brand-light)] shadow-[0_0_18px_rgba(79,180,248,0.8)]" />
              </motion.div>
              {/* Tiny iconography badge from ServiceArt (just the gradient icon swatch) */}
              <div className="absolute bottom-5 left-5 z-10 w-14 h-14 rounded-xl overflow-hidden border border-white/15 shadow-xl">
                <ServiceArt slug={service.slug} />
              </div>
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
                  Call +91 98256 45515
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
