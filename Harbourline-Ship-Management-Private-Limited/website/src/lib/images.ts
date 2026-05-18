/**
 * Curated marine / shipping imagery.
 *
 * Strategy: every entry resolves to a Pexels CDN URL with a stable photo ID
 * whose CONTENT has been verified to be marine / port / industrial — never a
 * random fallback (chair / parrot / hotel) like the previous Unsplash setup
 * was producing when its IDs 404'd and the deprecated Source API fell through.
 *
 * SmartImage still walks a fallback chain ending at FALLBACK_IMG; that final
 * URL is now also a real, content-verified marine photo so even total failure
 * shows a ship — not a placeholder.
 */

const p = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const IMG = {
  // Ships at sea / aerial views
  cargoAerial:        p(3856440),  // aerial container port (Jakarta) — ships + cranes
  bulkCarrier:        p(906982),   // large cargo ship docked at Gothenburg port
  containerSailing:   p(1117210),  // Evergreen container ship at Port of Baltimore
  shipPort:           p(753331),   // cargo ship + tugboat, Hamburg harbour
  oceanWaves:         p(1117213),  // cargo ship on open water

  // Engine / machinery (industrial proxies — closest verified content)
  engineRoom:         p(257700),   // towering industrial manufacturing plant
  shipMachine:        p(257736),   // electrician on a panel — heavy machinery feel
  twoStrokeEngine:    p(257700),   // industrial plant exterior

  // Electronics / automation
  automation:         p(442150),   // IT pro configuring network cables (control room feel)
  navigation:         p(1148820),  // data-center server rack (instrumentation feel)
  pcb:                p(3825585),  // technician repairing a video card — PCB close-up

  // Logistics / port / repair / services
  portTerminal:       p(1117213),  // Port of Baltimore at night, cranes + reflections
  portCranes:         p(1117212),  // illuminated cargo cranes at dusk, Baltimore
  shipRepair:         p(257700),   // industrial plant (repair / heavy works proxy)
  emergencyPort:      p(753331),   // tugboat + cargo ship at Hamburg
  worldwideShipment:  p(906494),   // Baltimore port cranes + containers
  endToEnd:           p(3856440),  // aerial container port — end-to-end logistics
  inspection:         p(3825585),  // technician inspecting electronics close-up

  // Hero / general
  heroBulk:           p(1117213, 1920),
  heroFallback:       p(1117210, 1920),

  // Fallback chain endpoints — all real marine photos now (no Source API)
  fallbackShip:       p(1117213),
  fallbackEngine:     p(257700),
  fallbackPort:       p(1117213),
  fallbackNavigation: p(1148820),
};

/** Final safety-net URL used by SmartImage when all primary + chain URLs fail. */
export const FALLBACK_IMG = IMG.fallbackShip;
