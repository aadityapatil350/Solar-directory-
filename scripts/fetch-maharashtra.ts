/**
 * fetch-maharashtra.ts
 * Fetches solar businesses for ALL major Maharashtra cities from Google Places API.
 * Reads API key from GOOGLE_MAPS_API_KEY env var — never hardcoded.
 *
 * Run: npx tsx scripts/fetch-maharashtra.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
if (!API_KEY) {
  console.error('ERROR: GOOGLE_MAPS_API_KEY not set in .env');
  process.exit(1);
}

const OUTPUT_FILE = path.join(__dirname, 'listings-maharashtra.csv');

// All major + Tier 2/3 cities of Maharashtra
const cities = [
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'Pune', state: 'Maharashtra' },
  { city: 'Nagpur', state: 'Maharashtra' },
  { city: 'Nashik', state: 'Maharashtra' },
  { city: 'Aurangabad', state: 'Maharashtra' },
  { city: 'Solapur', state: 'Maharashtra' },
  { city: 'Amravati', state: 'Maharashtra' },
  { city: 'Kolhapur', state: 'Maharashtra' },
  { city: 'Sangli', state: 'Maharashtra' },
  { city: 'Satara', state: 'Maharashtra' },
  { city: 'Latur', state: 'Maharashtra' },
  { city: 'Nanded', state: 'Maharashtra' },
  { city: 'Jalgaon', state: 'Maharashtra' },
  { city: 'Akola', state: 'Maharashtra' },
  { city: 'Dhule', state: 'Maharashtra' },
  { city: 'Ahmednagar', state: 'Maharashtra' },
  { city: 'Chandrapur', state: 'Maharashtra' },
  { city: 'Parbhani', state: 'Maharashtra' },
  { city: 'Ichalkaranji', state: 'Maharashtra' },
  { city: 'Bhiwandi', state: 'Maharashtra' },
  { city: 'Navi Mumbai', state: 'Maharashtra' },
  { city: 'Thane', state: 'Maharashtra' },
  { city: 'Kalyan', state: 'Maharashtra' },
  { city: 'Vasai', state: 'Maharashtra' },
  { city: 'Ratnagiri', state: 'Maharashtra' },
  { city: 'Wardha', state: 'Maharashtra' },
  { city: 'Beed', state: 'Maharashtra' },
  { city: 'Osmanabad', state: 'Maharashtra' },
  { city: 'Hingoli', state: 'Maharashtra' },
  { city: 'Buldhana', state: 'Maharashtra' },
];

const categoryQueries = [
  { category: 'Residential Solar Installers', query: 'residential solar panel installer' },
  { category: 'Commercial Solar Installers', query: 'commercial solar energy company' },
  { category: 'Solar Panel Dealers', query: 'solar panel dealer supplier' },
  { category: 'Solar Inverter Specialists', query: 'solar inverter dealer' },
  { category: 'Solar AMC & Maintenance', query: 'solar panel maintenance service' },
];

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function textSearch(query: string, city: string): Promise<any[]> {
  const fullQuery = encodeURIComponent(`${query} in ${city} Maharashtra India`);
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${fullQuery}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json() as any;
  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    process.stdout.write(` [${data.status}]`);
    return [];
  }
  return (data.results || []).slice(0, 10);
}

async function getDetails(placeId: string): Promise<any> {
  const fields = 'name,formatted_phone_number,international_phone_number,website,formatted_address,rating,user_ratings_total,business_status';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json() as any;
  return data.status === 'OK' ? (data.result || {}) : {};
}

function escapeCSV(val: any): string {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function main() {
  const rows: string[] = [];
  rows.push(['name','phone','website','address','rating','reviews','city','state','category','place_id','business_status'].join(','));

  let total = 0;
  const totalQueries = cities.length * categoryQueries.length;
  let qCount = 0;

  console.log(`\nMaharashtra fetch — ${cities.length} cities × ${categoryQueries.length} categories = ${totalQueries} queries\n`);

  for (const { city, state } of cities) {
    for (const { category, query } of categoryQueries) {
      qCount++;
      process.stdout.write(`[${qCount}/${totalQueries}] ${city} — ${category} ... `);

      const results = await textSearch(query, city);
      console.log(`${results.length} found`);

      for (const place of results) {
        await sleep(120);
        const d = await getDetails(place.place_id);
        rows.push([
          escapeCSV(place.name),
          escapeCSV(d.formatted_phone_number || d.international_phone_number || ''),
          escapeCSV(d.website || ''),
          escapeCSV(d.formatted_address || place.formatted_address || ''),
          escapeCSV(d.rating ?? place.rating ?? ''),
          escapeCSV(d.user_ratings_total ?? place.user_ratings_total ?? ''),
          escapeCSV(city),
          escapeCSV(state),
          escapeCSV(category),
          escapeCSV(place.place_id),
          escapeCSV(d.business_status || place.business_status || ''),
        ].join(','));
        total++;
      }
      await sleep(400);
    }
    console.log(`  ✓ ${city} done\n`);
  }

  fs.writeFileSync(OUTPUT_FILE, rows.join('\n'), 'utf8');
  console.log(`\n✅ ${total} listings → ${OUTPUT_FILE}`);
}

main().catch(err => { console.error(err); process.exit(1); });
