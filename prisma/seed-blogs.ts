/**
 * Seed all blog posts from src/lib/blog.ts into the BlogPost database table.
 * Run with: npx tsx prisma/seed-blogs.ts
 *
 * This script is idempotent — safe to run multiple times (uses upsert).
 */

import { PrismaClient } from '@prisma/client';
import { blogPosts } from '../src/lib/blog';

const prisma = new PrismaClient();

async function main() {
  console.log(`Seeding ${blogPosts.length} blog posts to database…\n`);

  let created = 0;
  let updated = 0;

  for (const post of blogPosts) {
    const date = new Date(post.date);

    const result = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        description: post.description,
        content: post.content,
        category: post.category,
        readTime: post.readTime,
        date,
      },
      create: {
        slug: post.slug,
        title: post.title,
        description: post.description,
        content: post.content,
        category: post.category,
        readTime: post.readTime,
        date,
        published: true,
      },
    });

    // Detect create vs update by comparing createdAt and updatedAt
    const isNew = result.createdAt.getTime() === result.updatedAt.getTime() ||
      Date.now() - result.createdAt.getTime() < 5000;

    if (isNew) {
      created++;
      console.log(`  ✓ Created: ${post.slug}`);
    } else {
      updated++;
      console.log(`  ↻ Updated: ${post.slug}`);
    }
  }

  console.log(`\nDone! Created: ${created}, Updated: ${updated}`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
