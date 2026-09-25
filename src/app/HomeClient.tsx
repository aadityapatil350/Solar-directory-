'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FactPanel from '@/components/ui/FactPanel';
import ListingRow, { ListingRowData } from '@/components/ui/ListingRow';
import {
  Search,
  MapPin,
  Building2,
  Sparkles,
  Calculator,
  IndianRupee,
  Users,
  Layers,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Star,
  CheckCircle2,
  Wrench,
  Zap,
} from 'lucide-react';

interface Location {
  id: string;
  city: string;
  state: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface HomeClientProps {
  initialStats: {
    totalListings: number;
    avgRating: number | null;
    cities: number;
    verified: number;
    featured: number;
    perCategoryCounts?: Record<string, number>;
  };
  initialListings: any[];
  initialCategories: Category[];
  initialLocations: Location[];
}

export default function HomeClient({
  initialStats,
  initialListings,
  initialCategories,
  initialLocations,
}: HomeClientProps) {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'featured' | 'verified'>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCity) {
      router.push(`/${selectedCity}`);
    } else if (selectedCategory) {
      router.push(`/categories/${selectedCategory}`);
    } else {
      router.push('/locations');
    }
  };

  // Indian States & UTs (36 names per DESIGN.md Section 6)
  const indianStates = [
    { name: 'Maharashtra', slug: 'maharashtra', tag: 'Top Solar Hub' },
    { name: 'Gujarat', slug: 'gujarat', tag: 'Highest Capacity' },
    { name: 'Rajasthan', slug: 'rajasthan', tag: 'Solar Park Leader' },
    { name: 'Karnataka', slug: 'karnataka', tag: 'Fast Net Metering' },
    { name: 'Tamil Nadu', slug: 'tamil-nadu', tag: 'Active Commercial' },
    { name: 'Uttar Pradesh', slug: 'uttar-pradesh', tag: 'High Surya Ghar Demand' },
    { name: 'Andaman & Nicobar', slug: 'andaman-and-nicobar' },
    { name: 'Andhra Pradesh', slug: 'andhra-pradesh' },
    { name: 'Arunachal Pradesh', slug: 'arunachal-pradesh' },
    { name: 'Assam', slug: 'assam' },
    { name: 'Bihar', slug: 'bihar' },
    { name: 'Chandigarh', slug: 'chandigarh' },
    { name: 'Chhattisgarh', slug: 'chhattisgarh' },
    { name: 'Dadra & Nagar Haveli', slug: 'dadra-and-nagar-haveli' },
    { name: 'Delhi', slug: 'delhi' },
    { name: 'Goa', slug: 'goa' },
    { name: 'Haryana', slug: 'haryana' },
    { name: 'Himachal Pradesh', slug: 'himachal-pradesh' },
    { name: 'Jammu & Kashmir', slug: 'jammu-and-kashmir' },
    { name: 'Jharkhand', slug: 'jharkhand' },
    { name: 'Kerala', slug: 'kerala' },
    { name: 'Ladakh', slug: 'ladakh' },
    { name: 'Lakshadweep', slug: 'lakshadweep' },
    { name: 'Madhya Pradesh', slug: 'madhya-pradesh' },
    { name: 'Manipur', slug: 'manipur' },
    { name: 'Meghalaya', slug: 'meghalaya' },
    { name: 'Mizoram', slug: 'mizoram' },
    { name: 'Nagaland', slug: 'nagaland' },
    { name: 'Odisha', slug: 'odisha' },
    { name: 'Puducherry', slug: 'puducherry' },
    { name: 'Punjab', slug: 'punjab' },
    { name: 'Sikkim', slug: 'sikkim' },
    { name: 'Telangana', slug: 'telangana' },
    { name: 'Tripura', slug: 'tripura' },
    { name: 'Uttarakhand', slug: 'uttarakhand' },
    { name: 'West Bengal', slug: 'west-bengal' },
  ];

  const toolsRows = [
    {
      name: 'PM Surya Ghar Subsidy Calculator',
      desc: 'Calculate central DBT subsidy up to ₹78,000 based on sanctioned load and rooftop area.',
      href: '/tools/solar-subsidy-calculator',
      badge: 'Official DBT Formula',
      icon: Calculator,
    },
    {
      name: 'Solar Savings & Payback Calculator',
      desc: 'Estimate monthly electricity bill offset, net investment after subsidy, and payback period.',
      href: '/tools/solar-savings-calculator',
      badge: 'State DISCOM Tariffs',
      icon: IndianRupee,
    },
    {
      name: 'Solar System Size Calculator',
      desc: 'Find whether 1 kW, 2 kW, 3 kW, or 5 kW matches your monthly unit consumption in kWh.',
      href: '/tools/solar-system-size-calculator',
      badge: 'Load Recommendation',
      icon: Zap,
    },
    {
      name: 'State Net Metering Rules & Guides',
      desc: 'Explore state DISCOM regulations, sanctioned load limits, gross vs. net metering, and banking rules.',
      href: '/discom',
      badge: 'All DISCOMs',
      icon: Building2,
    },
  ];

  const quickStartTiles = [
    {
      title: 'Check Your Subsidy',
      desc: 'Central DBT up to ₹78,000 calculations',
      href: '/tools/solar-subsidy-calculator',
      icon: Calculator,
      highlight: 'PM Surya Ghar',
    },
    {
      title: 'Know the Cost & ROI',
      desc: 'Installed price per kW for 1 kW to 10 kW',
      href: '/tools/solar-savings-calculator',
      icon: IndianRupee,
      highlight: '₹55k–65k/kW',
    },
    {
      title: 'Find Verified Installers',
      desc: 'Browse verified EPCs across 78+ cities',
      href: '/locations',
      icon: ShieldCheck,
      highlight: '1,700+ Listed',
    },
    {
      title: 'Compare Solar Brands',
      desc: 'ALMM List-I, efficiency, warranties',
      href: '/brands',
      icon: Layers,
      highlight: 'Waaree, Tata, Adani',
    },
    {
      title: 'Cleaning & Maintenance',
      desc: 'Rooftop panel cleaning kits and services',
      href: '/guides/best-solar-panel-cleaning-kits-india',
      icon: Wrench,
      highlight: 'AMC Providers',
    },
    {
      title: 'Solar for Business & C&I',
      desc: 'Commercial rooftop ROI and tax benefits',
      href: '/blog/commercial-solar-for-businesses-india-2026',
      icon: Building2,
      highlight: 'Accelerated Depr.',
    },
  ];

  // Filter listings based on active tab
  const displayedListings = initialListings.filter((item) => {
    if (filterType === 'featured') return item.featured;
    if (filterType === 'verified') return item.verified;
    return true;
  }).slice(0, 5);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <main className="max-w-content mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16">
        
        {/* ── HERO SECTION ── */}
        <section className="space-y-6 max-w-4xl">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sun-wash border border-sun/30 text-xs font-semibold text-ink font-body">
            <Sparkles className="h-3.5 w-3.5 text-sun fill-sun" />
            <span>India&apos;s Independent Rooftop Solar Register &amp; Subsidy Authority</span>
          </div>

          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-5xl tracking-tight text-ink leading-[1.15]">
            Go solar with accurate numbers and verified installers.
          </h1>

          <p className="text-base sm:text-lg text-ink-2 leading-relaxed font-body max-w-2xl">
            Compare MNRE and DISCOM-registered rooftop solar companies across 78+ cities. Calculate your PM Surya Ghar central subsidy up to ₹78,000 and DISCOM net-metering ROI.
          </p>

          {/* Search Console */}
          <div className="p-3 bg-paper border border-line rounded-lg shadow-sm">
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row items-stretch gap-2.5"
            >
              <div className="flex-1 relative">
                <MapPin className="h-4 w-4 text-ink-2 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full h-12 pl-10 pr-8 bg-wash border border-line rounded-sm text-ink text-sm font-body focus:outline-none focus:border-ink transition-colors"
                  aria-label="Select your city"
                >
                  <option value="">Select your city (78+ available)</option>
                  {initialLocations
                    .slice()
                    .sort((a, b) => a.city.localeCompare(b.city))
                    .map((loc) => (
                      <option key={loc.id} value={loc.city.toLowerCase().replace(/\s+/g, '-')}>
                        {loc.city}, {loc.state}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex-1 relative">
                <Building2 className="h-4 w-4 text-ink-2 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-12 pl-10 pr-8 bg-wash border border-line rounded-sm text-ink text-sm font-body focus:outline-none focus:border-ink transition-colors"
                  aria-label="What do you need"
                >
                  <option value="">What do you need? (Service category)</option>
                  {initialCategories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="h-12 px-7 bg-sun text-ink font-heading font-semibold text-sm rounded-sm hover:bg-sun-hover transition-colors focus:outline-none focus:ring-2 focus:ring-ink shrink-0 inline-flex items-center justify-center gap-2 shadow-xs"
              >
                <Search className="h-4 w-4" />
                <span>Search Installers</span>
              </button>
            </form>

            {/* Popular City Shortcuts */}
            <div className="flex items-center gap-2 flex-wrap pt-2.5 px-1 text-xs text-ink-2 font-body">
              <span className="font-semibold text-ink">Popular:</span>
              {[
                { name: 'Mumbai', slug: 'mumbai' },
                { name: 'Pune', slug: 'pune' },
                { name: 'Delhi', slug: 'delhi' },
                { name: 'Bangalore', slug: 'bangalore' },
                { name: 'Ahmedabad', slug: 'ahmedabad' },
                { name: 'Jaipur', slug: 'jaipur' },
                { name: 'Lucknow', slug: 'lucknow' },
              ].map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="hover:text-ink hover:underline underline-offset-2"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHERE DO YOU WANT TO START? (6 TILES) ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                Where do you want to start?
              </h2>
              <p className="text-xs sm:text-sm text-ink-2 font-body mt-0.5">
                Essential tools and verified registries to plan your solar transition
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {quickStartTiles.map((tile, idx) => {
              const Icon = tile.icon;
              return (
                <Link
                  key={idx}
                  href={tile.href}
                  className="p-5 bg-paper border border-line rounded-lg hover:border-ink/50 hover:shadow-sm transition-all block group relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-md bg-wash border border-line flex items-center justify-center text-ink group-hover:bg-sun-wash transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-ink bg-wash border border-line/60 px-2 py-0.5 rounded font-body">
                      {tile.highlight}
                    </span>
                  </div>
                  <div className="font-heading font-bold text-base text-ink mb-1 group-hover:text-amber-700 transition-colors flex items-center justify-between">
                    <span>{tile.title}</span>
                    <ChevronRight className="h-4 w-4 text-ink-2 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-xs text-ink-2 leading-relaxed font-body">
                    {tile.desc}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── FACT PANEL: "SOLAR IN INDIA TODAY" ── */}
        <section className="space-y-4">
          <div className="max-w-2xl">
            <FactPanel
              title="Solar in India today"
              subtitle="Verified MNRE & DISCOM Benchmark Data"
              rows={[
                { label: 'PM Surya Ghar maximum central subsidy', value: '₹78,000 (for 3 kW+)' },
                { label: 'Average residential installed cost', value: '₹55,000–65,000 / kW' },
                { label: 'Average annual generation per kW', value: '~1,400–1,550 kWh' },
                { label: 'Typical residential system payback', value: '3.5–4.5 years' },
                { label: 'Empanelled vendors on national portal', value: 'Over 10,000 registered' },
              ]}
              totalRow={{
                label: 'National PM Surya Ghar Target',
                value: '10 million households by 2027',
              }}
              sources={['Ministry of New and Renewable Energy (MNRE)', 'pmsuryaghar.gov.in', 'CEA']}
              calcExplanationUrl="/tools/solar-subsidy-calculator"
            />
          </div>
        </section>

        {/* ── DIRECTORY PREVIEW: VERIFIED SOLAR INSTALLERS ── */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-line pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-2 font-body">
                  Directory Preview · 1,700+ Listings
                </span>
              </div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                Verified Solar Installers
              </h2>
              <p className="text-xs sm:text-sm text-ink-2 font-body mt-0.5">
                Direct contact details for empanelled EPC contractors with verified net-metering track records.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Quick Filter Tabs */}
              <div className="flex rounded-sm border border-line p-0.5 bg-wash text-xs font-body font-medium">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1 rounded-sm transition ${
                    filterType === 'all' ? 'bg-paper text-ink shadow-xs font-semibold' : 'text-ink-2 hover:text-ink'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('featured')}
                  className={`px-3 py-1 rounded-sm transition ${
                    filterType === 'featured' ? 'bg-paper text-ink shadow-xs font-semibold' : 'text-ink-2 hover:text-ink'
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setFilterType('verified')}
                  className={`px-3 py-1 rounded-sm transition ${
                    filterType === 'verified' ? 'bg-paper text-ink shadow-xs font-semibold' : 'text-ink-2 hover:text-ink'
                  }`}
                >
                  Verified
                </button>
              </div>

              <Link
                href="/locations"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-ink border border-line px-3 py-1.5 rounded-sm hover:bg-wash transition font-body"
              >
                <span>Browse All 78+ Cities</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-3 pt-1">
            {displayedListings.map((listing: ListingRowData) => (
              <ListingRow key={listing.id} listing={listing} />
            ))}
          </div>

          {/* Bottom Explore Button */}
          <div className="p-6 bg-wash border border-line rounded-lg text-center font-body">
            <h3 className="font-heading font-bold text-base text-ink mb-1">
              Looking for installers in your specific city or pin code?
            </h3>
            <p className="text-xs text-ink-2 max-w-lg mx-auto mb-4">
              Explore local solar quotes, DISCOM net-metering timelines, and customer ratings across Maharashtra, Gujarat, Rajasthan, Karnataka, and 30+ other states.
            </p>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 h-10 px-6 rounded-sm bg-ink text-paper font-heading font-semibold text-xs hover:bg-ink/90 transition shadow-xs"
            >
              <span>Explore All 78+ City Registers</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* ── PICK YOUR STATE (INTERACTIVE GRID) ── */}
        <section className="space-y-4">
          <div className="border-b border-line pb-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-2 font-body mb-0.5">
              Geographic Coverage
            </div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
              Select Your State or Union Territory
            </h2>
            <p className="text-xs sm:text-sm text-ink-2 font-body mt-0.5">
              Access state-specific DISCOM net-metering regulations, sanctioned load caps, nodal portals, and local installer directories.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-2">
            {indianStates.map((st) => (
              <Link
                key={st.slug}
                href={`/states/${st.slug}`}
                className="p-3 bg-paper border border-line rounded-md hover:border-ink/60 hover:bg-wash transition-all flex items-center justify-between group font-body"
              >
                <div className="min-w-0 pr-1">
                  <div className="font-semibold text-xs sm:text-sm text-ink group-hover:text-amber-700 transition-colors truncate">
                    {st.name}
                  </div>
                  {st.tag && (
                    <div className="text-[10px] text-amber-700 font-medium truncate">
                      {st.tag}
                    </div>
                  )}
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-ink-2 group-hover:translate-x-0.5 group-hover:text-ink transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── SOLAR PLANNING TOOLS ── */}
        <section className="space-y-4">
          <div className="border-b border-line pb-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-2 font-body mb-0.5">
              Calculators &amp; Utilities
            </div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
              Solar Planning Tools
            </h2>
            <p className="text-xs sm:text-sm text-ink-2 font-body mt-0.5">
              Free consumer calculators calibrated to official MNRE benchmarks and state electricity tariffs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {toolsRows.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div
                  key={idx}
                  className="p-5 bg-paper border border-line rounded-lg hover:border-ink/50 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="w-8 h-8 rounded-md bg-wash border border-line flex items-center justify-center text-ink">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[11px] font-medium bg-wash border border-line/60 px-2 py-0.5 rounded text-ink font-body">
                        {tool.badge}
                      </span>
                    </div>
                    <Link
                      href={tool.href}
                      className="font-heading font-bold text-base text-ink hover:text-amber-700 transition-colors block"
                    >
                      {tool.name}
                    </Link>
                    <p className="text-xs text-ink-2 mt-1 font-body leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-line/40">
                    <Link
                      href={tool.href}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-ink hover:underline underline-offset-2 font-body"
                    >
                      <span>Launch Calculator</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── LATEST SOLAR GUIDES ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-2">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-2 font-body mb-0.5">
                Research &amp; Consumer Insights
              </div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                Latest Solar Guides
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs font-semibold text-ink border border-line px-3 py-1.5 rounded-sm hover:bg-wash transition font-body inline-flex items-center gap-1"
            >
              <span>View All Articles</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
            {[
              {
                title: 'PM Surya Ghar Muft Bijli Yojana Complete Application Guide',
                desc: 'Step-by-step procedure to apply on the national portal, DISCOM feasibility, and DBT disbursement directly into your bank account.',
                date: 'Sep 2026',
                href: '/blog/pm-surya-ghar-yojana-complete-guide',
                tag: 'Subsidy Guide',
              },
              {
                title: 'TOPCon vs Mono PERC Solar Panels in India',
                desc: 'Efficiency metrics, heat degradation rates during Indian summers, and price difference analysis for rooftop installations.',
                date: 'Sep 2026',
                href: '/guides/topcon-vs-mono-perc-solar-panels-india',
                tag: 'Hardware Comparison',
              },
              {
                title: 'How to Verify a Solar Installer in India Before Paying Advance',
                desc: 'Essential checklist: ALMM module certification, DISCOM vendor empanelment ID, GST verification, and customer warranty terms.',
                date: 'Sep 2026',
                href: '/blog/how-to-choose-solar-installer-india',
                tag: 'Buyer Checklist',
              },
            ].map((guide, idx) => (
              <Link
                key={idx}
                href={guide.href}
                className="p-5 bg-paper border border-line rounded-lg hover:border-ink/50 hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-ink-2 mb-2 font-body">
                    <span className="font-semibold text-ink bg-wash border border-line/60 px-2 py-0.5 rounded">
                      {guide.tag}
                    </span>
                    <span>{guide.date}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-ink group-hover:text-amber-700 transition-colors leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-ink-2 mt-2 font-body line-clamp-3 leading-relaxed">
                    {guide.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-line/40 flex items-center justify-between text-xs font-semibold text-ink font-body">
                  <span>Read Full Guide</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── FOR INSTALLERS PARTNER STRIP ── */}
        <section className="p-6 sm:p-8 bg-paper rounded-lg border-2 border-line flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative overflow-hidden shadow-xs">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink bg-sun-wash border border-sun/40 px-2.5 py-0.5 rounded-full font-body mb-2.5">
              <Sparkles className="h-3.5 w-3.5 text-sun fill-sun" />
              <span>For Solar EPCs &amp; Vendors</span>
            </div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink">
              Are you an active solar installer or EPC in India?
            </h3>
            <p className="text-xs sm:text-sm text-ink-2 mt-1.5 leading-relaxed font-body">
              Claim your official company profile on GoSolarIndex to showcase completed rooftop installations, customer reviews, and receive direct consumer inquiries from property owners in your city.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/for-installers"
              className="inline-flex items-center justify-center h-11 px-6 bg-sun hover:bg-sun-hover text-ink font-heading font-semibold text-xs rounded-sm transition-colors shadow-xs"
            >
              <span>Claim Profile or Register</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center h-11 px-5 bg-paper border border-ink text-ink font-heading font-semibold text-xs rounded-sm hover:bg-wash transition-colors"
            >
              View Partner Plans
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
