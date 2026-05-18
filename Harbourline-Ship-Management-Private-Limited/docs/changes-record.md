# Changes Record — Animation Overhaul

> Living map. Updated as each task is implemented.
> Status legend: `🆕 new` `✏️ modified` `🔁 rewritten` `🗑️ removed` `⏸ planned`

---

## Goals

- Heavy, polished animation throughout. The visual identity *depends on motion*.
- Recreate the wow-factor patterns from ntechshipcare.com (pinned scrub, horizontal product scroll, drag-swipe testimonials, marquee, animated counters, split-text headings).
- Respect `prefers-reduced-motion` — animations downgrade gracefully.
- Tree-shakeable libs only; no jQuery, no Bootstrap.

---

## Dependencies added

| Pkg | Why | Approx min+gz |
|---|---|---|
| `gsap` | ScrollTrigger pinned scrub for Why-Us, horizontal Products, horizontal Services; SplitText feel via custom char-by-char | ~35 KB |
| `swiper` | Testimonials drag carousel + 21-logo brand strip | ~17 KB |

Already in: `framer-motion`, `react-icons`, `react-intersection-observer` (now actually used).

Removed: none (kept `react-intersection-observer` — used by the count-up hook).

---

## Tokens & globals

| File | Status | Change |
|---|---|---|
| [index.html](../website/index.html) | ✏️ | Swapped Sora → **Hanken Grotesk** (single family, all weights) |
| [src/index.css](../website/src/index.css) | 🔁 | Brand swap `#0A93F1` → **`#018EDE`** (+ darker `#016BA8`, lighter `#4FB4F8`); font-family vars; new keyframes (`splitChar`, `revealMaskV`, `revealMaskH`, `floatY2`); new utility classes (`.h-display`, `.reveal-mask`, `.magnetic`, `.split-char`, `.section-eyebrow`, `.numeric-stroke`, `.btn-square`) |

---

## New files

| File | Purpose |
|---|---|
| [src/animations/useReducedMotion.ts](../website/src/animations/useReducedMotion.ts) | Detect OS reduced-motion pref; all animation hooks short-circuit when true |
| [src/animations/useGsapContext.ts](../website/src/animations/useGsapContext.ts) | Safe GSAP context per-component (auto cleanup) |
| [src/animations/SplitText.tsx](../website/src/animations/SplitText.tsx) | Character-by-character stagger reveal (framer) |
| [src/animations/Reveal.tsx](../website/src/animations/Reveal.tsx) | Generic enter-on-view wrapper (framer `whileInView`) |
| [src/animations/RevealMask.tsx](../website/src/animations/RevealMask.tsx) | Clip-path mask reveal for images & blocks |
| [src/animations/MagneticButton.tsx](../website/src/animations/MagneticButton.tsx) | Pointer-following CTA wrapper |
| [src/animations/CountUp.tsx](../website/src/animations/CountUp.tsx) | rAF-driven number tween triggered by intersection |
| [src/animations/Marquee.tsx](../website/src/animations/Marquee.tsx) | CSS-pure infinite scrolling row (pauses on hover) |
| [src/animations/PinnedScrubWhyUs.tsx](../website/src/animations/PinnedScrubWhyUs.tsx) | GSAP ScrollTrigger pin + scrub — visual side reveals as cards scroll |
| [src/animations/HorizontalScroll.tsx](../website/src/animations/HorizontalScroll.tsx) | GSAP ScrollTrigger pin + scrub — translates a row horizontally as page scrolls |
| [src/lib/images.ts](../website/src/lib/images.ts) | Curated marine image manifest + keyword-driven Unsplash Source fallbacks |
| [src/components/SmartImage.tsx](../website/src/components/SmartImage.tsx) | `<img>` with a fallback URL chain on `onError` |
| [src/components/ScrollProgress.tsx](../website/src/components/ScrollProgress.tsx) | Spring-driven gradient progress bar pinned to the top of the viewport |
| [src/components/CursorSpotlight.tsx](../website/src/components/CursorSpotlight.tsx) | Soft brand-blue blob that follows the cursor on desktop (mix-blend-screen) |
| [src/components/MascotCaptain.tsx](../website/src/components/MascotCaptain.tsx) | **Easter egg.** Inline-SVG captain that bobs, waves, blinks, and pops a speech bubble every ~14 s. Click → spawns rising bubbles. Dismissable. |

---

## Components touched

