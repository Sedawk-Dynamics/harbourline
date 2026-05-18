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
    slug: 'emergency-yanmar-n18-delivery',
    title: 'Emergency Midnight Delivery of Yanmar N-18 Engine Spares',
    tag: 'Emergency Supply',
    date: 'January 27, 2026',
    readingTime: '4 min read',
    body: [
      'Harbourline successfully executed a critical, time-sensitive supply operation involving Yanmar N-18 engine spares for a vessel requiring immediate technical support. The request was received at short notice, with the vessel operating under strict departure timelines.',
      'Our team rapidly arranged sourcing of the required Yanmar N-18 spares, ensuring all components met marine-grade quality standards and were ready for immediate dispatch. Through efficient coordination with suppliers, logistics providers and port authorities, we organised seamless delivery despite late-hour operational constraints.',
      'The consignment was delivered at midnight directly to the vessel, ensuring uninterrupted operations and avoiding any delay in the vessel\'s schedule. This project demonstrates our capability to handle urgent requirements with precision, speed and reliability.',
    ],
    images: [
      { src: IMG.engineRoom, fallback: [IMG.shipMachine, IMG.twoStrokeEngine] },
      { src: IMG.shipMachine, fallback: [IMG.engineRoom] },
      { src: IMG.portTerminal, fallback: [IMG.portCranes] },
    ],
  },
  {
    slug: 'deendayal-port-vessel-supply',
    title: 'Vessel Supply Operation — Main Engine Spares, Pump, Battery & Technical Stores at Deendayal Port',
    tag: 'Vessel Supply',
    date: 'February 22, 2026',
    readingTime: '5 min read',
    body: [
      'Harbourline successfully carried out a critical and time-sensitive vessel-supply operation at the Oil Jetty Complex, Deendayal Port — delivering essential main-engine spares along with auxiliary equipment and ship stores to ensure uninterrupted vessel operations.',
      'The scope included main engine components, a marine pump, industrial batteries and necessary stationery items. These components are vital for the vessel\'s propulsion system and onboard operations, making timely delivery crucial to avoid downtime.',
      'Our team handled the entire process — from urgent sourcing and quality checks to secure packing and port delivery — with high efficiency. All equipment was packed in robust wooden export crates to ensure protection against handling and environmental conditions during transit.',
      'Upon arrival at the port, we coordinated closely with port authorities and vessel crew to execute safe and efficient onboard delivery. The operation was completed within tight timelines, demonstrating our capability to manage high-priority marine logistics under pressure.',
    ],
    images: [
      { src: IMG.portCranes, fallback: [IMG.portTerminal] },
      { src: IMG.containerSailing, fallback: [IMG.cargoAerial] },
      { src: IMG.shipPort, fallback: [IMG.bulkCarrier] },
    ],
  },
  {
    slug: 'mediterranean-overhaul-kits',
    title: 'Bulk Supply of Overhaul Kits to Mediterranean Fleet',
    tag: 'Bulk Supply',
    date: 'March 14, 2026',
    readingTime: '3 min read',
    body: [
      'Coordinated a multi-port supply of complete cylinder-head overhaul kits to four bulk carriers operating in the Mediterranean. The owner needed kits delivered before each vessel\'s next dry-dock window — a tight 6-week schedule across three different ports.',
      'Harbourline sourced and consolidated the kits in Bhavnagar, performed pre-shipment inspections, and arranged staggered air-freight dispatches to Piraeus, Genoa and Limassol — each timed to land 48 hours before the respective vessel\'s arrival.',
      'All four vessels completed their dry-dock work on schedule with zero delays attributable to spares supply.',
    ],
    images: [
      { src: IMG.cargoAerial, fallback: [IMG.bulkCarrier] },
      { src: IMG.portTerminal, fallback: [IMG.shipPort] },
    ],
  },
];

export const findProject = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);
