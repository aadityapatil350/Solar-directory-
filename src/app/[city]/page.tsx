import type { Metadata } from 'next';
import { constructCityMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Link from 'next/link';
import CityClient from './CityClient';
import { MapPin, CheckCircle, Info } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { citySpecificData, getCityFAQs, getCityDescription } from '@/lib/cityData';

// Use ISR for better SEO - revalidate every 1 hour
export const revalidate = 3600;
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

function slugToSearch(slug: string) {
  return slug.replace(/-/g, ' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const location = await prisma.location.findFirst({
    where: { city: { equals: slugToSearch(citySlug), mode: 'insensitive' } },
  });
  if (!location) return {};

  const listingsCount = await prisma.listing.count({
    where: { location: { city: location.city } },
  });

  return constructCityMetadata(location.city, location.state, listingsCount);
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

  // Fetch all categories to populate filter dropdown
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

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
  const itemListSchema = listings.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Solar Installers in ${cityData.city}`,
    description: `Verified solar companies in ${cityData.city}, ${cityData.state}`,
    numberOfItems: listings.length,
    itemListElement: listings.slice(0, 10).map((listing: typeof listings[0], index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: listing.name,
      url: `https://gosolarindex.in/listing/${listing.slug}`,
      ...(listing.description && { description: listing.description }),
    })),
  } : null;

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
    <div className="min-h-screen bg-gray-50">
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {itemListSchema && (
        <Script
          id="itemlist-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
                <MapPin className="h-7 w-7" />
                Best Solar Installers in {cityData.city} (2026)
              </h1>
            </div>
            <p className="text-xl mb-4 text-orange-100">
              {cityData.state}, India
            </p>
            <p className="text-lg text-orange-200">
              Find verified solar installers, dealers, and service providers in {cityData.city}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {listings.length > 0 ? (
            <CityClient
              initialListings={listings}
              categories={categories}
              cityName={cityData.city}
            />
          ) : (
            <div className="bg-white rounded-xl p-12 text-center">
              <p className="text-gray-600 mb-4">
                No solar companies found in {cityData.city} yet.
              </p>
              <Link
                href="/"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Browse All Locations
              </Link>
            </div>
          )}

          {/* City-Specific Information */}
          <div className="mt-12 bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              About Solar in {cityData.city}
            </h2>

            {/* City-Specific Description */}
            <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 rounded-lg">
              <p className="text-gray-800 leading-relaxed">
                {getCityDescription(cityData.city)}
              </p>
            </div>

            {(() => {
              const cityInfo = citySpecificData[cityData.city.toLowerCase()];

              if (cityInfo) {
                return (
                  <>
                    {/* Cost Information */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Info className="h-5 w-5 text-orange-500" />
                        Solar Installation Costs in {cityData.city}
                      </h3>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium">3kW System (Avg. Home):</span>
                          <span className="text-orange-600 font-bold">{cityInfo.avgCost3kW}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium">5kW System (Large Home):</span>
                          <span className="text-orange-600 font-bold">{cityInfo.avgCost5kW}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 pt-2 border-t border-orange-200">
                          💡 {cityInfo.subsidyInfo}
                        </p>
                      </div>
                    </div>

                    {/* DISCOM & Net Metering */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Net Metering & DISCOM Information
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-700">
                          <span className="font-medium">Distribution Companies (DISCOMs):</span>{' '}
                          {cityInfo.discoms.join(', ')}
                        </p>
                        <ul className="space-y-1.5 ml-4">
                          {cityInfo.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Top Areas Served */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Popular Areas for Solar Installation
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {cityInfo.topAreas.map((area) => (
                          <span
                            key={area}
                            className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full"
                          >
                            <MapPin className="h-3.5 w-3.5 text-gray-500" />
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                );
              }

              // Fallback content for cities without specific data
              return (
                <div className="space-y-3 text-gray-600">
                  <p>
                    {cityData.city} offers excellent solar potential with abundant sunshine throughout the year.
                    Installing solar panels in {cityData.city} can help you reduce electricity bills
                    significantly while contributing to a greener environment.
                  </p>
                  <p>
                    The {cityData.state} government offers various solar subsidies and incentives
                    through PM Surya Ghar Yojana, making solar installation more affordable.
                  </p>
                  <p>
                    Our directory features verified solar installers in {cityData.city} with proven
                    track records. Compare prices, read reviews, and choose the right solar
                    company for your needs.
                  </p>
                </div>
              );
            })()}

            {/* Internal links to blog */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Helpful Resources</h4>
              <div className="flex flex-wrap gap-2">
                <Link href="/blog/solar-panel-cost-india-2025" className="text-sm text-orange-600 hover:underline">
                  → Solar Panel Costs in India
                </Link>
                <Link href="/blog/pm-surya-ghar-yojana-complete-guide" className="text-sm text-orange-600 hover:underline">
                  → PM Surya Ghar Subsidy Guide
                </Link>
                <Link href="/solar-calculator" className="text-sm text-orange-600 hover:underline">
                  → Calculate Your Savings
                </Link>
                <Link href="/subsidy-checker" className="text-sm text-orange-600 hover:underline">
                  → Check Subsidy Eligibility
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions - Solar in {cityData.city}
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
