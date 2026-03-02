/**
 * seed-from-csv-round2.ts
 * Imports round 2 listings (33 cities) — APPENDS to existing data, does NOT clear.
 *
 * Run: npx tsx prisma/seed-from-csv-round2.ts
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
  'Commercial Solar Installers': 'commercial-installers',
  'Solar Panel Dealers': 'solar-dealers',
  'Solar Inverter Specialists': 'inverter-specialists',
  'Solar AMC & Maintenance': 'maintenance-services',
};

async function main() {
  const csvPath = path.join(__dirname, '../scripts/listings-output-round2.csv');
  const raw = fs.readFileSync(csvPath, 'utf8');
  const lines = raw.split('\n').filter(l => l.trim());

  console.log(`\nParsed ${lines.length - 1} rows from round 2 CSV`);

  // Parse rows
  const rows: { name: string; phone: string; website: string; address: string; rating: number | null; reviews: number; city: string; state: string; category: string }[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length < 9) continue;
    const name = cols[0]; const city = cols[6]; const state = cols[7]; const category = cols[8];
    if (!name || !city || !state || !category) continue;
    rows.push({
      name,
      phone: cols[1] || '',
      website: cols[2] || '',
      address: cols[3] || '',
      rating: cols[4] ? parseFloat(cols[4]) : null,
      reviews: cols[5] ? parseInt(cols[5]) : 0,
      city, state, category,
    });
  }

  console.log(`Valid rows: ${rows.length}`);

  // Upsert categories
  console.log('\nUpserting categories...');
  const categoryMap: Record<string, string> = {};
  for (const [name, slug] of Object.entries(CATEGORY_SLUG)) {
    const cat = await prisma.category.upsert({ where: { slug }, update: { name }, create: { name, slug } });
    categoryMap[name] = cat.id;
  }

  // Upsert locations
  console.log('Upserting locations...');
  const locationMap: Record<string, string> = {};
  const uniqueCities = [...new Set(rows.map(r => `${r.city}|${r.state}`))];
  for (const key of uniqueCities) {
    const [city, state] = key.split('|');
    const slug = slugify(`${city}-${state}`);
    const loc = await prisma.location.upsert({ where: { slug }, update: { city, state }, create: { city, state, slug } });
    locationMap[key] = loc.id;
    console.log(`  ${city}, ${state}`);
  }

  // Load existing slugs to avoid conflicts with round 1 data
  console.log('\nLoading existing slugs...');
  const existing = await prisma.listing.findMany({ select: { slug: true } });
  const usedSlugs = new Set(existing.map(l => l.slug));
  console.log(`  ${usedSlugs.size} existing slugs loaded`);

  // Insert listings
  console.log('\nInserting listings...');
  let inserted = 0;
  let skipped = 0;

  for (const row of rows) {
    const categoryId = categoryMap[row.category];
    const locationId = locationMap[`${row.city}|${row.state}`];
    if (!categoryId || !locationId) { skipped++; continue; }

    let baseSlug = slugify(`${row.name}-${row.city}`);
    let slug = baseSlug;
    let suffix = 2;
    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${suffix++}`;
    }
    usedSlugs.add(slug);

    await prisma.listing.create({
      data: {
        name: row.name,
        slug,
        phone: row.phone || null,
        website: row.website || null,
        address: row.address || null,
        rating: row.rating,
        reviews: row.reviews,
        verified: true,
        featured: false,
        categoryId,
        locationId,
      },
    });

    inserted++;
    if (inserted % 100 === 0) console.log(`  ${inserted} inserted...`);
  }

  console.log(`\n✅ Done!`);
  console.log(`   Inserted : ${inserted}`);
  console.log(`   Skipped  : ${skipped}`);

  // Final totals
  const total = await prisma.listing.count();
  console.log(`\n   Total listings in DB: ${total}`);
}

main().catch(err => { console.error(err); process.exit(1); }).finally(() => prisma.$disconnect());
