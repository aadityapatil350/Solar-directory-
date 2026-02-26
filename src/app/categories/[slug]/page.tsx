import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import ListingCard from '@/components/ListingCard';
import LeadForm from '@/components/LeadForm';
import Link from 'next/link';
import { ChevronRight, Zap } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return {};
  return constructMetadata({
    title: `${category.name} in India — Top Companies`,
    description: `Find the best ${category.name.toLowerCase()} across India. Verified professionals, competitive prices, free quotes. Browse ${category.name} listings now.`,
    path: `/categories/${slug}`,
  });
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({ select: { slug: true } });
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const listings = await prisma.listing.findMany({
    where: { categoryId: category.id },
    include: { category: true, location: true },
    orderBy: [{ featured: 'desc' }, { verified: 'desc' }, { rating: 'desc' }],
    take: 100,
  });

  const locations = await prisma.location.findMany({
    where: {
      listings: { some: { categoryId: category.id } },
    },
    orderBy: { city: 'asc' },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-500 transition">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/categories" className="hover:text-orange-500 transition">Categories</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold">{category.name} in India</h1>
          </div>
          <p className="text-orange-100 max-w-2xl">
            Browse {listings.length} verified {category.name.toLowerCase()} across India.
            Compare prices, read reviews, and get free quotes today.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Filter by city */}
            {locations.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Filter by City</h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href={`/categories/${slug}`}
                      className="text-sm text-orange-600 hover:underline"
                    >
                      All Cities ({listings.length})
                    </Link>
                  </li>
                  {locations.map((loc) => {
                    const count = listings.filter((l) => l.locationId === loc.id).length;
                    return (
                      <li key={loc.id}>
                        <Link
                          href={`/${loc.city.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-sm text-gray-600 hover:text-orange-600 hover:underline flex justify-between"
                        >
                          <span>{loc.city}</span>
                          <span className="text-gray-400">{count}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <LeadForm />
          </div>

          {/* Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {listings.length} {category.name} Companies
              </h2>
            </div>

            {listings.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center">
                <p className="text-gray-500 mb-4">No listings in this category yet.</p>
                <Link
                  href="/installers/signup"
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
                >
                  List Your Business
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
