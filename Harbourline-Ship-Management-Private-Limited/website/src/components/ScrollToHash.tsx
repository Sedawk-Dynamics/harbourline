import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * When the URL contains a hash (e.g. /#contact) scroll the matching element
 * into view after the page settles. Also handles cross-route navigation like
 * navigating from /products to /#contact.
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    // small delay to let lazy sections mount
    const t = window.setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 350);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);

  return null;
}
