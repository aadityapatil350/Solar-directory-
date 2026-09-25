'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ListingRow from '@/components/ui/ListingRow';
import { Search, X, CheckCircle } from 'lucide-react';

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
      result = result.filter((l) => l.category.id === selectedCategory || l.category.slug === selectedCategory);
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

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Input with Autocomplete */}
        <div className="relative" ref={searchDropdownRef}>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-2 pointer-events-none stroke-[2]" />
          <input
            type="text"
            placeholder={`Search ${cityName} solar companies by name or service...`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
            className="w-full h-12 pl-10 pr-10 border border-line rounded-sm bg-paper text-ink text-sm placeholder:text-ink-2/60 focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSuggestions(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-2 hover:text-ink"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Autocomplete dropdown */}
          {showSuggestions && searchQuery.length >= 2 && (
            <ul className="absolute z-30 left-0 right-0 top-full mt-1 bg-paper border border-line rounded-sm shadow-sm max-h-60 overflow-y-auto divide-y divide-line">
              {filteredListings.slice(0, 6).map((listing) => (
                <li key={listing.id}>
                  <button
                    type="button"
                    onMouseDown={() => {
                      router.push(`/listing/${listing.slug}`);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-wash flex items-center justify-between text-xs text-ink transition-colors"
                  >
                    <span className="font-medium truncate">{listing.name}</span>
                    <span className="text-ink-2 shrink-0 ml-2">{listing.category.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-body">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('')}
              className={`h-8 px-3 rounded-sm border transition-colors ${
                !selectedCategory
                  ? 'border-ink bg-ink text-paper font-medium'
                  : 'border-line text-ink hover:bg-wash'
              }`}
            >
              All ({initialListings.length})
            </button>

            {categories.slice(0, 5).map((cat) => {
              const active = selectedCategory === cat.id || selectedCategory === cat.slug;
              const count = initialListings.filter((l) => l.category.id === cat.id || l.category.slug === cat.slug).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(active ? '' : cat.id)}
                  className={`h-8 px-3 rounded-sm border transition-colors ${
                    active
                      ? 'border-ink bg-ink text-paper font-medium'
                      : 'border-line text-ink hover:bg-wash'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer text-ink select-none">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-ink rounded-sm"
              />
              <span>Verified only</span>
            </label>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-ink underline hover:text-ink/70"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count & Directory Rows List */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-line text-xs text-ink-2 font-body">
          <span>
            Showing <strong className="text-ink font-semibold">{filteredListings.length}</strong> {filteredListings.length === 1 ? 'solar company' : 'solar companies'} in {cityName}
          </span>
          <span className="text-[11px]">Public register view</span>
        </div>

        {filteredListings.length > 0 ? (
          <div className="border-t border-line">
            {filteredListings.map((listing) => (
              <ListingRow
                key={listing.id}
                listing={{
                  name: listing.name,
                  slug: listing.slug,
                  city: listing.location.city,
                  state: listing.location.state,
                  category: listing.category.name,
                  rating: listing.rating,
                  reviews: listing.reviews,
                  phone: listing.phone,
                  website: listing.website,
                  verified: listing.verified,
                  featured: listing.featured,
                  description: listing.description,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-line rounded-sm p-10 text-center bg-wash my-6">
            <p className="text-base font-semibold text-ink">No solar companies matched your filter</p>
            <p className="text-xs text-ink-2 mt-1">Try clearing search terms or category filters</p>
            <button
              onClick={clearAllFilters}
              className="mt-4 inline-flex items-center justify-center h-9 px-4 border border-ink text-ink text-xs font-medium rounded-sm hover:bg-paper transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
