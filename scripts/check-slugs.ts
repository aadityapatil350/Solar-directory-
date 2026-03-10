import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const total = await prisma.listing.count();
  const allSlugs = await prisma.listing.findMany({ select: { slug: true, id: true }, take: 5000 });

  const over100 = allSlugs.filter(s => s.slug.length > 100);
  const over150 = allSlugs.filter(s => s.slug.length > 150);
  const bad = allSlugs.filter(s =>
    s.slug.includes(' ') || s.slug.includes('/') || s.slug !== s.slug.toLowerCase()
  );

  console.log('Total listings:', total);
  console.log('Slugs > 100 chars:', over100.length);
  console.log('Slugs > 150 chars:', over150.length);
  console.log('Bad chars (space/slash/uppercase):', bad.length);
  console.log('\nLongest slug sample:');
  allSlugs.sort((a, b) => b.slug.length - a.slug.length).slice(0, 3).forEach(s =>
    console.log(`  [${s.slug.length}] ${s.slug}`)
  );
}

main().catch(console.error).finally(() => prisma.$disconnect());
