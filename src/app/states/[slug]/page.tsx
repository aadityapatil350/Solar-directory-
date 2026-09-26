import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { constructStateMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import FactPanel from '@/components/ui/FactPanel';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Steps from '@/components/ui/Steps';
import FAQ from '@/components/ui/FAQ';
import DataTable from '@/components/ui/DataTable';
import ListingRow from '@/components/ui/ListingRow';
import Link from 'next/link';
import { getStateDescription, getStateFAQs, stateSpecificData } from '@/lib/stateData';
import { getStateSolarConfig } from '@/lib/solarConfig';

interface Props {
  params: Promise<{ slug: string }>;
}

function slugToState(slug: string) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const state = slugToState(slug);
  const locs = await prisma.location.findMany({
    where: { state: { equals: state, mode: 'insensitive' } },
    select: { id: true },
  });
  const listingCount = locs.length
    ? await prisma.listing.count({ where: { locationId: { in: locs.map((l) => l.id) } } })
    : 0;
  return constructStateMetadata(state, locs.length, listingCount);
}

export const revalidate = 3600;

export default async function StatePage({ params }: Props) {
  const { slug } = await params;
  const state = slugToState(slug);

  const stateLocations = await prisma.location.findMany({
    where: { state: { equals: state, mode: 'insensitive' } },
    orderBy: { city: 'asc' },
  });

  if (stateLocations.length === 0) notFound();

  const locationIds = stateLocations.map((l) => l.id);

  const listings = await prisma.listing.findMany({
    where: { locationId: { in: locationIds } },
    include: { category: true, location: true },
    orderBy: [{ featured: 'desc' }, { verified: 'desc' }, { rating: 'desc' }],
    take: 40,
  });

  const stateConfig = getStateSolarConfig(state);
  const sData = stateSpecificData[state.toLowerCase()];
  const faqs = getStateFAQs(state);

  const siteUrl = 'https://gosolarindex.in';
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'States', item: `${siteUrl}/#states` },
      { '@type': 'ListItem', position: 3, name: state, item: `${siteUrl}/states/${slug}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const discomTableColumns = [
    { key: 'name', label: 'DISCOM Utility' },
    { key: 'coverage', label: 'Service Jurisdiction' },
    { key: 'metering', label: 'Net Metering Cap' },
    { key: 'portal', label: 'Application Portal', align: 'right' as const },
  ];

  const discomTableRows = stateConfig.discoms.map((d) => ({
    name: d,
    coverage: `Statewide / Regional ${state}`,
    metering: '100% of sanctioned load',
    portal: 'National Portal (pmsuryaghar.gov.in)',
  }));

  const applicationSteps = [
    {
      title: 'National Portal registration',
      description: `Create an account at pmsuryaghar.gov.in and select your ${state} electricity distribution company (DISCOM) using your consumer account number.`,
    },
    {
      title: 'Technical feasibility approval',
      description: 'Your DISCOM reviews transformer capacity and sanctioned load limit to grant grid connectivity approval.',
    },
    {
      title: 'Installation by an empanelled vendor',
      description: 'Choose a verified installer in your city to erect the mounting structure, ALMM-listed solar panels, and grid-tie inverter.',
    },
    {
      title: 'Net meter installation & testing',
      description: 'DISCOM officials inspect earthing protection, install the bi-directional meter, and issue a work completion certificate.',
    },
    {
      title: 'DBT central subsidy transfer',
      description: 'Submit your bank details and the commissioning report to receive the direct subsidy credit into your account within 30 days.',
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div>
        <Header />

        {/* Breadcrumb */}
        <div className="border-b border-line bg-paper">
          <div className="max-w-content mx-auto px-4 sm:px-6">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'States', href: '/#states' },
                { label: state },
              ]}
            />
          </div>
        </div>

        {/* ── STATE HEADER & FACT PANEL ── */}
        <section className="border-b border-line bg-paper py-10">
          <div className="max-w-content mx-auto px-4 sm:px-6">
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-tight mb-8">
              Best Solar Companies &amp; Verified Installers in {state}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Fact Panel */}
              <div className="lg:col-span-6">
                <FactPanel
                  title={`Solar benchmark: ${state}`}
                  rows={[
                    { label: 'Central subsidy (3 kW cap)', value: '₹78,000' },
                    { label: 'State top-up scheme', value: sData?.subsidyScheme || 'Standard PM Surya Ghar DBT' },
                    { label: 'Estimated 3 kW gross cost', value: sData?.avgCost3kW || '₹1,95,000' },
                    { label: 'Net homeowner investment', value: '₹1,17,000', total: true },
                    { label: 'Primary distribution utility', value: stateConfig.discoms[0] || 'State DISCOM' },
                    { label: 'Solar irradiation potential', value: sData?.solarPotential || 'High (4.8+ kWh/m²/day)' },
                  ]}
                  sources="Ministry of New and Renewable Energy (MNRE), National Portal for Rooftop Solar, SERC tariff orders 2026."
                />
              </div>

              {/* State Overview */}
              <div className="lg:col-span-6 space-y-4 text-[15px] text-ink-2 leading-relaxed font-body">
                <p>
                  {getStateDescription(state)}
                </p>
                <p>
                  Homeowners and commercial facilities in <strong>{state}</strong> can reduce electricity costs substantially by exporting daytime solar power under the state&apos;s net metering framework.
                </p>
                <div className="pt-2">
                  <a
                    href="#installers"
                    className="inline-flex items-center justify-center h-10 px-5 border-[1.5px] border-ink text-ink font-medium text-xs rounded-sm hover:bg-wash transition-colors"
                  >
                    View {state} installers ({listings.length})
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TWO-COLUMN MAIN BODY ── */}
        <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">

              {/* DISCOM Table */}
              <section>
                <h2 className="font-heading font-semibold text-2xl text-ink mb-2">
                  Electricity distribution utilities (DISCOMs) in {state}
                </h2>
                <p className="text-xs text-ink-2 mb-4 font-body">
                  State power utilities processing rooftop grid feasibility, bi-directional meters, and net metering credits.
                </p>
                <DataTable columns={discomTableColumns} rows={discomTableRows} />
              </section>

              {/* Steps to Apply */}
              <section className="border-t border-line pt-8">
                <h2 className="font-heading font-semibold text-2xl text-ink mb-2">
                  How to apply for solar in {state}
                </h2>
                <p className="text-xs text-ink-2 mb-6 font-body">
                  Sequential timeline from national portal registration to subsidy disbursement.
                </p>
                <div className="max-w-2xl">
                  <Steps steps={applicationSteps} />
                </div>
              </section>

              {/* Cities List */}
              <section className="border-t border-line pt-8">
                <h2 className="font-heading font-semibold text-2xl text-ink mb-3">
                  Solar directories by city in {state}
                </h2>
                <p className="text-xs text-ink-2 mb-4 font-body">
                  Browse verified local solar installers, costs, and DISCOM information for your city:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-body text-xs">
                  {stateLocations.map((loc) => {
                    const count = listings.filter((l) => l.locationId === loc.id).length;
                    const slug = loc.city.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <Link
                        key={loc.id}
                        href={`/${slug}`}
                        className="p-2.5 border border-line rounded-sm bg-wash hover:bg-paper transition-colors flex justify-between items-center text-ink"
                      >
                        <span className="font-medium">{loc.city}</span>
                        <span className="text-ink-2 text-[11px] tabular-nums">{count > 0 ? `${count} listings` : 'Explore'}</span>
                      </Link>
                    );
                  })}
                </div>
              </section>

              {/* Verified Installers */}
              <section id="installers" className="border-t border-line pt-8">
                <h2 className="font-heading font-semibold text-2xl text-ink mb-1">
                  Solar companies in {state}
                </h2>
                <p className="text-xs text-ink-2 mb-4 font-body">
                  Showing top verified installers serving {stateLocations.length} cities across {state}.
                </p>

                <div className="pt-4 space-y-3">
                  {listings.slice(0, 15).map((listing) => (
                    <ListingRow
                      key={listing.id}
                      listing={{
                        name: listing.name,
                        slug: listing.slug,
                        city: listing.location.city,
                        state: listing.location.state,
                        category: listing.category.name,
                        rating: listing.rating,
                        reviews: listing.reviews,
                        phone: listing.phone,
                        website: listing.website,
                        verified: listing.verified,
                        featured: listing.featured,
                        description: listing.description,
                      }}
                    />
                  ))}
                </div>
              </section>

              {/* FAQs */}
              <section className="border-t border-line pt-8">
                <h2 className="font-heading font-semibold text-2xl text-ink mb-6">
                  Frequently asked questions: {state} solar
                </h2>
                <FAQ items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
              </section>

            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 lg:self-start">
              <LeadForm
                prefill={{ city: stateLocations[0]?.city }}
                source={`state-page:${slug}`}
              />

              <div className="border border-line rounded-sm p-5 bg-wash font-body text-xs space-y-3">
                <h3 className="font-heading font-semibold text-sm text-ink pb-2 border-b border-line">
                  {state} quick facts
                </h3>
                <div className="flex justify-between py-1 border-b border-line/60">
                  <span className="text-ink-2">Service cities</span>
                  <span className="text-ink font-medium tabular-nums">{stateLocations.length}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-line/60">
                  <span className="text-ink-2">Total installers</span>
                  <span className="text-ink font-medium tabular-nums">{listings.length}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-ink-2">DISCOMs</span>
                  <span className="text-ink font-medium text-right">{stateConfig.discoms.slice(0, 2).join(', ')}</span>
                </div>
              </div>
            </div>

          </div>
        </main>

      </div>

      <Footer />
    </div>
  );
}
