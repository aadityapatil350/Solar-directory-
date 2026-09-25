import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FactPanel from '@/components/ui/FactPanel';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = constructMetadata({
  title: 'Solar Companies by City in India (2026 Directory) | GoSolarIndex',
  description: 'Browse verified solar panel installers, dealers, and EPC contractors across Indian cities and states. Compare local ratings, DISCOM net-metering, and subsidies.',
  path: '/locations',
  canonicalUrl: 'https://gosolarindex.in/locations',
});

const MIN_LISTINGS = 3;

export default async function LocationsPage() {
  const allLocations = await prisma.location.findMany({
    orderBy: { city: 'asc' },
    include: { _count: { select: { listings: true } } },
  });

  // Filter out thin/empty locations
  const locations = allLocations.filter((l) => l._count.listings >= MIN_LISTINGS);

  // Group by State
  const byState: Record<string, typeof locations> = {};
  for (const loc of locations) {
    if (!byState[loc.state]) byState[loc.state] = [];
    byState[loc.state].push(loc);
  }
  const stateKeys = Object.keys(byState).sort();

  return (
    <div className="min-h-screen bg-paper text-ink pb-20 md:pb-0">
      <Header />

      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'City Directory', href: '/locations' },
            ]}
          />
        </div>
      </div>

      {/* Header Banner */}
      <header className="border-b border-line bg-wash py-10 sm:py-12">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider font-body">
              Geographic Directory
            </span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink mt-1.5 leading-tight">
              Solar Installers &amp; Companies by City
            </h1>
            <p className="text-base text-ink-2 mt-3 font-body leading-relaxed">
              Explore verified rooftop solar installers across {locations.length} Indian cities. Every city hub includes local DISCOM net-metering regulations, solar radiation benchmarks, and verified company profiles.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-content mx-auto px-4 sm:px-6 py-10 space-y-12">
        <section>
          <FactPanel
            title="National City Coverage & Directory Standards"
            rows={[
              { label: 'Qualifying cities with active listings', value: `${locations.length} cities` },
              { label: 'Minimum company threshold per city hub', value: '3+ verified listings' },
              { label: 'States and Union Territories represented', value: `${stateKeys.length} states/UTs` },
              { label: 'Local utility integration', value: 'SERC net-metering tariffs 2026', total: true },
            ]}
            sources="GoSolarIndex public directory audit and state municipal registers."
          />
        </section>

        {/* Grouped by State */}
        <section className="space-y-10">
          <div>
            <h2 className="font-heading font-semibold text-2xl text-ink">
              Browse cities by state
            </h2>
            <p className="text-sm text-ink-2 font-body mt-1">
              Select your city to view empanelled installers, solar panel cleaning specialists, and local electricity tariffs.
            </p>
          </div>

          <div className="space-y-8">
            {stateKeys.map((state) => {
              const stateSlug = state.toLowerCase().replace(/\s+/g, '-');
              const citiesInState = byState[state];

              return (
                <div key={state} className="border border-line rounded-sm p-6 bg-paper space-y-4">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <h3 className="font-heading font-bold text-xl text-ink">
                      <Link href={`/states/${stateSlug}`} className="hover:underline">
                        {state}
                      </Link>
                    </h3>
                    <Link
                      href={`/states/${stateSlug}`}
                      className="text-xs text-ink underline hover:text-ink/80 font-body"
                    >
                      View state solar guide
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {citiesInState.map((loc) => {
                      const citySlug = loc.city.toLowerCase().replace(/\s+/g, '-');
                      return (
                        <Link
                          key={loc.id}
                          href={`/${citySlug}`}
                          className="p-2.5 rounded-sm hover:bg-wash transition-colors flex items-center justify-between text-sm font-body border border-transparent hover:border-line"
                        >
                          <span className="text-ink font-medium hover:underline">{loc.city}</span>
                          <span className="text-xs text-ink-2">({loc._count.listings})</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
