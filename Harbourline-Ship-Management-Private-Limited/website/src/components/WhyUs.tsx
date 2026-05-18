import PinnedScrubWhyUs from '../animations/PinnedScrubWhyUs';

const cards = [
  {
    n: '01',
    title: 'Unmatched Quality & International Standards',
    body: [
      'Every marine spare we supply is sourced from certified manufacturers and trusted suppliers compliant with international marine and industrial standards. Each product undergoes thorough inspection for durability, precision, and consistent performance under harsh marine conditions.',
      'Our commitment to quality reduces equipment failure, minimizes downtime and enhances vessel safety — making us a dependable partner for owners, operators and engineers.',
    ],
  },
  {
    n: '02',
    title: 'Customer-Focused Service & Transparent Communication',
    body: [
      'We prioritize long-term partnerships over short-term transactions. Our customer-centric approach is built on honesty, transparency, and a deep understanding of operational needs.',
      'Our responsive support team ensures clear communication, quick quotations and continuous assistance throughout the order lifecycle — resulting in high client satisfaction and trust.',
    ],
  },
  {
    n: '03',
    title: 'Cost-Effective Solutions Without Compromising Quality',
    body: [
      'Through optimized sourcing strategies and strong supplier relationships, we provide premium-grade marine spares at competitive and fair market prices.',
      'Our pricing model is transparent: customers receive maximum value for their investment while we maintain strict quality standards.',
    ],
  },
  {
    n: '04',
    title: 'Global Reach with Fast Worldwide Delivery',
    body: [
      'Our logistics network spans major ports across the world. We ship critical spares quickly and safely — air, sea or courier — so your vessels never wait.',
      'We coordinate documentation, customs and last-mile delivery end-to-end to keep your operations on schedule.',
    ],
  },
];

export default function WhyUs() {
  return (
    <PinnedScrubWhyUs
      image="https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=1600&q=80&auto=format&fit=crop"
      watermark="HARBOUR"
      intro={{
        eyebrow: 'Why Choose Us',
        title: (
          <>
            Trusted Marine Spares,{' '}
            <span className="text-[color:var(--color-brand-light)]">Engineered</span> for Performance
            &amp; Reliability
          </>
        ),
        body:
          'We are a dedicated marine spares supplier committed to delivering reliable, high-quality components that meet the demanding requirements of the marine industry. From routine maintenance parts to critical replacements, we deliver excellence at every stage.',
      }}
      cards={cards}
    />
  );
}
