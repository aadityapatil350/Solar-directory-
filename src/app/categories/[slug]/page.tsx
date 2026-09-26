import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { constructCategoryMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FactPanel from '@/components/ui/FactPanel';
import CategoryClient from './CategoryClient';
import LeadForm from '@/components/LeadForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return {};

  const count = await prisma.listing.count({ where: { categoryId: category.id } });
  return constructCategoryMetadata(category.name, undefined, count, category.slug);
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const totalListings = await prisma.listing.count({
    where: { categoryId: category.id },
  });

  const verifiedCount = await prisma.listing.count({
    where: { categoryId: category.id, verified: true },
  });

  const listings = await prisma.listing.findMany({
    where: { categoryId: category.id },
    include: { category: true, location: true },
    orderBy: [{ featured: 'desc' }, { verified: 'desc' }, { rating: 'desc' }],
  });

  const locations = await prisma.location.findMany({
    where: {
      listings: { some: { categoryId: category.id } },
    },
    orderBy: { city: 'asc' },
  });

  return (
    <div className="min-h-screen bg-paper text-ink pb-20 md:pb-0">
      <Header />

      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Categories', href: '/categories' },
              { label: category.name, href: `/categories/${category.slug}` },
            ]}
          />
        </div>
      </div>

      {/* Header Banner */}
      <header className="border-b border-line bg-wash py-10 sm:py-12">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider font-body">
              Verified Business Register
            </span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink mt-1.5 leading-tight">
              Best {category.name} in India
            </h1>
            <p className="text-base text-ink-2 mt-3 font-body leading-relaxed">
              Explore {totalListings} registered {category.name.toLowerCase()} operating across {locations.length} Indian cities. Compare verified ratings, operational coverage, and request direct quotations.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-content mx-auto px-4 sm:px-6 py-10 space-y-10">
        <FactPanel
          title={`${category.name}: National Directory Overview`}
          rows={[
            { label: 'Total active companies listed', value: `${totalListings} companies` },
            { label: 'Owner-verified businesses', value: `${verifiedCount} verified` },
            { label: 'Geographic coverage', value: `${locations.length} cities across India` },
            { label: 'Standard subsidy qualification', value: 'MNRE / PM Surya Ghar Empanelled', total: true },
          ]}
          sources="GoSolarIndex business registry, verified installer submissions, and public utility registers."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Listings */}
          <div className="lg:col-span-8">
            <CategoryClient
              initialListings={listings}
              locations={locations}
              categoryName={category.name}
              categorySlug={slug}
            />
          </div>

          {/* Sidebar Lead Form */}
          <div className="lg:col-span-4 sticky top-6">
            <div className="border border-line rounded-sm p-6 bg-wash">
              <h2 className="font-heading font-semibold text-lg text-ink mb-1">
                Get competitive quotes
              </h2>
              <p className="text-xs text-ink-2 font-body mb-5">
                Connect with up to 3 verified {category.name.toLowerCase()} in your city. Free and no obligation.
              </p>
              <LeadForm source={`category:${category.slug}`} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
