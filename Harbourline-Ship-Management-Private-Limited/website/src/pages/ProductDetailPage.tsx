import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheck } from 'react-icons/fa6';
import PageShell from './PageShell';
import PageHeader from './PageHeader';
import SmartImage from '../components/SmartImage';
import Reveal from '../animations/Reveal';
import { findProduct, PRODUCTS } from '../data/products';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? findProduct(slug) : undefined;

  if (!product) return <Navigate to="/products" replace />;

  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Product Category"
        title={product.title}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/products' },
          { label: product.title },
        ]}
        bgImage={product.image}
      />

      <section className="surface section-pad">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-5 gap-10">
          {/* Image */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="img-overlay rounded-2xl overflow-hidden aspect-square border border-line"
            >
              <SmartImage
                src={product.image}
                fallback={product.fallback}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Description */}
          <div className="lg:col-span-3 space-y-6">
            <Reveal variant="up">
              {product.long.map((p, i) => (
                <p key={i} className="text-mute-2 text-base sm:text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal variant="up" delay={0.2}>
              <h2 className="h-display text-2xl mt-8 mb-4 text-fg">What's Included</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {product.highlights.map((h) => (
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
                <Link
                  to="/#contact"
                  className="cta-primary"
                >
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

      {/* Related */}
      {related.length > 0 && (
        <section className="surface-2 section-pad border-t border-line">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <h2 className="h-display text-2xl sm:text-3xl mb-8 text-fg">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/products/${r.slug}`}
                  className="card-ring rounded-2xl overflow-hidden surface border border-line group block"
                >
                  <div className="img-overlay relative h-48 overflow-hidden">
                    <SmartImage
                      src={r.image}
                      fallback={r.fallback}
                      alt={r.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                    <h3 className="absolute bottom-3 left-4 right-4 h-display text-lg text-white">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
