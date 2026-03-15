'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ListingCard from '@/components/ListingCard';
import Link from 'next/link';
import { Search, X, ChevronLeft, ChevronRight, Building2, MapPin, Star } from 'lucide-react';

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
  categorySlug
}: Props) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filteredListings = useMemo(() => {
    let result = [...initialListings];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.description?.toLowerCase().includes(q) ||
          l.location.city.toLowerCase().includes(q) ||
          l.location.state.toLowerCase().includes(q)
      );
    }

    // Location filter
    if (selectedLocation) {
      result = result.filter((l) => l.location.id === selectedLocation);
    }

    // Verified filter
    if (verifiedOnly) {
      result = result.filter((l) => l.verified);
    }

    // Featured filter
    if (featuredOnly) {
      result = result.filter((l) => l.featured);
    }

    // Sort: featured first, then verified, then by rating
    result.sort((a, b) => {
      if (b.featured !== a.featured) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (b.verified !== a.verified) return (b.verified ? 1 : 0) - (a.verified ? 1 : 0);
      const ra = a.rating ?? 0;
      const rb = b.rating ?? 0;
      if (rb !== ra) return rb - ra;
      return b.reviews - a.reviews;
    });

    return result;
  }, [initialListings, searchQuery, selectedLocation, verifiedOnly, featuredOnly]);

  const paginatedListings = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredListings.slice(start, start + PAGE_SIZE);
  }, [filteredListings, currentPage]);

  const totalPages = Math.ceil(filteredListings.length / PAGE_SIZE);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setVerifiedOnly(false);
    setFeaturedOnly(false);
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || selectedLocation || verifiedOnly || featuredOnly;

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];

    return initialListings
      .filter(l =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.location.state.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 8);
  }, [searchQuery, initialListings]);

  const selectListing = (listing: Listing) => {
    router.push(`/listing/${listing.slug}`);
  };

  // Location counts for sidebar
  const locationCounts = useMemo(() => {
    const counts = new Map<string, number>();
    initialListings.forEach((listing) => {
      const count = counts.get(listing.location.id) || 0;
      counts.set(listing.location.id, count + 1);
    });
    return counts;
  }, [initialListings]);

  return (
    <>
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar with Autocomplete */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="relative" ref={searchDropdownRef}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
            <input
              type="text"
              placeholder={`Search ${categoryName.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
                setShowSuggestions(true);
              }}
              onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
              className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800"
              autoComplete="off"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSuggestions(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {/* Search Suggestions Dropdown */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
                {searchSuggestions.map((listing) => (
                  <li key={listing.id}>
                    <button
                      type="button"
                      onMouseDown={() => selectListing(listing)}
                      className="w-full text-left px-4 py-3 hover:bg-orange-50 flex items-start gap-3 transition border-b border-gray-100 last:border-0"
                    >
                      <Building2 className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 text-sm truncate">
                            {listing.name}
                          </span>
                          {listing.verified && (
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{listing.location.city}</span>
                          {listing.rating && (
                            <>
                              <span className="text-gray-300">•</span>
                              <div className="flex items-center gap-0.5">
                                <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                                <span className="text-xs text-gray-600">{listing.rating}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800"
              >
                <option value="">All Cities</option>
                {locations
                  .sort((a, b) => a.city.localeCompare(b.city))
                  .map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.city}, {loc.state}
                    </option>
                  ))}
              </select>
            </div>

            {/* Quick Filters */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Filters
              </label>
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => {
                      setVerifiedOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="w-4 h-4 accent-orange-500 rounded"
                  />
                  <span className="text-sm text-gray-700">Verified Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => {
                      setFeaturedOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="w-4 h-4 accent-orange-500 rounded"
                  />
                  <span className="text-sm text-gray-700">Featured Only</span>
                </label>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="ml-auto text-sm text-orange-600 hover:text-orange-700 font-semibold underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredListings.length}</span>{' '}
            {filteredListings.length === 1 ? 'company' : 'companies'} found
            {selectedLocation && (
              <> in {locations.find((l) => l.id === selectedLocation)?.city}</>
            )}
          </p>
          {totalPages > 1 && (
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>
      </div>

      {/* Listings Grid */}
      {filteredListings.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {paginatedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => {
                  setCurrentPage(Math.max(1, currentPage - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      currentPage === pageNum
                        ? 'bg-orange-500 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => {
                  setCurrentPage(Math.min(totalPages, currentPage + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No companies found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={clearAllFilters}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-medium"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* City Quick Links Sidebar (optional) */}
      {locations.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Browse by City</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {locations
              .filter((loc) => (locationCounts.get(loc.id) || 0) > 0)
              .sort((a, b) => (locationCounts.get(b.id) || 0) - (locationCounts.get(a.id) || 0))
              .slice(0, 12)
              .map((loc) => (
                <Link
                  key={loc.id}
                  href={`/${loc.city.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm text-orange-600 hover:underline flex justify-between items-center"
                >
                  <span>{loc.city}</span>
                  <span className="text-xs text-gray-400 ml-2">
                    ({locationCounts.get(loc.id) || 0})
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
