'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ListingCard from '@/components/ListingCard';
import { Search, ChevronDown, X, Building2, MapPin, Star } from 'lucide-react';

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
  location: { id: string; city: string; state: string };
  category: { id: string; name: string; slug: string };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  initialListings: Listing[];
  categories: Category[];
  cityName: string;
}

export default function CityClient({ initialListings, categories, cityName }: Props) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
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
          l.category.name.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((l) => l.category.id === selectedCategory);
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
  }, [initialListings, searchQuery, selectedCategory, verifiedOnly, featuredOnly]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setVerifiedOnly(false);
    setFeaturedOnly(false);
  };

  const hasActiveFilters = searchQuery || selectedCategory || verifiedOnly || featuredOnly;

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];

    return initialListings
      .filter(l =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 8);
  }, [searchQuery, initialListings]);

  const selectListing = (listing: Listing) => {
    router.push(`/listing/${listing.slug}`);
  };

  return (
    <div>
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar with Autocomplete */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="relative" ref={searchDropdownRef}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
            <input
              type="text"
              placeholder={`Search companies in ${cityName}...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
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
                          <span className="text-xs text-gray-500">{listing.category.name}</span>
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
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
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
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 accent-orange-500 rounded"
                  />
                  <span className="text-sm text-gray-700">Verified Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
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
            {selectedCategory && (
              <> in {categories.find((c) => c.id === selectedCategory)?.name}</>
            )}
          </p>
        </div>
      </div>

      {/* Listings Grid */}
      {filteredListings.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
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
    </div>
  );
}
