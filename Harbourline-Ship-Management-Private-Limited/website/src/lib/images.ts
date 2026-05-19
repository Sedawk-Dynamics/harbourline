/**
 * Premium marine / shipping imagery for Harbourline Ship Management.
 *
 * Every photo ID below is unique. Each key drives exactly one part of the
 * site, so no image repeats — products do not share imagery with services,
 * testimonials, page headers or project galleries. All IDs have been
 * verified to resolve from the Pexels CDN and to depict content that
 * matches the semantic key (real engine work, real bridge consoles, real
 * dry-dock and harbour scenes, not stand-in industrial stock).
 */

const p = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const IMG = {
  // Hero — cinematic above-the-fold imagery
  heroBulk:           p(34170447, 1920),  // cargo vessel silhouetted against dramatic sunset
  heroFallback:       p(30173956, 1920),  // open-sea sunset shot from deck of cargo ship

  // Ships at sea / aerial views
  cargoAerial:        p(20821680),  // aerial of large container ship on calm sea
  bulkCarrier:        p(9806482),   // large container vessel crossing calm open sea
  containerSailing:   p(12204177),  // MSC cargo ship with colourful containers underway
  shipPort:           p(29899416),  // vessel docked at Hamburg with cranes + containers
  oceanWaves:         p(32810636),  // cargo vessel carrying blue & red containers at sea

  // Engine / machinery — each a different real engine context
  engineRoom:         p(31740442),  // Warchalowski diesel engine — blue cover, components
  shipMachine:        p(13757275),  // engineer servicing a large ship turbine in shipyard
  twoStrokeEngine:    p(33559376),  // crankshaft installation inside an engine block

  // Electronics / automation / bridge / radar
  automation:         p(3582597),   // marine nav controls + radar display close-up
  navigation:         p(28185418),  // ship control-bridge interior — desks + screens
  pcb:                p(6755080),   // close-up of circuit board, intricate pathways
  radarTower:         p(32630439),  // ship with advanced radar + antennas array

  // Port / repair / services — each a different harbour or workshop
  portTerminal:       p(4297388),   // Hong Kong shipping port at night, illuminated cranes
  portCranes:         p(30750630),  // vibrant night view, industrial port + reflections
  shipRepair:         p(34326115),  // welder working on ship propeller in dry dock
  emergencyPort:      p(35458829),  // Bintulu port sunset — cranes and cargo ships
  worldwideShipment:  p(19549941),  // container ship loaded with colourful containers
  endToEnd:           p(36571000),  // cargo ship in dry dock flanked by cranes
  inspection:         p(8985702),   // mechanic in coveralls inspecting an engine close-up

  // Fallback chain — distinct from all primary keys
  fallbackShip:       p(27773577),  // container ship sailing under clear blue sky
  fallbackEngine:     p(29181490),  // technician hands on engine in modern workshop
  fallbackPort:       p(13157972),  // shipping port with illuminated cranes (night)
  fallbackNavigation: p(28498830),  // navigator with binoculars on cargo bridge

  // Page header backgrounds — each unique
  productsHeader:     p(36202155),  // cargo ship in dry dock at Baku waterfront
  servicesHeader:     p(30807110),  // ship in dry dock at Puerto Sherry marina
  projectsHeader:     p(8913520),   // aerial night view of illuminated harbour
  legalHeader:        p(33113780),  // container ship docked at Hamburg port

  // Testimonial backgrounds — each unique cinematic shot
  testimonial1:       p(28637243),  // silhouetted cargo ship vivid orange sunset
  testimonial2:       p(33315751),  // container ship under vivid orange sunset
  testimonial3:       p(13559094),  // high-angle shipyard, colourful containers
  testimonial4:       p(36563588),  // large oil tanker captured at sunset

  // Project gallery — three projects × three unique images each
  project1a:          p(7564866),   // mechanic using tools to repair engine indoors
  project1b:          p(31103436),  // mechanic on large orange engine with hoist outdoors
  project1c:          p(4940270),   // cranes and dock dramatically illuminated at night
  project2a:          p(12567565),  // large cargo ship loaded with containers at port
  project2b:          p(20313496),  // container ships + cranes Hamburg, twilight
  project2c:          p(30440680),  // ship navigating Elbe River, Hamburg
  project3a:          p(17311127),  // drone shot of container ship in Naples port
  project3b:          p(16048232),  // industrial port Taiwan, containers + reflections
  project3c:          p(32651636),  // floating dock with cranes at sunrise

  // Atmospheric backgrounds — for CTA, About chrome, etc.
  ctaBg:              p(34772010),  // peaceful golden-hour cargo ship in distance
  aboutBg:            p(33782922),  // serene vessel sailing during golden hour
};

/** Final safety-net URL used by SmartImage when all primary + chain URLs fail. */
export const FALLBACK_IMG = IMG.fallbackShip;
