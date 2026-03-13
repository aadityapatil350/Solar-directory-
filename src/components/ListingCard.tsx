'use client';

import Link from 'next/link';
import { Star, MapPin, Phone, Verified, MessageCircle, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ListingCardProps {
  listing: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    phone: string | null;
    website: string | null;
    address: string | null;
    rating: number | null;
    reviews: number;
    verified: boolean;
    featured: boolean;
    location: { city: string; state: string };
    category: { name: string };
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

async function trackWhatsAppClick(listingId: string, city: string) {
  try {
    await fetch('/api/whatsapp-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId, city }),
    });
  } catch (error) {
    console.error('Failed to track WhatsApp click:', error);
  }
}

export default function ListingCard({ listing }: ListingCardProps) {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch all categories this company works in
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`/api/listings/${listing.id}/categories`);
        const data = await response.json();
        if (data.categories && data.categories.length > 0) {
          setAllCategories(data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    }

    fetchCategories();
  }, [listing.id]);

  const handleWhatsAppClick = () => {
    if (listing.phone) {
      trackWhatsAppClick(listing.id, listing.location.city);
    }
  };

  const formatPhoneNumber = (phone: string): string | null => {
    // Remove all non-numeric characters except +
    let cleaned = phone.replace(/[^\d+]/g, '');

    // Remove leading zeros
    cleaned = cleaned.replace(/^0+/, '');

    // If it starts with +91, keep it
    if (cleaned.startsWith('+91')) {
      return cleaned;
    }

    // If it starts with 91 and is 12 digits or more, add +
    if (cleaned.startsWith('91') && cleaned.length >= 12) {
      return '+' + cleaned;
    }

    // If it's 10 digits starting with 6-9 (mobile), add +91
    if (cleaned.length === 10 && cleaned[0] >= '6') {
      return '+91' + cleaned;
    }

    // If it's 10-11 digits (landline with STD code), add +91
    if (cleaned.length >= 10 && cleaned.length <= 11) {
      return '+91' + cleaned;
    }

    // If it's 11+ digits starting with 91, add +
    if (cleaned.startsWith('91') && cleaned.length >= 11) {
      return '+' + cleaned;
    }

    // Invalid format - too short or doesn't match patterns
    if (cleaned.length < 10) {
      console.warn(`Phone too short: ${phone}`);
      return null;
    }

    // Default: add +91 for any 10+ digit number
    return '+91' + cleaned;
  };

  const formattedPhone = listing.phone ? formatPhoneNumber(listing.phone) : null;
  const whatsappUrl = formattedPhone
    ? `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
        `Hi, I found you on GoSolarIndex. I'm interested in a solar quote for my home.`
      )}`
    : null;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border-2 overflow-hidden hover:shadow-md transition cursor-pointer ${
        listing.featured ? 'border-orange-400 bg-orange-50/30' : 'border-gray-200 hover:border-orange-300'
      }`}
      onClick={() => window.location.href = `/listing/${listing.slug}`}
    >
      {listing.featured && (
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 text-center flex items-center justify-center gap-2">
          <Star className="h-3.5 w-3.5 fill-white" />
          FEATURED LISTING
        </div>
      )}

      <div className="p-5">
        {/* Title and Verified Badge */}
        <div className="flex items-start justify-between mb-2">
          <Link href={`/listing/${listing.slug}`} className="block group flex-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition flex items-center gap-2 flex-wrap">
              {listing.name}
              {listing.verified && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                  <Verified className="h-3 w-3" />
                  Verified
                </span>
              )}
            </h3>
          </Link>
        </div>

        {/* Category Badges - Show all categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          {loadingCategories && allCategories.length === 0 ? (
            <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
              {listing.category.name}
            </span>
          ) : (
            allCategories.map((cat) => (
              <span
                key={cat.id}
                className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full"
              >
                {cat.name}
              </span>
            ))
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-gray-900">
              {listing.rating?.toFixed(1) || 'New'}
            </span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 text-sm">{listing.reviews} reviews</span>
        </div>

        {listing.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {listing.description}
          </p>
        )}

        {/* Location and Contact */}
        <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="h-4 w-4 text-orange-500 shrink-0" />
            <span className="font-medium">{listing.location.city}, {listing.location.state}</span>
          </div>
          {listing.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone className="h-4 w-4 text-green-500 shrink-0" />
              <span className="font-mono">{listing.phone}</span>
            </div>
          )}
          {listing.address && (
            <p className="text-xs text-gray-500 line-clamp-1 pl-6">
              {listing.address}
            </p>
          )}
        </div>

        {/* Action Buttons - Always show all 3 */}
        <div className="grid grid-cols-3 gap-2" onClick={(e) => e.stopPropagation()}>
          {/* View Details Button */}
          <Link
            href={`/listing/${listing.slug}`}
            className="inline-flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-3 rounded-lg transition text-xs"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Details</span>
          </Link>

          {/* WhatsApp Button */}
          {listing.phone && whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleWhatsAppClick();
                window.open(whatsappUrl, '_blank');
              }}
              className="inline-flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-3 rounded-lg transition text-xs"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          ) : (
            <button
              disabled
              className="inline-flex items-center justify-center gap-1 bg-gray-200 text-gray-400 font-medium py-2.5 px-3 rounded-lg cursor-not-allowed text-xs"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
          )}

          {/* Website Button */}
          {listing.website ? (
            <a
              href={listing.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-3 rounded-lg transition text-xs"
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Website</span>
            </a>
          ) : (
            <button
              disabled
              className="inline-flex items-center justify-center gap-1 bg-gray-200 text-gray-400 font-medium py-2.5 px-3 rounded-lg cursor-not-allowed text-xs"
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Website</span>
            </button>
          )}
        </div>

        {/* Claim link */}
        {!listing.verified && (
          <div className="mt-3 pt-3 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
            <Link
              href={`/claim/${listing.slug}`}
              className="text-xs text-gray-400 hover:text-orange-500 transition"
            >
              Is this your business?{' '}
              <span className="underline font-medium">Claim & get verified free</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
