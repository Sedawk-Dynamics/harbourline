import { IMG } from '../lib/images';

export type Service = {
  slug: string;
  n: string;
  title: string;
  short: string;
  long: string[];
  highlights: string[];
  image: string;
  fallback: string[];
};

export const SERVICES: Service[] = [
  {
    slug: 'marine-machinery-spare-supply',
    n: '01',
    title: 'Marine Machinery & Spare Supply',
    short:
      'Comprehensive marine machinery and genuine spare parts for all vessel types with global supply network.',
    long: [
      'We provide a comprehensive range of marine machinery and genuine spare parts for all types of vessels. With a strong global supply network and decades of industry expertise, we ensure timely delivery, certified quality and dependable performance for critical ship operations.',
      'From engine spares and pumps to deck machinery and electrical systems — our extensive inventory covers everything needed to keep vessels operating efficiently.',
    ],
    highlights: [
      'Main engine spares',
      'Auxiliary engine parts',
      'Pumps & compressors',
      'Deck machinery',
      'Electrical systems',
      'Hydraulic equipment',
    ],
    image: IMG.shipMachine,
    fallback: [IMG.engineRoom, IMG.cargoAerial],
  },
  {
    slug: 'inspection-reconditioning',
    n: '02',
    title: 'Inspection & Reconditioning',
    short:
      'Inspection and reconditioning of marine machinery and onboard equipment by expert engineers.',
    long: [
      'We deliver comprehensive inspection and reconditioning services for marine machinery and onboard equipment. Our expert engineers ensure optimal performance, extended service life and full compliance with international maritime safety standards.',
      'From cylinder heads to turbochargers, every part we recondition goes through rigorous QC and is supplied with documentation.',
    ],
    highlights: [
      'Cylinder head reconditioning',
      'Turbocharger overhaul',
      'Crankshaft inspection',
      'Bearing replacement',
      'Pump rebuilding',
      'QC reports with every unit',
    ],
    image: IMG.inspection,
    fallback: [IMG.twoStrokeEngine, IMG.engineRoom],
  },
  {
    slug: 'worldwide-shipment',
    n: '03',
    title: 'Worldwide Shipment',
    short:
      'Fast, secure, reliable worldwide shipment of marine machinery, spares and technical equipment.',
    long: [
      'We provide fast, secure and reliable worldwide shipment services for marine machinery, spare parts and technical equipment. Through our strong international logistics network, we ensure timely delivery to major ports and offshore locations across the globe.',
      'We handle documentation, customs and last-mile coordination end-to-end.',
    ],
    highlights: [
      'Air, sea and courier dispatch',
      'Customs documentation',
      'Port-side delivery',
      'Insurance handling',
      'Real-time tracking',
      'Emergency 24h dispatch',
    ],
    image: IMG.worldwideShipment,
    fallback: [IMG.containerSailing, IMG.portTerminal],
  },
  {
    slug: 'ship-repair-maintenance-works',
    n: '04',
    title: 'Ship Repair & Maintenance Works',
    short:
      'Complete ship repair and maintenance services for all vessel types — emergency, scheduled, dry-docking.',
    long: [
      'We provide complete ship repair and maintenance services for all types of vessels. From emergency breakdown repairs to scheduled dry-docking and preventive maintenance, our experienced technical team ensures safety, reliability and operational efficiency at every stage.',
      'Steel-work, machinery work, electrical and hydraulic — we coordinate everything onboard or in-yard.',
    ],
    highlights: [
      'Emergency breakdown repair',
      'Scheduled dry-docking',
      'Steel-works & hull repair',
      'Pipeline & valve overhauls',
      'Electrical & hydraulic',
      'Class survey preparation',
    ],
    image: IMG.portCranes,
    fallback: [IMG.portTerminal, IMG.engineRoom],
  },
  {
    slug: 'marine-agency-port-services',
    n: '05',
    title: 'Emergency Port Services',
    short:
      'Marine agency and port services for vessels — pre-arrival to final departure clearance.',
    long: [
      'We provide complete marine agency and port-service solutions for all types of vessels. From pre-arrival documentation to final departure clearance, our experienced team ensures smooth port operations, regulatory compliance and efficient vessel turnaround at every stage.',
      'Available round-the-clock for emergency port calls.',
    ],
    highlights: [
      'Pre-arrival documentation',
      'Port-formality handling',
      'Crew change coordination',
      'Bunkering & provisioning',
      'Stores & spares delivery',
      '24/7 emergency support',
    ],
    image: IMG.emergencyPort,
    fallback: [IMG.portTerminal, IMG.shipPort],
  },
  {
    slug: 'end-to-end-service',
    n: '06',
    title: 'End to End Service',
    short:
      'End-to-end coordination from initial vessel/cargo stage to final completion — single point of contact.',
    long: [
      'We provide comprehensive end-to-end services, ensuring seamless coordination from the initial stage of vessel or cargo operations to final completion. Our team manages every process with precision, compliance and operational efficiency — delivering reliable and hassle-free maritime solutions.',
      'One enquiry, one contract, one point of contact for the entire job.',
    ],
    highlights: [
      'Single point of contact',
      'Sourcing → delivery → install',
      'Documentation & compliance',
      'Quality control at every stage',
      'Fixed-price contracts',
      'Post-delivery support',
    ],
    image: IMG.endToEnd,
    fallback: [IMG.cargoAerial, IMG.bulkCarrier],
  },
];

export const findService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);
