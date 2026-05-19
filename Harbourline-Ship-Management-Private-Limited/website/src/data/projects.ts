import { IMG } from '../lib/images';

export type Project = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  readingTime: string;
  body: string[];
  images: { src: string; fallback: string[] }[];
};

export const PROJECTS: Project[] = [
  {
    slug: 'yanmar-n18-emergency-spares',
    title: 'Overnight Supply of Yanmar N-18 Auxiliary Engine Spares',
    tag: 'Emergency Supply',
    date: 'January 27, 2026',
    readingTime: '4 min read',
    body: [
      'An owner reached out late in the evening with a partially failed Yanmar N-18 auxiliary generator on a vessel due to sail at first light. The requirement was a specific set of cylinder head, valve and fuel injection components — and the vessel could not depart without a working second auxiliary.',
      'Harbourline cross-checked the engine particulars against our existing stock, photographed the matching parts within the hour, and arranged a road dispatch from Bhavnagar so the consignment reached the berth before the vessel\'s scheduled departure window.',
      'The vessel sailed on time, with the standby auxiliary back online and a workshop sign-off attached to the spare units. The case is now part of how we triage emergency calls — confirm fit by photograph first, dispatch second, paperwork in parallel.',
    ],
    images: [
      { src: IMG.project1a, fallback: [IMG.inspection, IMG.fallbackEngine] },
      { src: IMG.project1b, fallback: [IMG.engineRoom, IMG.fallbackEngine] },
      { src: IMG.project1c, fallback: [IMG.portCranes, IMG.fallbackPort] },
    ],
  },
  {
    slug: 'deendayal-port-vessel-supply',
    title: 'Main Engine Spares, Pump & Stores Delivery — Deendayal Port',
    tag: 'Vessel Supply',
    date: 'February 22, 2026',
    readingTime: '5 min read',
    body: [
      'A regular client called for a coordinated vessel supply at the Oil Jetty Complex, Deendayal (Kandla) Port — main engine spares for a planned in-port overhaul, a replacement marine pump, industrial-grade batteries and a bundle of ship stores, all to be delivered before the vessel\'s next sailing.',
      'Harbourline sourced and consolidated the items in our Bhavnagar facility, completed dimensional and visual checks on the main engine spares, and packed the consignment in export-grade wooden crates lined for shock and moisture. The pump and batteries were crated separately with marine-grade desiccant.',
      'Our team coordinated with port authorities, the local agent and the vessel\'s chief engineer to time the gangway delivery to the working watch. The handover was completed inside the planned port stay, and the engine work was carried out without any spares-related delay.',
    ],
    images: [
      { src: IMG.project2a, fallback: [IMG.shipPort, IMG.bulkCarrier] },
      { src: IMG.project2b, fallback: [IMG.portTerminal, IMG.fallbackPort] },
      { src: IMG.project2c, fallback: [IMG.containerSailing, IMG.oceanWaves] },
    ],
  },
  {
    slug: 'mediterranean-overhaul-kits',
    title: 'Phased Supply of Cylinder Head Overhaul Kits — Mediterranean Fleet',
    tag: 'Fleet Supply',
    date: 'March 14, 2026',
    readingTime: '3 min read',
    body: [
      'A fleet operator running four bulk carriers in the Mediterranean needed cylinder head overhaul kits aligned to each vessel\'s upcoming dry-dock window — a tight schedule spanning six weeks and three different European ports.',
      'Harbourline consolidated the kits in Bhavnagar, ran pre-shipment inspections on every cover, valve and gasket set, and arranged staggered air freight dispatches to Piraeus, Genoa and Limassol — each timed to arrive 48 hours ahead of the respective vessel.',
      'All four vessels completed their dry-dock work on schedule with no delays attributable to spares supply. The fleet operator now treats Harbourline as a default first call for similar planned scopes.',
    ],
    images: [
      { src: IMG.project3a, fallback: [IMG.cargoAerial, IMG.bulkCarrier] },
      { src: IMG.project3b, fallback: [IMG.fallbackPort, IMG.portTerminal] },
      { src: IMG.project3c, fallback: [IMG.shipRepair, IMG.endToEnd] },
    ],
  },
];

export const findProject = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);
