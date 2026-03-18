'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import ListingCard from '@/components/ListingCard';
import Filter from '@/components/Filter';
import LeadForm from '@/components/LeadForm';
import CalcPopup from '@/components/CalcPopup';
import {
  Zap, ShieldCheck, Star, TrendingUp, MapPin, ChevronLeft, ChevronRight, ChevronDown,
  Award, CheckCircle, Users, Clock, Phone, Mail, Shield, BadgeCheck, Search, Building2
} from 'lucide-react';

const FAQS = [
  {
    q: 'How much does solar panel installation cost in India?',
    a: 'The cost of a residential solar system in India typically ranges from ₹50,000 to ₹1,50,000 for a 1 kW system. A 3 kW rooftop system suitable for most homes costs ₹1.5 lakh–₹2.5 lakh before subsidies. Under the PM Surya Ghar Yojana scheme, you can get a central government subsidy of ₹30,000 per kW (up to 2 kW) + ₹18,000 for the 3rd kW, making solar significantly cheaper.',
  },
  {
    q: 'How do I find a reliable solar installer near me?',
    a: 'Use GoSolarIndex to search for verified solar installers in your city. Filter by location, category (residential/commercial), and ratings. Always check Google ratings and review counts, ask for at least 3 quotes, verify the installer is empanelled with MNRE/DISCOM, and ask for a site visit before signing any agreement.',
  },
  {
    q: 'What is the PM Surya Ghar Yojana subsidy?',
    a: 'PM Surya Ghar Muft Bijli Yojana offers central government subsidies for rooftop solar: ₹30,000/kW for systems up to 2 kW, and ₹18,000 for the 3rd kW. The maximum subsidy is ₹78,000 for a 3 kW system. Apply through the National Portal for Rooftop Solar (pmsuryaghar.gov.in) with your DISCOM consumer number.',
  },
  {
    q: 'How long do solar panels last in India?',
    a: 'Quality solar panels (Tier 1 brands like Adani, Waaree, Vikram Solar, Renewsys) last 25–30 years with minimal degradation. Most panels come with a 25-year performance warranty guaranteeing at least 80% output. Solar inverters typically last 10–15 years. Regular cleaning and annual AMC (Annual Maintenance Contract) can extend the lifespan.',
  },
  {
    q: 'What is the payback period for solar in India?',
    a: 'In India, a rooftop solar system typically pays back in 4–7 years depending on your city, electricity tariff, and system size. With average electricity bills of ₹2,000–5,000/month, most homeowners see full payback in 5 years and enjoy free electricity for the remaining 20+ years of the system\'s life.',
  },
  {
    q: 'On-grid vs off-grid solar — which is better for Indian homes?',
    a: 'For homes with a stable grid connection, on-grid (grid-tied) solar is recommended. You can sell excess power back to the grid through net metering and avoid expensive battery costs. Off-grid systems with batteries make sense in areas with frequent power cuts or no grid access. Hybrid systems offer both grid-tied operation and battery backup.',
  },
  {
    q: 'How many solar panels do I need for my home?',
    a: 'A typical Indian household consuming 300–400 units/month needs a 3–4 kW solar system (9–12 panels). For a 1 BHK (150 units/month) you need 1–1.5 kW; for a 2 BHK (250 units/month) around 2.5 kW; for a 3 BHK+ (400+ units/month) around 4–5 kW. Use our solar calculator or get a site assessment from a listed installer.',
  },
  {
    q: 'Is net metering available across India?',
    a: 'Yes, net metering is available in all Indian states under MNRE guidelines. You can sell excess solar units to your DISCOM at a feed-in tariff. The process involves applying to your local electricity board (MSEDCL in Maharashtra, BESCOM in Karnataka, TSSPDCL in Telangana, etc.) after installation. Your empanelled installer should handle the net metering application.',
  },
];

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
  category: { id: string; name: string };
}

