import { prisma } from '@/lib/prisma';
import HomeClient from './HomeClient';
import ListingCard from '@/components/ListingCard';
import { unstable_cache } from 'next/cache';

// Skip static generation during build, use runtime ISR instead
export const dynamic = 'force-dynamic';
export const revalidate = 300; // Cache for 5 minutes at runtime

// Cache homepage data for 5 minutes to reduce database load
const getHomePageData = unstable_cache(
  async () => {
    const [stats, listings, categories, locations] = await Promise.all([
      // Combined stats query (more efficient than 4 separate queries)
      prisma.listing.aggregate({
        _count: true,
        _avg: { rating: true },
        where: {}, // TODO: Add isTest: false after migration
      }).then(async (agg) => ({
        totalListings: agg._count,
        avgRating: agg._avg.rating ? Math.round(agg._avg.rating * 10) / 10 : 4.5,
        cities: await prisma.location.count(),
        verified: await prisma.listing.count({ where: { verified: true } }),
        featured: await prisma.listing.count({ where: { featured: true } }),
      })),
      // Fetch initial listings WITHOUT installer data (not needed for cards)
      prisma.listing.findMany({
        where: {}, // TODO: Add isTest: false after migration
        include: {
          category: true,
          location: true,
        },
        orderBy: [
          { featured: 'desc' },
          { verified: 'desc' },
          { rating: 'desc' },
        ],
        take: 12, // First page
      }),
      // Cache categories (rarely change)
      prisma.category.findMany({
        orderBy: { name: 'asc' },
      }),
      // Cache locations (rarely change)
      prisma.location.findMany({
        orderBy: { city: 'asc' },
      }),
    ]);

    return { stats, listings, categories, locations };
  },
  ['homepage-data'],
  {
    revalidate: 300, // 5 minutes cache
    tags: ['homepage'],
  }
);

// Server component — fetches real data so Google sees complete content in initial HTML
export default async function HomePage() {
  const { stats, listings, categories, locations } = await getHomePageData();

  return (
    <HomeClient
      initialStats={stats}
      initialListings={listings}
      initialCategories={categories}
      initialLocations={locations}
    >
      {/* Server-rendered initial listings for SEO */}
      <div className="grid md:grid-cols-2 gap-6">
        {listings.map((listing: typeof listings[0]) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </HomeClient>
  );
}
