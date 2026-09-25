import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import FactPanel from '@/components/ui/FactPanel';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQ from '@/components/ui/FAQ';
import DataTable from '@/components/ui/DataTable';
import LeadForm from '@/components/LeadForm';
import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Government Solar Subsidies in India 2026: PM Surya Ghar, KUSUM & State Schemes | GoSolarIndex',
  description: 'Comprehensive directory of Central and State solar subsidies in India. Check PM Surya Ghar residential DBT up to ₹78,000, PM-KUSUM farm pump grants, and state top-up incentives.',
  path: '/subsidy',
});

const statePolicyColumns = [
  { key: 'state', label: 'State / UT' },
  { key: 'centralSubsidy', label: 'PM Surya Ghar Central DBT' },
  { key: 'stateTopUp', label: 'State Top-Up Scheme' },
  { key: 'netMeteringCap', label: 'Net Metering Cap', align: 'right' as const },
];

const statePolicyRows = [
  {
    state: 'Maharashtra',
    centralSubsidy: 'Up to ₹78,000 (1–3 kW)',
    stateTopUp: 'MSEDCL expedited net-metering',
    netMeteringCap: '100% of sanctioned load',
  },
  {
    state: 'Gujarat',
    centralSubsidy: 'Up to ₹78,000 (1–3 kW)',
    stateTopUp: 'Surya Gujarat / GUVNL subsidy coordination',
    netMeteringCap: '100% of sanctioned load',
  },
  {
    state: 'Rajasthan',
    centralSubsidy: 'Up to ₹78,000 (1–3 kW)',
    stateTopUp: 'RREC high-sunlight fast track',
    netMeteringCap: 'Up to 500 kW per connection',
  },
  {
    state: 'Karnataka',
    centralSubsidy: 'Up to ₹78,000 (1–3 kW)',
    stateTopUp: 'BESCOM online net metering portal',
    netMeteringCap: '100% of sanctioned load',
  },
  {
    state: 'Uttar Pradesh',
    centralSubsidy: 'Up to ₹78,000 (1–3 kW)',
    stateTopUp: 'UPNEDA state top-up grant (up to ₹30,000)',
    netMeteringCap: '100% of sanctioned load',
  },
  {
    state: 'Delhi (NCT)',
    centralSubsidy: 'Up to ₹78,000 (1–3 kW)',
    stateTopUp: 'Delhi Solar Policy generation-based incentive (GBI)',
    netMeteringCap: '100% of sanctioned load',
  },
  {
    state: 'Tamil Nadu',
    centralSubsidy: 'Up to ₹78,000 (1–3 kW)',
    stateTopUp: 'TANGEDCO bi-directional net billing',
    netMeteringCap: '100% of sanctioned load',
  },
  {
    state: 'Madhya Pradesh',
    centralSubsidy: 'Up to ₹78,000 (1–3 kW)',
    stateTopUp: 'MPUVN single-window approval',
    netMeteringCap: '100% of sanctioned load',
  },
];

const faqs = [
  {
    q: 'Can I claim both central and state solar subsidies together?',
    a: 'Yes. In states like Uttar Pradesh and Delhi that offer additional state-level top-up subsidies or Generation-Based Incentives (GBI), homeowners can receive both the central PM Surya Ghar DBT subsidy (up to ₹78,000) and the state-specific incentive.',
  },
  {
    q: 'Are solar subsidies taxed as income?',
    a: 'No. Subsidies disbursed under the PM Surya Ghar scheme are direct capital welfare grants transferred via DBT to residential consumers and are not considered taxable business income.',
  },
  {
    q: 'What is the minimum roof space required for a 3 kW subsidized system?',
    a: 'A standard 3 kW residential rooftop solar array requires approximately 250 to 300 square feet of shadow-free rooftop area using modern 540W+ mono PERC or TOPCon panels.',
  },
];

