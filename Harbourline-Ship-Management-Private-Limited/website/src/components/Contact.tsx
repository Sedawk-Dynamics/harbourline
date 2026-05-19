import { useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaArrowRight, FaCheck } from 'react-icons/fa6';
import Reveal from '../animations/Reveal';
import SplitText from '../animations/SplitText';
import MagneticButton from '../animations/MagneticButton';
import { useReducedMotion } from '../animations/useReducedMotion';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLFormElement>(null);

  // Pointer tilt for the glass form
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 25 });
  const sry = useSpring(ry, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(srx, (v) => (reduced ? 0 : v));
  const rotateY = useTransform(sry, (v) => (reduced ? 0 : v));

  const onMove = (e: React.MouseEvent<HTMLFormElement>) => {
    if (!cardRef.current || reduced) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-y * 6);
    ry.set(x * 6);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const subject = encodeURIComponent(
      `Enquiry from ${fd.get('name') || 'Website Visitor'}${fd.get('subject') ? ' — ' + fd.get('subject') : ''}`,
    );
    const body = encodeURIComponent(
      [
        `Name:    ${fd.get('name') || ''}`,
        `Email:   ${fd.get('email') || ''}`,
        `Phone:   ${fd.get('phone') || ''}`,
        `Company: ${fd.get('company') || ''}`,
        '',
        'Message:',
        `${fd.get('message') || ''}`,
        '',
        '— Sent from the Harbourline Ship Management contact form',
      ].join('\n'),
    );
    // Opens the user's default mail client with everything pre-filled.
    window.location.href = `mailto:harbourlineshipmanagement@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    form.reset();
  };

  return (
    <section id="contact" className="surface-2 text-white section-pad relative overflow-hidden">
      {/* Ambient decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-orb" style={{ left: '8%', top: '20%', width: 320, height: 320, background: 'rgba(1,142,222,0.35)' }} />
        <div className="glow-orb" style={{ right: '6%', bottom: '12%', width: 260, height: 260, background: 'rgba(79,180,248,0.28)', animationDelay: '3s' }} />
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }} />
      </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Reveal variant="up">
              <span className="section-eyebrow mb-3 block">Get In Touch</span>
            </Reveal>
            <SplitText
              as="h2"
              text="Ready to Power Your Next Voyage?"
              className="h-display text-3xl sm:text-4xl lg:text-5xl mb-6 block"
            />
            <Reveal variant="up" delay={0.3}>
              <p className="text-mute-2 text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
                Talk to our marine team for quotations, technical assistance or to discuss a vessel
                requirement. Enquiries are typically answered within the same working day — and
                emergency dispatch lines stay open around the clock.
              </p>
            </Reveal>

            <ul className="space-y-6 mb-10">
              <ContactRow icon={<FaMapMarkerAlt />} label="Office" delay={0.4}>
                240/A Sagar Complex, Jashonath Chowk,<br />
                Near Moti Baug,<br />
                Bhavnagar, Gujarat &mdash; 364001
              </ContactRow>
              <ContactRow icon={<FaPhoneAlt />} label="Phone" delay={0.55}>
                <a href="tel:+919825645515" className="text-white hover:text-[color:var(--color-brand-light)]">+91 98256 45515</a>
              </ContactRow>
              <ContactRow icon={<FaEnvelope />} label="Email" delay={0.7}>
                <a href="mailto:harbourlineshipmanagement@gmail.com" className="text-white hover:text-[color:var(--color-brand-light)] break-all">harbourlineshipmanagement@gmail.com</a>
              </ContactRow>
            </ul>

            <Reveal variant="up" delay={0.8}>
              <div className="border-t border-line pt-6">
                <p className="text-mute text-xs tracking-[3px] uppercase mb-4">Leadership</p>
                <ul className="space-y-3 text-sm">
                  <li className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-white font-semibold">Raees H. Saiyad</span>
                    <span className="text-mute-2">Director (India)</span>
                  </li>
                  <li className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-white font-semibold">Hasnain Velani</span>
                    <span className="text-mute-2">Director (India)</span>
                  </li>
                  <li className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-white font-semibold">Mayudin H. Saiyad</span>
                    <span className="text-mute-2">Director (UAE)</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <motion.form
            ref={cardRef}
            onSubmit={onSubmit}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            className="glass rounded-2xl p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full Name" name="name" type="text" />
              <Field label="Email" name="email" type="email" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Company" name="company" type="text" />
            </div>
            <Field label="Subject" name="subject" type="text" />
            <div>
              <label className="text-xs tracking-[2px] uppercase text-mute mb-2 block">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full bg-transparent border border-line rounded-lg px-4 py-3 text-white placeholder:text-mute focus:border-[color:var(--color-brand)] outline-none transition-colors resize-none"
                placeholder="Tell us about your requirement..."
              />
            </div>
            <MagneticButton type="submit" className="cta-primary w-full justify-center">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.span
                    key="ok"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    <FaCheck /> Message Sent
                  </motion.span>
                ) : (
                  <motion.span
                    key="send"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    Send Message <FaArrowRight />
                  </motion.span>
                )}
              </AnimatePresence>
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  delay,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="li" variant="up" delay={delay} className="flex items-start gap-4">
      <span className="w-12 h-12 rounded-full bg-[color:var(--color-brand)]/10 border border-[color:var(--color-brand)]/30 flex items-center justify-center text-[color:var(--color-brand-light)] shrink-0">
        {icon}
      </span>
      <div>
        <p className="text-mute text-xs tracking-[2px] uppercase mb-1">{label}</p>
        <p className="text-white">{children}</p>
      </div>
    </Reveal>
  );
}

function Field({ label, name, type }: { label: string; name: string; type: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <motion.label
        htmlFor={name}
        animate={{ color: focused ? '#018EDE' : '#8A93A1' }}
        className="text-xs tracking-[2px] uppercase mb-2 block"
      >
        {label}
      </motion.label>
      <input
        id={name}
        name={name}
        type={type}
        required
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border border-line rounded-lg px-4 py-3 text-white placeholder:text-mute focus:border-[color:var(--color-brand)] outline-none transition-colors"
        placeholder={label}
      />
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="absolute left-0 right-0 bottom-0 h-px bg-[color:var(--color-brand)] origin-left rounded"
      />
    </div>
  );
}
