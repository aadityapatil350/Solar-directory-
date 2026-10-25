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
import LeadForm from '@/components/LeadForm';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { getCityFAQs, citySpecificData } from '@/lib/cityData';
import { getStateSolarConfig } from '@/lib/solarConfig';
import { Zap, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

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
  const cityInfo = citySpecificData[cityData.city.toLowerCase()];
  const topAreas = cityInfo?.topAreas || [];

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
          description: `Verified solar companies and rooftop EPC contractors in ${cityData.city}, ${cityData.state}`,
          numberOfItems: activeListings.length,
          itemListElement: activeListings.slice(0, 10).map((listing, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'LocalBusiness',
              name: listing.name,
              url: `https://gosolarindex.in/listing/${listing.slug}`,
              address: {
                '@type': 'PostalAddress',
                addressLocality: listing.location?.city || cityData.city,
                addressRegion: listing.location?.state || cityData.state,
                addressCountry: 'IN',
              },
              ...(listing.rating && listing.reviews > 0
                ? {
                    aggregateRating: {
                      '@type': 'AggregateRating',
                      ratingValue: listing.rating,
                      reviewCount: listing.reviews,
                      bestRating: 5,
                      worstRating: 1,
                    },
                  }
                : {}),
            },
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

  const solarPriceBenchmarks = [
    {
      size: '2 kW',
      idealFor: '1–2 BHK / Small Home',
      areaSqFt: '160 – 200 sq.ft',
      monthlyGen: '240 – 260 units',
      monthlySavings: '₹1,800 – ₹2,400',
      grossCost: '₹1,25,000 – ₹1,35,000',
      subsidy: '₹60,000',
      netCost: '₹65,000 – ₹75,000',
    },
    {
      size: '3 kW',
      idealFor: '3–4 BHK (PM Surya Ghar Sweet Spot)',
      areaSqFt: '240 – 300 sq.ft',
      monthlyGen: '360 – 400 units',
      monthlySavings: '₹2,800 – ₹3,800',
      grossCost: '₹1,85,000 – ₹1,95,000',
      subsidy: '₹78,000',
      netCost: '₹1,07,000 – ₹1,17,000',
      popular: true,
    },
    {
      size: '5 kW',
      idealFor: 'Independent House / Duplex / ACs',
      areaSqFt: '400 – 500 sq.ft',
      monthlyGen: '600 – 660 units',
      monthlySavings: '₹4,800 – ₹6,200',
      grossCost: '₹2,90,000 – ₹3,10,000',
      subsidy: '₹78,000',
      netCost: '₹2,12,000 – ₹2,32,000',
    },
    {
      size: '10 kW',
      idealFor: 'Commercial / Large Villa / Heavy Load',
      areaSqFt: '800 – 1,000 sq.ft',
      monthlyGen: '1,200 – 1,300 units',
      monthlySavings: '₹9,600 – ₹12,500',
      grossCost: '₹5,40,000 – ₹5,80,000',
      subsidy: '₹78,000',
      netCost: '₹4,62,000 – ₹5,02,000',
    },
  ];

  const stepsToGetSolar = [
    {
      title: 'Rooftop assessment & shadow calculation',
      description: `A certified solar engineer visits your property in ${cityData.city} to map shadow-free terrace area and analyze your recent electricity bills.`,
    },
    {
      title: 'Quotation & channel partner selection',
      description: 'Compare customized proposals from SolarSquare and verified local EPCs with MNRE ALMM Tier-1 panels, inverters, and workmanship warranties.',
    },
    {
      title: `DISCOM net-metering application with ${stateConfig.discoms[0] || 'the local utility'}`,
      description: 'Your empanelled installer prepares and submits the technical feasibility application on the state electricity utility portal.',
    },
    {
      title: 'Installation & bi-directional meter testing',
      description: 'System installation takes 1–3 business days. DISCOM inspectors verify earthing safety, install the net meter, and commission the connection.',
    },
    {
      title: 'Direct Benefit Transfer (DBT) subsidy credit',
      description: 'Following joint inspection, the central PM Surya Ghar subsidy (up to ₹78,000) is credited directly to your bank account within 30 days.',
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

        {/* ── CITY HERO SECTION (BENCHMARK + QUOTE FORM) ── */}
        <section className="border-b border-line bg-paper py-8 sm:py-10">
          <div className="max-w-content mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-sun-wash text-ink text-xs font-semibold">
                <Zap className="h-3.5 w-3.5 fill-sun text-ink" />
                PM Surya Ghar Scheme (₹78,000 Subsidy)
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-wash text-ink-2 text-xs font-medium border border-line">
                <ShieldCheck className="h-3.5 w-3.5 text-ink" />
                SolarSquare &amp; Verified Channel Partners
              </span>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-tight mb-3">
              Best Solar Companies &amp; Verified Installers in {cityData.city}
            </h1>
            <p className="text-sm sm:text-base text-ink-2 max-w-3xl mb-8 leading-relaxed font-body">
              Compare {listings.length || 'top'} verified solar rooftop contractors and channel partners serving {cityData.city}, {cityData.state}. Calculate net installation costs after the ₹78,000 central subsidy and receive up to 3 competitive proposals.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Fact Panel + Coverage Info */}
              <div className="lg:col-span-7 space-y-6">
                <FactPanel
                  title={`Solar benchmark: ${cityData.city}, ${cityData.state}`}
                  rows={[
                    { label: 'Primary DISCOM', value: stateConfig.discoms[0] || 'State Distribution Utility' },
                    { label: 'PM Surya Ghar subsidy (3 kW)', value: '₹78,000' },
                    { label: 'Estimated 3 kW gross cost', value: '₹1,85,000 – ₹1,95,000' },
                    { label: 'Net homeowner cost', value: '₹1,07,000 – ₹1,17,000', total: true },
                    { label: 'Avg daily solar radiation', value: '4.8 – 5.5 kWh/m²' },
                    { label: 'Estimated payback period', value: '3.1 – 3.8 years' },
                  ]}
                  sources="MNRE National Solar Mission, PM Surya Ghar Portal, State Electricity Regulatory Commission tariff orders 2026."
                />

                <div className="border border-line rounded-sm p-4 bg-wash space-y-2 text-xs text-ink-2 font-body">
                  <div className="flex items-center gap-2 font-semibold text-ink text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    DISCOM Net-Metering Liaison &amp; Approvals
                  </div>
                  <p className="leading-relaxed">
                    Installers in {cityData.city} handle all liaison paperwork with <strong>{stateConfig.discoms.join(' and ')}</strong>, including technical feasibility certificates, bi-directional net meters, and PM Surya Ghar subsidy disbursement.
                  </p>
                </div>

                {topAreas.length > 0 && (
                  <div className="border border-line rounded-sm p-4 bg-paper space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                      <MapPin className="h-3.5 w-3.5 text-ink-2" />
                      Active Residential Solar Service Areas in {cityData.city}:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {topAreas.map((area) => (
                        <span
                          key={area}
                          className="text-[11px] px-2 py-0.5 rounded-sm bg-wash border border-line text-ink-2"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Pre-Qualified Lead Form */}
              <div className="lg:col-span-5 lg:sticky lg:top-6">
                <LeadForm
                  prefill={{ city: cityData.city }}
                  source={`city-page:${citySlug}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── SOLAR SYSTEM PRICING & SUBSIDY BENCHMARK TABLE ── */}
        <section className="py-12 border-b border-line bg-wash">
          <div className="max-w-content mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider font-body">
                2026 Price Benchmark
              </span>
              <h2 className="font-heading font-semibold text-2xl text-ink mt-1">
                Rooftop Solar Cost &amp; Subsidy in {cityData.city}
              </h2>
              <p className="text-xs sm:text-sm text-ink-2 mt-1.5 font-body leading-relaxed">
                Turnkey installation cost estimates (including MNRE ALMM panels, inverter, mounting structure, DISCOM net meter &amp; commissioning) under the PM Surya Ghar Muft Bijli Yojana.
              </p>
            </div>

            <div className="border border-line rounded-sm bg-paper overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs border-collapse min-w-[620px]">
                <thead>
                  <tr className="border-b border-line bg-wash text-ink font-semibold">
                    <th className="py-3 px-4">System Size</th>
                    <th className="py-3 px-4">Ideal For</th>
                    <th className="py-3 px-4">Roof Space</th>
                    <th className="py-3 px-4">Est. Generation</th>
                    <th className="py-3 px-4">Gross Cost</th>
                    <th className="py-3 px-4 text-emerald-700">Govt. Subsidy</th>
                    <th className="py-3 px-4 font-bold text-ink">Net Cost</th>
                    <th className="py-3 px-4">Monthly Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line font-body text-ink-2">
                  {solarPriceBenchmarks.map((row) => (
                    <tr
                      key={row.size}
                      className={row.popular ? 'bg-sun-wash/30 font-medium' : 'hover:bg-wash/50'}
                    >
                      <td className="py-3 px-4 font-semibold text-ink">
                        {row.size}
                        {row.popular && (
                          <span className="ml-1.5 inline-block text-[10px] px-1.5 py-0.2 bg-sun text-ink font-bold rounded">
                            Popular
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">{row.idealFor}</td>
                      <td className="py-3 px-4 tabular-nums">{row.areaSqFt}</td>
                      <td className="py-3 px-4 tabular-nums">{row.monthlyGen}</td>
                      <td className="py-3 px-4 tabular-nums line-through opacity-70">{row.grossCost}</td>
                      <td className="py-3 px-4 font-semibold text-emerald-700 tabular-nums">
                        − {row.subsidy}
                      </td>
                      <td className="py-3 px-4 font-bold text-ink tabular-nums text-sm">
                        {row.netCost}
                      </td>
                      <td className="py-3 px-4 text-ink font-medium tabular-nums">
                        ~{row.monthlySavings}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-2 font-body">
              <p>
                * Net cost reflects direct DBT subsidy credited by MNRE into your Aadhaar-linked bank account.
              </p>
              <a
                href="#quote"
                className="font-semibold text-ink underline underline-offset-2 hover:text-ink/80"
              >
                Get exact quotation for your light bill →
              </a>
            </div>
          </div>
        </section>

        {/* ── MAIN DIRECTORY LIST ── */}
        <section id="directory" className="py-12 border-b border-line bg-paper">
          <div className="max-w-content mx-auto px-4 sm:px-6">
            <div className="mb-6">
              <h2 className="font-heading font-semibold text-2xl text-ink">
                Verified Solar Installers in {cityData.city}
              </h2>
              <p className="text-xs text-ink-2 mt-1 font-body">
                Browse rated solar EPC contractors, empanelled channel partners, and authorized equipment dealers in {cityData.city}.
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
