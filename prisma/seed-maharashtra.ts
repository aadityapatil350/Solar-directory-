/**
 * seed-maharashtra.ts
 * Seeds Maharashtra listings from scripts/listings-maharashtra.csv
 * APPENDS — does not delete existing data.
 * Skips duplicates by slug (name+city based).
 *
 * Run: npx tsx prisma/seed-maharashtra.ts
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

const CATEGORY_SLUG: Record<string, string> = {
  'Residential Solar Installers': 'residential-installers',
  'Commercial Solar Installers':  'commercial-installers',
  'Solar Panel Dealers':          'solar-dealers',
  'Solar Inverter Specialists':   'inverter-specialists',
  'Solar AMC & Maintenance':      'maintenance-services',
};

async function main() {
  const csvPath = path.join(__dirname, '../scripts/listings-maharashtra.csv');
  const lines = fs.readFileSync(csvPath, 'utf8').split('\n').filter(l => l.trim());
  console.log(`\nParsed ${lines.length - 1} rows`);

  // Parse rows
  const rows: { name: string; phone: string; website: string; address: string; rating: number | null; reviews: number; city: string; state: string; category: string }[] = [];
  for (let i = 1; i < lines.length; i++) {
    const c = parseCSVLine(lines[i]);
    if (c.length < 9 || !c[0] || !c[6] || !c[8]) continue;
    rows.push({
      name: c[0], phone: c[1] || '', website: c[2] || '', address: c[3] || '',
      rating: c[4] ? parseFloat(c[4]) : null,
      reviews: c[5] ? parseInt(c[5]) : 0,
      city: c[6], state: c[7], category: c[8],
    });
  }
  console.log(`Valid rows: ${rows.length}`);

  // Upsert categories
  const categoryMap: Record<string, string> = {};
  for (const [name, slug] of Object.entries(CATEGORY_SLUG)) {
    const cat = await prisma.category.upsert({ where: { slug }, update: { name }, create: { name, slug } });
    categoryMap[name] = cat.id;
  }

  // Upsert locations
  const locationMap: Record<string, string> = {};
  const uniqueCities = [...new Set(rows.map(r => `${r.city}|${r.state}`))];
  console.log(`\nUpserting ${uniqueCities.length} Maharashtra cities...`);
  for (const key of uniqueCities) {
    const [city, state] = key.split('|');
    const slug = slugify(`${city}-${state}`);
    const loc = await prisma.location.upsert({ where: { slug }, update: { city, state }, create: { city, state, slug } });
    locationMap[key] = loc.id;
    console.log(`  ${city}`);
  }

  // Load all existing slugs
  const existing = await prisma.listing.findMany({ select: { slug: true } });
  const usedSlugs = new Set(existing.map(l => l.slug));
  console.log(`\n${usedSlugs.size} existing slugs loaded`);

  // Insert listings
  console.log('\nInserting...');
  let inserted = 0, skipped = 0;

  for (const row of rows) {
    const categoryId = categoryMap[row.category];
    const locationId = locationMap[`${row.city}|${row.state}`];
    if (!categoryId || !locationId) { skipped++; continue; }

    let baseSlug = slugify(`${row.name}-${row.city}`);
    let slug = baseSlug;
    let suffix = 2;
    while (usedSlugs.has(slug)) slug = `${baseSlug}-${suffix++}`;
    usedSlugs.add(slug);

    await prisma.listing.create({
      data: {
        name: row.name, slug,
        phone: row.phone || null,
        website: row.website || null,
        address: row.address || null,
        rating: row.rating,
        reviews: row.reviews,
        verified: true, featured: false,
        categoryId, locationId,
      },
    });
    inserted++;
    if (inserted % 100 === 0) console.log(`  ${inserted} inserted...`);
  }

  const totalNow = await prisma.listing.count();
  const mhCount = await prisma.listing.count({ where: { location: { state: 'Maharashtra' } } });

  console.log(`\n✅ Done!`);
  console.log(`   Inserted       : ${inserted}`);
  console.log(`   Skipped        : ${skipped}`);
  console.log(`   Maharashtra DB : ${mhCount} listings`);
  console.log(`   Total DB       : ${totalNow} listings`);
}

main().catch(err => { console.error(err); process.exit(1); }).finally(() => prisma.$disconnect());