interface Category { id: string; name: string; slug: string }
interface Location { id: string; city: string; state: string }

export interface InitialStats {
  totalListings: number;
  featured: number;
  verified: number;
  avgRating: number;
  cities: number;
}

interface Props {
  initialStats: InitialStats;
  initialListings?: Listing[];
  initialCategories?: Category[];
  initialLocations?: Location[];
  children?: React.ReactNode;
}

const PAGE_SIZE = 12;

export default function HomeClient({ initialStats, initialListings = [], initialCategories = [], initialLocations = [], children }: Props) {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [stats, setStats] = useState<InitialStats>(initialStats);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [useClientRender, setUseClientRender] = useState(false);

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
          fetch('/api/listings?take=4000'),
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
          avgRating: total > 0 ? Math.round((totalRating / total) * 10) / 10 : initialStats.avgRating,
          cities: locationsData.length,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [initialStats.avgRating]);

  // Derived filtered list
  const filteredListings = useMemo(() => {
    let result = [...listings];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.description?.toLowerCase().includes(q) ||
          l.location.city.toLowerCase().includes(q)
      );
    }

    if (searchLocation) {
      const loc = searchLocation.toLowerCase();
      result = result.filter((l) => l.location.city.toLowerCase().includes(loc));
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

    // Deduplicate: same company may appear in multiple categories — keep best entry per phone
    const seen = new Map<string, Listing>();
    for (const l of result) {
      const key = l.phone ? l.phone.replace(/\s+/g, '') : l.name.toLowerCase();
      const existing = seen.get(key);
      if (!existing) {
        seen.set(key, l);
      } else {
        // Always prefer featured over non-featured; then higher rating; then more reviews
        const existingFeatured = existing.featured ? 1 : 0;
        const newFeatured = l.featured ? 1 : 0;
        const better =
          newFeatured > existingFeatured ||
          (newFeatured === existingFeatured && (l.rating ?? 0) > (existing.rating ?? 0)) ||
          (newFeatured === existingFeatured && (l.rating ?? 0) === (existing.rating ?? 0) && l.reviews > existing.reviews);
        if (better) seen.set(key, l);
      }
    }
    result = Array.from(seen.values());

    // Sort: featured first, then by rating, then by review count
    result.sort((a, b) => {
      if (b.featured !== a.featured) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      const ra = a.rating ?? 0;
      const rb = b.rating ?? 0;
      if (rb !== ra) return rb - ra;
      return b.reviews - a.reviews;
    });

    return result;
  }, [
    listings,
    searchQuery,
    searchLocation,
    filterCategoryId,
    filterLocationId,
    filterVerified,
    filterFeatured,
  ]);

  const paginatedListings = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredListings.slice(start, start + PAGE_SIZE);
  }, [filteredListings, currentPage]);

  const totalPages = Math.ceil(filteredListings.length / PAGE_SIZE);

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    setCurrentPage(1);
  };

  const handleFilterChange = (
    categoryId: string | null,
    locationId: string | null,
    verified: boolean,
    featured: boolean
  ) => {
    setFilterCategoryId(categoryId);
    setFilterLocationId(locationId);
    setFilterVerified(verified);
    setFilterFeatured(featured);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Section - Premium Design */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-700/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">India's Most Trusted Solar Directory</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Find <span className="text-yellow-200">Verified</span> Solar Installers
              <br />Near You in Minutes
            </h1>

            <p className="text-xl md:text-2xl mb-4 text-orange-50 font-light">
              Compare quotes from {stats.verified}+ verified solar companies across {stats.cities}+ cities
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="font-medium">100% Free Quotes</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="font-medium">PM Surya Ghar Eligible</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="font-medium">MNRE Approved</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-3xl mx-auto">
              <SearchBar onSearch={handleSearch} locations={locations} listings={listings} />

              {/* Location Filter - Yellow Pages Style */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or browse by location:
                </label>
                <select
                  value={filterLocationId || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFilterLocationId(val || null);
                    setCurrentPage(1);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                >
                  <option value="">All Cities in India</option>
                  {locations
                    .sort((a, b) => a.city.localeCompare(b.city))
                    .map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.city}, {location.state}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Quick Category Pills */}
            <div className="flex justify-center gap-2 flex-wrap mt-4 mb-2">
              {[
                { label: "🏠 Residential", href: "/categories/residential-solar-installers" },
                { label: "🏢 Commercial", href: "/categories/commercial-solar-installers" },
                { label: "🏭 Industrial", href: "/categories/industrial-solar" },
                { label: "🔋 Battery Storage", href: "/categories/battery-storage" },
                { label: "🔧 AMC / Service", href: "/categories/solar-amc-maintenance" },
                { label: "⚡ Inverter Only", href: "/categories/solar-inverter-specialists" },
              ].map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/30 bg-white/15 text-white hover:bg-white/25 transition-colors whitespace-nowrap"
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {/* Quick Links */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="text-orange-100">Popular:</span>
              <Link href="/mumbai" className="text-white hover:text-yellow-200 underline font-medium transition">
                Mumbai
              </Link>
              <Link href="/delhi" className="text-white hover:text-yellow-200 underline font-medium transition">
                Delhi
              </Link>
              <Link href="/bangalore" className="text-white hover:text-yellow-200 underline font-medium transition">
                Bangalore
              </Link>
              <Link href="/pune" className="text-white hover:text-yellow-200 underline font-medium transition">
                Pune
              </Link>
              <Link href="/subsidy-checker" className="text-white hover:text-yellow-200 underline font-medium transition">
                Check Subsidy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators - Social Proof */}
      <section className="bg-white border-y py-12 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                  <Building2 className="h-7 w-7 text-orange-600" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900">{stats.totalListings.toLocaleString()}+</div>
              <div className="text-sm text-gray-600 font-medium mt-1">Solar Companies</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <BadgeCheck className="h-7 w-7 text-green-600" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900">{stats.verified.toLocaleString()}+</div>
              <div className="text-sm text-gray-600 font-medium mt-1">Verified Installers</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-7 w-7 text-blue-600" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900">{stats.cities}+</div>
              <div className="text-sm text-gray-600 font-medium mt-1">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="h-7 w-7 text-yellow-600 fill-yellow-600" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900">{stats.avgRating}</div>
              <div className="text-sm text-gray-600 font-medium mt-1">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-10 px-6 bg-gray-50 border-b">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-medium text-center mb-1">How it works</h2>
          <p className="text-sm text-gray-600 text-center mb-8">
            Get solar quotes in 3 simple steps
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Search your city",
                desc: "Enter your city and select the type of solar installation you need",
              },
              {
                step: "2",
                title: "Compare installers",
                desc: "Browse verified installers with real ratings, photos and services",
              },
              {
                step: "3",
                title: "Request free quotes",
                desc: "Fill one form — get called back by up to 3 verified installers",
              },
              {
                step: "4",
                title: "Go solar!",
                desc: "Compare quotes, claim PM Surya Ghar subsidy and install",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 rounded-full border-2 border-orange-500 bg-orange-100 flex items-center justify-center text-orange-600 font-medium text-sm mx-auto mb-3">
                  {item.step}
                </div>
                <div className="text-sm font-medium mb-1">{item.title}</div>
                <div className="text-xs text-gray-600 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-12 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Award className="h-7 w-7 text-orange-600" />
                <h2 className="text-3xl font-bold text-gray-900">Featured Solar Partners</h2>
              </div>
              <p className="text-gray-600">Top-rated verified companies trusted by homeowners</p>
            </div>
            <Link
              href="/categories"
              className="hidden md:flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Featured Grid — real featured listings + empty slots */}
          {(() => {
            const featured = listings.filter((l) => l.featured).slice(0, 5);
            const emptySlots = Math.max(0, 5 - featured.length);
            return (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
                {featured.map((l) => (
                  <a
                    key={l.id}
                    href={`/listing/${l.slug}`}
                    className="group relative border-2 border-orange-300 bg-white rounded-xl p-4 hover:border-orange-500 hover:shadow-lg transition-all text-center flex flex-col items-center justify-center gap-2 min-h-[140px]"
                  >
                    <div className="absolute top-2 right-2">
                      <span className="bg-amber-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <Star className="h-2.5 w-2.5 fill-white" /> TOP
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-lg font-bold text-orange-600">
                      {l.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="font-semibold text-gray-800 group-hover:text-orange-600 text-sm leading-snug transition-colors line-clamp-2">
                      {l.name}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {l.location.city}
                    </div>
                    {l.rating && l.rating > 0 ? (
                      <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {l.rating}
                      </div>
                    ) : null}
                  </a>
                ))}
                {Array.from({ length: emptySlots }).map((_, i) => (
                  <a
                    key={`empty-${i}`}
                    href="mailto:adityabiz350@gmail.com?subject=Feature%20My%20Business%20on%20GoSolarIndex"
                    className="group border-2 border-dashed border-orange-200 bg-orange-50/40 rounded-xl p-4 hover:border-orange-400 hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-2 min-h-[140px]"
                  >
                    <div className="w-12 h-12 rounded-full bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center transition-colors">
                      <Star className="h-6 w-6 text-orange-400" />
                    </div>
                    <div className="font-medium text-gray-500 group-hover:text-orange-600 text-xs leading-snug transition-colors">
                      Your Company Here
                    </div>
                    <span className="text-xs text-orange-500 font-semibold group-hover:underline">
                      Get Featured →
                    </span>
                  </a>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Browse by Category Section */}
      <section className="py-10 px-6 border-b">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-medium mb-1">Browse by Category</h2>
          <p className="text-sm text-gray-600 mb-6">
            Find the right type of solar company for your needs
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: "🏠", name: "Residential Installers", count: "1,240+", href: "/categories/residential-installers" },
              { icon: "🏢", name: "Commercial Solar", count: "890+", href: "/categories/commercial-installers" },
              { icon: "🔋", name: "Solar Panel Dealers", count: "620+", href: "/categories/solar-dealers" },
              { icon: "⚡", name: "Solar Inverter Specialists", count: "410+", href: "/categories/inverter-specialists" },
              { icon: "🔧", name: "AMC & Maintenance", count: "380+", href: "/categories/maintenance-services" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 hover:border-orange-500 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-lg flex-shrink-0">
                  {cat.icon}
                </div>
                <div>
                  <div className="text-sm font-medium group-hover:text-orange-600 transition-colors">
                    {cat.name}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {cat.count} companies
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities Section */}
      <section className="py-10 px-6 border-b">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-medium">Popular Cities</h2>
            <Link href="/locations" className="text-sm text-orange-600 font-medium">
              View all 79+ cities →
            </Link>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Find solar installers in your city
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { city: "Mumbai", state: "Maharashtra", href: "/mumbai" },
              { city: "Delhi", state: "Delhi", href: "/delhi" },
              { city: "Bangalore", state: "Karnataka", href: "/bangalore" },
              { city: "Pune", state: "Maharashtra", href: "/pune" },
              { city: "Hyderabad", state: "Telangana", href: "/hyderabad" },
              { city: "Chennai", state: "Tamil Nadu", href: "/chennai" },
              { city: "Kolkata", state: "West Bengal", href: "/kolkata" },
              { city: "Ahmedabad", state: "Gujarat", href: "/ahmedabad" },
            ].map((item) => (
              <Link
                key={item.city}
                href={item.href}
                className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 hover:border-orange-500 transition-colors group"
              >
                <div>
                  <div className="text-sm font-medium group-hover:text-orange-600 transition-colors">
                    {item.city}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">{item.state}</div>
                </div>
                <span className="text-orange-600 text-sm">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Listings Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header - Yellow Pages Style */}
            <div className="mb-8 bg-white rounded-xl border-2 border-orange-200 p-6">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {filterLocationId ? (
                      <>
                        Solar Companies in{' '}
                        <span className="text-orange-600">
                          {locations.find((l) => l.id === filterLocationId)?.city}
                        </span>
                      </>
                    ) : (
                      'All Solar Companies in India'
                    )}
                  </h2>
                  <p className="text-gray-600">
                    {filteredListings.length.toLocaleString()} verified installers found
                    {filterCategoryId && (
                      <> • {categories.find((c) => c.id === filterCategoryId)?.name}</>
                    )}
                    {filterVerified && <> • Verified only</>}
                  </p>
                </div>

                {/* Active Filters */}
                {(filterLocationId || filterCategoryId || filterVerified || filterFeatured) && (
                  <button
                    onClick={() => {
                      setFilterCategoryId(null);
                      setFilterLocationId(null);
                      setFilterVerified(false);
                      setFilterFeatured(false);
                      setCurrentPage(1);
                    }}
                    className="text-sm text-orange-600 hover:text-orange-700 font-semibold underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                  <Filter
                    categories={categories}
                    locations={locations}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              {/* Listings Grid */}
              <div className="lg:col-span-3">
                {filteredListings.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No companies found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your filters or search in a different location
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSearchLocation('');
                        setFilterCategoryId(null);
                        setFilterLocationId(null);
                        setFilterVerified(false);
                        setFilterFeatured(false);
                        setCurrentPage(1);
                      }}
                      className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-medium"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      {paginatedListings.map((listing) => (
                        <ListingCard
                          key={listing.id}
                          listing={listing}
                        />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-10 flex items-center justify-center gap-2">
                        <button
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

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
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-4 py-2 rounded-lg font-medium transition ${
                                currentPage === pageNum
                                  ? 'bg-orange-500 text-white'
                                  : 'border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        <button
                          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 px-6 bg-gray-50 border-b">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-medium text-center mb-1">What homeowners say</h2>
          <p className="text-sm text-gray-600 text-center mb-8">
            Real reviews from verified solar buyers across India
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                stars: 5,
                text: "Found a great installer in Pune within 2 days. Got 3 quotes, saved ₹40,000 on installation. GoSolarIndex made it so easy.",
                name: "Rajesh M.",
                city: "Pune, Maharashtra",
              },
              {
                stars: 5,
                text: "Claimed PM Surya Ghar subsidy with help from the installer I found here. 5kW system installed in 10 days, very smooth process.",
                name: "Priya S.",
                city: "Bangalore, Karnataka",
              },
              {
                stars: 5,
                text: "Compared 4 commercial solar companies for our factory. The verified badge gave confidence. Went with the top-rated one.",
                name: "Suresh K.",
                city: "Surat, Gujarat",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-orange-500 text-sm mb-2">
                  {"★".repeat(t.stars)}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  "{t.text}"
                </p>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-gray-600">📍 {t.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Get Solar Quote */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Go Solar? Get Free Quotes Today
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Compare quotes from multiple verified installers. Save up to 30% on your solar installation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/solar-calculator"
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
              >
                Calculate Your Savings
              </Link>
              <Link
                href="/subsidy-checker"
                className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-400 transition border-2 border-white/30"
              >
                Check Subsidy Eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-10">
              Everything you need to know about solar in India
            </p>

            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition"
                  >
                    <span className="font-semibold text-gray-900 pr-8">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 shrink-0 transition-transform ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Are you a solar installer?
          </h3>
          <p className="text-gray-600 mb-6">
            Join India's fastest-growing solar directory and get quality leads
          </p>
          <Link
            href="/dashboard/login"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg"
          >
            List Your Business
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* FAQPage Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />

      <CalcPopup />
      <Footer />
    </div>
  );
}
