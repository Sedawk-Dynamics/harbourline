import { motion } from 'framer-motion';
import PageShell from './PageShell';
import PageHeader from './PageHeader';
import SmartImage from '../components/SmartImage';
import ComingSoon from '../components/ComingSoon';
import { PROJECTS } from '../data/projects';
import { IMG } from '../lib/images';
import { usePageMeta } from '../lib/usePageMeta';

export default function ProjectsPage() {
  usePageMeta({
    title: 'Projects & Case Studies — Marine Spares Delivered Worldwide',
    description:
      'Recent Harbourline projects — emergency spare delivery, dry-dock support and overhaul kit dispatch for global shipping fleets.',
    path: '/projects',
  });

  return (
    <PageShell>
      <PageHeader
        eyebrow="Case Studies"
        title="Recent Projects"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Projects' }]}
        bgImage={IMG.projectsHeader}
      />

      <section className="surface section-pad">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 space-y-20">
          {PROJECTS.map((p, idx) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-center ${
                idx % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
              }`}
            >
              {/* Image gallery */}
              <div className="img-overlay grid grid-cols-2 gap-3">
                {p.images.map((im, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-xl ${
                      i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'
                    }`}
                  >
                    <SmartImage
                      src={im.src}
                      fallback={im.fallback}
                      alt=""
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Content */}
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[color:var(--color-brand)]/10 border border-[color:var(--color-brand)]/30 text-[color:var(--color-brand-light)] text-xs font-bold uppercase tracking-[2px] mb-4">
                  {p.tag}
                </span>
                <h2 className="h-display text-2xl sm:text-3xl lg:text-4xl mb-5 text-fg">{p.title}</h2>
                <div className="space-y-3 text-mute-2 text-base leading-relaxed">
                  {p.body.map((b, i) => (
                    <p key={i}>{b}</p>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-line flex items-center gap-6 text-xs sm:text-sm text-mute">
                  <span><strong className="text-fg">Date:</strong> {p.date}</span>
                  <span><strong className="text-fg">Read:</strong> {p.readingTime}</span>
                </div>
              </div>
            </motion.article>
          ))}

          {/* "More case studies coming soon" — bookends the project list with a
              deliberate roadmap signal rather than ending on the last project. */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl border border-dashed border-line overflow-hidden surface-2"
          >
            {/* Ambient glow + grid */}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div
                className="glow-orb"
                style={{ left: '10%', top: '20%', width: 320, height: 320, background: 'rgba(1,142,222,0.22)' }}
              />
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                  maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                }}
              />
            </div>

            <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-12 sm:py-16 text-center flex flex-col items-center gap-5">
              <ComingSoon variant="chip" tone="brand" label="Coming Soon" eta="More case studies" />
              <h3 className="h-display text-2xl sm:text-3xl lg:text-4xl text-fg max-w-2xl">
                The next chapter is already underway.
              </h3>
              <p className="text-mute-2 text-sm sm:text-base max-w-xl leading-relaxed">
                We are documenting current engagements &mdash; emergency dispatch operations, dry-dock
                spares packages and fleet-wide overhaul kits &mdash; for publication here over the coming
                quarters. Reach out if you would like a private walk-through ahead of the public write-up.
              </p>
              <a
                href="/#contact"
                className="cta-ghost mt-2"
              >
                Talk to the team
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
