import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import FactPanel from '@/components/ui/FactPanel';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Steps from '@/components/ui/Steps';
import FAQ from '@/components/ui/FAQ';
import DataTable from '@/components/ui/DataTable';
import LeadForm from '@/components/LeadForm';
import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'PM-KUSUM Scheme 2026: Solar Pump Subsidy, Components A B C & State Rules | GoSolarIndex',
  description: 'Complete guide to PM-KUSUM scheme for farmers. Check standalone solar pump subsidies (Component B), grid solarisation (Component C), state nodal agency portal links, and application requirements.',
  path: '/subsidy/pm-kusum',
});

const componentColumns = [
  { key: 'component', label: 'Scheme Component' },
  { key: 'target', label: 'Eligible Capacity' },
  { key: 'subsidy', label: 'Central + State Subsidy' },
  { key: 'farmerShare', label: 'Farmer Share', align: 'right' as const },
];

const componentRows = [
  {
    component: 'Component A (Decentralized Ground Solar)',
    target: '500 kW – 2 MW plants on barren/fallow land',
    subsidy: 'Feed-in Tariff (PPA with DISCOM for 25 yrs)',
    farmerShare: 'Direct equity or developer lease rent',
  },
  {
    component: 'Component B (Standalone Solar Water Pumps)',
    target: 'Up to 7.5 HP DC/AC surface & submersible pumps',
    subsidy: '60% (30% Central + 30% State govt)',
    farmerShare: '10% cash (30% bank loan option)',
  },
  {
    component: 'Component C (Grid-Connected Pump Solarisation)',
    target: 'Individual farmer pump solarisation & feeder solarisation',
    subsidy: '60% (30% Central + 30% State govt)',
    farmerShare: '10% – 40% (sell surplus power to grid)',
  },
];

const pumpSlabsColumns = [
  { key: 'pumpSize', label: 'Pump Capacity' },
  { key: 'type', label: 'Recommended Type' },
  { key: 'benchmark', label: 'Benchmark Cost (Approx)' },
  { key: 'subsidyTotal', label: 'Combined 60% Subsidy' },
  { key: 'netCost', label: 'Farmer 10% Contribution', align: 'right' as const },
];

const pumpSlabsRows = [
  {
    pumpSize: '3 HP Pump',
    type: 'Surface / Submersible DC',
    benchmark: '₹1,65,000 – ₹1,90,000',
    subsidyTotal: '₹99,000 – ₹1,14,000',
    netCost: '₹16,500 – ₹19,000',
  },
  {
    pumpSize: '5 HP Pump',
    type: 'Submersible AC / DC',
    benchmark: '₹2,35,000 – ₹2,60,000',
    subsidyTotal: '₹1,41,000 – ₹1,56,000',
    netCost: '₹23,500 – ₹26,000',
  },
  {
    pumpSize: '7.5 HP Pump',
    type: 'High-head Submersible',
    benchmark: '₹3,20,000 – ₹3,60,000',
    subsidyTotal: '₹1,92,000 – ₹2,16,000',
    netCost: '₹32,000 – ₹36,000',
  },
];

const steps = [
  {
    title: 'State Renewable Energy Development Agency registration',
    description: 'Apply on your state nodal agency portal (e.g. Mahaurja in Maharashtra, RREC in Rajasthan, UPNEDA in UP, KREDL in Karnataka). Provide land 7/12 extract, Aadhaar, and borewell water source proof.',
  },
  {
    title: 'Verification of irrigation source & land ownership',
    description: 'District agricultural officers inspect your farmland to verify groundwater depth, non-electrified status, and pump sizing feasibility.',
  },
  {
    title: 'Contribution deposit & vendor allocation',
    description: 'Deposit the 10% beneficiary share into the designated state agency escrow account. The nodal agency assigns an empanelled solar pump vendor via e-tender.',
  },
  {
    title: 'Installation, testing and warranty handover',
    description: 'Vendor installs high-efficiency mono PERC panels, dual-axis manual tracking mount, motor pump, and remote monitoring unit (RMS) with 5 years free maintenance.',
  },
];

const faqs = [
  {
    q: 'Who is eligible for PM-KUSUM Component B standalone solar pumps?',
    a: 'Individual farmers, water user associations, and farmer producer organisations (FPOs) who own agricultural land without existing grid electricity connections for tubewells are eligible.',
  },
  {
    q: 'Can a farmer sell surplus solar power under PM-KUSUM?',
    a: 'Under Component C (grid-connected pump solarisation), farmers can export surplus power generated during daytime when irrigation is not running back to the DISCOM at the state-approved Feed-in Tariff.',
  },
  {
    q: 'What is the warranty on PM-KUSUM solar pumps?',
    a: 'The complete solar pumping system includes a 5-year comprehensive on-site warranty and maintenance contract provided by the empanelled vendor, while solar panels carry a 25-year performance warranty.',
  },
];

