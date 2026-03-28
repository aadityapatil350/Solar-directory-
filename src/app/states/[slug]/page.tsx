import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import ListingCard from '@/components/ListingCard';
import LeadForm from '@/components/LeadForm';
import Link from 'next/link';
import { ChevronRight, MapPin } from 'lucide-react';
import { getStateDescription, getStateFAQs } from '@/lib/stateData';

interface Props {
  params: Promise<{ slug: string }>;
}

// Map slug → display state name
function slugToState(slug: string) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const state = slugToState(slug);
  return constructMetadata({
    title: `Best Solar Installers in ${state} — Top Companies`,
    description: `Find verified solar installers, dealers, and service providers across ${state}. Get free quotes, compare prices, and switch to solar today. PM Surya Ghar Yojana eligible.`,
    path: `/states/${slug}`,
  });
}

// Remove force-dynamic to allow proper SSR
export const revalidate = 3600;

export default async function StatePage({ params }: Props) {
  const { slug } = await params;
  const state = slugToState(slug);

  // Find all locations in this state
  const stateLocations = await prisma.location.findMany({
    where: { state: { equals: state, mode: 'insensitive' } },
    orderBy: { city: 'asc' },
  });

  if (stateLocations.length === 0) notFound();

  const locationIds = stateLocations.map((l: typeof stateLocations[0]) => l.id);

  const listings = await prisma.listing.findMany({
    where: { locationId: { in: locationIds } },
    include: { category: true, location: true },
    orderBy: [{ featured: 'desc' }, { verified: 'desc' }, { rating: 'desc' }],
    take: 100,
  });

  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

  // Get state-specific content
  const faqs = getStateFAQs(state);

  const siteUrl = 'https://gosolarindex.in';

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: `${siteUrl}/locations`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: state,
        item: `${siteUrl}/states/${slug}`,
      },
    ],
  };

  // FAQPage Schema
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
    <>
      {/* Structured Data - Rendered in Head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gray-50">
        <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-500 transition">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/locations" className="hover:text-orange-500 transition">Locations</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{state}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Solar Installers in {state}
            </h1>
          </div>
          <p className="text-orange-100 max-w-2xl">
            {listings.length} verified solar companies across {stateLocations.length} cities in {state}.
            Compare prices, read reviews, and get free quotes.
          </p>

          {/* City chips */}
          <div className="flex flex-wrap gap-2 mt-6">
            {stateLocations.map((loc: typeof stateLocations[0]) => (
              <Link
                key={loc.id}
                href={`/${loc.city.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1 rounded-full transition"
              >
                {loc.city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {/* About Solar Section */}
        <div className="mb-10 bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Solar in {state}
          </h2>
          <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 rounded-lg">
            <p className="text-gray-800 leading-relaxed">
              {getStateDescription(state)}
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-10 bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions - Solar in {state}
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

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Cities */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Cities in {state}</h3>
              <ul className="space-y-1">
                {stateLocations.map((loc: typeof stateLocations[0]) => {
                  const count = listings.filter((l: typeof listings[0]) => l.locationId === loc.id).length;
                  return (
                    <li key={loc.id}>
                      <Link
                        href={`/${loc.city.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-sm text-gray-600 hover:text-orange-600 hover:underline flex justify-between"
                      >
                        <span>{loc.city}</span>
                        <span className="text-gray-400">{count}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Service Types</h3>
              <ul className="space-y-1">
                {categories.map((cat: typeof categories[0]) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="text-sm text-gray-600 hover:text-orange-600 hover:underline"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <LeadForm />
          </div>

          {/* Listings */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {listings.length} Solar Companies in {state}
            </h2>

            {listings.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {listings.map((listing: typeof listings[0]) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center">
                <p className="text-gray-500 mb-4">No listings in {state} yet.</p>
                <Link
                  href="/dashboard/login"
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
                >
                  List Your Business
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
