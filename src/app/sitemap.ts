import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gosolarindex.in';

  // Get categories, locations, blog posts, and states (excluding individual listings)
  const [categories, locations, blogPosts] = await Promise.all([
    prisma.category.findMany({
      select: { slug: true, updatedAt: true },
    }),
    prisma.location.findMany({
      select: { city: true, state: true, updatedAt: true },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  // Get unique states from locations
  const uniqueStates: string[] = [...new Set<string>(locations.map((l: typeof locations[0]) => l.state))];

  // Define top cities for higher priority
  const topCities = [
    'mumbai', 'delhi', 'bangalore', 'pune', 'hyderabad',
    'chennai', 'kolkata', 'ahmedabad', 'jaipur', 'lucknow'
  ];

  const pages: Array<{
    url: string;
    lastModified: string;
    changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    priority: number;
  }> = [];

  // Static pages - Critical & High Priority
  pages.push(
    // Homepage - Critical
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Tools - High Priority
    {
      url: `${baseUrl}/solar-calculator`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/subsidy-checker`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Directory Pages - High Priority
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
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // Business Pages - Medium Priority
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
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
  );

  // Blog posts
  blogPosts.forEach((post: typeof blogPosts[0]) => {
    pages.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt.toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // NOTE: Individual listing pages are intentionally excluded from sitemap
  // to avoid thin content issues. Users can find listings through:
  // - City pages (/{city})
  // - Category pages (/categories/{category})
  // - State pages (/states/{state})

  // Category pages
  categories.forEach((category: typeof categories[0]) => {
    pages.push({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: category.updatedAt.toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // City pages — Higher priority for top metro cities
  locations.forEach((location: typeof locations[0]) => {
    const citySlug = location.city.toLowerCase().replace(/\s+/g, '-');
    const isTopCity = topCities.includes(citySlug);

    pages.push({
      url: `${baseUrl}/${citySlug}`,
      lastModified: location.updatedAt.toISOString(),
      changeFrequency: 'weekly',
      priority: isTopCity ? 0.9 : 0.7, // Top cities get 0.9, others get 0.7
    });
  });

  // State pages — Medium-High Priority
  uniqueStates.forEach((state: string) => {
    const stateSlug = state.toLowerCase().replace(/\s+/g, '-');
    pages.push({
      url: `${baseUrl}/states/${stateSlug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  return pages;
}
