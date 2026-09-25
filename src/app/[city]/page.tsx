import type { Metadata } from 'next';
import { constructCityMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import CityClient from './CityClient';
import FactPanel from '@/components/ui/FactPanel';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Steps from '@/components/ui/Steps';
import FAQ from '@/components/ui/FAQ';
import ListingRow from '@/components/ui/ListingRow';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { getCityFAQs } from '@/lib/cityData';
import { getStateSolarConfig } from '@/lib/solarConfig';

// Use ISR for better SEO - revalidate every 1 hour
export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

function slugToSearch(slug: string) {
  return slug.replace(/-/g, ' ');
}

const MIN_LISTINGS_FOR_INDEX = 3;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const location = await prisma.location.findFirst({
    where: { city: { equals: slugToSearch(citySlug), mode: 'insensitive' } },
  });
  if (!location) return {};

  const listingsCount = await prisma.listing.count({
    where: { location: { city: location.city } },
  });

  const base = constructCityMetadata(location.city, location.state, listingsCount);
  if (listingsCount < MIN_LISTINGS_FOR_INDEX) {
    return { ...base, robots: { index: false, follow: true } };
  }
  return base;
}

export default async function CityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const cityData = await prisma.location.findFirst({
    where: { city: { equals: slugToSearch(citySlug), mode: 'insensitive' } },
  });

  if (!cityData) notFound();

  // Fetch listings for this city
  const listings = await prisma.listing.findMany({
    where: {
      location: {
        city: cityData.city,
      },
    },
    include: {
      category: true,
      location: true,
    },
    orderBy: [
      { featured: 'desc' },
      { verified: 'desc' },
      { rating: 'desc' },
    ],
    take: 500,
  });

  // Regional fallback if 0 local listings
  const fallbackListings =
    listings.length === 0
      ? await prisma.listing.findMany({
          where: {
            location: { state: cityData.state },
            verified: true,
          },
          include: {
            category: true,
            location: true,
          },
          orderBy: [{ rating: 'desc' }, { reviews: 'desc' }],
          take: 6,
        })
      : [];

  const stateConfig = getStateSolarConfig(cityData.state);

  // Fetch categories
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  // Nearby cities in same state
  const nearbyLocations = await prisma.location.findMany({
    where: {
      state: cityData.state,
      city: { not: cityData.city },
    },
    distinct: ['city'],
    take: 12,
    select: { city: true },
  });

  const stateSlug = cityData.state.toLowerCase().replace(/\s+/g, '-');
  const cityUrl = `https://gosolarindex.in/${citySlug}`;

  // Structured schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gosolarindex.in' },
      { '@type': 'ListItem', position: 2, name: cityData.state, item: `https://gosolarindex.in/states/${stateSlug}` },
      { '@type': 'ListItem', position: 3, name: cityData.city, item: cityUrl },
    ],
  };

  const activeListings = listings.length > 0 ? listings : fallbackListings;
  const itemListSchema =
    activeListings.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `Solar Installers in ${cityData.city}`,
          description: `Verified solar companies in ${cityData.city}, ${cityData.state}`,
          numberOfItems: activeListings.length,
          itemListElement: activeListings.slice(0, 10).map((listing, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: listing.name,
            url: `https://gosolarindex.in/listing/${listing.slug}`,
          })),
        }
      : null;

  const rawFaqs = getCityFAQs(cityData.city, cityData.state);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: rawFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const stepsToGetSolar = [
    {
      title: 'Roof assessment and load calculation',
      description: `A certified engineer inspects your rooftop shadow profile in ${cityData.city} and determines system capacity based on your recent electricity consumption.`,
    },
    {
      title: 'Installer selection & quotation',
      description: 'Compare 2–3 written proposals specifying MNRE ALMM-listed panels, inverter make, and comprehensive installation workmanship warranty.',
    },
    {
      title: `DISCOM application with ${stateConfig.discoms[0] || 'the distribution utility'}`,
      description: 'Your installer files the technical feasibility and grid net-metering application on the state utility portal.',
    },
    {
      title: 'Installation and bi-directional meter testing',
      description: 'Hardware installation takes 1–3 days. DISCOM inspectors inspect earthing, install the net meter, and commission the connection.',
    },
    {
      title: 'Direct Benefit Transfer (DBT) subsidy credit',
      description: 'Upload the joint commissioning report to the PM Surya Ghar National Portal to receive the ₹78,000 central subsidy directly in your bank account.',
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {itemListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div>
        <Header />

        {/* Breadcrumb */}
        <div className="border-b border-line bg-paper">
          <div className="max-w-content mx-auto px-4 sm:px-6">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: cityData.state, href: `/states/${stateSlug}` },
                { label: cityData.city },
              ]}
            />
          </div>
        </div>

        {/* ── CITY HEADER & INTRO WITH FACT PANEL ── */}
        <section className="border-b border-line bg-paper py-10">
          <div className="max-w-content mx-auto px-4 sm:px-6">
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-tight mb-8">
              Solar in {cityData.city}: installers, cost and subsidy
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Fact Panel on the left */}
              <div className="lg:col-span-6">
                <FactPanel
                  title={`Solar benchmark: ${cityData.city}, ${cityData.state}`}
                  rows={[
                    { label: 'Primary DISCOM', value: stateConfig.discoms[0] || 'State Distribution Utility' },
                    { label: 'PM Surya Ghar subsidy (3 kW)', value: '₹78,000' },
                    { label: 'Estimated 3 kW gross cost', value: '₹1,95,000' },
                    { label: 'Net homeowner cost', value: '₹1,17,000', total: true },
                    { label: 'Avg daily solar radiation', value: '4.8 – 5.5 kWh/m²' },
                    { label: 'Estimated payback period', value: '3.2 – 3.8 years' },
                  ]}
                  sources="MNRE National Solar Mission, PM Surya Ghar Portal, State Electricity Regulatory Commission tariff orders 2026."
                />
              </div>

              {/* Short intro on the right */}
              <div className="lg:col-span-6 space-y-4 text-[15px] text-ink-2 leading-relaxed font-body">
                <p>
                  Homeowners and commercial businesses in <strong>{cityData.city}</strong> can achieve substantial reductions in monthly power tariffs through rooftop solar installations connected under {stateConfig.state}&apos;s grid net-metering framework.
                </p>
                <p>
                  Under the central <strong>PM Surya Ghar Muft Bijli Yojana</strong>, residential consumers installing up to 3 kW capacity qualify for direct bank transfer subsidies up to ₹78,000 when using MNRE ALMM-compliant modules.
                </p>
                <div className="pt-2">
                  <a
                    href="#directory"
                    className="inline-flex items-center justify-center h-10 px-5 border-[1.5px] border-ink text-ink font-medium text-xs rounded-sm hover:bg-wash transition-colors"
                  >
                    View {cityData.city} installer directory ({listings.length})
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MAIN DIRECTORY LIST ── */}
        <section id="directory" className="py-12 border-b border-line bg-paper">
          <div className="max-w-content mx-auto px-4 sm:px-6">
            <div className="mb-6">
              <h2 className="font-heading font-semibold text-2xl text-ink">
                Solar installers in {cityData.city}
              </h2>
              <p className="text-xs text-ink-2 mt-1 font-body">
                Public register of verified solar EPC companies, rooftop contractors, and authorized dealers.
              </p>
            </div>

            {listings.length > 0 ? (
              <CityClient
                initialListings={listings}
                categories={categories}
                cityName={cityData.city}
              />
            ) : (
              <div className="space-y-6">
                <div className="border border-line rounded-sm p-5 bg-wash text-xs text-ink-2">
                  <p className="font-semibold text-ink text-sm mb-1">
                    Direct installer network expanding in {cityData.city}
                  </p>
                  <p>
                    While hyper-local office registrations in {cityData.city} are being updated, regional empanelled contractors provide site surveys, hardware delivery, and DISCOM liaison across {cityData.city}.
                  </p>
                </div>

                <div className="border-t border-line">
                  {fallbackListings.map((r) => (
                    <ListingRow
                      key={r.id}
                      listing={{
                        name: r.name,
                        slug: r.slug,
                        city: r.location.city,
                        state: r.location.state,
                        category: r.category.name,
                        rating: r.rating,
                        reviews: r.reviews,
                        phone: r.phone,
                        website: r.website,
                        verified: r.verified,
                        featured: r.featured,
                        description: r.description,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── HOW TO GET SOLAR IN [CITY] STEPS ── */}
        <section className="py-12 border-b border-line bg-wash">
          <div className="max-w-content mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-8">
              <h2 className="font-heading font-semibold text-2xl text-ink">
                How to get solar in {cityData.city}
              </h2>
              <p className="text-xs text-ink-2 mt-1 font-body">
                Step-by-step roadmap from initial roof survey to grid commissioning and central subsidy credit.
              </p>
            </div>

            <div className="max-w-3xl">
              <Steps steps={stepsToGetSolar} />
            </div>
          </div>
        </section>

        {/* ── DISCOM & NET METERING SECTION ── */}
        <section className="py-12 border-b border-line bg-paper">
          <div className="max-w-content mx-auto px-4 sm:px-6">
            <h2 className="font-heading font-semibold text-2xl text-ink mb-4">
              Electricity grid and net metering in {cityData.state}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-body">
              <div className="border border-line rounded-sm p-5 bg-wash">
                <h3 className="font-heading font-semibold text-sm text-ink mb-2">
                  Distribution utilities
                </h3>
                <p className="text-ink-2 leading-relaxed">
                  Grid connection in {cityData.city} is managed primarily by <strong>{stateConfig.discoms.join(', ')}</strong>.
                </p>
              </div>

              <div className="border border-line rounded-sm p-5 bg-wash">
                <h3 className="font-heading font-semibold text-sm text-ink mb-2">
                  Sanctioned load &amp; sizing
                </h3>
                <p className="text-ink-2 leading-relaxed">
                  Rooftop capacity is typically capped at 100% of your sanctioned connected load. Feasibility is approved prior to meter installation.
                </p>
              </div>

              <div className="border border-line rounded-sm p-5 bg-wash">
                <h3 className="font-heading font-semibold text-sm text-ink mb-2">
                  Net billing settlement
                </h3>
                <p className="text-ink-2 leading-relaxed">
                  Surplus electricity exported to the grid is credited on your monthly power invoice at regulatory banking tariffs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FREQUENTLY ASKED QUESTIONS ── */}
        <section className="py-12 border-b border-line bg-paper">
          <div className="max-w-content mx-auto px-4 sm:px-6">
            <h2 className="font-heading font-semibold text-2xl text-ink mb-6">
              Frequently asked questions: {cityData.city} solar
            </h2>
            <div className="max-w-3xl">
              <FAQ
                items={rawFaqs.map((f) => ({
                  q: f.question,
                  a: f.answer,
                }))}
              />
            </div>
          </div>
        </section>

        {/* ── NEARBY CITIES TEXT LIST ── */}
        {nearbyLocations.length > 0 && (
          <section className="py-10 bg-wash">
            <div className="max-w-content mx-auto px-4 sm:px-6">
              <h2 className="font-heading font-semibold text-base text-ink mb-3">
                Other solar directories in {cityData.state}
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-body">
                {nearbyLocations.map((loc) => {
                  const slug = loc.city.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <Link
                      key={loc.city}
                      href={`/${slug}`}
                      className="text-ink underline hover:text-ink/70"
                    >
                      {loc.city}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

      </div>

      <Footer />
    </div>
  );
}
