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
  title: 'Solar Service Categories & Directories | GoSolarIndex',
  description: 'Find solar installers, panel dealers, inverter specialists, and AMC maintenance contractors by category across India.',
  path: '/categories',
  canonicalUrl: 'https://gosolarindex.in/categories',
});

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'residential-installers': 'Rooftop solar EPC contractors specialising in grid-tied domestic systems, PM Surya Ghar subsidy processing, and net-metering approvals.',
  'commercial-installers': 'Industrial and commercial solar engineers delivering high-capacity MW-scale rooftop arrays, OPEX/CAPEX models, and open access solutions.',
  'solar-dealers': 'Authorised distributors and stockists for Tier-1 ALMM solar panels, mounting structures, DC cables, and balance of systems (BOS).',
  'inverter-specialists': 'Certified technicians and dealers for on-grid, off-grid, and hybrid inverters, battery storage, and MPPT charge controllers.',
  'maintenance-services': 'Professional solar panel cleaning, annual maintenance contracts (AMC), thermal imaging hotspot audits, and inverter repairs.',
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { listings: true } } },
  });

  const totalListings = categories.reduce((sum, c) => sum + c._count.listings, 0);

  return (
    <div className="min-h-screen bg-paper text-ink pb-20 md:pb-0">
      <Header />

      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Service Categories', href: '/categories' },
            ]}
          />
        </div>
      </div>

      {/* Header Banner */}
      <header className="border-b border-line bg-wash py-10 sm:py-12">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider font-body">
              Specialized Service Classifications
            </span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink mt-1.5 leading-tight">
              Solar Service &amp; Industry Categories
            </h1>
            <p className="text-base text-ink-2 mt-3 font-body leading-relaxed">
              Explore specialised solar contractors across residential, commercial, wholesale component supply, and maintenance services in India.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-content mx-auto px-4 sm:px-6 py-10 space-y-12">
        <section>
          <FactPanel
            title="Service Classification Benchmark"
            rows={[
              { label: 'Total verified service classifications', value: `${categories.length} core categories` },
              { label: 'Total indexed business operations', value: `${totalListings.toLocaleString('en-IN')}+ companies` },
              { label: 'Dominant service sector', value: 'Residential Rooftop Installers (65%)' },
              { label: 'Subsidy applicability', value: 'Empanelled vendors on national portal', total: true },
            ]}
            sources="GoSolarIndex industry segmentation and MNRE installer guidelines."
          />
        </section>

        {/* Categories List */}
        <section className="space-y-6">
          <div>
            <h2 className="font-heading font-semibold text-2xl text-ink">
              Browse by specialisation
            </h2>
            <p className="text-sm text-ink-2 font-body mt-1">
              Select a category to view empanelled companies filtered by city and rating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="border border-line rounded-sm p-6 bg-paper hover:bg-wash transition-colors flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-ink-2 mb-2 font-body">
                    <span>Active Directory</span>
                    <span className="font-semibold text-ink">
                      {category._count.listings} {category._count.listings === 1 ? 'company' : 'companies'}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-ink">
                    <Link href={`/categories/${category.slug}`} className="hover:underline">
                      {category.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-ink-2 mt-2.5 font-body leading-relaxed">
                    {CATEGORY_DESCRIPTIONS[category.slug] || `Verified ${category.name.toLowerCase()} operating across Indian urban and rural markets.`}
                  </p>
                </div>

                <div className="pt-3 border-t border-line flex items-center justify-between">
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-xs font-semibold text-ink underline hover:text-ink/80 font-body"
                  >
                    View directory listings
                  </Link>
                  <span className="text-xs text-ink-2 font-body">
                    Verified records
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
