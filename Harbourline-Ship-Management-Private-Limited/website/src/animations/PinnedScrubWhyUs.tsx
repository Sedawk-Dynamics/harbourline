import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { gsap, ScrollTrigger } from './useGsapContext';
import { useReducedMotion } from './useReducedMotion';
import SmartImage from '../components/SmartImage';
import { IMG } from '../lib/images';

type Card = {
  n: string;
  title: string;
  body: string[];
};

type Props = {
  image: string;
  watermark?: string;
  intro: { eyebrow: string; title: ReactNode; body: string };
  cards: Card[];
};

// GSAP pin only runs at this width and above. Below this, render the stacked
// fallback so the content stays visible (otherwise the pw-step cards remain
// at opacity:0 forever on tablets/phones).
const PIN_MIN_WIDTH = '(min-width: 1024px)';

export default function PinnedScrubWhyUs({ image, watermark = 'HARBOUR', intro, cards }: Props) {
  const scope = useRef<HTMLDivElement>(null);
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
    if (!scope.current) return;
    if (reduced) return;
    if (!pinEligible) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(PIN_MIN_WIDTH, () => {
        const cardEls = gsap.utils.toArray<HTMLElement>('.pw-step');
        const total = cardEls.length;

        // Image: starts slightly inset + softly zoomed (NO heavy blur — the
        // image needs to be recognisable even before the user scrolls).
        gsap.set('.pw-img', { clipPath: 'inset(8% 8% 8% 8% round 12px)' });
        gsap.set('.pw-img img', { scale: 1.1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: `+=${(total + 1) * 90}%`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // 1) Image opens
        tl.to('.pw-img', { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.6 })
          .to('.pw-img img', { scale: 1, duration: 0.6 }, '<');

        // 2) Intro fades out as the first card enters
        tl.to('.pw-intro', { autoAlpha: 0, y: -30, duration: 0.6 }, '>+0.2');

        // 3) Cards fully cross-fade (no residual ghosts)
        cardEls.forEach((card, i) => {
          tl.fromTo(
            card,
            { autoAlpha: 0, y: 60 },
            { autoAlpha: 1, y: 0, duration: 0.7 },
            i === 0 ? '<' : '>+0.4',
          );
          // Fade out as the next one is about to enter, except for the last
          if (i < cardEls.length - 1) {
            tl.to(card, { autoAlpha: 0, y: -40, duration: 0.6 }, '>+0.4');
          }
        });
      });
    }, scope);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reduced, pinEligible]);

  // Mobile / tablet / reduced-motion fallback: vertical stack so that every
  // card is rendered with normal opacity. Without this, viewports below the
  // GSAP pin threshold leave the absolutely-positioned cards stuck at
  // opacity:0 (set inline for the pin animation) and the user sees nothing.
  if (reduced || !pinEligible) {
    return (
      <section id="why-us" className="surface text-fg">
        <div className="px-6 lg:px-10 py-16 max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <SmartImage src={image} fallback={[IMG.bulkCarrier, IMG.containerSailing]} alt="" className="w-full rounded-2xl" />
          <div>
            <span className="section-eyebrow mb-4 block">{intro.eyebrow}</span>
            <h2 className="h-display text-3xl sm:text-4xl mt-3 mb-5">{intro.title}</h2>
            <p className="text-mute-2 leading-relaxed mb-8">{intro.body}</p>
            {cards.map((c) => (
              <div key={c.n} className="mb-8 pb-8 border-b border-line last:border-0">
                <div className="numeric-fill text-3xl mb-2">{c.n}</div>
                <h3 className="h-display text-xl text-[color:var(--color-brand-light)] mb-3">{c.title}</h3>
                {c.body.map((p, i) => (
                  <p key={i} className="text-mute-2 mb-3">{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={scope} id="why-us" className="surface text-fg relative overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[100svh] max-w-[1600px] mx-auto">
        {/* Image side */}
        <div className="img-overlay relative h-[60svh] lg:h-[100svh] overflow-hidden">
          <div className="pw-img absolute inset-0">
            <SmartImage src={image} fallback={[IMG.bulkCarrier, IMG.containerSailing]} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/65" />
            <span className="watermark absolute bottom-6 left-6 text-[5rem] sm:text-[8rem] leading-none">{watermark}</span>
          </div>
        </div>

        {/* Content stack */}
        <div className="relative h-[60svh] lg:h-[100svh] flex items-center surface">
          <div className="relative w-full px-6 sm:px-10 lg:px-16 py-12">
            {/* Intro card */}
            <div className="pw-intro absolute inset-0 px-6 sm:px-10 lg:px-16 py-12 flex flex-col justify-center surface">
              <span className="section-eyebrow mb-4">{intro.eyebrow}</span>
              <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl text-fg max-w-lg">{intro.title}</h2>
              <p className="text-mute-2 mt-5 max-w-md leading-relaxed">{intro.body}</p>
              <span className="mt-8 text-[color:var(--color-brand-light)] text-sm font-semibold tracking-wide">
                Scroll to Explore ↓
              </span>
            </div>

            {/* Step cards — each fully opaque so they cover the previous one */}
            {cards.map((c, i) => (
              <div
                key={c.n}
                className="pw-step absolute inset-0 px-6 sm:px-10 lg:px-16 py-12 flex flex-col justify-center surface"
                style={{ opacity: 0, zIndex: 10 + i }}
              >
                <div className="numeric-fill text-4xl sm:text-5xl mb-4">{c.n}</div>
                <h3 className="h-display text-2xl sm:text-3xl lg:text-4xl text-[color:var(--color-brand-light)] mb-5 max-w-lg">
                  {c.title}
                </h3>
                <div className="max-w-md">
                  {c.body.map((p, j) => (
                    <p key={j} className="text-mute-2 leading-relaxed mb-3">{p}</p>
                  ))}
                </div>
                <div className="mt-6 h-px w-32 bg-[color:var(--color-brand)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