export default function PMKusumPage() {
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
              { label: 'Subsidy', href: '/subsidy' },
              { label: 'PM-KUSUM' },
            ]}
          />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-10">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-tight mb-8">
            PM-KUSUM Scheme: Solar Agriculture Pumps &amp; Rural Solar Subsidies
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <FactPanel
                title="PM-KUSUM: Financial Subsidy Framework"
                rows={[
                  { label: 'Central Government subsidy (CFA)', value: '30% of benchmark cost' },
                  { label: 'State Government top-up subsidy', value: '30% of benchmark cost' },
                  { label: 'Combined financial assistance', value: '60% total subsidy', total: true },
                  { label: 'Farmer upfront contribution', value: '10% cash (30% via bank loan)' },
                  { label: 'Standalone pump capacity limit', value: 'Up to 7.5 HP' },
                  { label: 'Implementation agencies', value: 'State Nodal Renewable Energy Agencies' },
                ]}
                sources="Ministry of New and Renewable Energy (MNRE), Guidelines for Implementation of Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM) 2024–2026."
              />
            </div>

            <div className="lg:col-span-6 space-y-4 text-[15px] text-ink-2 leading-relaxed font-body">
              <p>
                The <strong>PM-KUSUM</strong> (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan) scheme aims to provide energy security to Indian farmers by replacing diesel water pumps with solar pumps and enabling surplus solar generation on agricultural land.
              </p>
              <p>
                Under Component B, farmers can procure 3 HP, 5 HP, and 7.5 HP solar irrigation pumps at just 10% to 40% of standard capital expenditure, backed by combined Central and State government subsidies.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/tools/solar-subsidy-calculator"
                  className="inline-flex items-center justify-center h-10 px-5 bg-sun text-ink font-semibold text-xs rounded-sm hover:brightness-95 transition-colors"
                >
                  Estimate pump sizing
                </Link>
                <Link
                  href="/subsidy/pm-surya-ghar"
                  className="inline-flex items-center justify-center h-10 px-5 border-[1.5px] border-ink text-ink font-medium text-xs rounded-sm hover:bg-wash transition-colors"
                >
                  PM Surya Ghar (Rooftop)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-8 space-y-12">

            {/* Components Overview */}
            <section>
              <h2 className="font-heading font-semibold text-2xl text-ink mb-2">
                PM-KUSUM: The 3 core scheme components
              </h2>
              <p className="text-xs text-ink-2 mb-4 font-body">
                Structured overview of decentralized ground solar, standalone irrigation pumps, and grid feeder solarisation:
              </p>
              <DataTable columns={componentColumns} rows={componentRows} />
            </section>

            {/* Component B Pricing & Slabs */}
            <section className="border-t border-line pt-8">
              <h2 className="font-heading font-semibold text-2xl text-ink mb-2">
                Component B: Standalone solar pump subsidy benchmarks
              </h2>
              <p className="text-xs text-ink-2 mb-4 font-body">
                Official benchmarks and farmer contribution breakdown for 3 HP, 5 HP, and 7.5 HP installations:
              </p>
              <DataTable columns={pumpSlabsColumns} rows={pumpSlabsRows} />
            </section>

            {/* Application Workflow */}
            <section className="border-t border-line pt-8">
              <h2 className="font-heading font-semibold text-2xl text-ink mb-2">
                How farmers apply for solar pumps
              </h2>
              <p className="text-xs text-ink-2 mb-6 font-body">
                Standard state renewable development agency workflow:
              </p>
              <div className="max-w-2xl">
                <Steps steps={steps} />
              </div>
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
            <LeadForm prefill={{ requirement: 'Commercial Solar' }} source="subsidy:pm-kusum" />

            <div className="border border-line rounded-sm p-5 bg-wash font-body text-xs space-y-3">
              <h3 className="font-heading font-semibold text-sm text-ink pb-2 border-b border-line">
                Major state nodal agencies
              </h3>
              <p className="text-ink-2">Applications must be submitted via your respective state agency portal:</p>
              <ul className="space-y-1.5 text-ink font-medium">
                <li>• Maharashtra: MEDA (Mahaurja)</li>
                <li>• Gujarat: GUVNL / GEDA</li>
                <li>• Rajasthan: RREC</li>
                <li>• Uttar Pradesh: UPNEDA</li>
                <li>• Madhya Pradesh: MPUVN</li>
                <li>• Haryana: HAREDA</li>
              </ul>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
