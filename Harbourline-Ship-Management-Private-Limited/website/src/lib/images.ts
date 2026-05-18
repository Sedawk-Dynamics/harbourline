/**
 * Curated marine / shipping imagery.
 *
 * Strategy: each entry is a stable Unsplash photo ID we picked for its
 * content, and `SmartImage` chains multiple fallbacks. The final safety
 * net is `FALLBACK_IMG` (a known-loading Unsplash ID), and SmartImage
 * also tries an Unsplash Source keyword URL before settling there.
 */

const u = (id: string, w = 1600, q = 85) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop&crop=entropy`;

/** Source-API URL (keyword-driven, guaranteed marine content). */
const src = (kw: string, w = 1600, h = 1000) =>
  `https://source.unsplash.com/${w}x${h}/?${encodeURIComponent(kw)}`;

export const IMG = {
  // Ships at sea / aerial views (priority: ship-content)
  cargoAerial:        u('1494412574643-ff11b0a5eb19'),  // ocean wave aerial
  bulkCarrier:        u('1518684079-3c830dcef090'),     // large container ship sailing
  containerSailing:   u('1474447976065-67d23accb1e3'),  // container ship at sea
  shipPort:           u('1473186578172-c141e6798cf4'),  // ship in port
  oceanWaves:         u('1494412519320-aa613dfb7738'),  // cargo aerial

  // Engine / machinery
  engineRoom:         u('1577097531484-d6c2bd0ee16e'),  // marine engine room
  shipMachine:        u('1565374395542-0ce18882c857'),  // engine spares
  twoStrokeEngine:    u('1581094288338-2314dddb7ece'),  // big diesel engine

  // Electronics / automation
  automation:         u('1581092580497-e0d23cbdf1dc'),  // circuit boards
  navigation:         u('1485081669829-bacb8c7bb1f3'),  // marine electronics
  pcb:                u('1518770660439-4636190af475'),  // PCB close-up

  // Logistics / port / repair / services
  portTerminal:       u('1486172850204-f9bbc52b9ac6'),  // port at sunset
  portCranes:         u('1565793979206-e15deebdb6c0'),  // container cranes
  shipRepair:         u('1581094288338-2314dddb7ece'),  // engine work (proxy)
  emergencyPort:      u('1502920917128-1aa500764cbd'),  // tug at port
  worldwideShipment:  u('1494412574643-ff11b0a5eb19'),  // ocean shipment
  endToEnd:           u('1518684079-3c830dcef090'),     // vessel sailing
  inspection:         u('1577097531484-d6c2bd0ee16e'),  // engine inspection

  // Hero / general
  heroBulk:           u('1494412574643-ff11b0a5eb19', 1920),
  heroFallback:       u('1518684079-3c830dcef090', 1920),

  // Keyword-driven fallbacks (Unsplash Source — always returns A marine photo)
  fallbackShip:       src('cargo,ship'),
  fallbackEngine:     src('marine,engine'),
  fallbackPort:       src('port,harbor'),
  fallbackNavigation: src('marine,electronics'),
};

/** Final safety-net URL used by SmartImage when all primary + chain URLs fail. */
export const FALLBACK_IMG = IMG.fallbackShip;
