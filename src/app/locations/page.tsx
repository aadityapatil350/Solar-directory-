import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = constructMetadata({
  title: 'Browse Solar Installers by Location',
  description: 'Find solar services in your city across India. Verified installers, dealers, and service providers near you.',
  path: '/locations',
});

export default async function LocationsPage() {
  const locations = await prisma.location.findMany({
    orderBy: { city: 'asc' },
    include: { _count: { select: { listings: true } } },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">Browse Locations</h1>
          </div>
          <p className="text-gray-600 mb-8">
            Solar companies across {locations.length} cities in India
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/${location.city.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-xl p-5 hover:shadow-lg transition border border-gray-200 group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-orange-500 transition">
                      {location.city}
                    </h2>
                    <p className="text-gray-500 text-sm mt-0.5">{location.state}</p>
                  </div>
                  <span className="bg-orange-50 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                    {location._count.listings}
                  </span>
                </div>
                <p className="text-xs text-orange-500 mt-3 font-medium group-hover:underline">
                  View solar companies →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
