/**
 * Revalidate specific listing pages using Next.js On-Demand Revalidation
 *
 * Usage: npx tsx scripts/revalidate-listings.ts
 */

const SITE_URL = 'https://gosolarindex.in';

const pathsToRevalidate = [
  '/listing/bengal-solar-power-extra',
  '/listing/patna-solar-services',
];

async function revalidate() {
  console.log('🔄 Revalidating listing pages...\n');

  for (const path of pathsToRevalidate) {
    try {
      const url = `${SITE_URL}${path}`;
      console.log(`Fetching ${url}...`);

      // Make a HEAD request to trigger ISR
      const response = await fetch(url, {
        method: 'HEAD',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      console.log(`  Status: ${response.status}`);

      if (response.status === 200) {
        console.log(`  ✅ Page is accessible`);
      } else {
        console.log(`  ⚠️  Unexpected status`);
      }
    } catch (error: any) {
      console.log(`  ❌ Error: ${error.message}`);
    }
    console.log('');
  }

  console.log('⏳ Waiting 10 seconds for ISR to regenerate...\n');
  await new Promise(resolve => setTimeout(resolve, 10000));

  console.log('✅ Done! The pages should be updated within the next few minutes.');
  console.log('📝 If pages still show 404, wait for the full ISR revalidation (up to 1 hour).');
}

revalidate().catch(console.error);
