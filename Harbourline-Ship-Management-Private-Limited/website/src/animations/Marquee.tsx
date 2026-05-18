import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  speedSeconds?: number;
  reverse?: boolean;
  className?: string;
  fade?: boolean;
};

export default function Marquee({
  children,
  speedSeconds = 30,
  reverse = false,
  className = '',
  fade = true,
}: Props) {
  const style = {
    animationDuration: `${speedSeconds}s`,
    animationDirection: reverse ? 'reverse' : 'normal',
  } as React.CSSProperties;

  const mask = fade
    ? {
        WebkitMaskImage:
          'linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)',
        maskImage:
          'linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)',
      }
    : {};

  return (
    <div className={`overflow-hidden ${className}`} style={mask as React.CSSProperties}>
      <div className="marquee-track" style={style}>
        {children}
        {children}
      </div>
    </div>
  );
}
