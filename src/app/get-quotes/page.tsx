import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import LeadForm from '@/components/LeadForm';
import FAQ from '@/components/ui/FAQ';
import FactPanel from '@/components/ui/FactPanel';
import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Get Free Solar Quotes: Compare 3 Verified Installers | GoSolarIndex',
  description: 'Request free, no-obligation solar quotes from top verified installers in your city. Compare hardware brands, PM Surya Ghar subsidy calculations, and net investment.',
  path: '/get-quotes',
});

const faqs = [
  {
    q: 'How does the free quote service work?',
    a: 'After you submit your requirements, we connect you with up to 3 verified solar EPC contractors operating in your city. Each installer contacts you to assess your roof orientation, energy bill history, and prepare an itemized proposal.',
  },
  {
    q: 'Is there any fee or commission charged to homeowners?',
    a: 'No. The quote matching service is 100% free for homeowners. You are under no obligation to accept any proposal.',
  },
  {
    q: 'Will installers assist with the PM Surya Ghar government subsidy?',
    a: 'Yes. All empanelled installers on GoSolarIndex handle the National Portal registration, document uploads, and DISCOM net-metering feasibility applications on your behalf.',
  },
];

export default function GetQuotesPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Get Solar Quotes' },
            ]}
          />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-10">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-tight mb-2">
            Get Free Solar Quotes from Verified Installers
          </h1>
          <p className="text-base text-ink-2 max-w-2xl font-body">
            Compare transparent proposals from certified solar contractors in your city. Compare Tier-1 ALMM panels, inverter warranties, and subsidy claims.
          </p>
        </div>
      </section>

      <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: Why GoSolarIndex & Process */}
          <div className="lg:col-span-6 space-y-8">
            <FactPanel
              title="What to expect when requesting quotes"
              rows={[
                { label: 'Maximum quotes received', value: '3 verified installers' },
                { label: 'Cost of quotation & site survey', value: '₹0 (100% Free)', total: true },
                { label: 'Subsidy assistance', value: 'Full PM Surya Ghar paperwork' },
                { label: 'Hardware standard', value: 'MNRE ALMM DCR compliant' },
                { label: 'Average response time', value: 'Within 24 business hours' },
              ]}
              sources="GoSolarIndex verified contractor charter, PM Surya Ghar vendor guidelines 2026."
            />

            <div className="border border-line rounded-sm p-6 bg-wash space-y-4 font-body text-xs text-ink-2 leading-relaxed">
              <h2 className="font-heading font-semibold text-base text-ink">
                How our verified matching works:
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full border border-ink text-ink font-semibold flex items-center justify-center shrink-0 text-[11px] mt-0.5">1</span>
                  <div>
                    <strong className="text-ink text-sm block">Submit your requirement</strong>
                    Enter your city, approximate monthly bill, and roof type.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full border border-ink text-ink font-semibold flex items-center justify-center shrink-0 text-[11px] mt-0.5">2</span>
                  <div>
                    <strong className="text-ink text-sm block">Receive local proposals</strong>
                    Up to 3 top-rated installers with active DISCOM liaison in your city will prepare custom quotes.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full border border-ink text-ink font-semibold flex items-center justify-center shrink-0 text-[11px] mt-0.5">3</span>
                  <div>
                    <strong className="text-ink text-sm block">Compare and save</strong>
                    Compare panel brands, inverter warranties, and net pricing after the ₹78,000 subsidy.
                  </div>
                </li>
              </ul>
            </div>

            <section className="pt-2">
              <h2 className="font-heading font-semibold text-xl text-ink mb-4">
                Frequently asked questions
              </h2>
              <FAQ items={faqs} />
            </section>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-6 lg:sticky lg:top-6">
            <LeadForm source="page:get-quotes" />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
