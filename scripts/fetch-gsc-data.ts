// GSC Data Fetcher Script
// Run with: npx tsx scripts/fetch-gsc-data.ts

import 'dotenv/config';
import { getAuthUrl, getAccessToken, getSearchAnalytics } from '../src/lib/gsc-api.js';

const SITE_URL = 'https://gosolarindex.in';

/**
 * Step 1: Generate OAuth authorization URL
 * Run this first to get authorization URL, visit it, and copy auth code
 */
async function generateAuthUrl() {
  try {
    const authUrl = getAuthUrl();
    console.log('=== OAuth Authorization URL ===');
    console.log(authUrl);
    console.log('\n' + '='.repeat(70));
    console.log('INSTRUCTIONS:');
    console.log('='.repeat(70));
    console.log('\n1. Click the URL above (or copy-paste to browser)');
    console.log('2. Sign in with your Google account');
    console.log('3. Click "Allow" to authorize the app to access Search Console');
    console.log('4. After authorization, you will be redirected to a page that shows error');
    console.log('5. Look at the BROWSER URL - it will look like:');
    console.log('   http://localhost:3000/api/auth/callback?code=4/0AXxxxxx...');
    console.log('6. Copy the code parameter (everything after "code=" and before "&")');
    console.log('7. Paste the code below to fetch GSC data');
    console.log('\nNote: Authorization codes expire in 10 minutes.\n');
  } catch (error) {
    console.error('Error generating auth URL:', error);
    throw error;
  }
}

/**
 * Step 2: Fetch performance data using authorization code
 */
async function fetchPerformanceData(authCode: string) {
  try {
    const { getOAuth2Client } = await import('../src/lib/gsc-api.js');

    console.log('Fetching GSC performance data...');

    const oauth2Client = getOAuth2Client();
    const accessToken = await getAccessToken(oauth2Client, authCode);

    console.log(`Access token obtained: ${accessToken.substring(0, 20)}...`);

    const endDate = new Date().toISOString().split('T')[0]; // Today
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 7 days ago

    console.log(`Date range: ${startDate} to ${endDate}`);
    console.log(`Site: ${SITE_URL}\n`);

    // Fetch top keywords
    console.log('Fetching top keywords...');
    const topKeywords = await getSearchAnalytics(SITE_URL, accessToken, {
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: 50,
    });

    console.log('\n=== Top Keywords (Last 7 Days) ===');
    console.log('Query'.padEnd(40), 'Clicks'.padStart(8), 'Impressions'.padStart(12), 'CTR'.padStart(8), 'Position'.padStart(10));
    console.log('-'.repeat(80));
    topKeywords.forEach(row => {
      const query = row.keys[0];
      console.log(
        query.substring(0, 40).padEnd(40),
        row.clicks.toString().padStart(8),
        row.impressions.toString().padStart(12),
        (row.ctr * 100).toFixed(1).padStart(7) + '%',
        row.position.toFixed(1).padStart(10)
      );
    });

    // Fetch top pages
    console.log('\nFetching top pages...');
    const topPages = await getSearchAnalytics(SITE_URL, accessToken, {
      startDate,
      endDate,
      dimensions: ['page'],
      rowLimit: 50,
    });

    console.log('\n=== Top Pages (Last 7 Days) ===');
    console.log('Page'.padEnd(50), 'Clicks'.padStart(8), 'Impressions'.padStart(12), 'CTR'.padStart(8), 'Position'.padStart(10));
    console.log('-'.repeat(90));
    topPages.forEach(row => {
      const page = row.keys[0];
      console.log(
        page.substring(0, 50).padEnd(50),
        row.clicks.toString().padStart(8),
        row.impressions.toString().padStart(12),
        (row.ctr * 100).toFixed(1).padStart(7) + '%',
        row.position.toFixed(1).padStart(10)
      );
    });

    // Generate markdown output for keyword-tracking-sheet.md
    console.log('\n=== Markdown Output for keyword-tracking-sheet.md ===');
    console.log('Copy the table below and update the "Primary Keywords" section:\n');

    const priorityMap: { [key: string]: string } = {
      'solar panel installation cost': '🔴',
      'pm surya ghar': '🔴',
      'best solar panels': '🔴',
      'net metering': '🔴',
      'solar subsidy': '🔴',
    };

    topKeywords.slice(0, 20).forEach((row, index) => {
      const query = row.keys[0];
      const position = row.position < 3 ? 'Top 3' : row.position < 10 ? '4-10' : row.position < 20 ? '11-20' : row.position < 50 ? '21-50' : '50+';
      const priority = priorityMap[query] || '🟢';
      console.log(`| ${query} | ${position} | ? | ${row.clicks} | ${row.impressions} | ${(row.ctr * 100).toFixed(1)}% | /blog/ | ${priority} |`);
    });

    // Summary stats
    const totalClicks = topKeywords.reduce((sum, row) => sum + row.clicks, 0);
    const totalImpressions = topKeywords.reduce((sum, row) => sum + row.impressions, 0);
    const avgCTR = topKeywords.reduce((sum, row) => sum + row.ctr, 0) / topKeywords.length;
    const avgPosition = topKeywords.reduce((sum, row) => sum + row.position, 0) / topKeywords.length;

    console.log('\n=== Summary ===');
    console.log(`Total Clicks: ${totalClicks}`);
    console.log(`Total Impressions: ${totalImpressions}`);
    console.log(`Average CTR: ${(avgCTR * 100).toFixed(2)}%`);
    console.log(`Average Position: ${avgPosition.toFixed(2)}`);

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
