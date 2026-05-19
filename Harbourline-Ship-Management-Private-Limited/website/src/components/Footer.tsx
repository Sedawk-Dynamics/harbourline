import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import { SERVICES } from '../data/services';

const usefulLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/#about' },
  { label: 'Products', to: '/products' },
  { label: 'New Arrival', to: '/products' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/#contact' },
];

// Top 6 services + a "View All" link
const serviceLinks = SERVICES.slice(0, 6).map((s) => ({
  label: s.title,
  to: `/services/${s.slug}`,
}));

const socials = [
  { icon: <FaWhatsapp />,    label: 'WhatsApp',  href: 'https://wa.me/919825645515' },
  { icon: <FaFacebookF />,   label: 'Facebook',  href: 'https://www.facebook.com/' },
  { icon: <FaInstagram />,   label: 'Instagram', href: 'https://www.instagram.com/' },
  { icon: <FaLinkedinIn />,  label: 'LinkedIn',  href: 'https://www.linkedin.com/' },
];

const colVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  return (
    <footer className="surface text-fg border-t border-line relative overflow-hidden">
      <span className="watermark absolute bottom-0 left-1/2 -translate-x-1/2 text-[8rem] sm:text-[14rem] lg:text-[18rem] leading-none pointer-events-none select-none opacity-50">
        HARBOURLINE
      </span>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 pb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.12 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <motion.div variants={colVariants} transition={{ duration: 0.6 }}>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[color:var(--color-brand-dark)] to-[color:var(--color-brand)] flex items-center justify-center">
                <span className="font-heading text-white font-extrabold text-lg">H</span>
              </div>
              <span className="font-heading text-xl font-extrabold tracking-tight">
                HARBOUR<span className="text-[color:var(--color-brand)]">LINE</span>
              </span>
            </Link>
            <h3 className="h-display text-lg sm:text-xl mb-4">Harbourline Ship Management</h3>
            <p className="mb-2 uppercase tracking-[2px] text-[color:var(--color-brand-light)] text-[11px] font-semibold">
              Navigating Excellence at Sea
            </p>
            <p className="text-mute text-sm leading-relaxed mb-6">
              Ship management, marine repair services and worldwide supply of main engine,
              auxiliary engine, automation and navigation spares — inspected before dispatch and
              backed by a marine-engineer-led technical team.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  whileHover={{ y: -3, scale: 1.05 }}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-mute-2 hover:bg-[color:var(--color-brand)] hover:border-[color:var(--color-brand)] hover:text-white transition-colors"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Useful Links */}
          <motion.div variants={colVariants} transition={{ duration: 0.6 }}>
            <h4 className="h-display text-base sm:text-lg mb-5">Useful Links</h4>
            <ul className="space-y-3">
              {usefulLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="link-underline text-mute-2 hover:text-[color:var(--color-brand-light)] transition-colors text-sm inline-flex items-center gap-2"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={colVariants} transition={{ duration: 0.6 }}>
            <h4 className="h-display text-base sm:text-lg mb-5">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="link-underline text-mute-2 hover:text-[color:var(--color-brand-light)] transition-colors text-sm uppercase tracking-wide"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-[color:var(--color-brand-light)] hover:underline text-sm font-bold"
                >
                  View all services →
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Us */}
          <motion.div variants={colVariants} transition={{ duration: 0.6 }}>
            <h4 className="h-display text-base sm:text-lg mb-5">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-full bg-[color:var(--color-brand)]/10 border border-[color:var(--color-brand)]/30 flex items-center justify-center text-[color:var(--color-brand-light)] shrink-0">
                  <FaMapMarkerAlt />
                </span>
                <div className="text-mute-2 text-sm leading-relaxed">
                  <p className="font-semibold text-fg">Harbourline Ship Management</p>
                  <p>240/A Sagar Complex,<br />Jashonath Chowk, Near Moti Baug,<br />Bhavnagar, Gujarat &mdash; 364001</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-[color:var(--color-brand)]/10 border border-[color:var(--color-brand)]/30 flex items-center justify-center text-[color:var(--color-brand-light)] shrink-0">
                  <FaPhoneAlt />
                </span>
                <a href="tel:+919825645515" className="text-mute-2 hover:text-[color:var(--color-brand-light)] text-sm">
                  +91 98256 45515
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-[color:var(--color-brand)]/10 border border-[color:var(--color-brand)]/30 flex items-center justify-center text-[color:var(--color-brand-light)] shrink-0">
                  <FaEnvelope />
                </span>
                <a href="mailto:harbourlineshipmanagement@gmail.com" className="text-mute-2 hover:text-[color:var(--color-brand-light)] text-xs break-all">
                  harbourlineshipmanagement@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-mute">
          <p>&copy; {new Date().getFullYear()} Harbourline Ship Management Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-[color:var(--color-brand-light)] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[color:var(--color-brand-light)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
