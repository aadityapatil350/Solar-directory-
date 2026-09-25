'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, MapPin, Phone, CheckCircle2, MessageCircle, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { whatsappUrl as buildWhatsappUrl } from '@/lib/phone';

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
  const router = useRouter();
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
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
    }, 500);

    return () => clearTimeout(timer);
  }, [listing.id]);

  const handleWhatsAppClick = () => {
    if (listing.phone) {
      trackWhatsAppClick(listing.id, listing.location.city);
    }
  };

  const whatsappUrl = buildWhatsappUrl(
    listing.phone,
    `Hi, I found you on GoSolarIndex. I'm interested in a solar installation quote for my home/business.`,
  );

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between ${
        listing.featured
          ? 'border-amber-300 shadow-sm ring-1 ring-amber-200/70 hover:shadow-md hover:border-amber-400'
          : 'border-zinc-200/90 hover:border-zinc-400 hover:shadow-sm'
      }`}
      onClick={() => router.push(`/listing/${listing.slug}`)}
    >
      {/* Featured Header Pill */}
      {listing.featured && (
        <div className="bg-amber-50/80 border-b border-amber-200/60 text-amber-900 text-[11px] font-semibold px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Featured Solar Partner</span>
          </div>
          <span className="text-[10px] text-amber-700/80 font-medium">PM Surya Ghar Verified</span>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title and Badges */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <Link href={`/listing/${listing.slug}`} className="block group flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-zinc-950 group-hover:text-emerald-700 transition leading-snug">
                {listing.name}
              </h3>
            </Link>
            {listing.verified && (
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[11px] px-2.5 py-0.5 rounded-full font-medium border border-emerald-200/70 shrink-0">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                Verified
              </span>
            )}
          </div>

          {/* Category & PM Surya Ghar Badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {loadingCategories && allCategories.length === 0 ? (
              <span className="bg-zinc-100 text-zinc-600 text-[11px] font-medium px-2.5 py-0.5 rounded-md border border-zinc-200/60">
                {listing.category.name}
              </span>
            ) : (
              allCategories.map((cat) => (
                <span
                  key={cat.id}
                  className="bg-zinc-100 text-zinc-700 text-[11px] font-medium px-2.5 py-0.5 rounded-md border border-zinc-200/60"
                >
                  {cat.name}
                </span>
              ))
            )}
            <span className="bg-sky-50 text-sky-800 text-[10px] font-medium px-2 py-0.5 rounded-md border border-sky-200/60">
              Subsidy Eligible
            </span>
          </div>

          {/* Rating */}
          {listing.rating && listing.rating > 0 && listing.reviews > 0 ? (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                <span className="font-semibold text-xs text-zinc-900">
                  {listing.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-zinc-500 text-xs">
                ({listing.reviews} Google review{listing.reviews === 1 ? '' : 's'})
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-zinc-500 font-medium">Verified Local Vendor</span>
            </div>
          )}

          {listing.description && (
            <p className="text-zinc-600 text-xs sm:text-sm mb-3.5 line-clamp-2 leading-relaxed">
              {listing.description}
            </p>
          )}

          {/* Location and Contact */}
          <div className="space-y-1.5 mb-4 pb-3 border-b border-zinc-100 text-xs text-zinc-600">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span className="font-medium text-zinc-800">{listing.location.city}, {listing.location.state}</span>
            </div>
            {listing.phone && (
              <div className="flex items-center gap-2 font-mono text-zinc-700">
                <Phone className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                <span>{listing.phone}</span>
              </div>
            )}
            {listing.address && (
              <p className="text-[11px] text-zinc-500 line-clamp-1 pl-5">
                {listing.address}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div>
          <div className="grid grid-cols-3 gap-2" onClick={(e) => e.stopPropagation()}>
            {/* View Details */}
            <Link
              href={`/listing/${listing.slug}`}
              className="inline-flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-medium py-2 px-3 rounded-lg transition text-xs shadow-sm"
            >
              <span>Details</span>
              <ArrowRight className="h-3 w-3" />
            </Link>

            {/* WhatsApp */}
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
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-3 rounded-lg transition text-xs shadow-sm"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center justify-center gap-1.5 bg-zinc-100 text-zinc-400 font-medium py-2 px-3 rounded-lg cursor-not-allowed text-xs border border-zinc-200"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </button>
            )}

            {/* Website */}
            {listing.website ? (
              <a
                href={listing.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-zinc-50 text-zinc-800 font-medium py-2 px-3 rounded-lg transition text-xs border border-zinc-200"
              >
                <Globe className="h-3.5 w-3.5 text-zinc-500" />
                <span>Website</span>
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center justify-center gap-1.5 bg-zinc-100 text-zinc-400 font-medium py-2 px-3 rounded-lg cursor-not-allowed text-xs border border-zinc-200"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Website</span>
              </button>
            )}
          </div>

          {/* Claim Listing Link */}
          <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-[11px]" onClick={(e) => e.stopPropagation()}>
            <span className="text-zinc-500">Own this company?</span>
            <Link
              href={`/for-installers?claim=${listing.slug}`}
              className="text-emerald-700 hover:text-emerald-800 font-medium transition underline underline-offset-2"
            >
              Claim profile free →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
