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
  params: Promise<{ slug: string }>;
}

interface CompareData {
  title: string;
  subtitle: string;
  metaDesc: string;
  factTitle: string;
  factRows: { label: string; value: string; total?: boolean }[];
  tableColumns: { key: string; label: string; align?: 'left' | 'right' }[];
  tableRows: Record<string, string>[];
  verdict: string;
  faqs: { q: string; a: string }[];
}

const COMPARISONS: Record<string, CompareData> = {
  'waaree-vs-vikram': {
    title: 'Waaree vs Vikram Solar Panels: 2026 Comparison',
    subtitle: 'Side-by-side engineering comparison of India\'s two leading Tier-1 ALMM solar module manufacturers.',
    metaDesc: 'Compare Waaree vs Vikram Solar panels in India. Side-by-side comparison of TOPCon module efficiency, degradation rates, warranties, prices, and DCR compliance.',
    factTitle: 'Waaree vs Vikram Benchmark',
    factRows: [
      { label: 'Waaree manufacturing capacity', value: '13.3 GW (India #1)' },
      { label: 'Vikram manufacturing capacity', value: '3.5 GW' },
      { label: 'Waaree performance warranty', value: '30 Years (87.4% output)' },
      { label: 'Vikram performance warranty', value: '25 Years (80% output)' },
      { label: 'Average retail price per watt', value: '₹24 – ₹32 / Watt (Both brands)' },
      { label: 'Verdict', value: 'Waaree for residential rooftop; Vikram for commercial EPC', total: true },
    ],
    tableColumns: [
      { key: 'parameter', label: 'Feature / Specification' },
      { key: 'waaree', label: 'Waaree Energies' },
      { key: 'vikram', label: 'Vikram Solar', align: 'right' },
    ],
    tableRows: [
      { parameter: 'Flagship Technology', waaree: 'N-Type TOPCon Bifacial (715W)', vikram: 'Somera / Hypersol TOPCon (685W)' },
      { parameter: 'Module Efficiency', waaree: 'Up to 22.8%', vikram: 'Up to 22.1%' },
      { parameter: 'Temperature Coefficient', waaree: '-0.30% / °C (Excellent)', vikram: '-0.34% / °C (Good)' },
      { parameter: 'Annual Degradation', waaree: '0.40% / year after yr 1', vikram: '0.55% / year after yr 1' },
      { parameter: 'Product Warranty', waaree: '12 Years', vikram: '10 – 12 Years' },
      { parameter: 'PM Surya Ghar DCR Eligibility', waaree: 'Yes (Extensive ALMM List-I)', vikram: 'Yes (ALMM List-I certified)' },
    ],
    verdict: 'Waaree offers superior 30-year performance guarantees and lower annual degradation (0.40%/year) on its TOPCon models, giving it an advantage for residential rooftop systems. Vikram Solar matches closely on build quality with strong presence in commercial and utility-scale EPC installations.',
    faqs: [
      {
        q: 'Which brand is better for home rooftop solar: Waaree or Vikram?',
        a: 'Waaree is generally preferred for home installations in India due to its widespread distributor presence in Tier-2/Tier-3 cities and higher 30-year linear performance warranty.',
      },
      {
        q: 'Are both Waaree and Vikram eligible for PM Surya Ghar subsidy?',
        a: 'Yes. Both manufacturers offer DCR (Domestic Content Requirement) modules certified under MNRE ALMM List-I, making them 100% eligible for central DBT subsidies.',
      },
    ],
  },
  'waaree-vs-tata': {
    title: 'Waaree vs Tata Power Solar Panels: 2026 Comparison',
    subtitle: 'Comparing India\'s largest solar module manufacturer with India\'s most trusted industrial brand.',
    metaDesc: 'Compare Waaree vs Tata Power Solar panels. Honest comparison of prices per watt, module warranties, service center networks, and PM Surya Ghar suitability.',
    factTitle: 'Waaree vs Tata Power Benchmark',
    factRows: [
      { label: 'Waaree module capacity', value: '13.3 GW' },
      { label: 'Tata Power module capacity', value: '4.9 GW' },
      { label: 'Waaree price per watt (approx)', value: '₹24 – ₹30 / Watt' },
      { label: 'Tata Power price per watt (approx)', value: '₹28 – ₹36 / Watt' },
      { label: 'Linear performance warranty', value: 'Waaree: 30 yrs | Tata: 25 yrs' },
      { label: 'Verdict', value: 'Tata for brand trust; Waaree for value & tech', total: true },
    ],
    tableColumns: [
      { key: 'parameter', label: 'Feature / Specification' },
      { key: 'waaree', label: 'Waaree Energies' },
      { key: 'tata', label: 'Tata Power Solar', align: 'right' },
    ],
    tableRows: [
      { parameter: 'Brand Heritage', waaree: 'Specialist solar manufacturer since 1989', tata: 'Part of 150+ year Tata conglomerate' },
      { parameter: 'Retail Price Premium', waaree: 'Competitive market rates', tata: '10% – 15% brand premium' },
      { parameter: 'Cell Technology', waaree: 'Mono PERC & N-Type TOPCon', tata: 'Mono PERC & DCR TOPCon' },
      { parameter: 'Service Network', waaree: '380+ authorized dealer outlets', tata: 'Extensive Pan-India dealer network' },
      { parameter: 'DCR Subsidy Eligibility', waaree: 'Full ALMM compliance', tata: 'Full ALMM compliance' },
    ],
    verdict: 'Tata Power Solar commands a 10–15% brand premium owing to the trust of the Tata brand and reliable customer service. Waaree delivers identical or superior electrical performance, higher maximum wattage (up to 715W), and a 30-year warranty at a more accessible price per watt.',
    faqs: [
      {
        q: 'Is Tata Power Solar worth the higher price over Waaree?',
        a: 'If you place high priority on conglomerate brand backing and long-term institutional stability, Tata Power is a safe choice. If you want maximum wattage and the best price-to-performance ratio, Waaree is the market leader.',
      },
    ],
  },
  'tata-vs-adani': {
    title: 'Tata Power Solar vs Adani Solar: 2026 Comparison',
    subtitle: 'Evaluating two of India\'s industrial powerhouses in solar cell and module manufacturing.',
    metaDesc: 'Compare Tata Power Solar vs Adani Solar. Technical breakdown of Mundra TOPCon cells vs Tata DCR modules, warranties, commercial track records, and costs.',
    factTitle: 'Tata vs Adani Benchmark',
    factRows: [
      { label: 'Tata module capacity', value: '4.9 GW' },
      { label: 'Adani module capacity', value: '4.0 GW' },
      { label: 'Adani flagship series', value: 'TOPCon Shine Series (up to 690W)' },
      { label: 'Tata flagship series', value: 'TP Solar DCR Series (up to 670W)' },
      { label: 'Manufacturing integration', value: 'Adani has integrated polysilicon to module supply' },
      { label: 'Verdict', value: 'Tie: Both offer Tier-1 bankability', total: true },
    ],
    tableColumns: [
      { key: 'parameter', label: 'Specification' },
      { key: 'tata', label: 'Tata Power Solar' },
      { key: 'adani', label: 'Adani Solar', align: 'right' },
    ],
    tableRows: [
      { parameter: 'Manufacturing Hub', tata: 'Bengaluru & Tirunelveli', adani: 'Mundra SEZ (Gujarat)' },
      { parameter: 'TOPCon Efficiency', tata: '22.0%', adani: '22.5%' },
      { parameter: 'Supply Chain Integration', tata: 'Cells & Modules', adani: 'Ingot, Wafer, Cell & Module' },
      { parameter: 'Residential Availability', tata: 'Very High across India', adani: 'High across India' },
      { parameter: 'ALMM Status', tata: 'List-I Approved', adani: 'List-I Approved' },
    ],
    verdict: 'Adani Solar leads in supply-chain vertical integration at its Mundra facility and offers slightly higher efficiency on its TOPCon bifacial modules. Tata Power Solar benefits from widespread consumer trust and an extensive residential installer network.',
    faqs: [
      {
        q: 'Which panel has higher efficiency: Tata or Adani?',
        a: 'Adani Solar\'s TOPCon Shine series reaches peak module efficiency of 22.5%, compared to 22.0% for standard Tata Power Mono PERC/TOPCon modules.',
      },
    ],
  },
  'waaree-vs-adani': {
    title: 'Waaree vs Adani Solar Panels: 2026 Comparison',
    subtitle: 'Comparing India\'s top two module exporters and largest solar manufacturing giants.',
    metaDesc: 'Compare Waaree vs Adani Solar panels. Engineering comparison of wattage ratings, TOPCon cell efficiency, 30-year warranties, and residential rooftop prices.',
    factTitle: 'Waaree vs Adani Benchmark',
    factRows: [
      { label: 'Waaree capacity', value: '13.3 GW' },
      { label: 'Adani capacity', value: '4.0 GW' },
      { label: 'Highest rated module', value: 'Waaree: 715W | Adani: 690W' },
      { label: 'Warranty coverage', value: 'Both offer 30-year linear output guarantee' },
      { label: 'DCR cell availability', value: 'Both manufacture domestic DCR cells' },
      { label: 'Verdict', value: 'Waaree for residential; Adani for large rooftop & utility', total: true },
    ],
    tableColumns: [
      { key: 'parameter', label: 'Comparison Dimension' },
      { key: 'waaree', label: 'Waaree Energies' },
      { key: 'adani', label: 'Adani Solar', align: 'right' },
    ],
    tableRows: [
      { parameter: 'Retail Market Share', waaree: 'India #1 in Rooftop Solar', adani: 'Leading Utility & C&I Exporter' },
      { parameter: 'Bifacial Generation Gain', waaree: 'Up to 25% rear gain', adani: 'Up to 25% rear gain' },
      { parameter: 'Price per Watt', waaree: '₹24 – ₹30 / Watt', adani: '₹25 – ₹31 / Watt' },
      { parameter: 'ALMM Model Count', waaree: 'Over 50+ approved models', adani: 'Over 30+ approved models' },
    ],
    verdict: 'Both Waaree and Adani represent the gold standard of Indian solar manufacturing. Waaree has the edge in residential retail availability and maximum single-panel wattage (715W), while Adani offers full ingot-to-module vertical integration.',
    faqs: [
      {
        q: 'Which company has larger manufacturing capacity in India?',
        a: 'Waaree Energies is larger with over 13.3 GW of annual solar module capacity, compared to Adani Solar\'s 4 GW operational module capacity.',
      },
    ],
  },
  'monocrystalline-vs-polycrystalline': {
    title: 'Monocrystalline vs Polycrystalline Solar Panels in India',
    subtitle: 'Why mono PERC and TOPCon have replaced poly panels for Indian rooftop installations.',
    metaDesc: 'Mono PERC vs Polycrystalline solar panels in India. Comprehensive breakdown of space requirements, heat tolerance, efficiency, and why poly is obsolete.',
    factTitle: 'Mono vs Poly Summary',
    factRows: [
      { label: 'Monocrystalline efficiency', value: '20% – 22.8%' },
      { label: 'Polycrystalline efficiency', value: '15% – 17% (Obsolete)' },
      { label: 'Roof area required for 3 kW', value: 'Mono: ~250 sq ft | Poly: ~400 sq ft' },
      { label: 'Heat performance (temp coef)', value: 'Mono is superior above 35°C' },
      { label: 'PM Surya Ghar recommendation', value: 'Mono PERC / TOPCon only', total: true },
    ],
    tableColumns: [
      { key: 'feature', label: 'Property' },
      { key: 'mono', label: 'Monocrystalline (Mono PERC / TOPCon)' },
      { key: 'poly', label: 'Polycrystalline (Poly)', align: 'right' },
    ],
    tableRows: [
      { parameter: 'Appearance', mono: 'Uniform dark black / navy', poly: 'Speckled blue / non-uniform' },
      { parameter: 'Efficiency Range', mono: '20.0% – 22.8%', poly: '15.0% – 17.2%' },
      { parameter: 'Space Required', mono: '80 – 100 sq ft / kW', poly: '130 – 150 sq ft / kW' },
      { parameter: 'Low-Light Performance', mono: 'High generation on cloudy days', poly: 'Poor in diffused / overcast light' },
      { parameter: 'Market Availability', mono: 'Current industry standard', poly: 'Phased out by Tier-1 manufacturers' },
    ],
    verdict: 'Polycrystalline panels are virtually obsolete in 2026. Every major Indian manufacturer (Waaree, Adani, Tata, Vikram) has shifted production lines to Mono PERC and TOPCon. Mono panels generate substantially more power in hot Indian summers and require 35% less roof space.',
    faqs: [
      {
        q: 'Should I buy cheaper polycrystalline panels in 2026?',
        a: 'No. The nominal price savings on poly panels (₹1–₹2 per watt) are quickly negated by lower generation efficiency, higher mounting structure costs, and lack of modern ALMM DCR certification required for subsidies.',
      },
    ],
  },
  'on-grid-vs-off-grid-vs-hybrid': {
    title: 'On-Grid vs Off-Grid vs Hybrid Solar Systems: 2026 Guide',
    subtitle: 'Understanding grid connection, battery storage, subsidy eligibility, and payback.',
    metaDesc: 'Compare On-Grid vs Off-Grid vs Hybrid solar systems in India. Learn which system qualifies for PM Surya Ghar subsidy, costs, battery requirements, and ROI.',
    factTitle: 'System Types Overview',
    factRows: [
      { label: 'On-Grid payback period', value: '3.2 – 3.8 Years (Fastest)', total: true },
      { label: 'Hybrid payback period', value: '6 – 8 Years (Due to batteries)' },
      { label: 'PM Surya Ghar subsidy eligibility', value: 'On-Grid Only (Central DBT)' },
      { label: 'Power cut protection', value: 'Hybrid & Off-Grid (Requires battery)' },
      { label: 'Maintenance requirement', value: 'On-Grid has zero battery maintenance' },
    ],
    tableColumns: [
      { key: 'feature', label: 'System Attribute' },
      { key: 'ongrid', label: 'On-Grid (Grid-Tied)' },
      { key: 'hybrid', label: 'Hybrid (Grid + Battery)' },
      { key: 'offgrid', label: 'Off-Grid (Battery Only)', align: 'right' },
    ],
    tableRows: [
      { feature: 'Central Subsidy Eligible', ongrid: 'Yes (Up to ₹78,000)', hybrid: 'No (Grid portions only in rare cases)', offgrid: 'No subsidy' },
      { feature: 'Battery Storage', ongrid: 'None (Grid acts as battery)', hybrid: 'Yes (Lithium-ion / Lead-acid)', offgrid: 'Yes (Mandatory)' },
      { feature: 'Works during Power Cut', ongrid: 'No (Anti-islanding safety)', hybrid: 'Yes (Seamless backup)', offgrid: 'Yes (Autonomous)' },
      { feature: 'Turnkey 3 kW Net Cost', ongrid: '₹1,02,000 – ₹1,17,000', hybrid: '₹2,30,000 – ₹2,80,000', offgrid: '₹2,20,000 – ₹2,70,000' },
      { feature: 'Recommended Use Case', ongrid: 'Cities with <2 hrs power cuts', hybrid: 'Areas with frequent outages', offgrid: 'Remote rural cabins & farms' },
    ],
    verdict: 'For 90% of urban and suburban Indian homes, on-grid solar is the unequivocally best financial investment because it qualifies for the ₹78,000 PM Surya Ghar subsidy and eliminates expensive battery replacement cycles every 5 to 7 years.',
    faqs: [
      {
        q: 'Why does an on-grid solar system shut down during a power cut?',
        a: 'This is a mandatory safety feature called anti-islanding. When the grid fails, the solar inverter immediately stops exporting power to prevent electrocuting DISCOM line workers repairing electrical cables down the street.',
      },
      {
        q: 'Can I add batteries to an on-grid system later?',
        a: 'Yes, provided you install a hybrid-ready inverter during initial commissioning or install an AC-coupled battery storage retrofit later.',
      },
    ],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = COMPARISONS[slug.toLowerCase()];
  if (!config) return {};

  return constructMetadata({
    title: `${config.title} | GoSolarIndex`,
    description: config.metaDesc,
    path: `/compare/${slug.toLowerCase()}`,
  });
}

export function generateStaticParams() {
  return Object.keys(COMPARISONS).map((slug) => ({ slug }));
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const config = COMPARISONS[slug.toLowerCase()];

  if (!config) notFound();

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
              { label: 'Brands', href: '/brands' },
              { label: 'Comparison' },
            ]}
          />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-10">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-tight mb-8">
            {config.title}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <FactPanel
                title={config.factTitle}
                rows={config.factRows}
                sources="Manufacturer official technical datasheets, MNRE ALMM List-I revisions 2026."
              />
            </div>

            <div className="lg:col-span-6 space-y-4 text-[15px] text-ink-2 leading-relaxed font-body">
              <p>{config.subtitle}</p>
              <div className="border border-line rounded-sm p-4 bg-wash text-xs leading-relaxed text-ink-2">
                <strong className="text-ink text-sm block mb-1">Our Verdict:</strong>
                <p>{config.verdict}</p>
              </div>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/tools/solar-subsidy-calculator"
                  className="inline-flex items-center justify-center h-10 px-5 bg-sun text-ink font-semibold text-xs rounded-sm hover:brightness-95 transition-colors"
                >
                  Calculate sizing
                </Link>
                <Link
                  href="/brands"
                  className="inline-flex items-center justify-center h-10 px-5 border-[1.5px] border-ink text-ink font-medium text-xs rounded-sm hover:bg-wash transition-colors"
                >
                  All solar brands
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-8 space-y-12">

            {/* Side-by-Side Comparison Table */}
            <section>
              <h2 className="font-heading font-semibold text-2xl text-ink mb-2">
                Side-by-side engineering comparison
              </h2>
              <p className="text-xs text-ink-2 mb-4 font-body">
                Technical metrics and operational specifications:
              </p>
              <DataTable columns={config.tableColumns} rows={config.tableRows} />
            </section>

            {/* Other Comparisons */}
            <section className="border-t border-line pt-8">
              <h2 className="font-heading font-semibold text-xl text-ink mb-3">
                Other brand &amp; technology comparisons
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-body">
                {Object.keys(COMPARISONS)
                  .filter((k) => k !== slug.toLowerCase())
                  .map((k) => (
                    <Link
                      key={k}
                      href={`/compare/${k}`}
                      className="p-3 border border-line rounded-sm bg-wash hover:bg-paper text-ink transition-colors block"
                    >
                      <span className="font-medium">{COMPARISONS[k].title}</span>
                    </Link>
                  ))}
              </div>
            </section>

            {/* FAQs */}
            <section className="border-t border-line pt-8">
              <h2 className="font-heading font-semibold text-2xl text-ink mb-6">
                Frequently asked questions
              </h2>
              <FAQ items={config.faqs} />
            </section>

          </div>

          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 lg:self-start">
            <LeadForm prefill={{ requirement: '3kW Residential' }} source={`compare:${slug.toLowerCase()}`} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
