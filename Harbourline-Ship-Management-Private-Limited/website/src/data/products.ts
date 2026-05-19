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
    slug: 'main-engine-2-stroke',
    title: 'Main Engine Spares (2-Stroke)',
    short:
      'Genuine and reconditioned 2-stroke main engine spares for MAN B&W, Sulzer, Wartsila and Mitsubishi propulsion units — pistons, liners, cylinder covers, fuel pumps, turbocharger components and complete overhaul kits, every item inspected before dispatch.',
    long: [
      'The 2-stroke main engine is the prime mover of nearly every ocean-going commercial vessel — and its uptime decides whether your ship sails on schedule or sits idle. At Harbourline Ship Management we maintain a working inventory of new and carefully reconditioned 2-stroke main engine spares that lets owners and operators get critical parts moving the same day an enquiry lands with us.',
      'Our stock covers the major propulsion OEMs in service today — MAN B&W, Sulzer, Wartsila NSD and Mitsubishi — and we source through certified suppliers as well as the renowned ship recycling yards at Alang. Every component is cleaned, dimensionally checked and pressure or load tested where applicable, with photographs and condition notes shared with the buyer before packing.',
      'For chief engineers and superintendents this means one less variable in the planning of a port call: predictable parts, honest condition reporting and shipping documentation that clears customs without back-and-forth.',
    ],
    highlights: [
      'Cylinder covers, liners and cylinder heads',
      'Pistons, piston rod assemblies and ring sets',
      'Fuel pumps, plungers, barrels and fuel valves',
      'Turbocharger spares — ABB, MET, Napier, KBB',
      'Main bearings, crosshead bearings and guide shoes',
      'Complete overhaul kits with gaskets and seals',
    ],
    image: IMG.twoStrokeEngine,
    fallback: [IMG.shipMachine, IMG.fallbackEngine],
  },
  {
    slug: 'auxiliary-engine-4-stroke',
    title: 'Auxiliary Engine Spares (4-Stroke)',
    short:
      'Tested 4-stroke auxiliary engine spares for Yanmar, Daihatsu, Wartsila, MAN and Caterpillar generator sets — keeping onboard power, hotel load and cargo handling running without interruption.',
    long: [
      'Auxiliary generator sets are the silent backbone of vessel operations — they keep navigation electronics live, cargo gear powered and accommodation comfortable through every leg of the voyage. A single auxiliary engine going offline can disrupt loading windows and force unscheduled bunker stops, so spare-part reliability matters as much as the part itself.',
      'Harbourline maintains a deep 4-stroke spares inventory for the engine families most commonly fitted across the merchant fleet — Yanmar, Daihatsu, Wartsila Vasa and Auxpac, MAN L/V series and Caterpillar 3500 and 3600 ranges. We supply new components alongside reconditioned units that carry full inspection reports.',
      'Where reconditioned parts are involved we share photographs, measurement records and clearance values with the buyer before invoicing — no surprises when the crate is opened onboard.',
    ],
    highlights: [
      'Cylinder heads, liners and pistons',
      'Fuel injection pumps, nozzles and valves',
      'Connecting rods, crankshafts and bearings',
      'Cooling water, lube oil and circulating pumps',
      'Governors, actuators and overspeed trips',
      'Turbocharger rotors, nozzle rings and bearings',
    ],
    image: IMG.engineRoom,
    fallback: [IMG.inspection, IMG.fallbackEngine],
  },
  {
    slug: 'automation',
    title: 'Marine Automation & Control Systems',
    short:
      'Engine room automation, alarm and monitoring panels, PLC-driven control systems, remote stations and bridge integration units sourced from established marine brands and supported by our technical team.',
    long: [
      'Modern vessels run on automation — alarm and monitoring on the main engine, remote control from the bridge, integrated cargo and ballast systems, and engine room safety logic stitched together by PLCs and dedicated control panels. When a card or sensor fails in the middle of a voyage, the bottleneck is rarely the diagnosis but the availability of a matching replacement.',
      'Harbourline holds a curated automation stock built around the systems our clients actually run — ABB, Kongsberg, Nabtesco, Pleiger, Lyngso, NK and others — covering engine remote control modules, AMS panels, cargo monitoring PLCs and the smaller building blocks like I/O cards, relays and HMI panels. Each unit is bench-tested before dispatch and shipped with its configuration notes where available.',
      'For owners undertaking retrofits or upgrades, our technical team can advise on compatible replacements and source the right firmware revision rather than just the matching part number.',
    ],
    highlights: [
      'Engine alarm and monitoring systems (AMS)',
      'Bridge remote control and telegraph units',
      'PLC-based engine room automation',
      'Integrated cargo and ballast control',
      'Safety, shutdown and overspeed panels',
      'I/O cards, HMI panels and control PCBs',
    ],
    image: IMG.automation,
    fallback: [IMG.pcb, IMG.fallbackNavigation],
  },
  {
    slug: 'marine-navigation-equipments',
    title: 'Marine Navigation Equipment',
    short:
      'Bridge navigation equipment and spares — gyrocompasses, autopilots, ECDIS, GPS, AIS, speed logs and echo sounders from Furuno, JRC, Sperry, Tokimec and Anschutz, supplied with inspection and test records.',
    long: [
      'Bridge equipment is the difference between a confident watch and a tense one. Harbourline supplies a full range of marine navigation equipment and their spares — from primary aids like gyrocompasses and autopilots to the secondary systems that bridge teams rely on every watch: ECDIS units, GPS receivers, AIS transponders, speed logs, echo sounders and integrated bridge consoles.',
      'We trade in equipment from the manufacturers most commonly approved by flag states and class societies — Furuno, JRC, Sperry Marine, Tokimec, Anschutz, Simrad and Kelvin Hughes — and we hold both new pieces and tested reusable units recovered from controlled dismantling at Alang.',
      'Every navigation item leaves our store with a functional test record, and where applicable, the original manuals and accessories so the onboard electrical officer can commission the unit without delay.',
    ],
    highlights: [
      'Gyrocompasses and autopilot systems',
      'GPS, AIS and DGPS receivers',
      'ECDIS units and bridge displays',
      'Speed logs, echo sounders and wind sensors',
      'Magnetic compasses and binnacles',
      'GMDSS, VHF and SAT-C equipment',
    ],
    image: IMG.navigation,
    fallback: [IMG.fallbackNavigation, IMG.shipPort],
  },
  {
    slug: 'radar-and-radar-spares',
    title: 'Marine Radar & Radar Spares',
    short:
      'Complete S-band and X-band marine radar systems plus the critical spares behind them — scanners, transceivers, magnetrons, PCBs, display units and control panels from Furuno, JRC, Kelvin Hughes and Simrad.',
    long: [
      'A radar fault is rarely just an inconvenience — depending on the watch and the waters, it can stop a vessel from sailing. Harbourline specialises in marine radar systems and the spare parts that keep them online: scanners and antennas, transceivers, magnetrons, PCBs, motor and gearbox assemblies, display units and bridge control panels.',
      'We supply both X-band (3 cm) and S-band (10 cm) radar systems, and our inventory spans the major bridge brands — Furuno FAR, JRC JMA, Kelvin Hughes SharpEye and Manta, and Simrad. Where complete units are not stocked we work with our supplier and recycling-yard network to locate the exact model and revision your bridge needs.',
      'Every radar item is functionally checked before despatch and packed in dedicated foam-lined crates so it arrives onboard ready to install — not requiring a workshop rebuild before commissioning.',
    ],
    highlights: [
      'Complete X-band and S-band radar systems',
      'Scanners, antennas and motor assemblies',
      'Transceivers, modulators and magnetrons',
      'Radar PCBs and processor cards',
      'Bridge display units and control panels',
      'Furuno, JRC, Kelvin Hughes, Simrad spares',
    ],
    image: IMG.radarTower,
    fallback: [IMG.pcb, IMG.fallbackNavigation],
  },
];

export const findProduct = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);
