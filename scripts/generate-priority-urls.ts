/**
 * generate-priority-urls.ts
 * Generates a list of priority URLs for manual submission to Google Search Console
 *
 * Run: npx tsx scripts/generate-priority-urls.ts
 */

import { prisma } from '../src/lib/prisma';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const baseUrl = 'https://gosolarindex.in';
  const priorityUrls: string[] = [];

  console.log('\n🔍 Generating priority URLs for Google indexing...\n');

  // 1. Static high-priority pages
  const staticPages = [
    '/',
    '/solar-calculator',
    '/subsidy-checker',
    '/categories',
    '/locations',
    '/blog',
    '/about',
    '/contact',
    '/pricing',
  ];

  staticPages.forEach(page => {
    priorityUrls.push(`${baseUrl}${page}`);
  });

  console.log(`✓ Added ${staticPages.length} static pages`);

  // 2. Top 20 cities by listing count
  const topCities = await prisma.location.findMany({
    select: {
      city: true,
      _count: {
        select: { listings: true }
      }
    },
    orderBy: {
      listings: {
        _count: 'desc'
      }
    },
    take: 20
  });

  topCities.forEach(location => {
    const citySlug = location.city.toLowerCase().replace(/\s+/g, '-');
    priorityUrls.push(`${baseUrl}/${citySlug}`);
  });

  console.log(`✓ Added ${topCities.length} top cities`);

  // 3. All category pages
  const categories = await prisma.category.findMany({
    select: { slug: true }
  });

  categories.forEach(cat => {
    priorityUrls.push(`${baseUrl}/categories/${cat.slug}`);
  });

  console.log(`✓ Added ${categories.length} category pages`);

  // 4. Top 10 blog posts
  const topBlogs = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  topBlogs.forEach(blog => {
    priorityUrls.push(`${baseUrl}/blog/${blog.slug}`);
  });

  console.log(`✓ Added ${topBlogs.length} recent blog posts`);

  // 5. Top 10 verified, featured listings
  const topListings = await prisma.listing.findMany({
    where: {
      AND: [
        { verified: true },
        { featured: true }
      ]
    },
    select: { slug: true },
    orderBy: [
      { rating: 'desc' },
      { reviews: 'desc' }
    ],
    take: 10
  });

  topListings.forEach(listing => {
    priorityUrls.push(`${baseUrl}/listing/${listing.slug}`);
  });

  console.log(`✓ Added ${topListings.length} top featured listings`);

  // Write to file
  const outputPath = path.join(__dirname, 'priority-urls.txt');
  fs.writeFileSync(outputPath, priorityUrls.join('\n'), 'utf8');

  console.log(`\n✅ Generated ${priorityUrls.length} priority URLs`);
  console.log(`📄 Saved to: ${outputPath}\n`);

  console.log('📋 Next steps:');
  console.log('1. Open Google Search Console');
  console.log('2. Go to URL Inspection tool');
  console.log('3. Submit these URLs for indexing (max 10 per day)');
  console.log('4. Repeat daily until all are submitted\n');

  // Also create a CSV for easy import
  const csvPath = path.join(__dirname, 'priority-urls.csv');
  const csvContent = 'URL,Priority,Type\n' + priorityUrls.map((url, i) => {
    let type = 'Other';
    let priority = 'Medium';

    if (url === baseUrl || url === `${baseUrl}/`) {
      type = 'Homepage';
      priority = 'Critical';
    } else if (url.includes('/solar-calculator') || url.includes('/subsidy-checker')) {
      type = 'Tool';
      priority = 'High';
    } else if (url.match(/\/(mumbai|delhi|bangalore|pune|hyderabad|chennai)/)) {
      type = 'Top City';
      priority = 'High';
    } else if (url.includes('/categories/')) {
      type = 'Category';
      priority = 'Medium';
    } else if (url.includes('/blog/')) {
      type = 'Blog';
      priority = 'Medium';
    } else if (url.includes('/listing/')) {
      type = 'Listing';
      priority = 'Low';
    }

    return `${url},${priority},${type}`;
  }).join('\n');

  fs.writeFileSync(csvPath, csvContent, 'utf8');
  console.log(`📊 Also saved CSV version: ${csvPath}\n`);
}

main()
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
