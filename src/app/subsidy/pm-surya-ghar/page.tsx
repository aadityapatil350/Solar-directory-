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
  title: 'PM Surya Ghar Muft Bijli Yojana 2026: Slabs, Subsidy & Portal Guide | GoSolarIndex',
  description: 'Complete guide to PM Surya Ghar Muft Bijli Yojana central subsidies up to ₹78,000. Check 1kW-3kW subsidy slabs, DCR module rules, DISCOM net-metering and application steps.',
  path: '/subsidy/pm-surya-ghar',
});

const subsidyTableColumns = [
  { key: 'capacity', label: 'System Capacity' },
  { key: 'monthlyUnits', label: 'Est. Monthly Units' },
  { key: 'grossCost', label: 'Avg Gross Cost' },
  { key: 'subsidy', label: 'Central DBT Subsidy' },
  { key: 'netCost', label: 'Net Homeowner Cost', align: 'right' as const },
];

const subsidyTableRows = [
  {
    capacity: '1 kW',
    monthlyUnits: '120 – 140 units',
    grossCost: '₹60,000 – ₹70,000',
    subsidy: '₹30,000',
    netCost: '₹30,000 – ₹40,000',
  },
  {
    capacity: '2 kW',
    monthlyUnits: '240 – 280 units',
    grossCost: '₹1,20,000 – ₹1,35,000',
    subsidy: '₹60,000',
    netCost: '₹60,000 – ₹75,000',
  },
  {
    capacity: '3 kW',
    monthlyUnits: '360 – 420 units',
    grossCost: '₹1,80,000 – ₹1,95,000',
    subsidy: '₹78,000 (Maximum Cap)',
    netCost: '₹1,02,000 – ₹1,17,000',
  },
  {
    capacity: '4 kW – 10 kW',
    monthlyUnits: '480 – 1,300 units',
    grossCost: '₹2,30,000 – ₹5,50,000',
    subsidy: '₹78,000 (Capped at 3kW)',
    netCost: '₹1,52,000 – ₹4,72,000',
  },
];

const registrationSteps = [
  {
    title: 'Registration on National Portal (pmsuryaghar.gov.in)',
    description: 'Download the PM Surya Ghar mobile app or visit pmsuryaghar.gov.in. Select your state, electricity distribution company (DISCOM), and enter your consumer account number and mobile number.',
  },
  {
    title: 'Apply for rooftop solar feasibility',
    description: 'Login with your consumer credentials and apply for technical feasibility. The local DISCOM reviews transformer loading capacity and issues an approval within 15 days.',
  },
  {
    title: 'Execute agreement with an empanelled vendor',
    description: 'Select an MNRE-registered solar vendor in your city. Ensure the quotation explicitly mandates ALMM-listed Domestic Content Requirement (DCR) solar modules.',
  },
  {
    title: 'Hardware installation and net-meter inspection',
    description: 'Vendor installs modules, inverters, and lightning earthing. DISCOM engineers conduct on-site inspection, install the bi-directional net meter, and issue a joint commissioning report.',
  },
  {
    title: 'Direct Benefit Transfer (DBT) disbursement',
    description: 'Submit bank account details (with a cancelled cheque) on the portal. The central financial assistance of up to ₹78,000 is credited directly to your bank account within 30 days.',
  },
];

const faqs = [
  {
    q: 'What is the maximum subsidy under PM Surya Ghar Yojana?',
    a: 'For residential individual households, the central DBT subsidy is capped at ₹78,000 for system capacities of 3 kW and higher (₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 for 3 kW or above).',
  },
  {
    q: 'Is PM Surya Ghar subsidy available for commercial offices or factories?',
    a: 'No. PM Surya Ghar Muft Bijli Yojana is strictly reserved for individual residential houses and Group Housing Societies (GHS / RWA common area lighting). Commercial and industrial consumers benefit from 40% accelerated depreciation tax benefits and GST input tax credits rather than direct DBT subsidies.',
  },
  {
    q: 'What are DCR panels and why are they mandatory?',
    a: 'Domestic Content Requirement (DCR) modules are solar panels manufactured in India using solar cells also produced domestically. Under MNRE guidelines, direct financial subsidy is only released if DCR-certified modules from the Approved List of Models and Manufacturers (ALMM) are deployed.',
  },
  {
    q: 'How long does it take to receive the subsidy in the bank account?',
    a: 'Once the net meter is commissioned and the joint commissioning report is uploaded along with bank details on pmsuryaghar.gov.in, the Ministry disburses the DBT credit within 30 days directly to the registered Aadhaar-linked account.',
  },
];

