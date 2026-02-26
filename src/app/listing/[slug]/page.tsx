import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import LeadForm from '@/components/LeadForm';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, Mail, Globe, MapPin, Star, ShieldCheck, ChevronRight } from 'lucide-react';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

async function getListing(slug: string) {
  return prisma.listing.findUnique({
    where: { slug },
    include: { category: true, location: true },
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) return {};
  return constructMetadata({
    title: `${listing.name} — ${listing.category.name} in ${listing.location.city}`,
    description: `${listing.name} is a verified ${listing.category.name.toLowerCase()} in ${listing.location.city}, ${listing.location.state}. ${listing.description?.slice(0, 120) || ''}`,
    path: `/listing/${slug}`,
  });
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = await getListing(slug);

  if (!listing) {
    notFound();
  }

  const siteUrl = 'https://gosolarindex.in';
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: listing.name,
    description: listing.description || undefined,
    url: listing.website || `${siteUrl}/listing/${listing.slug}`,
    telephone: listing.phone || undefined,
    email: listing.email || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address || undefined,
      addressLocality: listing.location.city,
      addressRegion: listing.location.state,
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates' },
    aggregateRating: listing.reviews > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: listing.rating,
      reviewCount: listing.reviews,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Bank Transfer',
    areaServed: listing.location.state,
    serviceType: listing.category.name,
    hasMap: `https://www.google.com/maps/search/${encodeURIComponent(`${listing.name} ${listing.location.city}`)}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: listing.category.name, item: `${siteUrl}/categories/${listing.category.slug ?? ''}` },
      { '@type': 'ListItem', position: 3, name: listing.name, item: `${siteUrl}/listing/${listing.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Script
        id="lb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="bc-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-500 transition">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/categories/${listing.category.slug ?? ''}`} className="hover:text-orange-500 transition">
              {listing.category.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate max-w-48">{listing.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{listing.name}</h1>
                      {listing.verified && (
                        <span title="Verified">
                          <ShieldCheck className="h-6 w-6 text-green-500" />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {listing.rating} ({listing.reviews} reviews)
                      </span>
                      <span>{listing.category.name}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  {listing.description}
                </p>

                {/* Contact Info */}
                <div className="border-t pt-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    {listing.address && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                        <div>
                          <p className="text-gray-600">{listing.address}</p>
                          <p className="text-gray-500">
                            {listing.location.city}, {listing.location.state}
                          </p>
                        </div>
                      </div>
                    )}

                    {listing.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <a
                          href={`tel:${listing.phone}`}
                          className="text-gray-600 hover:text-orange-500 transition"
                        >
                          {listing.phone}
                        </a>
                      </div>
                    )}

                    {listing.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <a
                          href={`mailto:${listing.email}`}
                          className="text-gray-600 hover:text-orange-500 transition"
                        >
                          {listing.email}
                        </a>
                      </div>
                    )}

                    {listing.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-gray-500" />
                        <a
                          href={listing.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-orange-500 transition"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-wrap gap-4">
                  {listing.phone && (
                    <a
                      href={`tel:${listing.phone}`}
                      className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
                    >
                      Call Now
                    </a>
                  )}
                  {listing.website && (
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-50 transition"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <LeadForm
                prefill={{
                  requirement: listing.category.name,
                  locationId: listing.locationId,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
