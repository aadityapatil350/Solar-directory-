import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { blogPosts } from '@/lib/blog';

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

  const pages: Array<{
    url: string;
    lastModified: string;
    changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    priority: number;
  }> = [];

  // Static pages
  pages.push(
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  );

  // Blog posts
  blogPosts.forEach((post) => {
    pages.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Listing pages
  listings.forEach((listing) => {
    pages.push({
      url: `${baseUrl}/listing/${listing.slug}`,
      lastModified: listing.updatedAt.toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Category pages
  categories.forEach((category) => {
    pages.push({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: category.updatedAt.toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // Location pages
  locations.forEach((location) => {
    pages.push({
      url: `${baseUrl}/locations/${location.slug}`,
      lastModified: location.updatedAt.toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return pages;
}
