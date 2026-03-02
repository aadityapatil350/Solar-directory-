/**
 * fetch-listings-csv.ts
 * Fetches real solar businesses from Google Places API for all cities + categories
 * Outputs: scripts/listings-output.csv
 *
 * Run: npx tsx scripts/fetch-listings-csv.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const API_KEY = 'AIzaSyAL2JJealgMRZ1uHB3H_-YAeJprUTC5crU';
const OUTPUT_FILE = path.join(__dirname, 'listings-output.csv');

const cities = [
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'Delhi', state: 'Delhi' },
  { city: 'Bangalore', state: 'Karnataka' },
  { city: 'Pune', state: 'Maharashtra' },
  { city: 'Hyderabad', state: 'Telangana' },
  { city: 'Chennai', state: 'Tamil Nadu' },
  { city: 'Kolkata', state: 'West Bengal' },
  { city: 'Ahmedabad', state: 'Gujarat' },
  { city: 'Jaipur', state: 'Rajasthan' },
  { city: 'Lucknow', state: 'Uttar Pradesh' },
  { city: 'Surat', state: 'Gujarat' },
  { city: 'Nagpur', state: 'Maharashtra' },
  { city: 'Indore', state: 'Madhya Pradesh' },
  { city: 'Bhopal', state: 'Madhya Pradesh' },
  { city: 'Chandigarh', state: 'Punjab' },
  { city: 'Coimbatore', state: 'Tamil Nadu' },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { city: 'Kochi', state: 'Kerala' },
  { city: 'Vadodara', state: 'Gujarat' },
  { city: 'Patna', state: 'Bihar' },
];

const categoryQueries = [
  { category: 'Residential Solar Installers', query: 'residential solar panel installer' },
  { category: 'Commercial Solar Installers', query: 'commercial solar energy company' },
  { category: 'Solar Panel Dealers', query: 'solar panel dealer supplier' },
  { category: 'Solar Inverter Specialists', query: 'solar inverter dealer' },
  { category: 'Solar AMC & Maintenance', query: 'solar panel maintenance service' },
];

interface PlaceResult {
  name: string;
  place_id: string;
  rating?: number;
  user_ratings_total?: number;
  formatted_address?: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  website?: string;
  business_status?: string;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function textSearch(query: string, city: string): Promise<PlaceResult[]> {
  const fullQuery = encodeURIComponent(`${query} in ${city} India`);
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${fullQuery}&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json() as any;

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    console.error(`  TextSearch error: ${data.status} — ${data.error_message || ''}`);
    return [];
  }

  return (data.results || []).slice(0, 10); // max 10 per query to save quota
}

async function getPlaceDetails(placeId: string): Promise<Partial<PlaceResult>> {
  const fields = 'name,formatted_phone_number,international_phone_number,website,formatted_address,rating,user_ratings_total,business_status';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json() as any;

  if (data.status !== 'OK') {
    return {};
  }

  return data.result || {};
}

function escapeCSV(val: string | number | undefined | null): string {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function main() {
  const rows: string[] = [];

  // CSV header
  rows.push([
    'name',
    'phone',
    'website',
    'address',
    'rating',
    'reviews',
    'city',
    'state',
    'category',
    'place_id',
    'business_status',
  ].join(','));

  let totalFetched = 0;
  let queryCount = 0;

  console.log(`\nStarting fetch — ${cities.length} cities × ${categoryQueries.length} categories = ${cities.length * categoryQueries.length} queries\n`);

  for (const { city, state } of cities) {
    for (const { category, query } of categoryQueries) {
      queryCount++;
      console.log(`[${queryCount}/${cities.length * categoryQueries.length}] ${city} — ${category}`);

      const results = await textSearch(query, city);
      console.log(`  Found ${results.length} places, fetching details...`);

      for (const place of results) {
        // Small delay to avoid rate limiting
        await sleep(150);

        const details = await getPlaceDetails(place.place_id);

        const phone = details.formatted_phone_number || details.international_phone_number || '';
        const website = details.website || '';
        const address = details.formatted_address || place.formatted_address || '';
        const rating = details.rating || place.rating || '';
        const reviews = details.user_ratings_total || place.user_ratings_total || '';
        const status = details.business_status || place.business_status || '';

        rows.push([
          escapeCSV(place.name),
          escapeCSV(phone),
          escapeCSV(website),
          escapeCSV(address),
          escapeCSV(rating),
          escapeCSV(reviews),
          escapeCSV(city),
          escapeCSV(state),
          escapeCSV(category),
          escapeCSV(place.place_id),
          escapeCSV(status),
        ].join(','));

        totalFetched++;
      }

      // Delay between city+category queries
      await sleep(500);
    }

    console.log(`  ✓ ${city} done\n`);
  }

  fs.writeFileSync(OUTPUT_FILE, rows.join('\n'), 'utf8');

  console.log(`\n✅ Done! ${totalFetched} listings written to:`);
  console.log(`   ${OUTPUT_FILE}`);
  console.log(`\nReview the CSV, then we'll import it to the DB.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
