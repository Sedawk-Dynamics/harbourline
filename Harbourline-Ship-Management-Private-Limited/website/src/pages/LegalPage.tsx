import PageShell from './PageShell';
import PageHeader from './PageHeader';
import { IMG } from '../lib/images';

type Section = { heading: string; body: string[] };
type Props = {
  title: string;
  intro: string;
  sections: Section[];
  crumbLabel: string;
};

export default function LegalPage({ title, intro, sections, crumbLabel }: Props) {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Legal"
        title={title}
        crumbs={[{ label: 'Home', to: '/' }, { label: crumbLabel }]}
        bgImage={IMG.legalHeader}
      />

      <section className="surface section-pad">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <p className="text-mute-2 text-base sm:text-lg leading-relaxed mb-8">{intro}</p>

          <div className="space-y-10">
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="h-display text-xl sm:text-2xl mb-3 text-fg">
                  {String(i + 1).padStart(2, '0')}. {s.heading}
                </h2>
                <div className="space-y-3 text-mute-2 text-base leading-relaxed">
                  {s.body.map((b, j) => (
                    <p key={j}>{b}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 pt-6 border-t border-line text-xs text-mute">
            Last updated: {new Date().toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </section>
    </PageShell>
  );
}

export function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      crumbLabel="Privacy Policy"
      intro="At Harbourline Ship Management Pvt. Ltd. we respect your privacy and are committed to protecting your personal data. This policy explains what information we collect when you use our website and how we handle it."
      sections={[
        {
          heading: 'Information We Collect',
          body: [
            'When you contact us through our website forms, by email or by phone we may collect your name, email address, phone number, company name and any details you choose to share in your message.',
            'We do not knowingly collect personal information from anyone under the age of 13.',
          ],
        },
        {
          heading: 'How We Use Your Information',
          body: [
            'We use the information you provide solely to respond to your enquiry, prepare a quotation, supply requested products or services and maintain a record of our business relationship.',
            'We do not sell, rent or trade your personal information to third parties for marketing purposes.',
          ],
        },
        {
          heading: 'Cookies & Site Analytics',
          body: [
            'Our website uses essential cookies to remember your theme preference (light/dark mode) and your dismissal of UI elements. We do not use third-party tracking or advertising cookies.',
          ],
        },
        {
          heading: 'Data Security',
          body: [
            'We take reasonable steps to protect the personal data we hold from unauthorised access, alteration, disclosure or destruction. Communications by email and phone are subject to the security limitations of those channels.',
          ],
        },
        {
          heading: 'Your Rights',
          body: [
            'You may at any time request a copy of the personal information we hold about you, request its correction or request its deletion. Send all such requests to harbourlineshipmanagement@gmail.com and we will respond within 30 days.',
          ],
        },
        {
          heading: 'Contact',
          body: [
            'Harbourline Ship Management Pvt. Ltd.',
            '240/A Sagar Complex, Jashonath Chowk, Near Moti Baug, Bhavnagar, Gujarat — 364001, India',
            'Email: harbourlineshipmanagement@gmail.com · Phone: +91 98256 45515',
          ],
        },
      ]}
    />
  );
}

export function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      crumbLabel="Terms of Service"
      intro="These terms govern your use of the Harbourline Ship Management website and our quotation/supply services. By using the site or engaging with us commercially you agree to these terms."
      sections={[
        {
          heading: 'Quotations',
          body: [
            'All quotations issued by Harbourline are valid for 30 days from the date of issue unless otherwise stated in writing. Prices are subject to confirmation of stock availability at the time of order placement.',
          ],
        },
        {
          heading: 'Orders & Payment',
          body: [
            'Orders are confirmed once you accept our quotation in writing and we issue a proforma invoice. Payment terms are agreed per order — typically 50% advance with balance against shipping documents.',
            'Bank charges incurred outside India are to be borne by the buyer.',
          ],
        },
        {
          heading: 'Delivery & Risk',
          body: [
            'Delivery terms (FOB, CIF, DDP etc.) are stated in each quotation per Incoterms 2020. Risk passes to the buyer per the chosen Incoterm.',
            'Reasonable delivery estimates are provided but Harbourline is not liable for delays caused by carriers, customs, force majeure or other circumstances beyond our control.',
          ],
        },
        {
          heading: 'Warranty',
          body: [
            'New parts carry the original manufacturer warranty. Reconditioned parts are supplied with a 90-day workmanship warranty against defects when installed and operated per manufacturer specifications.',
            'Warranty claims must be reported within 7 days of discovery and supported by photos and inspection reports.',
          ],
        },
        {
          heading: 'Website Use',
          body: [
            'Content on this website (text, images, illustrations) is provided for general information only and may be updated without notice. You may not copy, redistribute or resell our content for commercial purposes without prior written consent.',
          ],
        },
        {
          heading: 'Governing Law',
          body: [
            'These terms are governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of the courts at Bhavnagar, Gujarat.',
          ],
        },
      ]}
    />
  );
}
