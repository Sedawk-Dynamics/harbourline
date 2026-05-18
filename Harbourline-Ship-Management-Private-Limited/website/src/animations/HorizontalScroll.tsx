import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap, ScrollTrigger } from './useGsapContext';
import { useReducedMotion } from './useReducedMotion';

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

  useEffect(() => {
    if (!scope.current || !track.current) return;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 992px)', () => {
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

  return (
    <div ref={scope} className={`relative overflow-hidden ${className}`}>
      <div
        ref={track}
        className={`flex gap-6 ${reduced ? 'overflow-x-auto snap-x snap-mandatory' : 'will-change-transform'} ${trackClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