export default function SubsidyOverviewPage() {
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
              { label: 'Subsidy' },
            ]}
          />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-10">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-tight mb-8">
            Government Solar Subsidies in India (2026): Central &amp; State Schemes
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <FactPanel
                title="India Solar Subsidy Benchmark"
                rows={[
                  { label: 'PM Surya Ghar maximum residential subsidy', value: '₹78,000 (3 kW cap)', total: true },
                  { label: 'PM-KUSUM farm solar pump subsidy', value: 'Up to 60% of benchmark' },
                  { label: 'Commercial & industrial tax benefit', value: '40% accelerated depreciation' },
                  { label: 'Housing society / RWA common load', value: '₹18,000 / kW (up to 500 kW)' },
                  { label: 'Official central portal', value: 'pmsuryaghar.gov.in' },
                ]}
                sources="Ministry of New and Renewable Energy (MNRE), National Portal for Rooftop Solar, Central Board of Direct Taxes (CBDT)."
              />
            </div>

            <div className="lg:col-span-6 space-y-4 text-[15px] text-ink-2 leading-relaxed font-body">
              <p>
                India provides some of the world&apos;s most comprehensive government financial assistance for renewable solar energy. Whether you are an individual homeowner, a housing society, an agricultural farmer, or a business, distinct subsidy and tax incentive frameworks apply.
              </p>
              <p>
                Explore our dedicated national guides for comprehensive eligibility criteria, subsidy slabs, and application workflows:
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/subsidy/pm-surya-ghar"
                  className="inline-flex items-center justify-center h-10 px-5 bg-sun text-ink font-semibold text-xs rounded-sm hover:brightness-95 transition-colors"
                >
                  PM Surya Ghar Guide (Home)
                </Link>
                <Link
                  href="/subsidy/pm-kusum"
                  className="inline-flex items-center justify-center h-10 px-5 border-[1.5px] border-ink text-ink font-medium text-xs rounded-sm hover:bg-wash transition-colors"
                >
                  PM-KUSUM Guide (Agriculture)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-8 space-y-12">

            {/* Scheme Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-line rounded-sm p-6 bg-wash flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-ink uppercase tracking-wide">For Residential Homes</span>
                  <h3 className="font-heading font-bold text-xl text-ink mt-1 mb-2">
                    PM Surya Ghar Muft Bijli Yojana
                  </h3>
                  <p className="text-xs text-ink-2 leading-relaxed mb-4 font-body">
                    Get up to ₹78,000 direct bank transfer subsidy on 1 kW to 3 kW rooftop solar systems. Covers grid feasibility, net meter testing, and ALMM DCR modules.
                  </p>
                </div>
                <Link
                  href="/subsidy/pm-surya-ghar"
                  className="inline-flex items-center justify-center h-10 px-4 border border-ink text-ink font-medium text-xs rounded-sm hover:bg-paper transition-colors"
                >
                  Read PM Surya Ghar guide
                </Link>
              </div>

              <div className="border border-line rounded-sm p-6 bg-wash flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-ink uppercase tracking-wide">For Agricultural Farmland</span>
                  <h3 className="font-heading font-bold text-xl text-ink mt-1 mb-2">
                    PM-KUSUM Solar Pump Scheme
                  </h3>
                  <p className="text-xs text-ink-2 leading-relaxed mb-4 font-body">
                    Farmers receive up to 60% combined subsidy for 3 HP, 5 HP, and 7.5 HP solar water pumps. Replace costly diesel irrigation with free solar power.
                  </p>
                </div>
                <Link
                  href="/subsidy/pm-kusum"
                  className="inline-flex items-center justify-center h-10 px-4 border border-ink text-ink font-medium text-xs rounded-sm hover:bg-paper transition-colors"
                >
                  Read PM-KUSUM guide
                </Link>
              </div>
            </section>

            {/* State Policies Table */}
            <section className="border-t border-line pt-8">
              <h2 className="font-heading font-semibold text-2xl text-ink mb-2">
                State-by-state solar subsidy &amp; net metering matrix
              </h2>
              <p className="text-xs text-ink-2 mb-4 font-body">
                Summary of state-level top-up schemes and distribution utility net-metering provisions:
              </p>
              <DataTable columns={statePolicyColumns} rows={statePolicyRows} />
            </section>

            {/* FAQs */}
            <section className="border-t border-line pt-8">
              <h2 className="font-heading font-semibold text-2xl text-ink mb-6">
                Frequently asked questions
              </h2>
              <FAQ items={faqs} />
            </section>

          </div>

          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 lg:self-start">
            <LeadForm prefill={{ requirement: '3kW Residential' }} source="subsidy:overview" />

            <div className="border border-line rounded-sm p-5 bg-wash font-body text-xs space-y-3">
              <h3 className="font-heading font-semibold text-sm text-ink pb-2 border-b border-line">
                Interactive tools
              </h3>
              <ul className="space-y-2 text-ink">
                <li>
                  <Link href="/tools/solar-subsidy-calculator" className="underline hover:text-ink/80 block">
                    Subsidy &amp; Sizing Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/price" className="underline hover:text-ink/80 block">
                    Solar Panel Cost Index 2026
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
