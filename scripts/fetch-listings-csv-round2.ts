/**
 * fetch-listings-csv-round2.ts
 * Fetches real solar businesses for the remaining 33 cities
 * Outputs: scripts/listings-output-round2.csv
 *
 * Run: npx tsx scripts/fetch-listings-csv-round2.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const API_KEY = 'AIzaSyAauIyE8Y6PfWYyyw5aUZwJ2zQtmNZR4jg';
const OUTPUT_FILE = path.join(__dirname, 'listings-output-round2.csv');

const cities = [
  { city: 'Jodhpur', state: 'Rajasthan' },
  { city: 'Udaipur', state: 'Rajasthan' },
  { city: 'Dehradun', state: 'Uttarakhand' },
  { city: 'Amritsar', state: 'Punjab' },
  { city: 'Ludhiana', state: 'Punjab' },
  { city: 'Nashik', state: 'Maharashtra' },
  { city: 'Aurangabad', state: 'Maharashtra' },
  { city: 'Madurai', state: 'Tamil Nadu' },
  { city: 'Tiruchirappalli', state: 'Tamil Nadu' },
  { city: 'Mangalore', state: 'Karnataka' },
  { city: 'Mysore', state: 'Karnataka' },
  { city: 'Guwahati', state: 'Assam' },
  { city: 'Varanasi', state: 'Uttar Pradesh' },
  { city: 'Agra', state: 'Uttar Pradesh' },
  { city: 'Bhubaneswar', state: 'Odisha' },
  { city: 'Raipur', state: 'Chhattisgarh' },
  { city: 'Thiruvananthapuram', state: 'Kerala' },
  { city: 'Kozhikode', state: 'Kerala' },
  { city: 'Hubli', state: 'Karnataka' },
  { city: 'Belgaum', state: 'Karnataka' },
  { city: 'Rajkot', state: 'Gujarat' },
  { city: 'Bhavnagar', state: 'Gujarat' },
  { city: 'Meerut', state: 'Uttar Pradesh' },
  { city: 'Kanpur', state: 'Uttar Pradesh' },
  { city: 'Allahabad', state: 'Uttar Pradesh' },
  { city: 'Ranchi', state: 'Jharkhand' },
  { city: 'Jabalpur', state: 'Madhya Pradesh' },
  { city: 'Vijayawada', state: 'Andhra Pradesh' },
  { city: 'Nellore', state: 'Andhra Pradesh' },
  { city: 'Salem', state: 'Tamil Nadu' },
  { city: 'Tirunelveli', state: 'Tamil Nadu' },
  { city: 'Pondicherry', state: 'Puducherry' },
  { city: 'Mysuru', state: 'Karnataka' },
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
  return (data.results || []).slice(0, 10);
}

async function getPlaceDetails(placeId: string): Promise<Partial<PlaceResult>> {
  const fields = 'name,formatted_phone_number,international_phone_number,website,formatted_address,rating,user_ratings_total,business_status';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json() as any;
  if (data.status !== 'OK') return {};
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
  rows.push(['name','phone','website','address','rating','reviews','city','state','category','place_id','business_status'].join(','));

  let totalFetched = 0;
  let queryCount = 0;
  const total = cities.length * categoryQueries.length;

  console.log(`\nRound 2 — ${cities.length} cities × ${categoryQueries.length} categories = ${total} queries\n`);

  for (const { city, state } of cities) {
    for (const { category, query } of categoryQueries) {
      queryCount++;
      process.stdout.write(`[${queryCount}/${total}] ${city} — ${category} ... `);

      const results = await textSearch(query, city);
      console.log(`${results.length} found`);

      for (const place of results) {
        await sleep(120);
        const details = await getPlaceDetails(place.place_id);

        rows.push([
          escapeCSV(place.name),
          escapeCSV(details.formatted_phone_number || details.international_phone_number || ''),
          escapeCSV(details.website || ''),
          escapeCSV(details.formatted_address || place.formatted_address || ''),
          escapeCSV(details.rating || place.rating || ''),
          escapeCSV(details.user_ratings_total || place.user_ratings_total || ''),
          escapeCSV(city),
          escapeCSV(state),
          escapeCSV(category),
          escapeCSV(place.place_id),
          escapeCSV(details.business_status || place.business_status || ''),
        ].join(','));

        totalFetched++;
      }

      await sleep(400);
    }
    console.log(`  ✓ ${city} done\n`);
  }

  fs.writeFileSync(OUTPUT_FILE, rows.join('\n'), 'utf8');
  console.log(`\n✅ ${totalFetched} listings → ${OUTPUT_FILE}`);
}

main().catch(err => { console.error(err); process.exit(1); });
