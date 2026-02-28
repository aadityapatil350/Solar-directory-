'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ListingCard from '@/components/ListingCard';
import Filter from '@/components/Filter';
import LeadForm from '@/components/LeadForm';
import CalcPopup from '@/components/CalcPopup';
import { Zap, ShieldCheck, Star, TrendingUp, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface Listing {
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
  location: { id: string; city: string; state: string };
  category: { id: string; name: string };
}

interface Category { id: string; name: string; slug: string }
interface Location { id: string; city: string; state: string }

const PAGE_SIZE = 12;

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [stats, setStats] = useState({ totalListings: 0, featured: 0, verified: 0, avgRating: 0, cities: 0 });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Active filters
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [filterCategoryId, setFilterCategoryId] = useState<string | null>(null);
  const [filterLocationId, setFilterLocationId] = useState<string | null>(null);
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterFeatured, setFilterFeatured] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [listingsRes, categoriesRes, locationsRes] = await Promise.all([
          fetch('/api/listings?take=200'),
          fetch('/api/categories'),
          fetch('/api/locations'),
        ]);
        const listingsData: Listing[] = await listingsRes.json();
        const categoriesData: Category[] = await categoriesRes.json();
        const locationsData: Location[] = await locationsRes.json();

        setListings(Array.isArray(listingsData) ? listingsData : []);
        setCategories(categoriesData);
        setLocations(locationsData);

        const total = listingsData.length;
        const totalRating = listingsData.reduce((s, l) => s + (l.rating || 0), 0);
        setStats({
          totalListings: total,
          featured: listingsData.filter((l) => l.featured).length,
          verified: listingsData.filter((l) => l.verified).length,
          avgRating: total > 0 ? Math.round((totalRating / total) * 10) / 10 : 0,
          cities: locationsData.length,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Derived filtered list
  const filteredListings = useMemo(() => {
    let result = [...listings];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.description?.toLowerCase().includes(q) ||
          l.address?.toLowerCase().includes(q)
      );
    }

    if (searchLocation) {
      const loc = searchLocation.toLowerCase();
      result = result.filter(
        (l) =>
          l.location.city.toLowerCase().includes(loc) ||
          l.location.state.toLowerCase().includes(loc)
      );
    }

    if (filterCategoryId) {
      result = result.filter((l) => l.category.id === filterCategoryId);
    }

    if (filterLocationId) {
      result = result.filter((l) => l.location.id === filterLocationId);
    }

    if (filterVerified) {
      result = result.filter((l) => l.verified);
    }

    if (filterFeatured) {
      result = result.filter((l) => l.featured);
    }

    return result;
  }, [listings, searchQuery, searchLocation, filterCategoryId, filterLocationId, filterVerified, filterFeatured]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredListings.length / PAGE_SIZE));
  const paginated = filteredListings.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleSearch(query: string, location: string) {
    setSearchQuery(query);
    setSearchLocation(location);
    setCurrentPage(1);
  }

  function handleFilter(
    categoryId: string | null,
    locationId: string | null,
    verifiedOnly: boolean,
    featuredOnly: boolean
  ) {
    setFilterCategoryId(categoryId);
    setFilterLocationId(locationId);
    setFilterVerified(verifiedOnly);
    setFilterFeatured(featuredOnly);
    setCurrentPage(1);
  }

  function clearFilters() {
    setSearchQuery('');
    setSearchLocation('');
    setFilterCategoryId(null);
    setFilterLocationId(null);
    setFilterVerified(false);
    setFilterFeatured(false);
    setCurrentPage(1);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CalcPopup />
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Best Solar Installers in India
            </h1>
            <p className="text-xl mb-8 text-orange-100">
              Solar panel installers, dealers, and service providers near you. Compare prices, read reviews, go solar today!
            </p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-2"><Zap className="h-8 w-8 text-orange-500" /></div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalListings > 0 ? `${stats.totalListings}+` : '89+'}</div>
              <div className="text-sm text-gray-600">Total Listings</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2"><ShieldCheck className="h-8 w-8 text-orange-500" /></div>
              <div className="text-3xl font-bold text-gray-900">{stats.featured || '10+'}</div>
              <div className="text-sm text-gray-600">Featured Companies</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2"><Star className="h-8 w-8 text-orange-500" /></div>
              <div className="text-3xl font-bold text-gray-900">{stats.verified || '50+'}</div>
              <div className="text-sm text-gray-600">Verified Companies</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2"><MapPin className="h-8 w-8 text-orange-500" /></div>
              <div className="text-3xl font-bold text-gray-900">{stats.cities || '10'}</div>
              <div className="text-sm text-gray-600">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2"><TrendingUp className="h-8 w-8 text-orange-500" /></div>
              <div className="text-3xl font-bold text-gray-900">{stats.avgRating || '4.5'}</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Partners strip */}
      {!loading && listings.filter((l) => l.featured).length > 0 && (
        <section className="bg-white border-b py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-400" />
                <h2 className="text-lg font-bold text-gray-900">Featured Solar Companies</h2>
              </div>
              <span className="text-sm text-orange-600 font-medium bg-orange-50 px-3 py-1 rounded-full">
                Premium Partners
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {listings
                .filter((l) => l.featured)
                .slice(0, 4)
                .map((listing) => (
                  <a
                    key={listing.id}
                    href={`/listing/${listing.slug}`}
                    className="group relative border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 hover:border-orange-400 hover:shadow-md transition-all"
                  >
                    <div className="absolute top-2 right-2">
                      <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                        ⭐ Featured
                      </span>
                    </div>
                    <div className="font-semibold text-gray-900 text-sm leading-tight pr-12 group-hover:text-orange-600 transition-colors">
                      {listing.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{listing.category.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {listing.location.city}
                    </div>
                    {listing.rating != null && listing.rating > 0 && (
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium text-gray-700">{listing.rating}</span>
                      </div>
                    )}
                  </a>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Filter categories={categories} locations={locations} onFilter={handleFilter} />
              <LeadForm />
            </div>

            {/* Listings */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {loading
                    ? 'Loading solar companies...'
                    : filteredListings.length > 0
                    ? `${filteredListings.length} Solar Companies Found`
                    : 'No listings found'}
                </h2>
                {!loading && (filterCategoryId || filterLocationId || filterVerified || filterFeatured || searchQuery) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-orange-600 hover:text-orange-700 underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {loading ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                          <div className="h-3 bg-gray-200 rounded w-1/2" />
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-5/6" />
                      </div>
                      <div className="mt-4 flex gap-2">
                        <div className="h-8 bg-gray-200 rounded-lg w-24" />
                        <div className="h-8 bg-gray-200 rounded-lg w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : paginated.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {paginated.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-10">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-200 hover:border-orange-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
                      >
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                        .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                          if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('...');
                          acc.push(p);
                          return acc;
                        }, [])
                        .map((item, idx) =>
                          item === '...' ? (
                            <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">…</span>
                          ) : (
                            <button
                              key={item}
                              onClick={() => setCurrentPage(item as number)}
                              className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                                currentPage === item
                                  ? 'bg-orange-500 text-white'
                                  : 'border border-gray-200 text-gray-700 hover:border-orange-400'
                              }`}
                            >
                              {item}
                            </button>
                          )
                        )}

                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-200 hover:border-orange-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
                      >
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  )}
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filteredListings.length)} of {filteredListings.length} results
                  </p>
                </>
              ) : (
                <div className="bg-white rounded-xl p-12 text-center">
                  <p className="text-gray-600 mb-4">No listings found. Try adjusting your search or filters.</p>
                  <button
                    onClick={clearFilters}
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">GoSolarIndex</h3>
              <p className="text-gray-400 text-sm">
                India's trusted directory for finding the best solar installers and service providers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/categories" className="hover:text-white transition">Categories</Link></li>
                <li><Link href="/locations" className="hover:text-white transition">Locations</Link></li>
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/blog" className="hover:text-white transition">Solar Blog</Link></li>
                <li><Link href="/installers/signup" className="hover:text-white transition">List Your Business</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing Plans</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Email: hello@gosolarindex.in</li>
                <li>Phone: +91 98765 43210</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2025 GoSolarIndex. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
