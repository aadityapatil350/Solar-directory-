'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import ListingCard from '@/components/ListingCard';
import Filter from '@/components/Filter';
import LeadForm from '@/components/LeadForm';
import CalcPopup from '@/components/CalcPopup';
import { CATEGORIES } from '@/lib/categories';
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
  avgRating: number | null;
  cities: number;
  perCategoryCounts?: Record<string, number>;
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
          fetch('/api/listings?take=4000', { cache: 'no-store' }),
          fetch('/api/categories', { cache: 'no-store' }),
          fetch('/api/locations', { cache: 'no-store' }),
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

      {/* Hero Section - Vercel Design Aesthetic */}
      <section className="relative bg-zinc-950 text-white border-b border-zinc-800 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 py-16 sm:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3.5 py-1.5 rounded-full mb-5 text-xs font-semibold">
              <Shield className="h-3.5 w-3.5 text-emerald-400" />
              <span>India&apos;s Premier Solar Directory &amp; PM Surya Ghar Portal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight text-white">
              Find <span className="text-emerald-400">Verified</span> Solar Installers
              <br />Near You in Minutes
            </h1>

            <p className="text-base sm:text-lg md:text-xl mb-6 text-zinc-400 font-normal max-w-2xl mx-auto">
              Compare transparent quotes from {stats.verified}+ verified solar EPCs &amp; dealers across {stats.cities}+ Indian cities
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>100% Free Site Feasibility</span>
              </div>
              <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>PM Surya Ghar DBT Eligible</span>
              </div>
              <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>MNRE ALMM Approved Panels</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-xl border border-zinc-200/90 p-5 sm:p-6 max-w-3xl mx-auto text-left">
              <SearchBar onSearch={handleSearch} locations={locations} listings={listings} />

              {/* Location Filter */}
              <div className="mt-4 pt-4 border-t border-zinc-100">
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                  Or select your city directly:
                </label>
                <select
                  value={filterLocationId || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFilterLocationId(val || null);
                    setCurrentPage(1);
                  }}
                  className="w-full p-2.5 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 text-zinc-900 bg-white text-sm"
                >
                  <option value="">All 78+ Cities in India</option>
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
            <div className="flex justify-center gap-2 flex-wrap mt-5 mb-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="text-xs px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/90 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors whitespace-nowrap"
                >
                  {cat.icon} {cat.shortLabel}
                </Link>
              ))}
            </div>

            {/* Quick Links */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-zinc-400">
              <span>Popular Hubs:</span>
              <Link href="/mumbai" className="text-zinc-200 hover:text-emerald-400 underline font-medium transition">
                Mumbai
              </Link>
              <Link href="/delhi" className="text-zinc-200 hover:text-emerald-400 underline font-medium transition">
                Delhi
              </Link>
              <Link href="/bangalore" className="text-zinc-200 hover:text-emerald-400 underline font-medium transition">
                Bangalore
              </Link>
              <Link href="/pune" className="text-zinc-200 hover:text-emerald-400 underline font-medium transition">
                Pune
              </Link>
              <Link href="/tools/solar-subsidy-calculator" className="text-emerald-400 hover:text-emerald-300 font-semibold transition ml-2">
                Calculate Subsidy (₹78k) →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators - Social Proof */}
      <section className="bg-white border-y border-zinc-200 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-2.5">
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center border border-zinc-200">
                  <Building2 className="h-6 w-6 text-zinc-800" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">{stats.totalListings.toLocaleString()}+</div>
              <div className="text-xs sm:text-sm text-zinc-600 font-medium mt-1">Solar Companies</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2.5">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-200/70">
                  <BadgeCheck className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">{stats.verified.toLocaleString()}+</div>
              <div className="text-xs sm:text-sm text-zinc-600 font-medium mt-1">Verified Installers</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2.5">
                <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center border border-sky-200/70">
                  <MapPin className="h-6 w-6 text-sky-600" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">{stats.cities}+</div>
              <div className="text-xs sm:text-sm text-zinc-600 font-medium mt-1">Cities Covered</div>
            </div>
            {stats.avgRating && (
              <div className="text-center">
                <div className="flex justify-center mb-2.5">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-200/70">
                    <Star className="h-6 w-6 text-amber-500 fill-amber-400" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">{stats.avgRating}</div>
                <div className="text-xs sm:text-sm text-zinc-600 font-medium mt-1">Avg Google Rating</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-12 px-6 bg-zinc-50/60 border-b border-zinc-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">Simplified Solar</span>
            <h2 className="text-2xl font-bold text-zinc-900 mt-2 mb-1">How GoSolarIndex Works</h2>
            <p className="text-sm text-zinc-600">
              Get transparent solar quotes & PM Surya Ghar subsidy assistance in 4 simple steps
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Select your city",
                desc: "Choose from 78+ cities or calculate your rooftop subsidy potential directly.",
              },
              {
                step: "02",
                title: "Compare installers",
                desc: "Filter ALMM & DCR certified companies with verified Google reviews.",
              },
              {
                step: "03",
                title: "Request free quotes",
                desc: "Connect directly with up to 3 vetted installers for site feasibility.",
              },
              {
                step: "04",
                title: "Claim DBT subsidy",
                desc: "Install panels and get up to ₹78,000 deposited straight into your bank account.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-zinc-200/80 shadow-xs text-left">
                <div className="text-xs font-bold font-mono text-zinc-400 mb-2">
                  {item.step}
                </div>
                <div className="text-sm font-semibold text-zinc-900 mb-1.5">{item.title}</div>
                <div className="text-xs text-zinc-600 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-12 bg-white border-b border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award className="h-5 w-5 text-amber-500" />
                <h2 className="text-2xl font-bold text-zinc-900">Featured Solar Partners</h2>
              </div>
              <p className="text-sm text-zinc-600">Top-rated verified installers serving residential & commercial rooftops</p>
            </div>
            <Link
              href="/categories"
              className="hidden md:flex items-center gap-1.5 text-zinc-700 hover:text-zinc-900 text-sm font-medium transition"
            >
              <span>View All Categories</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Featured Grid */}
          {(() => {
            const featured = listings.filter((l) => l.featured).slice(0, 5);
            const emptySlots = Math.max(0, 5 - featured.length);
            return (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-2 max-w-7xl mx-auto">
                {featured.map((l) => (
                  <Link
                    key={l.id}
                    href={`/listing/${l.slug}`}
                    className="group relative border border-zinc-200/90 bg-white rounded-xl p-4 hover:border-zinc-400 hover:shadow-sm transition-all text-center flex flex-col items-center justify-center gap-2 min-h-[140px]"
                  >
                    <div className="absolute top-2 right-2">
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-amber-200">
                        <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" /> TOP
                      </span>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-sm font-bold text-zinc-800">
                      {l.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="font-semibold text-zinc-900 group-hover:text-emerald-700 text-xs leading-snug transition-colors line-clamp-2">
                      {l.name}
                    </div>
                    <div className="text-[11px] text-zinc-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-zinc-400" />
                      {l.location.city}
                    </div>
                    {l.rating && l.rating > 0 ? (
                      <div className="flex items-center gap-1 text-[11px] text-amber-700 font-medium">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {l.rating}
                      </div>
                    ) : null}
                  </Link>
                ))}
                {Array.from({ length: emptySlots }).map((_, i) => (
                  <Link
                    key={`empty-${i}`}
                    href="/for-installers"
                    className="group border border-dashed border-zinc-300 bg-zinc-50/50 rounded-xl p-4 hover:border-zinc-400 hover:bg-zinc-50 transition-all text-center flex flex-col items-center justify-center gap-2 min-h-[140px]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 group-hover:text-zinc-900 transition-colors">
                      <Star className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="font-medium text-zinc-700 text-xs leading-snug">
                      Your Company Here
                    </div>
                    <span className="text-[11px] text-emerald-700 font-semibold group-hover:underline">
                      Get Featured →
                    </span>
                  </Link>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Browse by Category Section */}
      <section className="py-12 px-6 border-b border-zinc-200 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-zinc-900">Browse by Category</h2>
            <Link href="/categories" className="text-xs sm:text-sm text-emerald-700 hover:text-emerald-800 font-medium">
              All categories →
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mb-6">
            Find the right specialized solar partner for your residential or commercial project
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => {
              const count = initialStats.perCategoryCounts?.[cat.slug];
              return (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="flex items-center gap-3 border border-zinc-200/90 rounded-xl p-3.5 hover:border-zinc-400 hover:shadow-xs transition-all group bg-white"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-lg flex-shrink-0 border border-zinc-200">
                    {cat.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900 group-hover:text-emerald-700 transition-colors">
                      {cat.label}
                    </div>
                    {typeof count === 'number' && (
                      <div className="text-xs text-zinc-500 mt-0.5">
                        {count.toLocaleString()} companies
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Cities Section */}
      <section className="py-12 px-6 border-b border-zinc-200 bg-zinc-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-zinc-900">Popular Solar Hubs</h2>
            <Link href="/locations" className="text-xs sm:text-sm text-emerald-700 hover:text-emerald-800 font-medium">
              View all 78+ cities →
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mb-6">
            Explore verified local installers & DISCOM net-metering rules by city
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
                className="flex items-center justify-between border border-zinc-200/90 rounded-xl px-4 py-3 bg-white hover:border-zinc-400 hover:shadow-xs transition-all group"
              >
                <div>
                  <div className="text-sm font-semibold text-zinc-900 group-hover:text-emerald-700 transition-colors">
                    {item.city}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">{item.state}</div>
                </div>
                <span className="text-zinc-400 group-hover:text-zinc-800 transition-colors text-sm">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Listings Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-8 bg-white rounded-2xl border border-zinc-200/90 p-6 shadow-xs">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 mb-1.5 tracking-tight">
                    {filterLocationId ? (
                      <>
                        Solar Companies in{' '}
                        <span className="text-emerald-700">
                          {locations.find((l) => l.id === filterLocationId)?.city}
                        </span>
                      </>
                    ) : (
                      'All Solar Companies in India'
                    )}
                  </h2>
                  <p className="text-zinc-600 text-sm">
                    {(() => {
                      const hasFilter = !!(filterLocationId || filterCategoryId || filterVerified || filterFeatured || searchQuery || searchLocation);
                      const count = hasFilter ? filteredListings.length : stats.totalListings;
                      return `${count.toLocaleString()} verified installers found`;
                    })()}
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
                    className="text-xs sm:text-sm text-zinc-600 hover:text-zinc-900 font-semibold underline"
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
                              className={`px-3.5 py-2 rounded-lg font-medium text-xs sm:text-sm transition ${
                                currentPage === pageNum
                                  ? 'bg-zinc-900 text-white'
                                  : 'border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        <button
                          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="p-2 rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                          <ChevronRight className="h-4 w-4" />
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

      {/* CTA Section - Vercel Dark Card */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-3xl bg-zinc-950 text-white border border-zinc-800 p-8 sm:p-14 text-center relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                ⚡ Direct Bank Transfer (DBT) Scheme
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight text-white">
                Claim Up to ₹78,000 Central Solar Subsidy
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Calculate your custom system size, monthly electricity savings, and connect with top-rated DISCOM-empannelled installers in your city.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/tools/solar-subsidy-calculator"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition shadow-sm"
                >
                  Open Subsidy & Payback Calculator →
                </Link>
                <Link
                  href="/for-installers"
                  className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 px-7 py-3.5 rounded-xl font-medium text-sm transition"
                >
                  Join as Verified Installer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-zinc-50/60 border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-zinc-950 mb-2 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-sm text-zinc-600 mb-10">
              Key guidelines on rooftop solar installation, net metering, and DBT subsidy in India
            </p>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-zinc-200/90 overflow-hidden shadow-xs">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-zinc-50 transition"
                  >
                    <span className="font-semibold text-sm text-zinc-900 pr-6">{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform ${
                        openFaq === i ? 'rotate-180 text-zinc-900' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3">
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
      <section className="py-12 bg-white border-t border-zinc-200">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            B2B Solar Network
          </div>
          <h3 className="text-2xl font-bold text-zinc-950 mb-2">
            Are you a Solar EPC or Installation Company?
          </h3>
          <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
            Join India&apos;s verified solar network. Claim your company profile, showcase your portfolio, and receive verified homeowner leads in your service cities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/for-installers"
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3 rounded-xl font-semibold text-sm transition shadow-sm"
            >
              Claim Listing or Register Free
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQPage Schema — plain <script> so it renders in the SSR HTML */}
      <script
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
