import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ListingCard from '@/components/ListingCard';
import Filter from '@/components/Filter';
import { prisma } from '@/lib/prisma';
import { Zap, ShieldCheck, Star, TrendingUp } from 'lucide-react';

async function getListings() {
  return await prisma.listing.findMany({
    include: {
      category: true,
      location: true,
    },
    orderBy: [
      { featured: 'desc' },
      { verified: 'desc' },
      { rating: 'desc' },
    ],
    take: 20,
  });
}

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
}

async function getLocations() {
  return await prisma.location.findMany({
    orderBy: { city: 'asc' },
    take: 10,
  });
}

export default async function Home() {
  const listings = await getListings();
  const categories = await getCategories();
  const locations = await getLocations();

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
            <SearchBar onSearch={() => {}} />
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
                onFilter={() => {}}
              />
            </div>
            
            {/* Listings */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {listings.length > 0 ? 'Featured Listings' : 'No listings yet'}
              </h2>
              
              {listings.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-12 text-center">
                  <p className="text-gray-600 mb-4">
                    No listings available yet. Be the first to add your business!
                  </p>
                  <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
                    Add Your Business
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
                Your trusted directory for finding the best solar installers and service providers across India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/" className="hover:text-white transition">Home</a></li>
                <li><a href="/categories" className="hover:text-white transition">Categories</a></li>
                <li><a href="/locations" className="hover:text-white transition">Locations</a></li>
                <li><a href="/about" className="hover:text-white transition">About Us</a></li>
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
