'use client';

import React from 'react';
import Link from 'next/link';
import { Star, MapPin, Phone, CheckCircle2, MessageCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
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
        `Hi ${listing.name}, I found your listing on GoSolarIndex and would like to enquire about solar rooftop installation.`
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
  const stateName = listing.state || listing.location?.state || '';
  const oneLineDesc = listing.description || `${categoryName} serving ${cityName}${stateName ? `, ${stateName}` : ''}. Specializing in on-grid rooftop solar systems, DISCOM net metering, and PM Surya Ghar subsidy processing.`;

  // Initials for avatar emblem
  const initials = listing.name
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || 'GS';

  return (
    <article
      className={`p-5 sm:p-6 mb-3.5 rounded-lg border transition-all duration-200 group bg-paper ${
        listing.featured
          ? 'border-amber-300 shadow-sm hover:border-amber-400 hover:shadow-md ring-1 ring-amber-200/50'
          : 'border-line hover:border-ink/40 hover:shadow-sm'
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
        
        {/* Left Section: Company Avatar & Information */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          
          {/* Avatar Emblem */}
          <Link
            href={`/listing/${listing.slug}`}
            className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-wash border border-line flex items-center justify-center font-heading font-bold text-ink text-base sm:text-lg group-hover:bg-sun-wash transition-colors shadow-xs"
            aria-label={listing.name}
          >
            <span>{initials}</span>
            {listing.verified && (
              <span
                className="absolute -bottom-1 -right-1 bg-paper rounded-full p-0.5 shadow-xs"
                title="Verified Installer"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600 fill-emerald-100" />
              </span>
            )}
          </Link>

          {/* Details */}
          <div className="flex-1 min-w-0">
            {/* Title & Badges */}
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Link
                href={`/listing/${listing.slug}`}
                className="font-heading font-bold text-base sm:text-lg text-ink hover:text-amber-700 transition leading-snug"
              >
                {listing.name}
              </Link>

              {listing.featured && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded-full font-body">
                  <Sparkles className="h-3 w-3 text-amber-600 fill-amber-500" />
                  Featured Partner
                </span>
              )}

              {listing.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full font-body">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  Verified Installer
                </span>
              )}
            </div>

            {/* Rating, Category & Location */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-2 font-body mt-0.5">
              {listing.rating != null && listing.rating > 0 ? (
                <div className="flex items-center gap-1 text-ink font-semibold">
                  <Star className="h-3.5 w-3.5 fill-sun text-sun" />
                  <span>{listing.rating.toFixed(1)}</span>
                  {listing.reviews && listing.reviews > 0 && (
                    <span className="text-ink-2 font-normal">({listing.reviews} Google reviews)</span>
                  )}
                  <span className="text-ink/30 ml-1">·</span>
                </div>
              ) : null}

              <span className="font-medium text-ink flex items-center gap-1">
                {categoryName}
              </span>

              <span className="text-ink/30">·</span>

              <span className="flex items-center gap-1 text-ink-2">
                <MapPin className="h-3.5 w-3.5 text-ink-2 shrink-0" />
                <span>{cityName}{stateName ? `, ${stateName}` : ''}</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-ink-2 line-clamp-2 mt-2 leading-relaxed font-body">
              {oneLineDesc}
            </p>

            {/* Service Chips */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              {services.map((service) => (
                <span
                  key={service}
                  className="inline-flex items-center text-[11px] px-2.5 py-0.5 rounded bg-wash border border-line/60 text-ink/80 font-medium font-body"
                >
                  {service}
                </span>
              ))}

              {listing.address && (
                <span className="text-[11px] text-ink-2/80 truncate max-w-xs ml-1 hidden sm:inline font-body">
                  📍 {listing.address}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-end gap-2 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-line/50">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* WhatsApp button only for FEATURED listings */}
            {listing.featured && whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-sm bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold shadow-xs transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="h-3.5 w-3.5 fill-white" />
                <span>WhatsApp</span>
              </a>
            )}

            {telHref && (
              <a
                href={telHref}
                className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-sm border border-line hover:border-ink hover:bg-wash text-ink text-xs font-medium transition-colors"
                title="Call or copy number"
              >
                <Phone className="h-3.5 w-3.5 text-ink-2" />
                <span>{listing.featured ? 'Call' : listing.phone}</span>
              </a>
            )}

            <Link
              href={`/listing/${listing.slug}`}
              className="inline-flex items-center justify-center gap-1 h-9 px-4 rounded-sm bg-sun hover:bg-sun-hover text-ink text-xs font-heading font-semibold transition-colors shrink-0 shadow-xs"
            >
              <span>View Profile</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <span className="text-[11px] text-ink-2 hidden lg:inline font-body">
            Free quote · No commission
          </span>
        </div>

      </div>
    </article>
  );
}
