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
  title: 'Best Solar Panel Brands in India 2026: MNRE ALMM Tier-1 Ratings | GoSolarIndex',
  description: 'Compare top Tier-1 solar panel manufacturers in India (Waaree, Tata Power Solar, Adani Solar, Vikram Solar). Check ALMM certification, TOPCon efficiency, warranties, and prices.',
  path: '/brands',
});

const brandComparisonColumns = [
  { key: 'name', label: 'Brand Name' },
  { key: 'capacity', label: 'Annual Capacity' },
  { key: 'tech', label: 'Cell Technology' },
  { key: 'wattage', label: 'Max Wattage' },
  { key: 'warranty', label: 'Performance Warranty', align: 'right' as const },
];

const brandComparisonRows = [
  {
    name: 'Waaree Energies',
    capacity: '13.3 GW',
    tech: 'TOPCon & Mono PERC Bifacial',
    wattage: '540W – 715W',
    warranty: '30 Years (87.4% output)',
  },
  {
    name: 'Tata Power Solar',
    capacity: '4.9 GW',
    tech: 'Mono PERC & TOPCon DCR',
    wattage: '540W – 670W',
    warranty: '25 Years (80% output)',
  },
  {
    name: 'Adani Solar',
    capacity: '4.0 GW',
    tech: 'TOPCon Shine Series',
    wattage: '550W – 690W',
    warranty: '30 Years (85% output)',
  },
  {
    name: 'Vikram Solar',
    capacity: '3.5 GW',
    tech: 'Somera & Hypersol Series',
    wattage: '540W – 685W',
    warranty: '25 Years (80% output)',
  },
  {
    name: 'Loom Solar',
    capacity: '1.0 GW',
    tech: 'Mono PERC / Shark Bifacial',
    wattage: '440W – 550W',
    warranty: '25 Years (80% output)',
  },
  {
    name: 'Premier Energies',
    capacity: '3.0 GW',
    tech: 'TOPCon DCR Cells',
    wattage: '540W – 660W',
    warranty: '25 Years (80% output)',
  },
];

const faqs = [
  {
    q: 'Which is the number one solar panel brand in India?',
    a: 'Waaree Energies is currently India\'s largest solar module manufacturer by installed annual operational capacity (13.3 GW), followed by Adani Solar and Tata Power Solar. All three brands offer Tier-1 bankability and comprehensive ALMM List-I certification.',
  },
  {
    q: 'Are Chinese solar panels allowed for residential rooftop solar in India?',
    a: 'Imported Chinese panels can be installed for off-grid or unsubsidized commercial setups, but they are strictly ineligible for PM Surya Ghar central subsidies. Subsidized installations require Indian-manufactured ALMM DCR modules.',
  },
  {
    q: 'What is the standard warranty on Tier-1 solar panels in India?',
    a: 'Tier-1 manufacturers typically provide a 10 to 12-year product workmanship warranty against manufacturing defects, and a 25 to 30-year linear power output performance warranty guaranteeing at least 80% to 85% of rated capacity at year 25.',
  },
];

