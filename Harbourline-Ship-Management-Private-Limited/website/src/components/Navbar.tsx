import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { SERVICES } from '../data/services';
import ComingSoon from './ComingSoon';

type NavItem = { label: string; href?: string; children?: { label: string; href: string }[]; soon?: boolean };

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#about' },
  {
    label: 'Products',
    children: [
      { label: 'All Products', href: '/products' },
      ...PRODUCTS.map((p) => ({ label: p.title, href: `/products/${p.slug}` })),
    ],
  },
  { label: 'New Arrival', href: '/products', soon: true },
  {
    label: 'Services',
    children: [
      { label: 'All Services', href: '/services' },
      ...SERVICES.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [submenu, setSubmenu] = useState<string | null>(null);
  const lastScroll = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      if (y > 200) {
        setHidden(y > lastScroll.current);
      } else {
        setHidden(false);
      }
      lastScroll.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setSubmenu(null);
    // Bare hash → scroll within current page
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      return;
    }
    // Route navigation (handles /, /products, /#contact etc.) — react-router
    // handles the hash and ScrollToHash listens to scroll the right anchor.
    navigate(href);
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.3, 1] }}
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'backdrop-blur-xl bg-[rgba(11,15,20,0.85)] border-b border-line text-white'
            : 'bg-transparent text-white'
        }`}
        /* When scrolled, the navbar bg flips to white in light mode (via the
           CSS override in index.css). We invert the text color in that
           specific case so it stays readable on the light background. */
      >
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" onClick={(e) => { e.preventDefault(); go('/'); }} className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Harbourline Ship Management"
              /* Height-based sizing so the wide HSM logo keeps its aspect
                 ratio instead of being squashed into a square. */
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_18px_rgba(1,142,222,0.35)]"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-heading text-lg sm:text-xl font-extrabold tracking-tight">
                HARBOUR<span className="text-[color:var(--color-brand)]">LINE</span>
              </span>
              <span className="text-[10px] text-mute tracking-[3px] uppercase">Ship Management</span>
            </div>
          </a>

          <motion.button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 group"
          >
            <span className="hidden sm:inline-block text-sm font-bold tracking-[3px] uppercase">Menu</span>
            <span className="flex flex-col gap-[5px] items-end">
              <span className="w-8 h-[2px] bg-current rounded-full transition-all group-hover:bg-[color:var(--color-brand)]" />
              <span className="w-5 h-[2px] bg-current rounded-full transition-all group-hover:w-8 group-hover:bg-[color:var(--color-brand)]" />
              <span className="w-7 h-[2px] bg-current rounded-full transition-all group-hover:bg-[color:var(--color-brand)]" />
            </span>
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="dark-zone fixed inset-0 z-100 bg-[rgba(11,15,20,0.97)] backdrop-blur-xl flex overflow-hidden"
          >
            {/* Giant bg word */}
            <motion.span
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 0.06, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.7 }}
              className="watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] leading-none whitespace-nowrap"
              style={{ WebkitTextStrokeColor: 'rgba(1,142,222,0.4)' }}
            >
              HARBOUR
            </motion.span>

            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              aria-label="Close menu"
              className="absolute top-6 right-6 w-12 h-12 rounded-full border border-line flex items-center justify-center text-white hover:bg-[color:var(--color-brand)] hover:border-[color:var(--color-brand)] transition-colors"
              onClick={() => setOpen(false)}
            >
              <span className="relative w-5 h-5">
                <span className="absolute top-1/2 left-0 w-full h-[2px] bg-current rotate-45 -translate-y-1/2" />
                <span className="absolute top-1/2 left-0 w-full h-[2px] bg-current -rotate-45 -translate-y-1/2" />
              </span>
            </motion.button>

            <div className="m-auto w-full max-w-3xl px-6 text-center relative z-10">
              <AnimatePresence mode="wait">
                {!submenu ? (
                  <motion.div
                    key="main"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <ul className="flex flex-col gap-1">
                      {navItems.map((item, i) => (
                        <motion.li
                          key={item.label}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 + i * 0.04 }}
                        >
                          {item.children ? (
                            <button
                              onClick={() => setSubmenu(item.label)}
                              className="group text-white font-heading text-3xl sm:text-5xl font-bold py-3 hover:text-[color:var(--color-brand)] transition-colors inline-flex items-center gap-3"
                            >
                              <span className="opacity-50 group-hover:opacity-100 text-sm align-top mr-2 font-mono">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              {item.label}
                              <span className="text-[color:var(--color-brand)] text-2xl">+</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => go(item.href!)}
                              className="group text-white font-heading text-3xl sm:text-5xl font-bold py-3 hover:text-[color:var(--color-brand)] transition-colors inline-flex items-center gap-3"
                            >
                              <span className="opacity-50 group-hover:opacity-100 text-sm align-top mr-3 font-mono">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              {item.label}
                              {item.soon && <ComingSoon variant="pill" tone="gold" />}
                            </button>
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div
                    key={submenu}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                  >
                    <button
                      onClick={() => setSubmenu(null)}
                      className="text-mute hover:text-[color:var(--color-brand-light)] text-sm tracking-[3px] uppercase mb-6"
                    >
                      ← Back to Menu
                    </button>
                    <h3 className="text-[color:var(--color-brand-light)] text-xs tracking-[3px] uppercase mb-6">
                      {submenu}
                    </h3>
                    <ul className="flex flex-col gap-1">
                      {navItems
                        .find((n) => n.label === submenu)
                        ?.children?.map((c, i) => (
                          <motion.li
                            key={c.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 + i * 0.05 }}
                          >
                            <button
                              onClick={() => go(c.href)}
                              className="text-white font-heading text-xl sm:text-3xl font-bold py-2 hover:text-[color:var(--color-brand)] transition-colors"
                            >
                              {c.label}
                            </button>
                          </motion.li>
                        ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex flex-col items-center gap-2 text-mute text-sm"
              >
                <span>+91 98256 45515 &bull; harbourlineshipmanagement@gmail.com</span>
                <span>Bhavnagar, Gujarat &mdash; India</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
