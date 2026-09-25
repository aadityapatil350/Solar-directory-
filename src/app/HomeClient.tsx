'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FactPanel from '@/components/ui/FactPanel';
import ListingRow, { ListingRowData } from '@/components/ui/ListingRow';

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
    { name: 'Gujarat', slug: 'gujarat' },
    { name: 'Haryana', slug: 'haryana' },
    { name: 'Himachal Pradesh', slug: 'himachal-pradesh' },
    { name: 'Jammu & Kashmir', slug: 'jammu-and-kashmir' },
    { name: 'Jharkhand', slug: 'jharkhand' },
    { name: 'Karnataka', slug: 'karnataka' },
    { name: 'Kerala', slug: 'kerala' },
    { name: 'Ladakh', slug: 'ladakh' },
    { name: 'Lakshadweep', slug: 'lakshadweep' },
    { name: 'Madhya Pradesh', slug: 'madhya-pradesh' },
    { name: 'Maharashtra', slug: 'maharashtra' },
    { name: 'Manipur', slug: 'manipur' },
    { name: 'Meghalaya', slug: 'meghalaya' },
    { name: 'Mizoram', slug: 'mizoram' },
    { name: 'Nagaland', slug: 'nagaland' },
    { name: 'Odisha', slug: 'odisha' },
    { name: 'Puducherry', slug: 'puducherry' },
    { name: 'Punjab', slug: 'punjab' },
    { name: 'Rajasthan', slug: 'rajasthan' },
    { name: 'Sikkim', slug: 'sikkim' },
    { name: 'Tamil Nadu', slug: 'tamil-nadu' },
    { name: 'Telangana', slug: 'telangana' },
    { name: 'Tripura', slug: 'tripura' },
    { name: 'Uttar Pradesh', slug: 'uttar-pradesh' },
    { name: 'Uttarakhand', slug: 'uttarakhand' },
    { name: 'West Bengal', slug: 'west-bengal' },
  ];

  const toolsRows = [
    {
      name: 'PM Surya Ghar subsidy calculator',
      desc: 'Calculate central DBT subsidy up to ₹78,000 based on your sanctioned load and roof area.',
      href: '/tools/solar-subsidy-calculator',
    },
    {
      name: 'System size calculator',
      desc: 'Find whether 1 kW, 2 kW, 3 kW or 5 kW matches your monthly unit consumption.',
      href: '/blog/1kw-2kw-3kw-5kw-solar-system-india-which-size',
    },
    {
      name: 'Net metering rule checker',
      desc: 'Check state-level DISCOM regulations, sanctioned load caps, and banking rules.',
      href: '/blog/net-metering-india-2026-state-rules-guide',
    },
    {
      name: 'Solar panel brand comparison',
      desc: 'Compare TOPCon vs Mono PERC modules, ALMM List-I status, and manufacturer warranties.',
      href: '/blog/solar-panel-brand-comparison-india-2026',
    },
  ];

  const latestGuides = [
    {
      title: 'PM Surya Ghar Muft Bijli Yojana complete application guide',
      oneLiner: 'Step-by-step procedure to apply on the national portal, DISCOM feasibility, and DBT disbursement.',
      date: 'Sep 2026',
      href: '/blog/pm-surya-ghar-yojana-complete-guide',
    },
    {
      title: 'TOPCon vs mono PERC solar panels in India',
      oneLiner: 'Efficiency metrics, heat degradation rates in Indian summers, and price difference analysis.',
      date: 'Sep 2026',
      href: '/guides/topcon-vs-mono-perc-solar-panels-india',
    },
    {
      title: 'How to verify a solar installer in India before paying an advance',
      oneLiner: 'Essential checklist: ALMM certification, DISCOM vendor ID, GST registration, and customer references.',
      date: 'Sep 2026',
      href: '/blog/how-to-choose-solar-installer-india',
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <main className="max-w-content mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16">
        {/* HERO (white, left aligned, big Ink headline, no background image) */}
        <section className="space-y-6 max-w-3xl">
          <h1 className="font-heading font-bold text-3xl sm:text-5xl tracking-tight text-ink leading-tight">
            Go solar with the right numbers and the right installer.
          </h1>
          <p className="text-lg sm:text-xl text-ink-2 leading-relaxed">
            Subsidy, cost and trusted installers for your city.
          </p>

          {/* Search form: [ City ▾ ][ What do you need? ▾ ][ Search ] (One Sun button) */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-stretch gap-2.5 pt-2"
          >
            <div className="flex-1">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full h-12 px-3.5 bg-paper border border-line rounded-sm text-ink text-[15px] focus:outline-none focus:ring-2 focus:ring-ink"
                aria-label="Select your city"
              >
                <option value="">Select your city</option>
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

            <div className="flex-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-12 px-3.5 bg-paper border border-line rounded-sm text-ink text-[15px] focus:outline-none focus:ring-2 focus:ring-ink"
                aria-label="What do you need"
              >
                <option value="">What do you need?</option>
                {initialCategories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="h-12 px-7 bg-sun text-ink font-semibold text-base rounded-sm hover:brightness-95 transition-colors focus:outline-none focus:ring-2 focus:ring-ink shrink-0"
            >
              Search
            </button>
          </form>
        </section>

        {/* "Where do you want to start?" — 6 plain tiles in a 3x2 (mobile 2x3) */}
        <section className="space-y-4">
          <h2 className="font-heading font-semibold text-xl text-ink">
            Where do you want to start?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { title: 'Check your subsidy', desc: 'Central DBT up to ₹78,000 calculations', href: '/tools/solar-subsidy-calculator' },
              { title: 'Know the cost', desc: 'Installed price per kW for 1 kW to 10 kW', href: '/blog/1kw-2kw-3kw-5kw-solar-system-india-which-size' },
              { title: 'Find an installer', desc: 'Browse verified EPCs in your city', href: '/locations' },
              { title: 'Compare panel brands', desc: 'ALMM List-I, efficiency, warranties', href: '/blog/solar-panel-brand-comparison-india-2026' },
              { title: 'Cleaning and AMC', desc: 'Maintenance providers and kits', href: '/guides/best-solar-panel-cleaning-kits-india' },
              { title: 'Solar for business', desc: 'Commercial rooftop ROI and tax depreciation', href: '/blog/commercial-solar-for-businesses-india-2026' },
            ].map((tile, idx) => (
              <Link
                key={idx}
                href={tile.href}
                className="p-4 bg-paper border border-line rounded-md hover:bg-wash transition-colors block text-left"
              >
                <div className="font-heading font-semibold text-base text-ink mb-1">
                  {tile.title}
                </div>
                <div className="text-xs text-ink-2 leading-relaxed">
                  {tile.desc}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Fact panel: "Solar in India today" */}
        <section className="space-y-4">
          <div className="max-w-xl">
            <FactPanel
              title="Solar in India today"
              subtitle="Checked 25 Sep 2026"
              rows={[
                { label: 'PM Surya Ghar maximum subsidy', value: '₹78,000' },
                { label: 'Average residential installed cost', value: '₹55,000–65,000 / kW' },
                { label: 'Average annual generation per kW', value: '~1,400–1,550 kWh' },
                { label: 'Typical residential payback', value: '3.5–4.5 years' },
                { label: 'Empanelled vendors on national portal', value: 'Over 10,000 registered' },
              ]}
              totalRow={{
                label: 'National rooftop solar target',
                value: '10 million households',
              }}
              sources={['Ministry of New and Renewable Energy (MNRE)', 'pmsuryaghar.gov.in', 'CEA']}
              calcExplanationUrl="/tools/solar-subsidy-calculator"
            />
          </div>
        </section>

        {/* Directory preview — 5 listing rows from popular city */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-2">
            <h2 className="font-heading font-semibold text-xl text-ink">
              Verified solar installers
            </h2>
            <Link href="/locations" className="text-sm text-ink underline underline-offset-2">
              Browse all 78+ cities
            </Link>
          </div>

          <div className="border-t border-line">
            {initialListings.slice(0, 5).map((listing: ListingRowData) => (
              <ListingRow key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        {/* Pick your state — 36 names as a plain text list in columns (not cards) */}
        <section className="space-y-4">
          <h2 className="font-heading font-semibold text-xl text-ink">
            Pick your state
          </h2>
          <p className="text-xs text-ink-2">
            State-specific DISCOM net-metering regulations, nodal portals, and local installer directories
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-2 gap-x-4 text-sm text-ink pt-2">
            {indianStates.map((st) => (
              <Link
                key={st.slug}
                href={`/states/${st.slug}`}
                className="text-ink hover:underline underline-offset-2 py-0.5 truncate"
              >
                {st.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Tools — 4 rows: name, one-line what it does, link */}
        <section className="space-y-4">
          <h2 className="font-heading font-semibold text-xl text-ink">
            Solar planning tools
          </h2>
          <div className="border-t border-line divide-y divide-line">
            {toolsRows.map((tool, idx) => (
              <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <Link
                    href={tool.href}
                    className="font-heading font-semibold text-base text-ink hover:underline underline-offset-2"
                  >
                    {tool.name}
                  </Link>
                  <p className="text-xs text-ink-2 mt-0.5 max-w-xl">{tool.desc}</p>
                </div>
                <Link
                  href={tool.href}
                  className="text-xs font-medium text-ink underline underline-offset-2 shrink-0 mt-1 sm:mt-0"
                >
                  Open tool
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Latest guides — 3 text rows: title, 1 line, date */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-2">
            <h2 className="font-heading font-semibold text-xl text-ink">
              Latest solar guides
            </h2>
            <Link href="/blog" className="text-sm text-ink underline underline-offset-2">
              View all articles
            </Link>
          </div>
          <div className="divide-y divide-line">
            {latestGuides.map((guide, idx) => (
              <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <Link
                    href={guide.href}
                    className="font-heading font-semibold text-base text-ink hover:underline underline-offset-2"
                  >
                    {guide.title}
                  </Link>
                  <p className="text-xs text-ink-2 mt-0.5 max-w-xl">{guide.oneLiner}</p>
                </div>
                <span className="text-xs text-ink-2 shrink-0 tabular-nums mt-1 sm:mt-0">
                  {guide.date}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* For installers strip — plain text + secondary button */}
        <section className="p-6 bg-wash rounded-md border border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="max-w-xl">
            <h3 className="font-heading font-semibold text-lg text-ink">
              Are you a verified solar installer in India?
            </h3>
            <p className="text-xs text-ink-2 mt-1 leading-relaxed">
              Claim your company listing to update your official contact details, portfolio, and receive direct quote enquiries from local rooftop owners.
            </p>
          </div>
          <Link
            href="/for-installers"
            className="inline-flex items-center justify-center h-11 px-5 bg-paper border-[1.5px] border-ink text-ink font-medium text-sm rounded-sm hover:bg-wash transition-colors shrink-0"
          >
            Claim listing or register
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
