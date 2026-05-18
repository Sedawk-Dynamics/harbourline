import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp } from 'react-icons/fa';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaEbay, FaSun, FaMoon } from 'react-icons/fa6';
import { useTheme } from './ThemeProvider';

const socials = [
  { icon: <FaWhatsapp />,  label: 'WhatsApp',  href: 'https://wa.me/919825645515',                                   color: '#25D366' },
  { icon: <FaFacebookF />, label: 'Facebook',  href: 'https://www.facebook.com/search/top?q=harbourline%20ship',     color: '#1877F2' },
  { icon: <FaInstagram />, label: 'Instagram', href: 'https://www.instagram.com/explore/search/?q=harbourline%20ship', color: '#E4405F' },
  { icon: <FaEbay />,      label: 'eBay',      href: 'https://www.ebay.com/sch/i.html?_nkw=harbourline+ship+spares', color: '#0064D2' },
];

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Left socials with FOLLOW US */}
      <div className="fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-5">
        {socials.map((s) => (
          <div
            key={s.label}
            className="relative"
            onMouseEnter={() => setHovered(s.label)}
            onMouseLeave={() => setHovered(null)}
          >
            <motion.a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={{ scale: 1.25, color: s.color }}
              className="block text-mute-2 text-lg sm:text-xl transition-colors"
            >
              {s.icon}
            </motion.a>
            <AnimatePresence>
              {hovered === s.label && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-white text-[color:var(--color-ink)] text-[10px] tracking-[2px] uppercase font-bold whitespace-nowrap"
                >
                  {s.label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
        <div className="mt-2 vertical-text text-[color:var(--color-brand-light)]">Follow Us</div>
      </div>

      {/* Light/Dark toggle */}
      <motion.button
        onClick={toggle}
        aria-label="Toggle theme"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[color:var(--color-gold)] text-black font-bold text-xs sm:text-sm shadow-xl"
      >
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="inline-flex"
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </motion.span>
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </motion.button>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-24 right-6 z-50 w-11 h-11 rounded-full bg-[color:var(--color-brand)] text-white flex items-center justify-center shadow-lg hover:bg-[color:var(--color-brand-dark)] transition-colors"
          >
            <FaChevronUp />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp */}
      <motion.a
        href="https://wa.me/919825645515"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.1, rotate: -10 }}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-xl pulse-brand"
      >
        <FaWhatsapp />
      </motion.a>
    </>
  );
}
