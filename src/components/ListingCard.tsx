import Link from 'next/link';
import { Star, MapPin, Phone, Verified } from 'lucide-react';

interface ListingCardProps {
  listing: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    phone: string | null;
    address: string | null;
    rating: number | null;
    reviews: number;
    verified: boolean;
    featured: boolean;
    location: {
      city: string;
      state: string;
    };
    category: {
      name: string;
    };
  };
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listing/${listing.slug}`} className="block">
      <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition ${
        listing.featured ? 'ring-2 ring-orange-500' : ''
      }`}>
        {listing.featured && (
          <div className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 text-center">
            ⭐ Featured Listing
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              {listing.name}
              {listing.verified && (
                <Verified className="h-5 w-5 text-blue-500" aria-label="Verified" />
              )}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium text-gray-900">
                {listing.rating?.toFixed(1) || 'New'}
              </span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 text-sm">{listing.reviews} reviews</span>
            <span className="text-gray-400">•</span>
            <span className="text-orange-600 text-sm font-medium">{listing.category.name}</span>
          </div>
          
          {listing.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {listing.description}
            </p>
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{listing.location.city}, {listing.location.state}</span>
            </div>
            {listing.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{listing.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
