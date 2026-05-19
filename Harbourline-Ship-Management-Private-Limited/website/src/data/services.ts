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
    title: 'Marine Spares & Machinery Supply',
    short:
      'Worldwide supply of main engine, auxiliary engine, automation and navigation spares — sourced through trusted channels and the Alang ship recycling yard, then inspected before dispatch.',
    long: [
      'Marine spares and machinery supply is the core of Harbourline Ship Management. We hold a working inventory of main engine and auxiliary engine spares, automation cards, navigation units, pumps and general machinery, with a sourcing network that reaches into the Alang ship recycling yard for components that have already proved themselves at sea.',
      'Every order is treated as a small project. Parts are identified by drawing or photograph, inspected, photographed, and shipped with the documentation the buyer needs to clear customs and bring the part onboard without delay.',
    ],
    highlights: [
      'Main engine spares — 2-stroke & 4-stroke',
      'Auxiliary engine and generator spares',
      'Automation, control and alarm system parts',
      'Marine pumps and machinery',
      'Bridge navigation and radar equipment',
      'Inspection report with every shipment',
    ],
    image: IMG.shipMachine,
    fallback: [IMG.engineRoom, IMG.cargoAerial],
  },
  {
    slug: 'inspection-reconditioning',
    n: '02',
    title: 'Engine Overhaul & Reconditioning',
    short:
      'Hands-on overhaul, reconditioning and load-testing of marine engine components and onboard machinery — carried out by experienced marine engineers to class-acceptable standards.',
    long: [
      'Reconditioned parts are only worth what their inspection record proves. At Harbourline our overhaul and reconditioning work is carried out by serving and ex-sailing marine engineers who understand what wear pattern, what clearance, what surface finish the part actually needs to deliver onboard.',
      'Cylinder heads are pressure tested, fuel pumps are calibrated, turbocharger rotors are dynamically balanced, and every reconditioned unit is dispatched with photographs, measurement records and the engineer\'s sign-off.',
    ],
    highlights: [
      'Cylinder head reconditioning and pressure testing',
      'Fuel pump and injector calibration',
      'Turbocharger overhaul and dynamic balancing',
      'Crankshaft inspection and bearing renewal',
      'Pump and compressor rebuilds',
      'Sign-off report with every unit',
    ],
    image: IMG.inspection,
    fallback: [IMG.twoStrokeEngine, IMG.engineRoom],
  },
  {
    slug: 'worldwide-shipment',
    n: '03',
    title: 'Worldwide Shipment & Logistics',
    short:
      'Door-to-vessel logistics for marine spares — air freight, sea freight, courier and last-mile port delivery, with documentation handled end-to-end so the part lands when the vessel needs it.',
    long: [
      'A spare part on a shelf in Bhavnagar is useless to a vessel berthed in Rotterdam. Harbourline operates a worldwide dispatch desk that converts inventory into onboard delivery — booking the right mode of transport for the urgency, preparing accurate commercial documentation, and coordinating with port agents to land the consignment at the gangway.',
      'For urgent stops we routinely arrange same-day air freight from Mumbai or Ahmedabad, and we have an established network of agents at the major bunkering and crew-change ports across Europe, the Gulf, the Mediterranean, Singapore and the US Gulf coast.',
    ],
    highlights: [
      'Air, sea and courier dispatch',
      'Export documentation and packing lists',
      'Customs and port-agent coordination',
      'Insurance arrangement on request',
      'Real-time tracking with the buyer',
      '24-hour emergency dispatch desk',
    ],
    image: IMG.worldwideShipment,
    fallback: [IMG.containerSailing, IMG.portTerminal],
  },
  {
    slug: 'ship-repair-maintenance-works',
    n: '04',
    title: 'Ship Repair & Maintenance Works',
    short:
      'Onboard and in-port ship repair, machinery overhaul, troubleshooting and dry-dock support — delivered by a technical team that understands vessel operations end-to-end.',
    long: [
      'Harbourline\'s repair and maintenance service is built around the engine room and the deck — not around generic industrial fitters. We handle planned dry-dock scopes, unplanned breakdown calls, riding-crew assignments for voyage repairs and pre-purchase or pre-charter technical inspections.',
      'Whether the requirement is a single turbocharger overhaul in port, a coordinated cylinder head renewal across a fleet, or a hull and steel works package, our engineers coordinate the labour, materials and class-society interface so the owner deals with one accountable point of contact.',
    ],
    highlights: [
      'Emergency breakdown repair',
      'Planned dry-docking support',
      'Onboard machinery overhaul',
      'Steel, piping and valve works',
      'Electrical and automation troubleshooting',
      'Class survey preparation',
    ],
    image: IMG.shipRepair,
    fallback: [IMG.portCranes, IMG.fallbackPort],
  },
  {
    slug: 'marine-agency-port-services',
    n: '05',
    title: 'Port Services & Vessel Supply',
    short:
      'Round-the-clock port-side support for vessels calling Indian ports — spares and stores delivery, technical assistance, crew change coordination and emergency response.',
    long: [
      'Indian ports are increasingly central to vessel calling patterns — and the difference between a clean turnaround and an unplanned delay is local presence. Harbourline supports vessels calling Bhavnagar, Pipavav, Deendayal (Kandla), Mundra, JNPT and Mumbai with port-side spares delivery, technical assistance, stores supply and crew change logistics.',
      'Our team is reachable 24 hours. When a vessel signals a requirement off the coast we are typically able to confirm availability and dispatch onto the next pilot boat or jetty visit within the same shift.',
    ],
    highlights: [
      'Spare parts delivered to gangway',
      'Onboard technical assistance',
      'Stores, provisioning and bunkering coordination',
      'Crew change support',
      'Surveys and class attendance',
      '24-hour emergency response',
    ],
    image: IMG.emergencyPort,
    fallback: [IMG.portTerminal, IMG.shipPort],
  },
  {
    slug: 'end-to-end-service',
    n: '06',
    title: 'Complete Ship Management Solutions',
    short:
      'Single-window ship management — from spares sourcing and repair coordination to documentation, dispatch and post-delivery support, run as one accountable contract.',
    long: [
      'Procuring marine spares, arranging an overhaul, organising a port call and chasing paperwork through three time zones is a daily cost most owners and operators would rather not bear. Harbourline offers a single-window ship management service: one enquiry, one quotation, one accountable contract that covers sourcing, inspection, dispatch, port-side delivery and post-delivery support.',
      'For repeat clients we maintain an active vessel file — engine particulars, drawings, preferred suppliers and standing dispatch instructions — so each follow-on requirement starts from a known baseline rather than a blank email thread.',
    ],
    highlights: [
      'Single point of contact per vessel',
      'Sourcing, inspection and dispatch under one contract',
      'Documentation and customs handled in-house',
      'Quality control at every stage',
      'Fixed-price commercial terms on request',
      'Post-delivery technical support',
    ],
    image: IMG.endToEnd,
    fallback: [IMG.cargoAerial, IMG.bulkCarrier],
  },
];

export const findService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);
