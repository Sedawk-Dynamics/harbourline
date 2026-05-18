import { motion } from 'framer-motion';
import PageShell from './PageShell';
import PageHeader from './PageHeader';
import SmartImage from '../components/SmartImage';
import { PROJECTS } from '../data/projects';
import { IMG } from '../lib/images';

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Case Studies"
        title="Recent Projects"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Projects' }]}
        bgImage={IMG.portCranes}
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
        </div>
      </section>
    </PageShell>
  );
}