| Component | Status | Animations added | Depends on |
|---|---|---|---|
| [Preloader.tsx](../website/src/components/Preloader.tsx) | 🔁 | **Underwater dive intro**: descending ocean gradient, surface waves, sun-shafts piercing down, ~40 rising bubbles, silhouette fish swimming across mid-dive, then circular progress + word-mark reveal at the depths, then curtain slides up. ~3.6s total. | framer + CSS keyframes |
| [CustomCursor.tsx](../website/src/components/CustomCursor.tsx) | ✏️ | Adds `data-cursor-text` support; ring expands over magnetic targets | framer (vanilla rAF) |
| [TopBar.tsx](../website/src/components/TopBar.tsx) | ✏️ | Fade-down on mount; live time/date pill | framer |
| [Navbar.tsx](../website/src/components/Navbar.tsx) | 🔁 | Hide-on-scroll-down / show-on-scroll-up; menu open: bg-text "HARBOUR" letters slide in, links stagger, info-col fade; submenu state machine (Products / Services) with back nav | framer |
| [Hero.tsx](../website/src/components/Hero.tsx) | 🔁 | SplitText H1 char stagger; parallax bg (scroll-linked); watermark text drifts on scroll; CTAs are MagneticButtons; scroll cue bobs; particle layer | framer |
| [About.tsx](../website/src/components/About.tsx) | 🔁 | Reveal-mask image (clip-path open L→R), floating "Since 1998" badge, "Scroll to Explore" arrow bobs, CountUp stat row | framer + CountUp |
| [WhyUs.tsx](../website/src/components/WhyUs.tsx) | 🔁 | Wraps content in `<PinnedScrubWhyUs>` — left image pin + 4 step cards cross-fade on scroll; mobile falls back to vertical stack | GSAP ScrollTrigger |
| [Stats.tsx (MarqueeStrip)](../website/src/components/Stats.tsx) | ✏️ | Switch to `<Marquee>` primitive; gradient mask edges; pause on hover; rotating second message | CSS |
| [Products.tsx](../website/src/components/Products.tsx) | 🔁 | Wraps cards in `<HorizontalScroll>` — page scroll translates the card track on desktop; image zoom & overlay reveal on intersection; outline text headline | GSAP ScrollTrigger |
| [Services.tsx](../website/src/components/Services.tsx) | 🔁 | Same `<HorizontalScroll>` pattern; tiles flip number-to-arrow on hover; cursor changes to "Drag" while pinned | GSAP ScrollTrigger |
| [Projects.tsx (Testimonials)](../website/src/components/Projects.tsx) | 🔁 | Replaced custom slider with **Swiper** (drag, snap, pagination, autoplay, parallax content); image cross-fades between slides | Swiper |
| [Brands.tsx](../website/src/components/Brands.tsx) | 🔁 | **Swiper** infinite loop (autoplay no-pause, linear) of OEM logos; hover lifts a single logo | Swiper |
| [CTA.tsx](../website/src/components/CTA.tsx) | ✏️ | MagneticButton CTAs; bg parallax; SplitText headline; floating shapes | framer |
| [Contact.tsx](../website/src/components/Contact.tsx) | ✏️ | Field focus shimmer, glass card tilts on pointer move, submit animates the button morphing to ✓, RevealMask on icons | framer |
| [Footer.tsx](../website/src/components/Footer.tsx) | ✏️ | Stagger reveal of columns; link underline draw-in; subtle SVG noise wave divider | framer |
| [FloatingButtons.tsx](../website/src/components/FloatingButtons.tsx) | ✏️ | Tooltip on icon hover; WhatsApp pulse refined; theme toggle micro-rotate | framer |
| [ThemeProvider.tsx](../website/src/components/ThemeProvider.tsx) | — | unchanged |

---

## Reduced-motion behavior

- `useReducedMotion()` is read by every animation primitive.
- `<PinnedScrubWhyUs>` and `<HorizontalScroll>` skip GSAP entirely → render as plain vertical stack.
- `<SplitText>` short-circuits to a single fade-in.
- `<MagneticButton>` becomes a normal button (no pointer follow).
- `<Marquee>` switches `animation: none`.
- Floating/idle yoyo animations are paused (`Float`, `pulse-brand`, scroll-cue).

---

## Files NOT touched (intentional)

- `vite.config.ts` — no new plugins required.
- `tsconfig*.json` — no compiler changes.
- `eslint.config.js` — no rule changes.
- `main.tsx` — no provider changes (ThemeProvider is wrapped inside App).
- `public/*` — assets unchanged.

---

## Verify-in-browser checklist (final pass)

1. **Hero:** title appears char-by-char, watermark drifts, CTAs follow the cursor.
2. **About:** image opens like a curtain L→R; "Since 1998" badge floats.
3. **Why-Us:** scroll slowly — image pins while 4 cards rise into view in sequence.
4. **Marquee:** smooth left-scroll, pauses when you hover.
5. **Products row:** page scroll moves the row horizontally; row release lets vertical scroll resume.
6. **Services row:** same pattern, cursor reads "Drag".
7. **Testimonials:** drag the card to advance; pagination dots sync.
8. **Brands strip:** never stops, infinite loop, hover one logo → it lifts.
9. **CTA:** large title splits + reveals; primary button has a magnetic pull.
10. **Contact:** field labels float on focus; submit shows ✓.
11. **Footer:** columns stagger upward.
12. **Floating UI:** vertical FOLLOW US visible; theme toggle swaps theme + icon spins.
13. **Reduced motion:** enable OS pref — page renders normally with no scrolljacks.
