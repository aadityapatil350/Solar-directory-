'use client';

import { Search, MapPin, ChevronDown, X, Building2, Star } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Location { id: string; city: string; state: string }

interface Listing {
  id: string;
  name: string;
  slug: string;
  location: { city: string; state: string };
  category: { name: string };
  rating: number | null;
  verified: boolean;
}

interface Props {
  onSearch: (query: string, location: string) => void;
  locations?: Location[];
  listings?: Listing[];
}

export default function SearchBar({ onSearch, locations = [], listings = [] }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [openCity, setOpenCity] = useState(false);
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  // Filter cities by what user types
  const filteredCities = cityInput.length === 0
    ? locations
    : locations.filter(l =>
        l.city.toLowerCase().includes(cityInput.toLowerCase()) ||
        l.state.toLowerCase().includes(cityInput.toLowerCase())
      );

  // Filter listings for search suggestions
  const searchSuggestions = query.length < 2
    ? []
    : listings
        .filter(l =>
          l.name.toLowerCase().includes(query.toLowerCase()) ||
          l.category.name.toLowerCase().includes(query.toLowerCase()) ||
          l.location.city.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8); // Show max 8 suggestions

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target as Node)) {
        setOpenCity(false);
      }
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(e.target as Node)) {
        setOpenSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function selectCity(city: string) {
    setSelectedCity(city);
    setCityInput(city);
    setOpenCity(false);
  }

  function clearCity() {
    setSelectedCity('');
    setCityInput('');
  }

  function selectListing(listing: Listing) {
    // Navigate to listing page
    router.push(`/listing/${listing.slug}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOpenSuggestions(false);
    onSearch(query, selectedCity || cityInput);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Service / company search with autocomplete */}
        <div className="relative" ref={searchDropdownRef}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
          <input
            type="text"
            placeholder="Solar installer, dealer, inverter..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenSuggestions(true);
            }}
            onFocus={() => query.length >= 2 && setOpenSuggestions(true)}
            className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setOpenSuggestions(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Search Suggestions Dropdown */}
          {openSuggestions && searchSuggestions.length > 0 && (
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
                        <span className="text-gray-300">•</span>
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
              {listings.length > searchSuggestions.length && (
                <li>
                  <button
                    type="submit"
                    className="w-full text-center px-4 py-2.5 text-sm text-orange-600 hover:bg-orange-50 font-medium transition"
                  >
                    See all results for "{query}"
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>

        {/* City dropdown */}
        <div className="relative" ref={cityDropdownRef}>
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
          <input
            type="text"
            placeholder="Search city (e.g. Mumbai, Pune...)"
            value={cityInput}
            onChange={(e) => {
              setCityInput(e.target.value);
              setSelectedCity('');
              setOpenCity(true);
            }}
            onFocus={() => setOpenCity(true)}
            className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800"
            autoComplete="off"
          />
          {/* Clear button */}
          {cityInput ? (
            <button type="button" onClick={clearCity} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10">
              <X className="h-4 w-4" />
            </button>
          ) : (
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          )}

          {/* City Dropdown list */}
          {openCity && filteredCities.length > 0 && (
            <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
              {filteredCities.slice(0, 100).map((loc) => (
                <li key={loc.id}>
                  <button
                    type="button"
                    onMouseDown={() => selectCity(loc.city)}
                    className="w-full text-left px-4 py-2.5 hover:bg-orange-50 flex items-center gap-3 transition"
                  >
                    <MapPin className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                    <span className="font-medium text-gray-800 text-sm">{loc.city}</span>
                    <span className="text-gray-400 text-xs ml-auto">{loc.state}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-medium text-base"
      >
        Search Directory
      </button>
    </form>
  );
}
