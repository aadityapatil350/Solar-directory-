import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import FactPanel from '@/components/ui/FactPanel';
import ListingRow from '@/components/ui/ListingRow';
import DataTable from '@/components/ui/DataTable';
import FAQ from '@/components/ui/FAQ';
import Steps from '@/components/ui/Steps';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { InputField, SelectField } from '@/components/ui/Field';
import StickyQuoteBar from '@/components/ui/StickyQuoteBar';
import EmptyState from '@/components/ui/EmptyState';
import { SourceLine, AuthorBox } from '@/components/ui/SourceLine';

export const metadata: Metadata = {
  title: 'Design System & Component Styleguide — GoSolarIndex',
  robots: {
    index: false,
    follow: false,
  },
};

export default function StyleguidePage() {
  const sampleFactRows = [
    { label: 'DISCOM', value: 'MSEDCL' },
    { label: 'Net metering limit', value: 'Up to sanctioned load (10 kW)' },
    { label: 'Central subsidy (3 kW)', value: '₹78,000' },
    { label: 'Typical 3 kW cost', value: '₹1.80–2.20 lakh' },
    { label: 'Generation per kW', value: '~1,450 kWh/year' },
  ];

  const sampleListing = {
    id: 'sample-1',
    name: 'Visol India Renewable Energy Pvt Ltd',
    slug: 'visol-india-renewable-energy-mumbai',
    description: 'Empanelled rooftop solar installer providing end-to-end net metering and subsidy processing in Mumbai.',
    phone: '+919820012345',
    address: 'Andheri East, Mumbai, Maharashtra 400069',
    rating: 4.8,
    reviews: 34,
    verified: true,
    featured: true,
    location: { city: 'Mumbai', state: 'Maharashtra' },
    category: { name: 'Residential Installers' },
    serviceTags: JSON.stringify({ tags: ['Rooftop solar', 'MSEDCL net metering', 'PM Surya Ghar', 'Commercial solar'] }),
  };

  const sampleTableData = [
    { size: '1 kW', generation: '120 units', subsidy: '₹30,000', cost: '₹50,000–60,000' },
    { size: '2 kW', generation: '240 units', subsidy: '₹60,000', cost: '₹1,00,000–1,20,000' },
    { size: '3 kW', generation: '360 units', subsidy: '₹78,000 (cap)', cost: '₹1,50,000–1,80,000' },
    { size: '5 kW', generation: '600 units', subsidy: '₹78,000 (cap)', cost: '₹2,50,000–3,00,000' },
  ];

  const sampleTableColumns = [
    { header: 'System capacity', accessor: (r: typeof sampleTableData[0]) => r.size },
    { header: 'Avg. monthly output', accessor: (r: typeof sampleTableData[0]) => r.generation },
    { header: 'Central DBT subsidy', accessor: (r: typeof sampleTableData[0]) => r.subsidy },
    { header: 'Estimated net cost', accessor: (r: typeof sampleTableData[0]) => r.cost, align: 'right' as const },
  ];

  const sampleSteps = [
    { title: 'Submit online application', description: 'Register on pmsuryaghar.gov.in with your electricity consumer number.' },
    { title: 'Technical feasibility approval', description: 'Your DISCOM reviews transformer capacity and issues online approval within 15 days.' },
    { title: 'Installation by empanelled vendor', description: 'Install ALMM List-I and DCR certified modules and grid-tie inverter.' },
    { title: 'Net meter inspection & DBT credit', description: 'DISCOM installs bidirectional meter. MNRE credits subsidy directly to your bank account within 30 days.' },
  ];

  const sampleFaqs = [
    {
      q: 'How much subsidy do I get under PM Surya Ghar Muft Bijli Yojana?',
      a: 'The central government provides ₹30,000 for a 1 kW system, ₹60,000 for a 2 kW system, and ₹78,000 for systems 3 kW or larger. The subsidy is credited via Direct Benefit Transfer (DBT) directly into your bank account after net-meter installation.',
    },
    {
      q: 'Are DCR solar panels mandatory for the subsidy?',
      a: 'Yes. Only systems using Domestic Content Requirement (DCR) solar cells and modules manufactured in India and listed in MNRE ALMM are eligible for central government financial assistance.',
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <main className="max-w-content mx-auto px-4 sm:px-6 py-10 space-y-12">
        <div>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Design system styleguide' },
            ]}
          />
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink mt-2">
            GoSolarIndex Design System
          </h1>
          <p className="text-ink-2 text-base mt-2 max-w-prose">
            Calm, clear public register aesthetic based on Ink (#1F2A37), Paper (#FFFFFF), and Sun (#F2A30F). Strictly light theme, no gradients, no emojis.
          </p>
        </div>

        {/* Buttons section */}
        <section className="space-y-4">
          <h2 className="font-heading font-bold text-xl border-b border-line pb-2">
            1. Buttons (One Sun button per screen rule)
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Get 3 quotes (Primary Sun)</Button>
            <Button variant="secondary">Call installer (Secondary Ink)</Button>
            <Button variant="link">Text link without arrow</Button>
          </div>
        </section>

        {/* FactPanel section */}
        <section className="space-y-4">
          <h2 className="font-heading font-bold text-xl border-b border-line pb-2">
            2. Fact panel (Signature element with dotted leaders)
          </h2>
          <div className="max-w-md">
            <FactPanel
              title="Solar in Pune, Maharashtra"
              subtitle="Checked 25 Sep 2026"
              rows={sampleFactRows}
              totalRow={{ label: 'Payback period', value: '4–5 years' }}
              sources={['PM Surya Ghar portal', 'MERC Order 2026', 'NASA POWER']}
              calcExplanationUrl="/tools/solar-subsidy-calculator"
            />
          </div>
        </section>

        {/* Listing Row section */}
        <section className="space-y-4">
          <h2 className="font-heading font-bold text-xl border-b border-line pb-2">
            3. Listing row (Directory list view, not identical cards)
          </h2>
          <div className="border-t border-line">
            <ListingRow listing={sampleListing} />
            <ListingRow
              listing={{
                ...sampleListing,
                id: 'sample-2',
                name: 'SolarGrid Clean Energy Services',
                slug: 'solargrid-clean-energy-mumbai',
                featured: false,
                verified: false,
                reviews: 0,
                rating: 0,
              }}
            />
          </div>
        </section>

        {/* Data Table section */}
        <section className="space-y-4">
          <h2 className="font-heading font-bold text-xl border-b border-line pb-2">
            4. Data table (White panel, --line rows, --wash header)
          </h2>
          <DataTable columns={sampleTableColumns} data={sampleTableData} />
        </section>

        {/* Steps section */}
        <section className="space-y-4">
          <h2 className="font-heading font-bold text-xl border-b border-line pb-2">
            5. Steps (For real application sequences only)
          </h2>
          <div className="max-w-prose">
            <Steps steps={sampleSteps} />
          </div>
        </section>

        {/* Forms section */}
        <section className="space-y-4">
          <h2 className="font-heading font-bold text-xl border-b border-line pb-2">
            6. Form fields (48px height, labels above, error text with icon)
          </h2>
          <div className="max-w-md space-y-4">
            <InputField
              label="Enter mobile number"
              placeholder="10-digit mobile number"
              type="tel"
              helperText="We share your number with up to 3 verified installers only."
            />
            <InputField
              label="Monthly electricity bill"
              placeholder="₹3,500"
              error="Enter a valid monthly bill amount."
            />
            <SelectField label="Select your city">
              <option value="mumbai">Mumbai, Maharashtra</option>
              <option value="delhi">Delhi, NCR</option>
              <option value="bangalore">Bangalore, Karnataka</option>
              <option value="pune">Pune, Maharashtra</option>
            </SelectField>
          </div>
        </section>

        {/* FAQ section */}
        <section className="space-y-4">
          <h2 className="font-heading font-bold text-xl border-b border-line pb-2">
            7. FAQ (Native details with plus/minus)
          </h2>
          <div className="max-w-prose">
            <FAQ items={sampleFaqs} />
          </div>
        </section>

        {/* Metadata and Citations */}
        <section className="space-y-4">
          <h2 className="font-heading font-bold text-xl border-b border-line pb-2">
            8. Citations &amp; Empty state
          </h2>
          <div className="space-y-4 max-w-prose">
            <AuthorBox authorName="GoSolarIndex Editorial Board" reviewedDate="25 Sep 2026" sourcesCount={4} />
            <SourceLine sources={['MNRE Gazette 2026', 'CEA Generation Bulletin']} lastChecked="25 Sep 2026" />
            <EmptyState
              message="No solar cleaning services listed in Bikaner yet. See Jodhpur (180 km) or list your company."
              actionText="List your company free"
              actionHref="/for-installers"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
