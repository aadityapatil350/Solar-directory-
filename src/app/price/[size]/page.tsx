import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import FactPanel from '@/components/ui/FactPanel';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQ from '@/components/ui/FAQ';
import DataTable from '@/components/ui/DataTable';
import LeadForm from '@/components/LeadForm';
import { constructMetadata } from '@/lib/metadata';

interface PageProps {
  params: Promise<{ size: string }>;
}

interface SizeData {
  title: string;
  kW: string;
  grossCost: string;
  subsidy: string;
  netCost: string;
  monthlyUnits: string;
  annualSavings: string;
  payback: string;
  panelsCount: string;
  roofArea: string;
  inverterRating: string;
  idealFor: string;
  description: string;
  specRows: { key: string; label: string; value: string }[];
  faqs: { q: string; a: string }[];
}

const SIZE_CONFIGS: Record<string, SizeData> = {
  '1kw': {
    title: '1 kW Solar System Price in India (2026)',
    kW: '1 kW',
    grossCost: '₹60,000 – ₹70,000',
    subsidy: '₹30,000',
    netCost: '₹30,000 – ₹40,000',
    monthlyUnits: '120 – 140 units',
    annualSavings: '₹10,000 – ₹14,000 / year',
    payback: '3.0 – 3.5 years',
    panelsCount: '2 modules (540W – 550W Mono PERC / TOPCon)',
    roofArea: '80 – 100 sq ft (shadow-free)',
    inverterRating: '1 kW Single-Phase On-Grid String Inverter',
    idealFor: '1 BHK apartments, small shops, rural homes consuming up to 150 units/month',
    description: 'A 1 kW on-grid solar system is the entry-level solar solution in India. Under the PM Surya Ghar Muft Bijli Yojana, eligible residential homeowners receive an upfront direct central subsidy of ₹30,000, bringing the net out-of-pocket investment down to approximately ₹35,000.',
    specRows: [
      { key: 'panels', label: 'Solar Modules', value: '2 x 540W Mono PERC / TOPCon Bifacial' },
      { key: 'inverter', label: 'Inverter Type', value: '1 kW Single Phase Grid-Tie (MPPT efficiency >97%)' },
      { key: 'roofSpace', label: 'Rooftop Requirement', value: '80 – 100 sq ft shadow-free' },
      { key: 'generation', label: 'Daily Energy Generation', value: '4 – 4.5 kWh (units) / day' },
      { key: 'metering', label: 'Grid Interconnection', value: 'Bi-directional Net Meter (Single Phase)' },
      { key: 'warranty', label: 'Hardware Warranty', value: '25-yr panel output, 5–10 yr inverter' },
    ],
    faqs: [
      {
        q: 'Can a 1 kW solar system run an air conditioner?',
        a: 'No. A standard 1.5-ton AC consumes 1,200W to 1,800W of power, which exceeds 1 kW. A 1 kW on-grid system offset base home loads (refrigerator, fans, lights, TV) while any deficit is drawn seamlessly from the DISCOM grid.',
      },
      {
        q: 'How much subsidy do I get on a 1 kW system in India?',
        a: 'Under the PM Surya Ghar scheme, individual residential homeowners receive exactly ₹30,000 central subsidy for a 1 kW rooftop solar system.',
      },
    ],
  },
  '2kw': {
    title: '2 kW Solar System Price in India (2026)',
    kW: '2 kW',
    grossCost: '₹1,20,000 – ₹1,35,000',
    subsidy: '₹60,000',
    netCost: '₹60,000 – ₹75,000',
    monthlyUnits: '240 – 280 units',
    annualSavings: '₹22,000 – ₹28,000 / year',
    payback: '3.1 – 3.5 years',
    panelsCount: '4 modules (540W – 550W Mono PERC / TOPCon)',
    roofArea: '160 – 200 sq ft (shadow-free)',
    inverterRating: '2 kW Single-Phase On-Grid Inverter',
    idealFor: '2 BHK houses, small families with monthly consumption between 200–300 units',
    description: 'A 2 kW on-grid solar system delivers approximately 8 to 9 units of electricity daily, sufficient to power a 2 BHK home with lights, fans, refrigerator, washing machine, and light AC usage. Homeowners benefit from a ₹60,000 central DBT subsidy.',
    specRows: [
      { key: 'panels', label: 'Solar Modules', value: '4 x 540W/550W ALMM Mono PERC' },
      { key: 'inverter', label: 'Inverter Type', value: '2 kW Single Phase Grid-Tie' },
      { key: 'roofSpace', label: 'Rooftop Requirement', value: '160 – 200 sq ft shadow-free' },
      { key: 'generation', label: 'Daily Energy Generation', value: '8 – 9 kWh (units) / day' },
      { key: 'metering', label: 'Grid Interconnection', value: 'Bi-directional Net Meter' },
      { key: 'warranty', label: 'Hardware Warranty', value: '25-yr panel output, 5–10 yr inverter' },
    ],
    faqs: [
      {
        q: 'Can a 2 kW solar system run 1 AC?',
        a: 'Yes. A 2 kW on-grid system generates sufficient daytime power to run a 1-ton 5-star inverter AC along with basic household appliances.',
      },
      {
        q: 'What is the net cost of a 2 kW solar installation after subsidy?',
        a: 'After deducting the ₹60,000 central subsidy under PM Surya Ghar, the net cost for a standard 2 kW turnkey installation ranges between ₹60,000 and ₹75,000.',
      },
    ],
  },
  '3kw': {
    title: '3 kW Solar System Price in India (2026)',
    kW: '3 kW',
    grossCost: '₹1,80,000 – ₹1,95,000',
    subsidy: '₹78,000 (Maximum Cap)',
    netCost: '₹1,02,000 – ₹1,17,000',
    monthlyUnits: '360 – 420 units',
    annualSavings: '₹35,000 – ₹45,000 / year',
    payback: '3.2 – 3.8 years',
    panelsCount: '6 modules (540W – 550W Mono PERC / TOPCon)',
    roofArea: '250 – 300 sq ft (shadow-free)',
    inverterRating: '3 kW Single/Three-Phase Grid-Tie Inverter',
    idealFor: '3 BHK houses, independent villas with 1–2 ACs and monthly bills of ₹3,000–₹5,000',
    description: 'The 3 kW solar system is India&apos;s most popular residential solar configuration. It qualifies for the maximum allowable central subsidy of ₹78,000 under PM Surya Ghar Yojana, delivering nearly 100% electricity bill offset for middle-class Indian families.',
    specRows: [
      { key: 'panels', label: 'Solar Modules', value: '6 x 540W/550W ALMM Mono PERC / TOPCon' },
      { key: 'inverter', label: 'Inverter Type', value: '3 kW Single/Three-Phase Grid-Tie with Wi-Fi' },
      { key: 'roofSpace', label: 'Rooftop Requirement', value: '250 – 300 sq ft shadow-free' },
      { key: 'generation', label: 'Daily Energy Generation', value: '12 – 14 kWh (units) / day' },
      { key: 'metering', label: 'Grid Interconnection', value: 'Bi-directional Net Meter' },
      { key: 'warranty', label: 'Hardware Warranty', value: '25-yr panel output, 5–10 yr inverter' },
    ],
    faqs: [
      {
        q: 'Why is 3 kW the most popular residential solar size in India?',
        a: 'The central government subsidy caps at ₹78,000 for 3 kW. Systems larger than 3 kW do not receive any additional subsidy per kW. Combined with average Indian 3 BHK household consumption (350–450 units/month), 3 kW achieves the maximum financial ROI.',
      },
      {
        q: 'How much does a 3 kW solar system save every year?',
        a: 'Generating roughly 4,300 units annually at an average grid tariff of ₹8 to ₹10/unit, a 3 kW system saves approximately ₹35,000 to ₹45,000 on electricity bills each year.',
      },
    ],
  },
  '5kw': {
    title: '5 kW Solar System Price in India (2026)',
    kW: '5 kW',
    grossCost: '₹2,75,000 – ₹3,00,000',
    subsidy: '₹78,000 (Maximum Cap)',
    netCost: '₹1,97,000 – ₹2,22,000',
    monthlyUnits: '600 – 700 units',
    annualSavings: '₹60,000 – ₹80,000 / year',
    payback: '3.8 – 4.2 years',
    panelsCount: '10 modules (540W – 550W Mono PERC / TOPCon)',
    roofArea: '400 – 500 sq ft (shadow-free)',
    inverterRating: '5 kW Three-Phase Grid-Tie Inverter',
    idealFor: 'Large bungalows, duplexes, independent homes with 3–4 ACs and bills above ₹6,000/month',
    description: 'A 5 kW solar system is suited for large residential properties with heavy cooling loads. It generates 20 to 24 units of clean electricity daily, allowing homeowners with high tariff slabs to bring their electricity bills close to zero.',
    specRows: [
      { key: 'panels', label: 'Solar Modules', value: '10 x 540W/550W ALMM High-Efficiency Modules' },
      { key: 'inverter', label: 'Inverter Type', value: '5 kW Three-Phase Grid-Tie Inverter' },
      { key: 'roofSpace', label: 'Rooftop Requirement', value: '400 – 500 sq ft shadow-free' },
      { key: 'generation', label: 'Daily Energy Generation', value: '20 – 24 kWh (units) / day' },
      { key: 'metering', label: 'Grid Interconnection', value: 'Three-Phase Bi-directional Net Meter' },
      { key: 'warranty', label: 'Hardware Warranty', value: '25-yr panel output, 5–10 yr inverter' },
    ],
    faqs: [
      {
        q: 'Do I get more than ₹78,000 subsidy on a 5 kW system?',
        a: 'No. The central PM Surya Ghar scheme caps the individual residential subsidy at ₹78,000 regardless of whether your system is 3 kW, 5 kW, or 10 kW.',
      },
      {
        q: 'Does a 5 kW system require a three-phase electricity connection?',
        a: 'In most Indian states (such as Maharashtra, Gujarat, Delhi, Karnataka), distribution utilities require installations above 3 kW or 4 kW to be connected across a three-phase electricity meter.',
      },
    ],
  },
  '10kw': {
    title: '10 kW Solar System Price in India (2026)',
    kW: '10 kW',
    grossCost: '₹5,20,000 – ₹5,75,000',
    subsidy: '₹78,000 (Residential) / 40% Tax Deprec. (Commercial)',
    netCost: '₹4,42,000 – ₹4,97,000',
    monthlyUnits: '1,200 – 1,400 units',
    annualSavings: '₹1,20,000 – ₹1,60,000 / year',
    payback: '4.0 – 4.5 years',
    panelsCount: '18 – 20 modules (540W – 550W Modules)',
    roofArea: '800 – 1,000 sq ft (shadow-free)',
    inverterRating: '10 kW Three-Phase Inverter',
    idealFor: 'Large villas, commercial establishments, clinics, petrol pumps, schools',
    description: 'A 10 kW solar system is a commercial-grade decentralized rooftop installation generating over 40 units per day. For commercial buyers, Section 32 allows 40% accelerated depreciation in Year 1 along with 18% GST input credit recovery.',
    specRows: [
      { key: 'panels', label: 'Solar Modules', value: '18–20 x 540W/550W Tier-1 ALMM Panels' },
      { key: 'inverter', label: 'Inverter Type', value: '10 kW Three-Phase Industrial Inverter with Dual MPPT' },
      { key: 'roofSpace', label: 'Rooftop Requirement', value: '800 – 1,000 sq ft shadow-free' },
      { key: 'generation', label: 'Daily Energy Generation', value: '40 – 45 kWh (units) / day' },
      { key: 'metering', label: 'Grid Interconnection', value: 'Three-Phase Net Metering with CT/PT' },
      { key: 'warranty', label: 'Hardware Warranty', value: '25-yr panel output, 5–10 yr inverter' },
    ],
    faqs: [
      {
        q: 'What are the commercial tax benefits of a 10 kW solar system?',
        a: 'Commercial businesses can claim 40% accelerated depreciation on the total capital expenditure in the first financial year, alongside full 18% GST input tax credit (ITC) offset.',
      },
      {
        q: 'How much roof area is required for a 10 kW solar installation?',
        a: 'You need approximately 800 to 1,000 square feet of unobstructed, shadow-free rooftop space.',
      },
    ],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { size } = await params;
  const config = SIZE_CONFIGS[size.toLowerCase()];
  if (!config) return {};

  return constructMetadata({
    title: `${config.kW} Solar System Price in India 2026: Cost, Subsidy & Sizing | GoSolarIndex`,
    description: `Complete guide to ${config.kW} solar panel system cost in India. Gross vs net cost after PM Surya Ghar subsidy, generation (${config.monthlyUnits}), roof area, and payback.`,
    path: `/price/${size.toLowerCase()}`,
  });
}

export function generateStaticParams() {
  return Object.keys(SIZE_CONFIGS).map((size) => ({ size }));
}

export default async function SizePricePage({ params }: PageProps) {
  const { size } = await params;
  const config = SIZE_CONFIGS[size.toLowerCase()];

  if (!config) notFound();

  const specColumns = [
    { key: 'label', label: 'System Specification' },
    { key: 'value', label: 'Hardware & Engineering Detail', align: 'right' as const },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((f) => ({
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
              { label: 'Solar Price Index', href: '/price' },
              { label: `${config.kW} Solar Price` },
            ]}
          />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-10">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-tight mb-8">
            {config.title}: Cost, Subsidy &amp; Generation Sizing
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <FactPanel
                title={`${config.kW} Solar System Financial Overview`}
                rows={[
                  { label: 'Estimated gross turnkey cost', value: config.grossCost },
                  { label: 'PM Surya Ghar central subsidy', value: config.subsidy },
                  { label: 'Net homeowner investment', value: config.netCost, total: true },
                  { label: 'Estimated monthly generation', value: config.monthlyUnits },
                  { label: 'Annual electricity savings', value: config.annualSavings },
                  { label: 'Estimated capital payback', value: config.payback },
                ]}
                sources="Ministry of New and Renewable Energy (MNRE), National Portal for Rooftop Solar, verified EPC bids 2026."
              />
            </div>

            <div className="lg:col-span-6 space-y-4 text-[15px] text-ink-2 leading-relaxed font-body">
              <p>{config.description}</p>
              <div className="border border-line rounded-sm p-4 bg-wash space-y-2 text-xs">
                <div>
                  <strong className="text-ink">Recommended for: </strong>
                  <span>{config.idealFor}</span>
                </div>
                <div>
                  <strong className="text-ink">Rooftop space required: </strong>
                  <span>{config.roofArea}</span>
                </div>
              </div>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="#quote"
                  className="inline-flex items-center justify-center h-10 px-5 bg-sun text-ink font-semibold text-xs rounded-sm hover:brightness-95 transition-colors"
                >
                  Get quotes for {config.kW}
                </a>
                <Link
                  href="/price"
                  className="inline-flex items-center justify-center h-10 px-5 border-[1.5px] border-ink text-ink font-medium text-xs rounded-sm hover:bg-wash transition-colors"
                >
                  Compare all sizes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-8 space-y-12">

            {/* Technical Specifications */}
            <section>
              <h2 className="font-heading font-semibold text-2xl text-ink mb-2">
                Technical hardware specifications for {config.kW}
              </h2>
              <p className="text-xs text-ink-2 mb-4 font-body">
                Standard components included in a certified turnkey installation:
              </p>
              <DataTable columns={specColumns} rows={config.specRows} />
            </section>

            {/* Switch sizes */}
            <section className="border-t border-line pt-8">
              <h2 className="font-heading font-semibold text-xl text-ink mb-3">
                Explore other system sizes
              </h2>
              <div className="flex flex-wrap gap-2 text-xs font-body">
                {['1kw', '2kw', '3kw', '5kw', '10kw']
                  .filter((s) => s !== size.toLowerCase())
                  .map((s) => (
                    <Link
                      key={s}
                      href={`/price/${s}`}
                      className="px-3 py-2 border border-line rounded-sm bg-wash hover:bg-paper text-ink transition-colors font-medium"
                    >
                      {s.toUpperCase()} Price Guide →
                    </Link>
                  ))}
              </div>
            </section>

            {/* FAQs */}
            <section className="border-t border-line pt-8">
              <h2 className="font-heading font-semibold text-2xl text-ink mb-6">
                Frequently asked questions: {config.kW} Solar
              </h2>
              <FAQ items={config.faqs} />
            </section>

          </div>

          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 lg:self-start">
            <LeadForm prefill={{ requirement: `${config.kW} Residential` }} source={`price:${size.toLowerCase()}`} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
