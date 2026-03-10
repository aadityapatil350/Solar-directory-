import { prisma } from '@/lib/prisma';
import HomeClient from './HomeClient';
import ListingCard from '@/components/ListingCard';

// Use ISR for better SEO - revalidate every 1 hour
export const revalidate = 3600;

// Server component — fetches real data so Google sees complete content in initial HTML
export default async function HomePage() {
  const [totalListings, totalCities, totalVerified, avgRatingData, listings, categories, locations, featuredCount] = await Promise.all([
    prisma.listing.count(),
    prisma.location.count(),
    prisma.listing.count({ where: { verified: true } }),
    prisma.listing.aggregate({ _avg: { rating: true } }),
    // Fetch initial listings with installer data for SEO - first page sorted by rating
    prisma.listing.findMany({
      include: {
        category: true,
        location: true,
        installer: {
          include: {
            user: true,
          },
        },
      },
      orderBy: [
        { featured: 'desc' },
        { verified: 'desc' },
        { rating: 'desc' },
        { reviews: 'desc' },
      ],
      take: 12, // First page
    }),
    prisma.category.findMany(),
    prisma.location.findMany(),
    prisma.listing.count({ where: { featured: true } }),
  ]);

  const avgRating = avgRatingData._avg.rating
    ? Math.round(avgRatingData._avg.rating * 10) / 10
    : 4.5;

  return (
    <HomeClient
      initialStats={{
        totalListings,
        featured: featuredCount,
        verified: totalVerified,
        avgRating,
        cities: totalCities,
      }}
      initialListings={listings}
      initialCategories={categories}
      initialLocations={locations}
    >
      {/* Server-rendered initial listings for SEO */}
      <div className="grid md:grid-cols-2 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </HomeClient>
  );
}
