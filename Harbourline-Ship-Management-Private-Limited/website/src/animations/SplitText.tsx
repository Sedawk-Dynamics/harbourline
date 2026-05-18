import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

type Props = {
  text: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'div';
  className?: string;
  charClassName?: string;
  staggerMs?: number;
  delayMs?: number;
  trigger?: 'mount' | 'view';
};

/**
 * Character-by-character reveal. Implemented with framer-motion so the
 * animation state is React-managed and survives parent re-renders.
 * No imperative classList tricks, no useEffect race conditions.
 */
export default function SplitText({
  text,
  as = 'span',
  className = '',
  charClassName = '',
  staggerMs = 28,
  delayMs = 0,
  trigger = 'view',
}: Props) {
  const reduced = useReducedMotion();

  // Each character animates from below (translateY 100%, opacity 0) into place.
  // The parent runs the stagger via `staggerChildren`.
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delayMs / 1000,
        staggerChildren: staggerMs / 1000,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { y: '110%', opacity: 0 },
    visible: { y: '0%', opacity: 1, transition: { duration: 0.7, ease: [0.2, 0.7, 0.3, 1] } },
  };

  // Reduced-motion → render the title as plain text, no animation.
  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  // Split into words → chars to preserve word wrapping. Whitespace tokens
  // are emitted as plain spans so they don't get animated.
  const words = text.split(/(\s+)/);

  const inner = (
    <>
      {words.map((w, wi) => {
        if (/^\s+$/.test(w)) {
          return <span key={`s-${wi}`} aria-hidden>{' '}</span>;
        }
        return (
          <span
            key={`w-${wi}`}
            className="inline-flex flex-wrap overflow-hidden align-bottom"
          >
            {Array.from(w).map((ch, ci) => (
              <motion.span
                key={`c-${wi}-${ci}`}
                variants={charVariants}
                className={`inline-block ${charClassName}`}
                style={{ willChange: 'transform, opacity' }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        );
      })}
    </>
  );

  // Triggering — animate on mount or when first scrolled into view
  const motionProps =
    trigger === 'mount'
      ? { initial: 'hidden', animate: 'visible' }
      : { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.2 } };

  // Render as the appropriate tag, with aria-label preserving the original
  // text for screen readers (chars are aria-hidden visually).
  const sharedProps = {
    variants: containerVariants,
    ...motionProps,
    className,
    'aria-label': text,
  };

  if (as === 'h1')   return <motion.h1   {...sharedProps}><span aria-hidden>{inner}</span></motion.h1>;
  if (as === 'h2')   return <motion.h2   {...sharedProps}><span aria-hidden>{inner}</span></motion.h2>;
  if (as === 'h3')   return <motion.h3   {...sharedProps}><span aria-hidden>{inner}</span></motion.h3>;
  if (as === 'div')  return <motion.div  {...sharedProps}><span aria-hidden>{inner}</span></motion.div>;
  return <motion.span {...sharedProps}><span aria-hidden>{inner}</span></motion.span>;
}
