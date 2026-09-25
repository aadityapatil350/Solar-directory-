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
  title: 'Solar Panel Installation Cost in India 2026: 1kW to 10kW Price Index | GoSolarIndex',
  description: 'Complete 2026 solar price benchmark for India. Compare gross vs net installation costs for 1kW, 2kW, 3kW, 5kW, and 10kW systems after PM Surya Ghar central subsidies.',
  path: '/price',
});

const priceTableColumns = [
  { key: 'size', label: 'System Size' },
  { key: 'grossCost', label: 'Gross Turnkey Cost' },
  { key: 'subsidy', label: 'PM Surya Ghar Subsidy' },
  { key: 'netCost', label: 'Net Homeowner Cost' },
  { key: 'monthlyUnits', label: 'Est. Generation' },
  { key: 'payback', label: 'Est. Payback', align: 'right' as const },
];

const priceTableRows = [
  {
    size: '1 kW System',
    grossCost: '₹60,000 – ₹70,000',
    subsidy: '- ₹30,000',
    netCost: '₹30,000 – ₹40,000',
    monthlyUnits: '~120 units / mo',
    payback: '3.0 – 3.5 yrs',
  },
  {
    size: '2 kW System',
    grossCost: '₹1,20,000 – ₹1,35,000',
    subsidy: '- ₹60,000',
    netCost: '₹60,000 – ₹75,000',
    monthlyUnits: '~240 units / mo',
    payback: '3.1 – 3.6 yrs',
  },
  {
    size: '3 kW System (Popular)',
    grossCost: '₹1,80,000 – ₹1,95,000',
    subsidy: '- ₹78,000 (Cap)',
    netCost: '₹1,02,000 – ₹1,17,000',
    monthlyUnits: '~360 units / mo',
    payback: '3.2 – 3.8 yrs',
  },
  {
    size: '5 kW System',
    grossCost: '₹2,75,000 – ₹3,00,000',
    subsidy: '- ₹78,000 (Cap)',
    netCost: '₹1,97,000 – ₹2,22,000',
    monthlyUnits: '~600 units / mo',
    payback: '3.8 – 4.2 yrs',
  },
  {
    size: '10 kW System',
    grossCost: '₹5,20,000 – ₹5,75,000',
    subsidy: '- ₹78,000 (Cap)',
    netCost: '₹4,42,000 – ₹4,97,000',
    monthlyUnits: '~1,200 units / mo',
    payback: '4.0 – 4.5 yrs',
  },
];

const componentSplitColumns = [
  { key: 'component', label: 'System Component' },
  { key: 'percentage', label: 'Share of Total Cost' },
  { key: 'description', label: 'Included Hardware & Scope', align: 'right' as const },
];

const componentSplitRows = [
  {
    component: 'Solar Photovoltaic Modules',
    percentage: '50% – 55%',
    description: 'Tier-1 ALMM mono PERC or TOPCon bifacial modules (Waaree, Adani, Tata)',
  },
  {
    component: 'Grid-Tie Inverter',
    percentage: '18% – 22%',
    description: 'Single/Three-phase string inverter with MPPT & mobile Wi-Fi monitoring',
  },
  {
    component: 'Mounting Structure & Cables',
    percentage: '12% – 15%',
    description: 'Hot-dip galvanized / aluminium structure, UV-resistant DC solar cables',
  },
  {
    component: 'Net Metering & Electrical BoS',
    percentage: '8% – 10%',
    description: 'ACDB/DCDB boxes, SPD surge protection, dual earthing kits, DISCOM liaison',
  },
  {
    component: 'Installation, Testing & Labor',
    percentage: '5% – 8%',
    description: 'Civil foundation, rooftop cabling, pre-commissioning testing',
  },
];

const faqs = [
  {
    q: 'Why does solar price per watt decrease with larger system sizes?',
    a: 'Fixed costs such as inverter procurement, DISCOM application paperwork, net meter testing fees, and installation labor do not scale linearly with system capacity. A 5 kW installation shares similar electrical overhead with a 3 kW system, resulting in economies of scale and lower price per watt.',
  },
  {
    q: 'What is the price difference between Mono PERC and TOPCon panels?',
    a: 'TOPCon (Tunnel Oxide Passivated Contact) panels are approximately ₹3 to ₹6 per watt more expensive than standard Mono PERC modules. However, TOPCon modules offer 1%–2% higher efficiency and significantly lower degradation under high Indian ambient temperatures (above 40°C).',
  },
  {
    q: 'How much extra does a hybrid solar system with battery storage cost?',
    a: 'Adding lithium-ion battery storage (typically 5 kWh to 10 kWh) increases the turnkey system cost by ₹1,20,000 to ₹2,50,000. Hybrid systems are recommended only for areas experiencing frequent daytime power cuts, as on-grid systems without batteries deliver the fastest payback (3–4 years).',
  },
];

