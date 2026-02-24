'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ListingCard from '@/components/ListingCard';
import Filter from '@/components/Filter';
import { Zap, ShieldCheck, Star, TrendingUp } from 'lucide-react';

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
  location: {
    id: string;
    city: string;
    state: string;
  };
  category: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Location {
  id: string;
  city: string;
  state: string;
}

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [listingsRes, categoriesRes, locationsRes] = await Promise.all([
          fetch('/api/listings'),
          fetch('/api/categories'),
          fetch('/api/locations'),
        ]);

        const listingsData = await listingsRes.json();
        const categoriesData = await categoriesRes.json();
        const locationsData = await locationsRes.json();

        setListings(listingsData);
        setCategories(categoriesData);
        setLocations(locationsData);
        setFilteredListings(listingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (query: string, location: string) => {
    let filtered = [...listings];
    
    if (query) {
      filtered = filtered.filter(
        (listing) =>
          listing.name.toLowerCase().includes(query.toLowerCase()) ||
          (listing.description?.toLowerCase().includes(query.toLowerCase())) ||
          (listing.address?.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    if (location) {
      filtered = filtered.filter(
        (listing) =>
          listing.location.city.toLowerCase().includes(location.toLowerCase()) ||
          listing.location.state.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    setFilteredListings(filtered);
  };

  const handleFilter = (categoryId: string | null, locationId: string | null) => {
    let filtered = [...listings];
    
    if (categoryId) {
      filtered = filtered.filter((listing) => listing.category.id === categoryId);
    }
    
    if (locationId) {
      filtered = filtered.filter((listing) => listing.location.id === locationId);
    }
    
    setFilteredListings(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
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

      {/* Stats Section */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Zap className="h-8 w-8 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Verified Listings</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <ShieldCheck className="h-8 w-8 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Star className="h-8 w-8 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">4.5+</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">10k+</div>
              <div className="text-sm text-gray-600">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <Filter 
                categories={categories}
                locations={locations}
                onFilter={handleFilter}
              />
            </div>
            
            {/* Listings */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {filteredListings.length > 0 ? 'Featured Listings' : 'No listings found'}
              </h2>
              
              {filteredListings.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-12 text-center">
                  <p className="text-gray-600 mb-4">
                    No listings found. Try adjusting your search or filters.
                  </p>
                  <button 
                    onClick={() => setFilteredListings(listings)}
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
              <h3 className="font-bold text-lg mb-4">Solar India</h3>
              <p className="text-gray-400 text-sm">
                Your trusted directory for finding best solar installers and service providers across India.
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
                <li><a href="#" className="hover:text-white transition">Solar Subsidy Guide</a></li>
                <li><a href="#" className="hover:text-white transition">Installation Cost Calculator</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Email: contact@solarindia.com</li>
                <li>Phone: +91 98765 43210</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2025 Solar India. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
