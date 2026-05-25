import { useEffect } from 'react';

const SITE_NAME = 'Harbourline Ship Management';
const SITE_URL = 'https://harbourline.ae';
const DEFAULT_DESC =
  'Harbourline Ship Management — trusted supplier of marine main engine, auxiliary engine, automation, navigation and radar spares. Ship management, marine repairs and worldwide dispatch from Bhavnagar, India.';

type Meta = {
  /** Page title — `${title} | Harbourline Ship Management` will be set. Pass an empty string to leave it as the default. */
  title?: string;
  /** Meta description for SEO + social sharing. */
  description?: string;
  /** Canonical path (e.g. `/products`). Joined to SITE_URL. */
  path?: string;
};

/**
 * Lightweight SEO hook for the SPA. Updates the document title, the meta
 * description, the canonical link and the relevant Open Graph / Twitter tags
 * whenever a route renders. Restores the previous values on unmount so
 * sibling-route changes don't leak state.
 *
 * Kept dependency-free on purpose — pulling in react-helmet-async for a small
 * marketing site adds a runtime + provider for no real benefit.
 */
export function usePageMeta({ title, description, path }: Meta) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : document.title;
    const desc = description ?? DEFAULT_DESC;
    const url = path ? `${SITE_URL}${path}` : SITE_URL;

    const prevTitle = document.title;
    if (title) document.title = fullTitle;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
      if (!el) {
        // Create a fresh tag if one wasn't in the static HTML. Lets product /
        // service detail pages emit OG tags that weren't pre-rendered.
        const tag = selector.startsWith('link') ? 'link' : 'meta';
        el = document.createElement(tag) as HTMLMetaElement | HTMLLinkElement;
        const match = selector.match(/\[(.+?)="(.+?)"\]/);
        if (match) el.setAttribute(match[1], match[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', desc);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', desc);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', desc);

    return () => {
      if (title) document.title = prevTitle;
    };
  }, [title, description, path]);
}
