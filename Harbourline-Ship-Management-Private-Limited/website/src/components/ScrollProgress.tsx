import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin gradient progress bar at the very top of the viewport.
 * Width = page scroll position.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-gradient-to-r from-[color:var(--color-brand-dark)] via-[color:var(--color-brand)] to-[color:var(--color-brand-light)]"
    />
  );
}
