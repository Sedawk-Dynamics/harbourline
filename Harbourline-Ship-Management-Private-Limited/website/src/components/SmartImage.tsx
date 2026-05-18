import { useState } from 'react';
import type { ImgHTMLAttributes } from 'react';
import { FALLBACK_IMG } from '../lib/images';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> & {
  src: string;
  /** One or more URLs to try in order before giving up and using FALLBACK_IMG. */
  fallback?: string | string[];
};

/**
 * <img> with a built-in onError fallback chain.
 *
 *   <SmartImage src={primary} fallback={[backup1, backup2]} ... />
 *
 * If the primary 404s or is blocked, we try each fallback in turn, then
 * settle on FALLBACK_IMG (a guaranteed-working marine photo).
 */
export default function SmartImage({ src, fallback, alt = '', ...rest }: Props) {
  const chain = [
    src,
    ...(Array.isArray(fallback) ? fallback : fallback ? [fallback] : []),
    FALLBACK_IMG,
  ];
  const [idx, setIdx] = useState(0);

  return (
    <img
      src={chain[idx]}
      alt={alt}
      onError={() => {
        if (idx < chain.length - 1) setIdx(idx + 1);
      }}
      {...rest}
    />
  );
}
