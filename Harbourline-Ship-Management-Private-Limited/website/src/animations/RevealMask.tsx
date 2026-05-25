import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useReducedMotion } from './useReducedMotion';

type Props = {
  children: ReactNode;
  direction?: 'h' | 'v';
  className?: string;
};

export default function RevealMask({ children, direction = 'h', className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion / SSR safety: just reveal immediately.
    if (reduced || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in');
      return;
    }

    // The element may already be in the viewport when this effect runs
    // (e.g. on a route landing scrolled past the hero, or when the parent's
    // height was 0 during the initial observe and only became real on a
    // later layout pass). Check synchronously so the SVG isn't held behind
    // a clip-path that never animates.
    const inViewport = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      return r.bottom > 0 && r.right > 0 && r.top < vh && r.left < vw;
    };
    if (inViewport()) {
      el.classList.add('is-in');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.disconnect();
          }
        });
      },
      // `threshold: 0` — fire as soon as any pixel intersects. The previous
      // 0.2 threshold could miss tall elements that scrolled past quickly,
      // and left them clipped forever.
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);

    // Hard fallback: if the observer never fires within 3s (bad layout
    // timings, browser bugs, animations pushing the element offscreen),
    // reveal the content anyway. Better visible than invisible.
    const fallback = window.setTimeout(() => {
      el.classList.add('is-in');
      io.disconnect();
    }, 3000);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [reduced]);

  const maskClass = direction === 'v' ? 'reveal-mask-v' : 'reveal-mask';
  return (
    <div ref={ref} className={`${maskClass} ${className}`}>
      {children}
    </div>
  );
}
