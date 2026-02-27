// GSC Data Fetcher Script
// Run with: npx tsx scripts/fetch-gsc-data.ts

import { getAuthUrl } from '../src/lib/gsc-api.js';
import { getSearchAnalytics } from '../src/lib/gsc-api.js';

const SITE_URL = 'https://gosolarindex.in';

/**
 * Step 1: Generate OAuth authorization URL
 * Run this first to get the authorization URL, visit it, and copy the auth code
 */
async function generateAuthUrl() {
  const authUrl = getAuthUrl();
  console.log('=== OAuth Authorization URL ===');
  console.log(authUrl);
  console.log('\n1. Visit the URL above');
  console.log('2. Sign in and authorize the app');
  console.log('3. Copy the authorization code from the callback URL');
  console.log('4. Run: npx tsx scripts/fetch-gsc-data.ts [auth_code]');
}

/**
 * Step 2: Fetch performance data using authorization code
 */
async function fetchPerformanceData(authCode: string) {
  try {
    console.log('Fetching GSC performance data...');

    const endDate = new Date().toISOString().split('T')[0]; // Today
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 7 days ago

    console.log(`Date range: ${startDate} to ${endDate}`);

    // Fetch top keywords
    const topKeywords = await getSearchAnalytics(SITE_URL, {
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: 50,
    });

    console.log('\n=== Top Keywords (Last 7 Days) ===');
    console.log('Query | Clicks | Impressions | CTR | Position');
    console.log('---'.repeat(20));
    topKeywords.forEach(row => {
      const query = row.keys[0];
      console.log(`${query.padEnd(30)} | ${row.clicks.toString().padStart(6)} | ${row.impressions.toString().padStart(11)} | ${(row.ctr * 100).toFixed(1).padStart(5)}% | ${row.position.toFixed(1).padStart(7)}`);
    });

    // Fetch top pages
    const topPages = await getSearchAnalytics(SITE_URL, {
      startDate,
      endDate,
      dimensions: ['page'],
      rowLimit: 50,
    });

    console.log('\n=== Top Pages (Last 7 Days) ===');
    console.log('Page | Clicks | Impressions | CTR | Position');
    console.log('---'.repeat(20));
    topPages.forEach(row => {
      const page = row.keys[0];
      console.log(`${page.substring(0, 40).padEnd(40)} | ${row.clicks.toString().padStart(6)} | ${row.impressions.toString().padStart(11)} | ${(row.ctr * 100).toFixed(1).padStart(5)}% | ${row.position.toFixed(1).padStart(7)}`);
    });

    // Generate markdown output for keyword-tracking-sheet.md
    console.log('\n=== Markdown Output ===');
    console.log('Update keyword-tracking-sheet.md with the following data:\n');

    topKeywords.slice(0, 20).forEach((row, index) => {
      const query = row.keys[0];
      const position = row.position < 3 ? 'Top 3' : row.position < 10 ? '4-10' : row.position < 20 ? '11-20' : row.position < 50 ? '21-50' : '50+';
      console.log(`| ${query} | ${position} | ${row.clicks} | ${row.impressions} | ${(row.ctr * 100).toFixed(1)}% | /blog/ | 🔴 |`);
    });

  } catch (error) {
    console.error('Error fetching GSC data:', error);
    throw error;
  }
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // No auth code provided, generate authorization URL
    await generateAuthUrl();
  } else {
    // Auth code provided, fetch data
    const authCode = args[0];
    await fetchPerformanceData(authCode);
  }
}

main().catch(console.error);
