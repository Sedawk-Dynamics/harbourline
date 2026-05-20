import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark, FaArrowRight } from 'react-icons/fa6';
import { HiOutlineCubeTransparent } from 'react-icons/hi2';
import ComingSoon from './ComingSoon';
import { useReducedMotion } from '../animations/useReducedMotion';

const STORAGE_KEY = 'hb-coming-soon-popup-seen';

type Props = {
  /** Delay (ms) before the popup appears after mount */
  appearAfterMs?: number;
  /** Auto-dismiss timeout (ms). Set 0 to disable auto-dismiss. */
  autoDismissMs?: number;
};

/**
 * Premium one-shot "Coming Soon" announcement.
 *
 * Sits centred on the viewport with a softly-blurred backdrop. Shows once per
 * browser session (gated via sessionStorage), appears 1.6s after mount so it
 * doesn't collide with the preloader exit, and auto-dismisses after ~8s so it
 * never blocks the user. Dismiss button + backdrop click also close it.
 *
 * Respects prefers-reduced-motion.
 */
export default function ComingSoonPopup({
  appearAfterMs = 1600,
  autoDismissMs = 8000,
}: Props) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === '1') return;

    const showT = window.setTimeout(() => {
      setOpen(true);
      window.sessionStorage.setItem(STORAGE_KEY, '1');
    }, appearAfterMs);

    return () => window.clearTimeout(showT);
  }, [appearAfterMs]);

  // Auto-dismiss after the configured timeout
  useEffect(() => {
    if (!open || !autoDismissMs) return;
    const dismissT = window.setTimeout(() => setOpen(false), autoDismissMs);
    return () => window.clearTimeout(dismissT);
  }, [open, autoDismissMs]);

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cs-popup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[120] flex items-center justify-center px-6"
          aria-modal="true"
          role="dialog"
          aria-labelledby="cs-popup-title"
        >
          {/* Backdrop */}
          <button
            aria-label="Close announcement"
            onClick={close}
            className="absolute inset-0 bg-[rgba(11,15,20,0.65)] backdrop-blur-md cursor-default"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 14 }}
            transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1] }}
            className="relative w-full max-w-md rounded-2xl border overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
            style={{
              background:
                'linear-gradient(160deg, rgba(17,22,29,0.95) 0%, rgba(7,56,90,0.92) 60%, rgba(1,107,168,0.85) 100%)',
              borderColor: 'rgba(79,180,248,0.35)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
            }}
          >
            {/* Top gradient hairline */}
            <span
              aria-hidden
              className="absolute top-0 inset-x-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(79,180,248,0.9), transparent)',
              }}
            />

            {/* Ambient orbs */}
            {!reduced && (
              <>
                <div
                  className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(79,180,248,0.4), transparent 70%)',
                    filter: 'blur(8px)',
                  }}
                />
                <div
                  className="absolute -bottom-20 -left-12 w-48 h-48 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(244,180,0,0.25), transparent 70%)',
                    filter: 'blur(10px)',
                  }}
                />
              </>
            )}

            {/* Slow rotating compass ring */}
            {!reduced && (
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-dashed border-[color:var(--color-brand-light)]/25 pointer-events-none"
              />
            )}

            {/* Close button */}
            <button
              aria-label="Dismiss"
              onClick={close}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors"
            >
              <FaXmark className="text-sm" />
            </button>

            {/* Diagonal sheen — runs once just after open */}
            {!reduced && (
              <motion.span
                aria-hidden
                className="absolute top-0 bottom-0 w-1/3 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
                  transform: 'skewX(-18deg)',
                  mixBlendMode: 'screen',
                }}
                initial={{ left: '-40%' }}
                animate={{ left: ['-40%', '140%'] }}
                transition={{ duration: 2.6, ease: 'easeInOut', delay: 0.4 }}
              />
            )}

            <div className="relative z-10 p-8 sm:p-10 text-white text-center">
              {/* Icon medallion */}
              <div className="mx-auto w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5 relative">
                <HiOutlineCubeTransparent className="text-3xl text-[color:var(--color-brand-light)]" />
                {!reduced && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-2xl border border-[color:var(--color-brand-light)]"
                    animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </div>

              <div className="flex justify-center mb-4">
                <ComingSoon variant="chip" tone="brand" label="Coming Soon" eta="Q2 2026" />
              </div>

              <h2
                id="cs-popup-title"
                className="h-display text-2xl sm:text-3xl mb-3 leading-tight"
              >
                Online Spare-Parts Portal,
                <br />
                <span className="text-[color:var(--color-brand-light)]">launching soon.</span>
              </h2>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
                Live inventory, photograph-on-request and same-watch quotations &mdash; built for
                chief engineers and superintendents. Be the first to get access.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#contact"
                  onClick={close}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white text-[color:var(--color-ink)] font-bold text-sm hover:bg-[color:var(--color-brand-light)] transition-colors"
                >
                  Get Early Access <FaArrowRight />
                </a>
                <button
                  onClick={close}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Maybe Later
                </button>
              </div>

              {/* Auto-dismiss countdown hairline */}
              {!reduced && autoDismissMs > 0 && (
                <div className="mt-7 h-px bg-white/10 overflow-hidden rounded-full">
                  <motion.span
                    className="block h-full"
                    style={{
                      background:
                        'linear-gradient(90deg, var(--color-brand-light), #fff, var(--color-brand))',
                      boxShadow: '0 0 10px rgba(79,180,248,0.7)',
                    }}
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: autoDismissMs / 1000, ease: 'linear' }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
