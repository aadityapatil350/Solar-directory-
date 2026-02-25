import Header from '@/components/Header';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function LocationsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/locations`, {
    cache: 'no-store',
  });
  const locations = await res.json();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">Browse Locations</h1>
          </div>
          
          <p className="text-gray-600 mb-8">
            Find solar services in your city across India
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location: any) => (
              <Link
                key={location.id}
                href={`/?locationId=${location.id}`}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition border border-gray-200 group"
              >
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-orange-500 transition">
                  {location.city}
                </h2>
                <p className="text-gray-600 mt-1">{location.state}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
