import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FactPanel from '@/components/ui/FactPanel';
import DataTable from '@/components/ui/DataTable';
import ListingRow from '@/components/ui/ListingRow';
import FAQ from '@/components/ui/FAQ';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getStateSolarConfig } from '@/lib/solarConfig';

interface Props {
  params: Promise<{ city: string }>;
}

export const revalidate = 3600;

const MIN_LISTINGS_FOR_INDEX = 3;

function slugToSearch(slug: string) {
  return slug.replace(/-/g, ' ');
}

async function findCity(citySlug: string) {
  return prisma.location.findFirst({
    where: { city: { equals: slugToSearch(citySlug), mode: 'insensitive' } },
  });
}

async function findCleaningListings(cityId: string) {
  return prisma.listing.findMany({
    where: {
      locationId: cityId,
      OR: [
        { category: { slug: 'maintenance-services' } },
        { name: { contains: 'clean', mode: 'insensitive' } },
        { description: { contains: 'clean', mode: 'insensitive' } },
        { serviceTags: { contains: 'cleaning', mode: 'insensitive' } },
      ],
    },
    include: { category: true, location: true },
    orderBy: [{ featured: 'desc' }, { verified: 'desc' }, { rating: 'desc' }],
    take: 50,
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = await findCity(citySlug);
  if (!city) return {};
  const listings = await findCleaningListings(city.id);
  const count = listings.length;

  const base = constructMetadata({
    title: `Best Solar Panel Cleaning Services in ${city.city} (2026) — Rates & AMC`,
    description: `Compare ${count > 0 ? count + ' ' : ''}solar panel cleaning services, washing charges, and maintenance AMC providers in ${city.city}, ${city.state}. Restore generation efficiency with certified technicians.`,
    path: `/${citySlug}/solar-panel-cleaning`,
    canonicalUrl: `https://gosolarindex.in/${citySlug}/solar-panel-cleaning`,
  });

  if (count < MIN_LISTINGS_FOR_INDEX) {
    return { ...base, robots: { index: false, follow: true } };
  }
  return base;
}

export default async function CityCleaningPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = await findCity(citySlug);
  if (!city) notFound();

  const listings = await findCleaningListings(city.id);
  const stateConfig = getStateSolarConfig(city.state);

  const faqItems = [
    {
      q: `How much does solar panel cleaning cost in ${city.city}?`,
      a: `One-time solar panel cleaning in ${city.city} typically costs ₹15 to ₹30 per panel. Annual maintenance contracts (AMC) cost ₹1,500 to ₹3,500 per kW per year, covering 4 to 12 scheduled visits with water filtration and electrical inspection.`,
    },
    {
      q: `How frequently should panels be cleaned in ${city.city}?`,
      a: `In urban and semi-arid regions of ${city.state}, dust accumulation (soiling) reduces generation by 15% to 30%. Panels should be cleaned every 20 to 30 days during dry months. During monsoon months, natural rain handles most surface dust, but panels should still be inspected for bird droppings and streak accumulation.`,
    },
    {
      q: 'Does dust buildup void solar panel warranties?',
      a: 'While dirt does not void module manufacturer warranties directly, prolonged hotspots caused by baked-on bird droppings or heavy leaves can damage solar cells permanently. Most Tier-1 manufacturers require documented bi-annual maintenance for claim processing.',
    },
    {
      q: 'Can tap water be used to wash solar panels?',
      a: 'Tap water with high TDS (total dissolved solids) leaves hard mineral scale on the solar glass when it evaporates in sunlight, permanently blocking irradiance. Professional cleaning services use demineralised or soft water with non-abrasive horsehair or nylon brushes.',
    },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gosolarindex.in' },
      { '@type': 'ListItem', position: 2, name: city.city, item: `https://gosolarindex.in/${citySlug}` },
      { '@type': 'ListItem', position: 3, name: 'Solar Panel Cleaning', item: `https://gosolarindex.in/${citySlug}/solar-panel-cleaning` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-paper text-ink pb-20 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Header />

      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: city.city, href: `/${citySlug}` },
              { label: 'Solar Panel Cleaning & AMC', href: `/${citySlug}/solar-panel-cleaning` },
            ]}
          />
        </div>
      </div>

      {/* Header Banner */}
      <header className="border-b border-line bg-wash py-10 sm:py-12">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider font-body">
                Maintenance &amp; AMC Services · {city.city}, {city.state}
              </span>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink mt-1.5 leading-tight">
                Solar Panel Cleaning Services &amp; AMC in {city.city}
              </h1>
              <p className="text-base text-ink-2 mt-3 font-body leading-relaxed">
                Restore up to 30% lost generation caused by urban dust, particulate pollution, and bird droppings. Compare certified solar maintenance contractors and annual AMC plans in {city.city}.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="#quotes"
                className="inline-flex items-center justify-center h-11 px-6 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors"
              >
                Get cleaning quote
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-content mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Fact Panel */}
        <section>
          <FactPanel
            title={`Solar Cleaning Benchmarks: ${city.city}, ${city.state}`}
            rows={[
              { label: 'Estimated generation loss from uncleaned panels', value: '15% – 30% monthly' },
              { label: 'Typical one-time cleaning rate', value: '₹15 – ₹30 per module' },
              { label: 'Standard residential AMC rate (quarterly)', value: '₹1,500 – ₹2,500 / kW / year' },
              { label: 'Premium comprehensive AMC (monthly + inverter)', value: '₹3,000 – ₹4,500 / kW / year' },
              { label: 'Recommended cleaning interval in dry seasons', value: 'Every 20 – 30 days' },
              { label: 'Typical cleaning cost recovery from restored power', value: '1 to 2 months', total: true },
            ]}
            sources={`Field studies on soiling loss in Indian conditions, ${stateConfig.state} regional weather patterns, and local contractor price submissions.`}
          />
        </section>

        {/* Cleaning Cost Table */}
        <section className="space-y-4">
          <div>
            <h2 className="font-heading font-semibold text-2xl text-ink">
              Solar panel cleaning cost structure in {city.city}
            </h2>
            <p className="text-sm text-ink-2 font-body mt-1">
              Pricing depends on rooftop accessibility, water availability, and contract frequency.
            </p>
          </div>

          <DataTable
            columns={[
              { label: 'Service tier', key: 'service' },
              { label: `Benchmark price in ${city.city}`, key: 'price' },
              { label: 'Scope of work included', key: 'scope' },
            ]}
            rows={[
              {
                service: 'One-time on-demand wash',
                price: '₹15 – ₹30 per module',
                scope: 'RO/soft water spray, soft nylon brush cleaning, surface drying, post-clean visual check',
              },
              {
                service: 'Quarterly residential AMC (4 visits/yr)',
                price: '₹1,500 – ₹2,500 / kW / yr',
                scope: 'Scheduled deep cleaning, cable tightness check, structure inspection, junction box check',
              },
              {
                service: 'Monthly high-dust AMC (12 visits/yr)',
                price: '₹2,500 – ₹4,000 / kW / yr',
                scope: 'Bi-weekly/monthly washing, thermal scan for micro-cracks, inverter error log diagnostics',
              },
              {
                service: 'Comprehensive commercial AMC',
                price: 'Custom SLA (from ₹1.20/W/yr)',
                scope: 'Automated/manual sprinkler maintenance, IV curve tracing, generation tracking SLA',
              },
            ]}
          />
        </section>

        {/* Listings Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-semibold text-2xl text-ink">
                Solar maintenance &amp; cleaning companies in {city.city}
              </h2>
              <p className="text-sm text-ink-2 font-body mt-1">
                {listings.length > 0
                  ? `Showing ${listings.length} verified contractor${listings.length === 1 ? '' : 's'} serving ${city.city}.`
                  : `Currently updating verified service records in ${city.city}. Request a callback below.`}
              </p>
            </div>
            <Link
              href={`/${citySlug}`}
              className="text-xs text-ink underline hover:text-ink/80 font-body shrink-0"
            >
              All {city.city} solar companies
            </Link>
          </div>

          {listings.length > 0 ? (
            <div className="border-t border-line">
              {listings.map((item) => (
                <ListingRow key={item.id} listing={item} />
              ))}
            </div>
          ) : (
            <div className="border border-line rounded-sm p-8 text-center bg-wash">
              <p className="text-sm font-medium text-ink">No dedicated cleaning specialists listed yet</p>
              <p className="text-xs text-ink-2 mt-1">
                Submit an enquiry below to receive cleaning quotes from general rooftop solar EPC contractors serving {city.city}.
              </p>
            </div>
          )}
        </section>

        {/* Lead Form CTA */}
        <section id="quotes" className="border border-line rounded-sm p-6 sm:p-8 bg-wash">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="font-heading font-semibold text-2xl text-ink">
                Request solar cleaning &amp; AMC quotes in {city.city}
              </h2>
              <p className="text-sm text-ink-2 font-body mt-1">
                Compare estimates from verified rooftop maintenance contractors in {city.city}. Free and confidential.
              </p>
            </div>
            <LeadForm
              prefill={{ city: city.city, requirement: 'AMC & Maintenance' }}
              source={`cleaning:${citySlug}`}
            />
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="font-heading font-semibold text-2xl text-ink">
            Frequently asked questions: Solar cleaning in {city.city}
          </h2>
          <FAQ items={faqItems} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
