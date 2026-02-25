import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gosolarindex.in';

  // Get all listings, categories, and locations
  const [listings, categories, locations] = await Promise.all([
    prisma.listing.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
      take: 1000,
    }),
    prisma.category.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    }),
    prisma.location.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    }),
  ]);

  // Static pages
  const staticPages: MetadataRoute.SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Listing pages
  const listingPages: MetadataRoute.SitemapEntry[] = listings.map((listing) => ({
    url: `${baseUrl}/listing/${listing.slug}`,
    lastModified: listing.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Category pages
  const categoryPages: MetadataRoute.SitemapEntry[] = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Location pages
  const locationPages: MetadataRoute.SitemapEntry[] = locations.map((location) => ({
    url: `${baseUrl}/locations/${location.slug}`,
    lastModified: location.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...listingPages, ...categoryPages, ...locationPages];
}
