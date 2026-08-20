import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

export interface DirectoryStats {
  totalListings: number;
  verifiedListings: number;
  featuredListings: number;
  cityCount: number;
  stateCount: number;
  averageRating: number | null;
  perCategoryCounts: Record<string, number>;
}

export const getDirectoryStats = unstable_cache(
  async (): Promise<DirectoryStats> => {
    const [agg, cityCount, verifiedListings, featuredListings, states, byCategory, categories] = await Promise.all([
      prisma.listing.aggregate({ _count: true, _avg: { rating: true } }),
      prisma.location.count(),
      prisma.listing.count({ where: { verified: true } }),
      prisma.listing.count({ where: { featured: true } }),
      prisma.location.findMany({ select: { state: true }, distinct: ['state'] }),
      prisma.listing.groupBy({ by: ['categoryId'], _count: true }),
      prisma.category.findMany({ select: { id: true, slug: true } }),
    ]);
    const categoryIdToSlug = Object.fromEntries(categories.map((c) => [c.id, c.slug]));
    const perCategoryCounts: Record<string, number> = {};
    for (const row of byCategory) {
      const slug = categoryIdToSlug[row.categoryId];
      if (slug) perCategoryCounts[slug] = row._count;
    }
    return {
      totalListings: agg._count,
      verifiedListings,
      featuredListings,
      cityCount,
      stateCount: states.length,
      averageRating: agg._avg.rating ? Math.round(agg._avg.rating * 10) / 10 : null,
      perCategoryCounts,
    };
  },
  ['directory-stats-v1'],
  { revalidate: 300, tags: ['listings', 'homepage'] },
);
