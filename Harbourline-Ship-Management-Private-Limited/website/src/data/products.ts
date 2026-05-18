import { IMG } from '../lib/images';

export type Product = {
  slug: string;
  title: string;
  short: string;          // shown on cards
  long: string[];         // shown on detail page
  highlights: string[];   // bullet list on detail page
  image: string;
  fallback: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: 'main-engine-parts-2-stroke',
    title: 'Main Engine Parts (2 stroke)',
    short:
      'Genuine and reconditioned 2-stroke main-engine spares for MAN B&W, Sulzer, Wärtsilä and Mitsubishi — pistons, liners, covers, fuel pumps, turbochargers and complete overhaul kits.',
    long: [
      'We specialise in supplying a comprehensive range of 2-stroke main-engine spares and components for marine applications. These engines are the backbone of large commercial vessels — delivering high efficiency, reliability and continuous power for propulsion.',
      'Our inventory covers critical components for leading engine brands including MAN B&W, Sulzer and Mitsubishi. We supply new, reconditioned and reusable parts, sourced from trusted manufacturers and ship-recycling yards like Alang — providing cost-effective and dependable solutions for shipowners and operators.',
      'All components are inspected and tested to meet marine industry standards, ensuring optimal performance and long service life even under demanding operating conditions.',
    ],
    highlights: [
      'Cylinder liners, covers and heads',
      'Pistons, piston rings and crowns',
      'Fuel pumps, plungers and barrels',
      'Turbochargers (ABB, MET, Napier, KBB)',
      'Bearings, gaskets, valve seats',
      'Complete overhaul kits',
    ],
    image: IMG.twoStrokeEngine,
    fallback: [IMG.engineRoom, IMG.shipMachine],
  },
  {
    slug: 'auxiliary-engines-4-stroke',
    title: 'Auxiliary Engines (4 stroke)',
    short:
      'Spares and components for Yanmar, Daihatsu, Wärtsilä, MAN and Caterpillar 4-stroke engines — supporting reliable onboard power generation across vessel classes.',
    long: [
      'We offer a wide range of 4-stroke auxiliary-engine spares and components designed to support reliable onboard power generation and efficient vessel operation. Auxiliary engines play a critical role in supplying electrical power for essential systems — lighting, navigation, cargo handling and onboard equipment.',
      'We supply high-quality parts for leading marine-engine makers including Yanmar, Daihatsu, Wärtsilä, MAN and Caterpillar. Our inventory includes new, reconditioned and reusable components.',
      'Every component is inspected and tested to meet marine industry standards.',
    ],
    highlights: [
      'Cylinder heads, liners, pistons',
      'Fuel injection equipment',
      'Crankshafts and bearings',
      'Cooling water pumps',
      'Governor systems',
      'Turbocharger spares',
    ],
    image: IMG.shipMachine,
    fallback: [IMG.engineRoom, IMG.twoStrokeEngine],
  },
  {
    slug: 'automation',
    title: 'Automation',
    short:
      'Curated automation solutions: intelligent control, monitoring and operational efficiency across vessels, offshore assets and industrial systems.',
    long: [
      'At Harbourline, automation is not just a category — it is the backbone of modern marine and industrial operations. Our automation-solutions portfolio is curated to deliver intelligent control, operational efficiency and uncompromising reliability across vessels, offshore assets and industrial systems.',
      'We supply both new and reconditioned automation components from trusted brands. All units are tested and ready for installation.',
    ],
    highlights: [
      'Engine monitoring & control systems',
      'Alarm & safety panels',
      'Remote control equipment',
      'PLC-based automation',
      'Integrated bridge systems',
      'Cargo monitoring systems',
    ],
    image: IMG.automation,
    fallback: [IMG.pcb, IMG.navigation],
  },
  {
    slug: 'pcb-plc',
    title: "PCB's & PLC's",
    short:
      'Programmable Logic Controllers and Printed Circuit Boards tailored for marine and industrial applications — both new and reconditioned, sourced from trusted manufacturers.',
    long: [
      'We offer a comprehensive range of PLC (Programmable Logic Controller) and PCB (Printed Circuit Board) solutions tailored for marine and industrial applications. These components play a critical role in ensuring reliable automation, control and monitoring of vessel systems.',
      'Our PLC range includes advanced control units used in engine automation, alarm-monitoring systems, cargo-handling operations and auxiliary machinery control. Designed for precision and durability.',
      'We also supply high-quality PCBs including control boards, interface modules, power boards and customised circuit solutions.',
    ],
    highlights: [
      'Engine-automation PLCs',
      'Alarm-monitoring PCBs',
      'Cargo handling controllers',
      'Power & interface boards',
      'Custom PCB solutions',
      'Reconditioned units with QC reports',
    ],
    image: IMG.pcb,
    fallback: [IMG.automation, IMG.navigation],
  },
  {
    slug: 'marine-radar-navigation',
    title: 'Marine Radar & Navigation',
    short:
      'Radar systems, autopilot units and navigation equipment — Furuno, JRC, Kelvin Hughes, Simrad. Scanners, transceivers, magnetrons, control panels and PCBs.',
    long: [
      'We specialise in supplying marine radar systems, autopilot units and navigation equipment spares — sourced directly from trusted channels including the renowned Alang ship-recycling yard, one of the world\'s largest ship-recycling hubs.',
      'Our extensive inventory includes complete radar systems and critical spare parts such as scanners, transceivers, display units, magnetrons, control panels and radar PCBs. We also offer a wide range of autopilot systems, gyrocompasses, GPS units, ECDIS components, speed logs and other essential bridge navigation equipment.',
      'All equipment is carefully inspected and tested to ensure operational reliability and compliance with marine standards. We support a wide range of leading marine brands such as Furuno, JRC, Kelvin Hughes, Simrad and more.',
    ],
    highlights: [
      'Complete radar systems',
      'Scanners, transceivers, magnetrons',
      'Autopilot systems & gyrocompasses',
      'GPS, ECDIS, AIS, speed logs',
      'Radar PCBs and control panels',
      'Furuno, JRC, Kelvin Hughes, Simrad',
    ],
    image: IMG.navigation,
    fallback: [IMG.automation, IMG.shipPort],
  },
  {
    slug: 'turbochargers',
    title: 'Turbochargers',
    short:
      'Reconditioned and used turbochargers from ABB, Napier, MET, KBB — tested, balanced and ready to ship with full documentation.',
    long: [
      'Reconditioned and used turbochargers from the world\'s leading OEMs — ABB, Napier, MET and KBB. Each unit is dismantled, inspected, balanced and reassembled to original tolerances by experienced engineers.',
      'Every shipped turbo includes test reports and balancing certificates. We also supply a full range of replacement spares: rotors, nozzle rings, bearings and seals.',
    ],
    highlights: [
      'ABB, Napier, MET, KBB turbos',
      'Dismantled, inspected, balanced',
      'Test reports + balancing certificates',
      'Rotors and nozzle rings',
      'Bearings, seals and gaskets',
      'Cylinder liners and casings',
    ],
    image: IMG.engineRoom,
    fallback: [IMG.shipMachine, IMG.twoStrokeEngine],
  },
];

export const findProduct = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);
