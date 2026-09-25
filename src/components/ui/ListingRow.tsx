'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { whatsappUrl as buildWhatsappUrl, telUrl } from '@/lib/phone';

export interface ListingRowData {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  rating?: number | null;
  reviews?: number;
  verified?: boolean;
  featured?: boolean;
  city?: string;
  state?: string;
  location?: { city: string; state: string };
  category?: string | { name: string };
  serviceTags?: string | null;
}

export default function ListingRow({ listing }: { listing: ListingRowData }) {
  const telHref = listing.phone ? telUrl(listing.phone) : null;
  const whatsappHref = listing.phone
    ? buildWhatsappUrl(
        listing.phone,
        `Hi ${listing.name}, I found your listing on GoSolarIndex and would like to enquire about solar installation.`
      )
    : null;

  // Format services list
  let services = ['Rooftop solar', 'Net metering', 'Subsidy paperwork'];
  if (listing.serviceTags) {
    try {
      const parsed = JSON.parse(listing.serviceTags);
      if (Array.isArray(parsed?.tags) && parsed.tags.length > 0) {
        services = parsed.tags.slice(0, 4);
      }
    } catch {
      // ignore
    }
  }

  const categoryName = typeof listing.category === 'string' ? listing.category : listing.category?.name || 'Solar Installer';
  const cityName = listing.city || listing.location?.city || 'India';
  const oneLineDesc = listing.description || `${categoryName} in ${cityName}`;

  return (
    <div
      className={`py-4 border-b border-line ${
        listing.featured ? 'border-l-4 border-l-sun pl-4 bg-wash/30' : ''
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        {/* Left Column: Name, Description, Verification, Services */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/listing/${listing.slug}`}
              className="font-heading font-semibold text-lg text-ink hover:underline decoration-1 underline-offset-2"
            >
              {listing.name}
            </Link>
            {listing.featured && (
              <span className="text-xs text-ink-2 font-medium tracking-wide">Featured</span>
            )}
          </div>

          <p className="text-sm text-ink-2 mt-0.5 line-clamp-1">
            {oneLineDesc}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-ink">
            {listing.verified ? (
              <span className="font-semibold flex items-center gap-1 text-ink">
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                Owner verified
              </span>
            ) : (
              <span className="text-ink-2">Listed from public data</span>
            )}

            {listing.rating != null && listing.rating > 0 && listing.reviews && listing.reviews > 0 ? (
              <span className="flex items-center gap-1 text-ink-2">
                <span>·</span>
                <Star className="h-3.5 w-3.5 fill-sun text-sun inline" />
                <span className="font-medium text-ink">{listing.rating.toFixed(1)}</span>
                <span>({listing.reviews} Google reviews)</span>
              </span>
            ) : null}
          </div>

          <div className="text-xs text-ink-2 mt-1.5 flex flex-wrap items-center gap-1.5">
            <span>Services: {services.join(', ')}</span>
            {listing.address && (
              <>
                <span>·</span>
                <span className="truncate max-w-xs">{listing.address}</span>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="flex items-center gap-2 shrink-0 sm:self-center mt-2 sm:mt-0">
          {telHref ? (
            <a
              href={telHref}
              className="inline-flex items-center justify-center h-9 px-4 border border-ink text-ink text-xs font-medium rounded-sm hover:bg-wash transition-colors"
            >
              Call
            </a>
          ) : null}

          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-9 px-4 border border-ink text-ink text-xs font-medium rounded-sm hover:bg-wash transition-colors"
            >
              WhatsApp
            </a>
          ) : null}

          <Link
            href={`/listing/${listing.slug}`}
            className="inline-flex items-center justify-center h-9 px-4 bg-paper border border-ink/40 text-ink text-xs font-medium rounded-sm hover:border-ink transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
