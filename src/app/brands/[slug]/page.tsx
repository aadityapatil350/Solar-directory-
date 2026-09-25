import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FactPanel from '@/components/ui/FactPanel';
import DataTable from '@/components/ui/DataTable';
import FAQ from '@/components/ui/FAQ';
import ListingRow from '@/components/ui/ListingRow';
import { getBrandBySlug, getAllBrandSlugs } from '@/lib/brandData';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 86400; // 24h ISR
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBrandSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};

  return constructMetadata({
    title: `${brand.name} Solar Panels (2026): Price, ALMM, Efficiency & Warranty | GoSolarIndex`,
    description: `Complete guide to ${brand.name} solar modules in India. Check ALMM enlistment, ${brand.capacityGw} manufacturing capacity, TOPCon efficiency, warranties, and verified dealers.`,
    path: `/brands/${slug}`,
    canonicalUrl: `https://gosolarindex.in/brands/${slug}`,
  });
}

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  // Fetch top verified installers
  const installers = await prisma.listing.findMany({
    where: {
      verified: true,
    },
    include: {
      category: true,
      location: true,
    },
    orderBy: [
      { featured: 'desc' },
      { rating: 'desc' },
    ],
    take: 5,
  });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gosolarindex.in' },
      { '@type': 'ListItem', position: 2, name: 'Brands', item: 'https://gosolarindex.in/brands' },
      { '@type': 'ListItem', position: 3, name: brand.shortName, item: `https://gosolarindex.in/brands/${brand.slug}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: brand.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-paper text-ink pb-20 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Header />

      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Solar Brands', href: '/brands' },
              { label: brand.shortName, href: `/brands/${brand.slug}` },
            ]}
          />
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-line bg-wash py-10 sm:py-12">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider font-body">
                MNRE ALMM Enlisted Manufacturer · Tier-1
              </span>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink mt-1.5 leading-tight">
                {brand.name}
              </h1>
              <p className="text-base text-ink-2 mt-3 font-body leading-relaxed">
                {brand.overview}
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/get-quotes"
                className="inline-flex items-center justify-center h-11 px-6 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors"
              >
                Get installer quotes
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-content mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Fact Panel */}
        <section>
          <FactPanel
            title={`${brand.shortName} Manufacturing & Certification Benchmark`}
            rows={[
              { label: 'Headquarters & primary plant', value: brand.headquarters },
              { label: 'Annual module capacity (GW)', value: brand.capacityGw },
              { label: 'MNRE ALMM enlistment status', value: brand.almmStatus },
              { label: 'Enlisted ALMM module models', value: `${brand.almmEnlistedModels} certified models` },
              { label: 'Core cell architectures', value: brand.cellTechnologies.join(', ') },
              { label: 'Power output wattage range', value: brand.wattageRange },
              { label: 'Product & workmanship warranty', value: brand.productWarranty },
              { label: 'Linear performance warranty', value: brand.performanceWarranty, total: true },
            ]}
            sources="Ministry of New and Renewable Energy (MNRE) ALMM List-I official orders, manufacturer technical datasheets 2026."
          />
        </section>

        {/* Popular Module Models Table */}
        <section className="space-y-4">
          <div>
            <h2 className="font-heading font-semibold text-2xl text-ink">
              Popular {brand.shortName} module series in India
            </h2>
            <p className="text-sm text-ink-2 font-body mt-1">
              High-efficiency modules designed for residential rooftops, commercial sheds, and ground mounts.
            </p>
          </div>

          <DataTable
            columns={[
              { label: 'Series name', key: 'name' },
              { label: 'Technology type', key: 'type' },
              { label: 'Rated wattage', key: 'wattage' },
              { label: 'Peak efficiency', key: 'efficiency' },
            ]}
            rows={brand.popularSeries}
          />
        </section>

        {/* Head-to-Head Comparisons */}
        {brand.comparisons.length > 0 && (
          <section className="border border-line rounded-sm p-6 bg-wash space-y-3">
            <h3 className="font-heading font-semibold text-xl text-ink">
              Compare {brand.shortName} with competing brands
            </h3>
            <p className="text-sm text-ink-2 font-body">
              Detailed technical comparisons covering cell degradation, temperature coefficients, and pricing per watt.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              {brand.comparisons.map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="inline-flex items-center h-9 px-4 border border-line bg-paper text-ink text-xs font-semibold rounded-sm hover:border-ink transition-colors"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Empanelled Installers */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-semibold text-2xl text-ink">
                Verified solar installers supplying {brand.shortName}
              </h2>
              <p className="text-sm text-ink-2 font-body mt-1">
                Empanelled EPC contractors capable of sourcing authentic ALMM-certified {brand.shortName} panels with full manufacturer warranty.
              </p>
            </div>
            <Link
              href="/get-quotes"
              className="text-xs text-ink underline hover:text-ink/80 font-body shrink-0"
            >
              Get matched quotes
            </Link>
          </div>

          <div className="pt-4 space-y-3">
            {installers.map((item) => (
              <ListingRow key={item.id} listing={item} />
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="font-heading font-semibold text-2xl text-ink">
            Frequently asked questions: {brand.shortName} panels
          </h2>
          <FAQ items={brand.faqs} />
        </section>

        {/* Related Links */}
        <section className="pt-6 border-t border-line">
          <h3 className="font-heading font-semibold text-lg text-ink mb-3">
            Explore related solar guides &amp; calculators
          </h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-body">
            <Link href="/brands" className="text-ink underline hover:text-ink/80">
              All ALMM Solar Brands
            </Link>
            <Link href="/subsidy/pm-surya-ghar" className="text-ink underline hover:text-ink/80">
              PM Surya Ghar Subsidy Guide
            </Link>
            <Link href="/tools/solar-savings-calculator" className="text-ink underline hover:text-ink/80">
              Solar Savings Calculator
            </Link>
            <Link href="/price/3kw" className="text-ink underline hover:text-ink/80">
              3 kW Solar System Price
            </Link>
            <Link href="/discom" className="text-ink underline hover:text-ink/80">
              Indian DISCOM Net Metering
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
