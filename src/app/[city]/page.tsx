import type { Metadata } from 'next';
import { constructCityMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import CityClient from './CityClient';
import {
  MapPin,
  CheckCircle,
  Info,
  ShieldCheck,
  Zap,
  Building2,
  FileCheck2,
  BadgeCheck,
  Star,
  Phone,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import SolarSubsidyCalculator from '@/components/SolarSubsidyCalculator';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { citySpecificData, getCityFAQs, getCityDescription } from '@/lib/cityData';
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
  // Thin city pages (<3 listings) get noindex so they don't dilute search authority.
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

  // If 0 listings exist, query regional/statewide verified installers for enriched fallback
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

  // Fetch all categories to populate filter dropdown
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  // Group listings by brand keyword found in name (for brand+city SEO)
  const brandKeywords: { label: string; slug: string; patterns: RegExp }[] = [
    { label: 'Waaree', slug: 'waaree', patterns: /waaree/i },
    { label: 'Tata Power Solar', slug: 'tata', patterns: /\btata\b/i },
    { label: 'Adani Solar', slug: 'adani', patterns: /adani/i },
    { label: 'Luminous', slug: 'luminous', patterns: /luminous/i },
    { label: 'Microtek', slug: 'microtek', patterns: /microtek/i },
    { label: 'Exide', slug: 'exide', patterns: /exide/i },
    { label: 'Loom Solar', slug: 'loom', patterns: /loom\s*solar/i },
    { label: 'Vikram Solar', slug: 'vikram', patterns: /vikram/i },
  ];

  const brandGroups = brandKeywords
    .map((b) => ({
      ...b,
      dealers: listings.filter((l) => b.patterns.test(l.name)).slice(0, 6),
    }))
    .filter((b) => b.dealers.length > 0);

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://gosolarindex.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: cityData.state,
        item: `https://gosolarindex.in/states/${cityData.state.toLowerCase().replace(/\s+/g, '-')}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: cityData.city,
        item: `https://gosolarindex.in/${cityData.city.toLowerCase().replace(/\s+/g, '-')}`,
      },
    ],
  };

  // ItemList Schema for top listings (helps Google understand directory structure)
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
            ...(listing.description && { description: listing.description }),
          })),
        }
      : null;

  // FAQ Schema
  const faqs = getCityFAQs(cityData.city, cityData.state);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div>
        <Header />

        {/* ── BREADCRUMB ── */}
        <div className="bg-white border-b border-zinc-200">
          <div className="container mx-auto px-4 py-2.5">
            <nav className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Link href="/" className="hover:text-zinc-900 transition">
                Home
              </Link>
              <span>/</span>
              <Link
                href={`/states/${cityData.state.toLowerCase().replace(/\s+/g, '-')}`}
                className="hover:text-zinc-900 transition"
              >
                {cityData.state}
              </Link>
              <span>/</span>
              <span className="text-zinc-900 font-medium">{cityData.city}</span>
            </nav>
          </div>
        </div>

        {/* ── HERO SECTION (Vercel Pastel Aesthetic) ── */}
        <div className="bg-zinc-900 text-white py-14 border-b border-zinc-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                {cityData.city}, {cityData.state} Solar Directory
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Best Solar Installers in {cityData.city} (2026)
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Connect with verified solar EPC contractors, authorized dealers, and PM Surya Ghar
                empanelled vendors serving {cityData.city}, {cityData.state}.
              </p>
            </div>
          </div>
        </div>

        {/* ── MAIN DIRECTORY / REGIONAL FALLBACK ── */}
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-6xl mx-auto space-y-10">
            {listings.length > 0 ? (
              <CityClient
                initialListings={listings}
                categories={categories}
                cityName={cityData.city}
              />
            ) : (
              /* ── ENRICHED REGIONAL FALLBACK (Fixes 418 Soft 404s per Phase 1.2) ── */
              <div className="space-y-8">
                {/* Notice Banner */}
                <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-6 text-zinc-800">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-zinc-900 text-base">
                        Direct Installer Network Expanding in {cityData.city}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                        While hyper-local office registrations in {cityData.city} are being verified,
                        the empanelled regional installers below provide full site surveys, equipment delivery,
                        and {stateConfig.state} DISCOM net-metering liaison across {cityData.city}.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Regional Installers Grid */}
                {fallbackListings.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-zinc-900">
                        Verified Regional Installers Serving {cityData.city} &amp; {cityData.state}
                      </h2>
                      <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 font-medium px-2.5 py-1 rounded-full">
                        MNRE Empanelled
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {fallbackListings.map((installer) => (
                        <div
                          key={installer.id}
                          className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-bold text-zinc-900 text-base line-clamp-1">
                                {installer.name}
                              </h3>
                              <span className="shrink-0 text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                                ✓ Verified
                              </span>
                            </div>

                            <p className="text-xs text-zinc-500 mb-3 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                              Regional Office: {installer.location.city}, {installer.location.state}
                            </p>

                            {installer.reviews > 0 && installer.rating != null && (
                              <div className="flex items-center gap-1 text-xs mb-3 text-amber-600 font-medium">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                <span>{installer.rating.toFixed(1)}</span>
                                <span className="text-zinc-400">({installer.reviews} reviews)</span>
                              </div>
                            )}

                            <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                              {installer.description ||
                                `Professional solar rooftop EPC and installation provider serving residential and commercial projects across ${cityData.state}.`}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                            {installer.phone ? (
                              <a
                                href={`tel:${installer.phone}`}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-emerald-700 transition"
                              >
                                <Phone className="w-3.5 h-3.5" /> Call Installer
                              </a>
                            ) : (
                              <span className="text-xs text-zinc-400">Verified Partner</span>
                            )}
                            <Link
                              href={`/listing/${installer.slug}`}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                            >
                              View Profile <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* State DISCOM Net-Metering & Subsidy Rates Card */}
                <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3 flex-wrap gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                        <FileCheck2 className="w-5 h-5 text-emerald-600" />
                        {stateConfig.state} DISCOM Net-Metering &amp; PM Surya Ghar Rules
                      </h3>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Official regulatory parameters for solar connections in {cityData.city}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded-md">
                      {stateConfig.netMeteringAuthority}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                    <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200">
                      <span className="text-zinc-500 block text-xs">Regional Utility DISCOMs</span>
                      <span className="font-semibold text-zinc-900 mt-1 block">
                        {stateConfig.discoms.join(', ')}
                      </span>
                    </div>

                    <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200">
                      <span className="text-zinc-500 block text-xs">Max PM Surya Ghar Subsidy</span>
                      <span className="font-semibold text-emerald-700 mt-1 block">
                        ₹{stateConfig.centralSubsidyMax.toLocaleString('en-IN')} (Direct DBT)
                      </span>
                    </div>

                    <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200">
                      <span className="text-zinc-500 block text-xs">Net Metering Turnaround</span>
                      <span className="font-semibold text-zinc-900 mt-1 block">
                        ~{stateConfig.netMeteringApprovalDays} Business Days
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed pt-2">
                    {stateConfig.stateSubsidyNotes ||
                      `Homeowners in ${cityData.city} are eligible for bi-directional net meters where surplus daytime generation is exported into the grid and credited against nighttime consumption.`}
                  </p>
                </div>

                {/* High-Visibility Lead Form (Regional Fallback) */}
                <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-4">
                  <div className="text-center max-w-xl mx-auto mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                      Free Site Feasibility
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
                      Request Verified Installer Quotes in {cityData.city}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                      Our dispatch team will connect you with up to 3 verified solar engineers licensed
                      for {cityData.city} and {stateConfig.state}.
                    </p>
                  </div>
                  <div className="max-w-xl mx-auto">
                    <LeadForm
                      prefill={{ city: cityData.city }}
                      source={`city-fallback:${cityData.city.toLowerCase()}`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Brand-authorised dealer sections (captures brand+city long-tail) */}
            {brandGroups.length > 0 && (
              <div className="space-y-4">
                {brandGroups.map((brand) => (
                  <div key={brand.slug} className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-zinc-900 mb-1.5">
                      Authorised {brand.label} Dealers in {cityData.city}
                    </h2>
                    <p className="text-zinc-600 text-xs sm:text-sm mb-4">
                      Verified {brand.label} channel partners &amp; dealers in {cityData.city}, {cityData.state}. Get genuine panels/inverters with manufacturer warranty and PM Surya Ghar subsidy assistance.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {brand.dealers.map((d) => (
                        <Link
                          key={d.id}
                          href={`/listing/${d.slug}`}
                          className="block border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-xl p-3.5 transition"
                        >
                          <p className="font-semibold text-zinc-900 text-sm line-clamp-1">{d.name}</p>
                          <p className="text-xs text-zinc-500 mt-1.5 flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-zinc-400" />
                              {cityData.city}
                            </span>
                            {d.verified && (
                              <span className="text-emerald-700 font-medium">✓ Verified</span>
                            )}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── PHASE 3: EMBEDDED SOLAR SUBSIDY CALCULATOR ON CITY HUB ── */}
            <div className="pt-2">
              <SolarSubsidyCalculator
                initialState={cityData.state}
                initialCity={cityData.city}
                embedded={true}
              />
            </div>

            {/* City-Specific Information & Costs */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
                About Solar Rooftop in {cityData.city}
              </h2>

              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200/80">
                <p className="text-sm text-zinc-700 leading-relaxed">
                  {getCityDescription(cityData.city)}
                </p>
              </div>

              {(() => {
                const cityInfo = citySpecificData[cityData.city.toLowerCase()];
                if (cityInfo) {
                  return (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 mb-3 flex items-center gap-2">
                          <Info className="h-4 w-4 text-emerald-600" />
                          Average System Installation Cost in {cityData.city}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex justify-between items-center">
                            <span className="text-zinc-600">3 kW System (Avg. Home):</span>
                            <span className="font-bold text-zinc-900">{cityInfo.avgCost3kW}</span>
                          </div>
                          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex justify-between items-center">
                            <span className="text-zinc-600">5 kW System (Large Home):</span>
                            <span className="font-bold text-zinc-900">{cityInfo.avgCost5kW}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-zinc-900 mb-2">
                          Net Metering Utilities in {cityData.city}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-600">
                          <strong>Active DISCOMs:</strong> {cityInfo.discoms.join(', ')}
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Related internal navigation */}
              <div className="pt-4 border-t border-zinc-100">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                  Solar Guides &amp; Related Links
                </h3>
                <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                  <Link
                    href={`/best-solar-companies/${citySlug}`}
                    className="text-emerald-700 hover:text-emerald-800 font-medium bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200/60"
                  >
                    Top Rated Solar Companies in {cityData.city} →
                  </Link>
                  <Link
                    href={`/${citySlug}/solar-panel-cleaning`}
                    className="text-zinc-700 hover:text-zinc-900 font-medium bg-zinc-100 px-3 py-1 rounded-lg border border-zinc-200"
                  >
                    Panel Cleaning in {cityData.city} →
                  </Link>
                  <Link
                    href="/tools/solar-subsidy-calculator"
                    className="text-zinc-700 hover:text-zinc-900 font-medium bg-zinc-100 px-3 py-1 rounded-lg border border-zinc-200"
                  >
                    Solar Subsidy Calculator →
                  </Link>
                  <Link
                    href="/guides/best-solar-panel-cleaning-kits-india"
                    className="text-zinc-700 hover:text-zinc-900 font-medium bg-zinc-100 px-3 py-1 rounded-lg border border-zinc-200"
                  >
                    Cleaning Kits Review →
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-6">
                Frequently Asked Questions — Solar in {cityData.city}
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-zinc-100 last:border-b-0 pb-5 last:pb-0"
                  >
                    <h3 className="text-base font-semibold text-zinc-900 mb-1.5">{faq.question}</h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky/Bottom Lead capture */}
        <section className="bg-zinc-900 text-white py-14 border-t border-zinc-800">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Get Free Rooftop Solar Quotes in {cityData.city}
              </h2>
              <p className="text-sm text-zinc-400">
                Compare verified quotes from empanelled installers in {cityData.city}. No spam, 100% privacy protected.
              </p>
            </div>
            <div className="max-w-xl mx-auto">
              <LeadForm
                prefill={{ city: cityData.city }}
                source={`city-page:${cityData.city.toLowerCase()}`}
              />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
