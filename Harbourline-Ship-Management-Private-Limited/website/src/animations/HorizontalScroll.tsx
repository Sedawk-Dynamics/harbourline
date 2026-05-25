import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { gsap, ScrollTrigger } from './useGsapContext';
import { useReducedMotion } from './useReducedMotion';

// GSAP pin-and-scrub only activates at this width. Below this we must let the
// user scroll the track horizontally themselves, otherwise the cards beyond
// the first one or two are clipped by the outer `overflow-hidden` and become
// unreachable.
const PIN_MIN_WIDTH = '(min-width: 1024px)';

type Props = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  /** padding-right of the track, in px, so the last card breathes */
  endPadding?: number;
};

/**
 * Wraps a row of cards. On desktop, page scroll is converted to horizontal
 * translation of the inner track while the section is pinned. On mobile or
 * reduced-motion, the row becomes a horizontally scrollable strip.
 */
export default function HorizontalScroll({
  children,
  className = '',
  trackClassName = '',
  endPadding = 80,
}: Props) {
  const scope = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [pinEligible, setPinEligible] = useState<boolean>(() =>
    typeof window !== 'undefined' && window.matchMedia(PIN_MIN_WIDTH).matches,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(PIN_MIN_WIDTH);
    setPinEligible(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPinEligible(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!scope.current || !track.current) return;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(PIN_MIN_WIDTH, () => {
        const trackEl = track.current!;
        const distance = () => trackEl.scrollWidth - window.innerWidth + endPadding;

        gsap.to(trackEl, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
    }, scope);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reduced, endPadding]);

  // Below the pin threshold (or with reduced motion) the GSAP scrub never
  // engages, so the track must be natively scrollable — otherwise every card
  // past the first is hidden behind the outer `overflow-hidden`.
  const allowSwipe = reduced || !pinEligible;
  const outerOverflow = allowSwipe ? 'overflow-visible' : 'overflow-hidden';
  const trackOverflow = allowSwipe ? 'overflow-x-auto snap-x snap-mandatory' : 'will-change-transform';

  return (
    <div ref={scope} className={`relative ${outerOverflow} ${className}`}>
      <div
        ref={track}
        className={`flex gap-6 ${trackOverflow} ${trackClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