export default function PriceHubPage() {
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
              { label: 'Solar Price Index' },
            ]}
          />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-10">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-tight mb-8">
            Solar Panel Installation Cost in India (2026): 1kW to 10kW Price Index
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <FactPanel
                title="India Solar Pricing Benchmark"
                rows={[
                  { label: '3 kW average gross turnkey cost', value: '₹1,80,000 – ₹1,95,000' },
                  { label: 'PM Surya Ghar 3 kW subsidy', value: '₹78,000' },
                  { label: 'Net 3 kW homeowner investment', value: '₹1,02,000 – ₹1,17,000', total: true },
                  { label: 'Turnkey price per watt range', value: '₹55 – ₹65 / W (gross)' },
                  { label: 'Module wholesale price range', value: '₹22 – ₹34 / W (ALMM List-I)' },
                  { label: 'Average capital payback period', value: '3.2 – 3.8 years' },
                ]}
                sources="Ministry of New and Renewable Energy (MNRE) benchmark reports, state nodal agency tenders, verified EPC quotes from GoSolarIndex network 2026."
              />
            </div>

            <div className="lg:col-span-6 space-y-4 text-[15px] text-ink-2 leading-relaxed font-body">
              <p>
                Rooftop solar costs in India have fallen by over 70% in the last decade, driven by domestic module manufacturing capacity under the ALMM framework and generous central DBT subsidies.
              </p>
              <p>
                A standard 3 kW residential rooftop solar array in India now pays for itself within <strong>3.5 years</strong> on average, providing free clean electricity for the remainder of its 25-year design lifespan.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/tools/solar-subsidy-calculator"
                  className="inline-flex items-center justify-center h-10 px-5 bg-sun text-ink font-semibold text-xs rounded-sm hover:brightness-95 transition-colors"
                >
                  Calculate cost for your roof
                </Link>
                <a
                  href="#size-breakdown"
                  className="inline-flex items-center justify-center h-10 px-5 border-[1.5px] border-ink text-ink font-medium text-xs rounded-sm hover:bg-wash transition-colors"
                >
                  Size comparison table
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-8 space-y-12">

            {/* Quick Links by System Size */}
            <section id="size-breakdown">
              <h2 className="font-heading font-semibold text-2xl text-ink mb-2">
                Detailed pricing guides by system size
              </h2>
              <p className="text-xs text-ink-2 mb-4 font-body">
                Explore in-depth specifications, roof area requirements, and component costs for your exact size:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-body text-xs">
                {[
                  { size: '1 kW', slug: '1kw', cost: 'From ₹30,000' },
                  { size: '2 kW', slug: '2kw', cost: 'From ₹60,000' },
                  { size: '3 kW', slug: '3kw', cost: 'From ₹1,02,000' },
                  { size: '5 kW', slug: '5kw', cost: 'From ₹1,97,000' },
                  { size: '10 kW', slug: '10kw', cost: 'From ₹4,42,000' },
                ].map((item) => (
                  <Link
                    key={item.slug}
                    href={`/price/${item.slug}`}
                    className="p-3 border border-line rounded-sm bg-wash hover:bg-paper transition-colors text-ink text-center flex flex-col justify-between"
                  >
                    <span className="font-heading font-semibold text-sm">{item.size}</span>
                    <span className="text-ink-2 text-[11px] mt-1 tabular-nums">{item.cost}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Comprehensive Price Matrix */}
            <section className="border-t border-line pt-8">
              <h2 className="font-heading font-semibold text-2xl text-ink mb-2">
                Turnkey residential solar installation cost matrix (2026)
              </h2>
              <p className="text-xs text-ink-2 mb-4 font-body">
                Turnkey pricing includes ALMM-certified panels, grid-tie inverter, mounting structure, bi-directional net meter, and DISCOM paperwork:
              </p>
              <DataTable columns={priceTableColumns} rows={priceTableRows} />
            </section>

            {/* Cost Breakdown Split */}
            <section className="border-t border-line pt-8">
              <h2 className="font-heading font-semibold text-2xl text-ink mb-2">
                Where does your money go? Solar cost breakdown
              </h2>
              <p className="text-xs text-ink-2 mb-4 font-body">
                Component-wise cost allocation for a standard Indian rooftop solar project:
              </p>
              <DataTable columns={componentSplitColumns} rows={componentSplitRows} />
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
            <LeadForm prefill={{ requirement: '3kW Residential' }} source="price:index" />

            <div className="border border-line rounded-sm p-5 bg-wash font-body text-xs space-y-3">
              <h3 className="font-heading font-semibold text-sm text-ink pb-2 border-b border-line">
                Related price guides
              </h3>
              <ul className="space-y-2 text-ink">
                <li>
                  <Link href="/subsidy/pm-surya-ghar" className="underline hover:text-ink/80 block">
                    PM Surya Ghar Subsidy Guide
                  </Link>
                </li>
                <li>
                  <Link href="/tools/solar-subsidy-calculator" className="underline hover:text-ink/80 block">
                    Custom Rooftop ROI Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/guides/topcon-vs-mono-perc-solar-panels-india" className="underline hover:text-ink/80 block">
                    TOPCon vs Mono PERC Panels
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