export default function BrandsIndexPage() {
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
              { label: 'Solar Panel Brands' },
            ]}
          />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-10">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-tight mb-8">
            Best Solar Panel Brands in India (2026): MNRE ALMM Manufacturer Ratings
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <FactPanel
                title="India Solar Module Manufacturing"
                rows={[
                  { label: 'Total domestic ALMM capacity', value: '45+ GW (List-I)' },
                  { label: 'Leading cell technology', value: 'N-Type TOPCon & Mono PERC' },
                  { label: 'Typical module efficiency', value: '21.5% – 22.8%' },
                  { label: 'Linear performance warranty', value: '25 – 30 Years (80%+)', total: true },
                  { label: 'Wholesale panel cost range', value: '₹22 – ₹34 / Watt (DCR)' },
                  { label: 'Regulatory authority', value: 'MNRE ALMM Mandate' },
                ]}
                sources="Ministry of New and Renewable Energy (MNRE) ALMM Orders, National Institute of Solar Energy (NISE) test certifications 2026."
              />
            </div>

            <div className="lg:col-span-6 space-y-4 text-[15px] text-ink-2 leading-relaxed font-body">
              <p>
                Under the Ministry of New and Renewable Energy (MNRE) mandate, all government-backed rooftop and utility projects must exclusively source solar modules listed on the <strong>Approved List of Models and Manufacturers (ALMM)</strong>.
              </p>
              <p>
                India&apos;s leading manufacturers now produce international-standard N-type TOPCon bifacial modules capable of generating power from both front and rear surfaces, yielding up to 25% higher annual electricity output.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="#brands-table"
                  className="inline-flex items-center justify-center h-10 px-5 bg-sun text-ink font-semibold text-xs rounded-sm hover:brightness-95 transition-colors"
                >
                  Compare top brands
                </a>
                <Link
                  href="/compare/waaree-vs-tata"
                  className="inline-flex items-center justify-center h-10 px-5 border-[1.5px] border-ink text-ink font-medium text-xs rounded-sm hover:bg-wash transition-colors"
                >
                  Waaree vs Tata comparison
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-8 space-y-12">

            {/* Brands Comparison Table */}
            <section id="brands-table">
              <h2 className="font-heading font-semibold text-2xl text-ink mb-2">
                Top Tier-1 solar panel manufacturers in India (2026)
              </h2>
              <p className="text-xs text-ink-2 mb-4 font-body">
                Official specifications, manufacturing capacity, and warranty periods from manufacturer technical datasheets:
              </p>
              <DataTable columns={brandComparisonColumns} rows={brandComparisonRows} />
            </section>

            {/* Popular Head-to-Head Comparisons */}
            <section className="border-t border-line pt-8">
              <h2 className="font-heading font-semibold text-2xl text-ink mb-2">
                Head-to-head brand comparisons
              </h2>
              <p className="text-xs text-ink-2 mb-4 font-body">
                Unbiased side-by-side engineering comparisons of degradation rates, pricing, and warranty terms:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-body">
                {[
                  { title: 'Waaree vs Vikram Solar', slug: 'waaree-vs-vikram', desc: 'Capacity comparison, efficiency & warranty review' },
                  { title: 'Waaree vs Tata Power Solar', slug: 'waaree-vs-tata', desc: 'Service network, price per watt & DCR compliance' },
                  { title: 'Tata Power vs Adani Solar', slug: 'tata-vs-adani', desc: 'TOPCon technology vs brand trust & reliability' },
                  { title: 'Waaree vs Adani Solar', slug: 'waaree-vs-adani', desc: 'India\'s two largest module manufacturers compared' },
                  { title: 'Mono PERC vs Polycrystalline', slug: 'monocrystalline-vs-polycrystalline', desc: 'Technology comparison for Indian rooftop temperatures' },
                  { title: 'On-Grid vs Off-Grid vs Hybrid', slug: 'on-grid-vs-off-grid-vs-hybrid', desc: 'Complete battery & grid connection comparison' },
                ].map((item) => (
                  <Link
                    key={item.slug}
                    href={`/compare/${item.slug}`}
                    className="p-4 border border-line rounded-sm bg-wash hover:bg-paper transition-colors text-ink block"
                  >
                    <div className="font-heading font-semibold text-sm mb-1">{item.title}</div>
                    <div className="text-ink-2 text-[11px]">{item.desc}</div>
                  </Link>
                ))}
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
            <LeadForm prefill={{ requirement: '3kW Residential' }} source="brands:index" />

            <div className="border border-line rounded-sm p-5 bg-wash font-body text-xs space-y-3">
              <h3 className="font-heading font-semibold text-sm text-ink pb-2 border-b border-line">
                Hardware buyer guides
              </h3>
              <ul className="space-y-2 text-ink">
                <li>
                  <Link href="/guides/topcon-vs-mono-perc-solar-panels-india" className="underline hover:text-ink/80 block">
                    TOPCon vs Mono PERC Guide
                  </Link>
                </li>
                <li>
                  <Link href="/price" className="underline hover:text-ink/80 block">
                    Solar Panel Price Index 2026
                  </Link>
                </li>
                <li>
                  <Link href="/subsidy/pm-surya-ghar" className="underline hover:text-ink/80 block">
                    DCR Panels Subsidy Eligibility
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
