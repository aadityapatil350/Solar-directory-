/**
 * seed-from-csv.ts
 * Imports real listings from scripts/listings-output.csv into the database.
 * - Clears all existing listings first
 * - Upserts locations (city+state)
 * - Upserts categories
 * - Creates all listings; phone left null if missing
 *
 * Run: npx tsx prisma/seed-from-csv.ts
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// ── CSV parser (handles quoted fields with commas inside) ──────────────────
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
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
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Category slug map — must match existing DB slugs
const CATEGORY_SLUG: Record<string, string> = {
  'Residential Solar Installers': 'residential-installers',
  'Commercial Solar Installers': 'commercial-installers',
  'Solar Panel Dealers': 'solar-dealers',
  'Solar Inverter Specialists': 'inverter-specialists',
  'Solar AMC & Maintenance': 'maintenance-services',
};

async function main() {
  const csvPath = path.join(__dirname, '../scripts/listings-output.csv');
  const raw = fs.readFileSync(csvPath, 'utf8');
  const lines = raw.split('\n').filter(l => l.trim());
  const headers = parseCSVLine(lines[0]);

  console.log(`\nParsed ${lines.length - 1} rows from CSV`);
  console.log('Headers:', headers.join(', '));

  // ── Step 1: Parse all rows ──────────────────────────────────────────────
  interface Row {
    name: string;
    phone: string;
    website: string;
    address: string;
    rating: number | null;
    reviews: number;
    city: string;
    state: string;
    category: string;
    placeId: string;
    businessStatus: string;
  }

  const rows: Row[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length < 11) continue;

    const name = cols[0];
    const city = cols[6];
    const state = cols[7];
    const category = cols[8];

    if (!name || !city || !state || !category) continue;

    rows.push({
      name,
      phone: cols[1] || '',
      website: cols[2] || '',
      address: cols[3] || '',
      rating: cols[4] ? parseFloat(cols[4]) : null,
      reviews: cols[5] ? parseInt(cols[5]) : 0,
      city,
      state,
      category,
      placeId: cols[9] || '',
      businessStatus: cols[10] || '',
    });
  }

  console.log(`\nValid rows: ${rows.length}`);

  // ── Step 2: Clear existing listings ────────────────────────────────────
  console.log('\nClearing existing listings...');
  await prisma.listing.deleteMany({});
  console.log('  Done.');

  // ── Step 3: Upsert categories ───────────────────────────────────────────
  console.log('\nUpserting categories...');
  const categoryMap: Record<string, string> = {}; // name → id

  for (const [name, slug] of Object.entries(CATEGORY_SLUG)) {
    const cat = await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    });
    categoryMap[name] = cat.id;
    console.log(`  ${name} → ${cat.id}`);
  }

  // ── Step 4: Upsert locations ────────────────────────────────────────────
  console.log('\nUpserting locations...');
  const locationMap: Record<string, string> = {}; // "city|state" → id

  const uniqueCities = [...new Set(rows.map(r => `${r.city}|${r.state}`))];
  for (const key of uniqueCities) {
    const [city, state] = key.split('|');
    const slug = slugify(`${city}-${state}`);
    const loc = await prisma.location.upsert({
      where: { slug },
      update: { city, state },
      create: { city, state, slug },
    });
    locationMap[key] = loc.id;
    console.log(`  ${city}, ${state} → ${loc.id}`);
  }

  // ── Step 5: Insert listings ─────────────────────────────────────────────
  console.log('\nInserting listings...');

  // Track slugs used in this run to avoid duplicates within the CSV
  const usedSlugs = new Set<string>();
  let inserted = 0;
  let skipped = 0;

  for (const row of rows) {
    const categoryId = categoryMap[row.category];
    const locationId = locationMap[`${row.city}|${row.state}`];

    if (!categoryId || !locationId) {
      console.warn(`  SKIP (no category/location): ${row.name}`);
      skipped++;
      continue;
    }

    // Build unique slug from name + city
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
        verified: true,   // treat Google Maps data as verified
        featured: false,
        categoryId,
        locationId,
      },
    });

    inserted++;
    if (inserted % 50 === 0) {
      console.log(`  ${inserted} inserted...`);
    }
  }

  console.log(`\n✅ Done!`);
  console.log(`   Inserted : ${inserted}`);
  console.log(`   Skipped  : ${skipped}`);
  console.log(`   Total    : ${rows.length}`);
}

main()
  .catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
