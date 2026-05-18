import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa6';
import Marquee from '../animations/Marquee';

const items: ReadonlyArray<{ type: 'text' | 'dot' | 'phone' | 'email'; value?: string }> = [
  { type: 'text', value: 'Navigating Excellence Across Oceans' },
  { type: 'dot' },
  { type: 'text', value: 'Your Trusted Marine Partner Worldwide' },
  { type: 'dot' },
  { type: 'text', value: 'Fast Worldwide Delivery' },
  { type: 'phone', value: '+91 9825 645515' },
  { type: 'email', value: 'info@harbourline.com' },
];

export default function MarqueeStrip() {
  const block = (
    <>
      {items.map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-3 text-sm sm:text-base font-bold uppercase tracking-[3px] whitespace-nowrap"
        >
          {item.type === 'text' && item.value}
          {item.type === 'dot' && <FaCircle className="text-[10px] opacity-70" />}
          {item.type === 'phone' && (
            <>
              <FaPhoneAlt className="text-xs" />
              {item.value}
            </>
          )}
          {item.type === 'email' && (
            <>
              <FaEnvelope className="text-xs" />
              {item.value}
            </>
          )}
          <FaCircle className="text-[8px] opacity-60 ml-3" />
        </span>
      ))}
    </>
  );

  return (
    <section className="dark-zone bg-[color:var(--color-brand)] text-white border-y border-[color:var(--color-brand-dark)]">
      <Marquee speedSeconds={28} fade={false} className="py-4">
        {block}
      </Marquee>
    </section>
  );
}