export default function PMSuryaGharPage() {
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
              { label: 'PM Surya Ghar' },
            ]}
          />
        </div>
      </div>

      {/* Hero Header */}
      <section className="border-b border-line bg-paper py-10">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-tight mb-8">
            PM Surya Ghar Muft Bijli Yojana: Subsidy Slabs, DCR Rules &amp; Application Guide
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <FactPanel
                title="PM Surya Ghar: Central Subsidy Matrix"
                rows={[
                  { label: '1 kW system subsidy', value: '₹30,000' },
                  { label: '2 kW system subsidy', value: '₹60,000' },
                  { label: '3 kW+ system subsidy (Cap)', value: '₹78,000', total: true },
                  { label: 'Housing society / RWA common load', value: '₹18,000 per kW (up to 500 kW)' },
                  { label: 'Module technology mandate', value: 'ALMM List-I DCR (Indian cells)' },
                  { label: 'National portal', value: 'pmsuryaghar.gov.in' },
                ]}
                sources="Ministry of New and Renewable Energy (MNRE) Notification No. 318/631/2023-GCRT, Cabinet Committee on Economic Affairs approval 2024–2026."
              />
            </div>

            <div className="lg:col-span-6 space-y-4 text-[15px] text-ink-2 leading-relaxed font-body">
              <p>
                Launched by the Government of India with a total outlay of <strong>₹75,021 crore</strong>, the PM Surya Ghar Muft Bijli Yojana provides direct financial assistance to 1 crore residential households to install grid-connected rooftop solar.
              </p>
              <p>
                Subsidies are transferred directly via DBT to the homeowner&apos;s bank account after successful commissioning of the bi-directional net meter with the local DISCOM.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/tools/solar-subsidy-calculator"
                  className="inline-flex items-center justify-center h-10 px-5 bg-sun text-ink font-semibold text-xs rounded-sm hover:brightness-95 transition-colors"
                >
                  Calculate your subsidy
                </Link>
                <a
                  href="#application-steps"
                  className="inline-flex items-center justify-center h-10 px-5 border-[1.5px] border-ink text-ink font-medium text-xs rounded-sm hover:bg-wash transition-colors"
                >
                  Application workflow
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-8 space-y-12">

            {/* Subsidy Slabs Table */}
            <section>
              <h2 className="font-heading font-semibold text-2xl text-ink mb-2">
                Official PM Surya Ghar subsidy slabs (2026)
              </h2>
              <p className="text-xs text-ink-2 mb-4 font-body">
                Central Direct Benefit Transfer (DBT) calculated per kW of installed solar capacity:
              </p>
              <DataTable columns={subsidyTableColumns} rows={subsidyTableRows} />
            </section>

            {/* Application Workflow */}
            <section id="application-steps" className="border-t border-line pt-8">
              <h2 className="font-heading font-semibold text-2xl text-ink mb-2">
                Step-by-step application workflow
              </h2>
              <p className="text-xs text-ink-2 mb-6 font-body">
                How to apply on pmsuryaghar.gov.in from initial registration to net-meter commissioning:
              </p>
              <div className="max-w-2xl">
                <Steps steps={registrationSteps} />
              </div>
            </section>

            {/* Technical & Regulatory Mandates */}
            <section className="border-t border-line pt-8 space-y-4 font-body text-sm">
              <h2 className="font-heading font-semibold text-2xl text-ink">
                Mandatory compliance requirements for subsidy approval
              </h2>
              <div className="border border-line rounded-sm p-5 bg-wash space-y-3 text-xs leading-relaxed text-ink-2">
                <div>
                  <strong className="text-ink text-sm block mb-1">1. DCR (Domestic Content Requirement) Modules</strong>
                  Solar modules must be assembled in India using domestically manufactured solar photovoltaic cells. Non-DCR panels (even if assembled in India with imported cells) are ineligible for central subsidy.
                </div>
                <div>
                  <strong className="text-ink text-sm block mb-1">2. MNRE ALMM Compliance</strong>
                  Both the module manufacturer and specific model must be certified on the Ministry of New and Renewable Energy Approved List of Models and Manufacturers (ALMM List-I).
                </div>
                <div>
                  <strong className="text-ink text-sm block mb-1">3. Bi-directional Net Metering</strong>
                  The system must be tied to the local distribution utility&apos;s grid via a certified net meter. Off-grid systems with battery backup are not eligible for central DBT assistance.
                </div>
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

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 lg:self-start">
            <LeadForm prefill={{ requirement: '3kW Residential' }} source="subsidy:pm-surya-ghar" />

            <div className="border border-line rounded-sm p-5 bg-wash font-body text-xs space-y-3">
              <h3 className="font-heading font-semibold text-sm text-ink pb-2 border-b border-line">
                Related solar tools
              </h3>
              <ul className="space-y-2 text-ink">
                <li>
                  <Link href="/tools/solar-subsidy-calculator" className="underline hover:text-ink/80 block">
                    Solar Subsidy &amp; Sizing Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/price" className="underline hover:text-ink/80 block">
                    India Solar Price Index (1kW – 10kW)
                  </Link>
                </li>
                <li>
                  <Link href="/subsidy/pm-kusum" className="underline hover:text-ink/80 block">
                    PM-KUSUM Scheme for Farmers
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
