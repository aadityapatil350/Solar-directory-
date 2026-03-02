import { prisma } from '@/lib/prisma';
import HomeClient from './HomeClient';

// Server component — fetches real stats so Google sees correct numbers in initial HTML
export default async function HomePage() {
  const [totalListings, totalCities, totalVerified, avgRatingData] = await Promise.all([
    prisma.listing.count(),
    prisma.location.count(),
    prisma.listing.count({ where: { verified: true } }),
    prisma.listing.aggregate({ _avg: { rating: true } }),
  ]);

  const avgRating = avgRatingData._avg.rating
    ? Math.round(avgRatingData._avg.rating * 10) / 10
    : 4.5;

  // Featured count — used for display only
  const featured = await prisma.listing.count({ where: { featured: true } });

  return (
    <HomeClient
      initialStats={{
        totalListings,
        featured,
        verified: totalVerified,
        avgRating,
        cities: totalCities,
      }}
    />
  );
}
