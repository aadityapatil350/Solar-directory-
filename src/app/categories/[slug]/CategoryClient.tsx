'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import ListingRow from '@/components/ui/ListingRow';
import { Search, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface Listing {
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
  locationId: string;
  location: { id: string; city: string; state: string };
  category: { id: string; name: string; slug: string };
}

interface Location {
  id: string;
  city: string;
  state: string;
}

interface Props {
  initialListings: Listing[];
  locations: Location[];
  categoryName: string;
  categorySlug: string;
}

const PAGE_SIZE = 20;

export default function CategoryClient({
  initialListings,
  locations,
  categoryName,
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter listings
  const filteredListings = useMemo(() => {
    return initialListings.filter((listing) => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = listing.name.toLowerCase().includes(query);
        const matchesDesc = listing.description?.toLowerCase().includes(query);
        const matchesCity = listing.location.city.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCity) return false;
      }

      // Location filter
      if (selectedLocation && listing.locationId !== selectedLocation) {
        return false;
      }

      // Verified filter
      if (verifiedOnly && !listing.verified) {
        return false;
      }

      return true;
    });
  }, [initialListings, searchQuery, selectedLocation, verifiedOnly]);

  const totalPages = Math.ceil(filteredListings.length / PAGE_SIZE);
  const paginatedListings = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredListings.slice(start, start + PAGE_SIZE);
  }, [filteredListings, currentPage]);

  return (
    <div className="space-y-6">
      {/* Filter Toolbar */}
      <div className="border border-line rounded-sm p-4 bg-wash space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={`Search in ${categoryName.toLowerCase()}...`}
              className="w-full h-10 pl-9 pr-3.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink font-body"
            />
          </div>

          {/* City selector */}
          <div className="w-full sm:w-56 shrink-0">
            <select
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-10 px-3 bg-paper border border-line rounded-sm text-sm text-ink focus:outline-none focus:border-ink font-body"
            >
              <option value="">All Indian Cities</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.city}, {loc.state}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Checkbox toggle */}
        <div className="flex items-center gap-4 text-xs font-body text-ink">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => {
                setVerifiedOnly(e.target.checked);
                setCurrentPage(1);
              }}
              className="rounded-sm border-line text-ink focus:ring-ink"
            />
            <span>Owner verified only</span>
          </label>
          <span className="text-ink-2">·</span>
          <span className="text-ink-2">
            Showing <strong className="text-ink font-semibold">{filteredListings.length}</strong> {filteredListings.length === 1 ? 'company' : 'companies'}
          </span>
        </div>
      </div>

      {/* Directory List View */}
      {filteredListings.length > 0 ? (
        <div className="space-y-6">
          <div className="border-t border-line">
            {paginatedListings.map((listing) => (
              <ListingRow key={listing.id} listing={listing} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-line font-body text-xs">
              <span className="text-ink-2">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1 h-9 px-3 border border-line text-ink rounded-sm hover:bg-wash disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1 h-9 px-3 border border-line text-ink rounded-sm hover:bg-wash disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="border border-line rounded-sm p-10 text-center bg-wash">
          <p className="text-sm font-semibold text-ink">No matching solar businesses found</p>
          <p className="text-xs text-ink-2 mt-1">
            Try adjusting your search keywords or clearing the city filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedLocation('');
              setVerifiedOnly(false);
            }}
            className="mt-3 inline-flex items-center justify-center h-9 px-4 border border-ink text-ink text-xs font-medium rounded-sm hover:bg-paper"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
