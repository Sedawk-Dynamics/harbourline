import PinnedScrubWhyUs from '../animations/PinnedScrubWhyUs';
import { IMG } from '../lib/images';

const cards = [
  {
    n: '01',
    title: 'Competitive Pricing Without Cutting Corners',
    body: [
      'We help owners and operators reduce vessel operating costs by combining direct sourcing from certified suppliers with reusable components recovered from the Alang ship recycling yard.',
      'Pricing is transparent and tied to inspection grade — not a quote on a part you have not yet seen. The buyer always gets the photograph and the measurement record before the invoice.',
    ],
  },
  {
    n: '02',
    title: 'Certified Quality on Every Component',
    body: [
      'Main engine, auxiliary engine, automation and navigation spares are each routed through a written inspection checklist before they leave our store — dimensional, visual and where applicable functional.',
      'Reconditioned units carry the engineer\'s sign-off and the clearance values measured in our workshop, so the receiving chief engineer has data, not promises, when the crate is opened onboard.',
    ],
  },
  {
    n: '03',
    title: 'Technical Excellence from a Marine Team',
    body: [
      'Our workshop and dispatch are led by serving and ex-sailing marine engineers. The same people who triage your enquiry are the ones who can tell a worn fuel pump barrel from a usable one — and who know which clearance actually matters for the next 6,000 running hours.',
      'On larger scopes we provide onboard support and class-society interface so the owner deals with one accountable point of contact.',
    ],
  },
  {
    n: '04',
    title: 'Sourcing Strength Through Alang',
    body: [
      'Bhavnagar sits next to Alang — the world\'s largest ship recycling yard — and that proximity is a structural advantage for our clients. Components from decommissioned vessels are recovered, inspected and reconditioned in our facility.',
      'For older engine and bridge equipment that OEMs no longer support, Alang is often the only realistic source of a working part. We know the yard and we know which sub-dealers can be trusted.',
    ],
  },
  {
    n: '05',
    title: 'Complete Marine Solutions Under One Roof',
    body: [
      'From engine and auxiliary spares to automation, navigation and radar equipment — and from spare supply through repair coordination to single-window ship management — Harbourline covers the full requirement of a working vessel.',
      'For repeat clients we maintain a vessel file with engine particulars, drawings and standing dispatch instructions so each new requirement starts from a known baseline.',
    ],
  },
  {
    n: '06',
    title: 'Fast Response & Global Dispatch',
    body: [
      'A spare on a shelf in Bhavnagar is useless to a vessel berthed in Rotterdam. Our dispatch desk is reachable around the clock and routinely arranges same-day air freight from Mumbai and Ahmedabad to the major bunkering and crew-change ports worldwide.',
      'Documentation, customs and port-agent coordination are handled in-house so the part lands at the gangway when the vessel actually needs it.',
    ],
  },
];

export default function WhyUs() {
  return (
    <PinnedScrubWhyUs
      image={IMG.shipPort}
      watermark="HARBOUR"
      intro={{
        eyebrow: 'Why Choose Us',
        title: (
          <>
            Reliable Marine Spares,{' '}
            <span className="text-[color:var(--color-brand-light)]">Honest Inspection</span>{' '}
            and Service That Sails With You
          </>
        ),
        body:
          'We are a ship management, marine repair and spares supplier — building long-term relationships through transparent pricing, certified quality and a marine-engineer-led technical team. Every voyage we support starts with the same principle: get the part right, document it honestly, and land it when the vessel needs it.',
      }}
      cards={cards}
    />
  );
}
