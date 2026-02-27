import type { Metadata } from 'next';
import { constructCityMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Link from 'next/link';
import ListingCard from '@/components/ListingCard';
import { MapPin, Zap } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateStaticParams() {
  const locations = await prisma.location.findMany({
    select: { city: true },
  });
  return locations.map((l) => ({ city: l.city.toLowerCase().replace(/\s+/g, '-') }));
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
  return constructCityMetadata(location.city, location.state);
}

export default async function CityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const cityData = await prisma.location.findFirst({
    where: { city: { equals: slugToSearch(citySlug), mode: 'insensitive' } },
  });

  if (!cityData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">City not found</h1>
          <Link href="/" className="text-orange-500 mt-4 inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

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
    take: 50,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="h-8 w-8" />
              <h1 className="text-4xl md:text-5xl font-bold">
                {cityData.city}
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
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {listings.length} Solar Companies in {cityData.city}
                </h2>
                <span className="flex items-center gap-2 text-green-600">
                  <Zap className="h-5 w-5" />
                  {listings.filter((l) => l.verified).length} Verified
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </>
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

          <div className="mt-12 bg-white rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              About Solar in {cityData.city}
            </h3>
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
          </div>
        </div>
      </div>
    </div>
  );
}
