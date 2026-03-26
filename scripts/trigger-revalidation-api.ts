/**
 * Trigger on-demand revalidation via API
 *
 * Run this AFTER the deployment completes on Vercel
 *
 * Usage: npx tsx scripts/trigger-revalidation-api.ts
 */

const SITE_URL = 'https://gosolarindex.in';

const pathsToRevalidate = [
  '/listing/bengal-solar-power-extra',
  '/listing/patna-solar-services',
];

async function triggerRevalidation() {
  console.log('🔄 Triggering on-demand revalidation via API...\n');

  try {
    const response = await fetch(`${SITE_URL}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paths: pathsToRevalidate,
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Revalidation successful!');
      console.log(`   Revalidated ${data.revalidated.length} paths:`);
      data.revalidated.forEach((path: string) => {
        console.log(`   - ${path}`);
      });
    } else {
      console.log('❌ Revalidation failed:', data.message);
    }
  } catch (error: any) {
    console.log('❌ Error calling revalidation API:', error.message);
  }

  console.log('\n⏳ Waiting 5 seconds for cache to clear...\n');
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Verify the pages are now indexable
  console.log('🔍 Verifying pages are now indexable...\n');

  for (const path of pathsToRevalidate) {
    try {
      const url = `${SITE_URL}${path}`;
      const response = await fetch(url, {
        cache: 'no-store',
      });

      const html = await response.text();
      const hasNoindex = html.includes('<meta name="robots" content="noindex"');
      const hasIndexFollow = html.includes('<meta name="robots" content="index, follow"');

      console.log(`${path}:`);
      console.log(`  Status: ${response.status}`);
      console.log(`  Has noindex: ${hasNoindex ? '❌ YES' : '✅ NO'}`);
      console.log(`  Has index,follow: ${hasIndexFollow ? '✅ YES' : '❌ NO'}`);
      console.log('');
    } catch (error: any) {
      console.log(`  ❌ Error: ${error.message}\n`);
    }
  }

  console.log('✅ Done! Check the results above.');
  console.log('📝 If still showing noindex, the cache may take a few minutes to fully clear.');
}

triggerRevalidation().catch(console.error);
