import type { Metadata } from 'next';
import { constructCityMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Link from 'next/link';
import ListingCard from '@/components/ListingCard';
import { MapPin, Zap } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const cities = [
  { name: 'Mumbai', state: 'Maharashtra', slug: 'mumbai' },
  { name: 'Delhi', state: 'Delhi', slug: 'delhi' },
  { name: 'Bangalore', state: 'Karnataka', slug: 'bangalore' },
  { name: 'Pune', state: 'Maharashtra', slug: 'pune' },
  { name: 'Hyderabad', state: 'Telangana', slug: 'hyderabad' },
  { name: 'Chennai', state: 'Tamil Nadu', slug: 'chennai' },
  { name: 'Kolkata', state: 'West Bengal', slug: 'kolkata' },
  { name: 'Ahmedabad', state: 'Gujarat', slug: 'ahmedabad' },
  { name: 'Jaipur', state: 'Rajasthan', slug: 'jaipur' },
  { name: 'Lucknow', state: 'Uttar Pradesh', slug: 'lucknow' },
];

interface PageProps {
  params: {
    city: string;
  };
}

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityData = cities.find((c) => c.slug === params.city);
  if (!cityData) {
    return {};
  }
  return constructCityMetadata(cityData.name, cityData.state);
}

export default async function CityPage({ params }: PageProps) {
  const cityData = cities.find((c) => c.slug === params.city);

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
        city: cityData.name,
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
                {cityData.name}
              </h1>
            </div>
            <p className="text-xl mb-4 text-orange-100">
              {cityData.state}, India
            </p>
            <p className="text-lg text-orange-200">
              Find verified solar installers, dealers, and service providers in {cityData.name}
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
                  {listings.length} Solar Companies in {cityData.name}
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
                No solar companies found in {cityData.name} yet.
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
              About Solar in {cityData.name}
            </h3>
            <div className="space-y-3 text-gray-600">
              <p>
                {cityData.name} offers excellent solar potential with abundant sunshine throughout the year.
                Installing solar panels in {cityData.name} can help you reduce electricity bills
                significantly while contributing to a greener environment.
              </p>
              <p>
                The {cityData.state} government offers various solar subsidies and incentives
                through PM Surya Ghar Yojana, making solar installation more affordable.
              </p>
              <p>
                Our directory features verified solar installers in {cityData.name} with proven
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
