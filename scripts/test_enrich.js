const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

// Helper to clean scraped business name
function cleanName(raw) {
  return raw.replace(/\|.*$/g, '').replace(/-.*$/g, '').trim();
}

// Helper to extract email from text
function extractEmail(text) {
  if (!text) return null;
  const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  const clean = emails.filter((e) => {
    const lower = e.toLowerCase();
    return (
      !lower.endsWith('.png') &&
      !lower.endsWith('.jpg') &&
      !lower.endsWith('.jpeg') &&
      !lower.endsWith('.webp') &&
      !lower.endsWith('.svg') &&
      !lower.includes('example.com') &&
      !lower.includes('wixpress.com') &&
      !lower.includes('sentry.io') &&
      !lower.includes('domain.com') &&
      !lower.includes('user@') &&
      !lower.includes('email@') &&
      lower.length < 50
    );
  });
  // Prefer info@, contact@, sales@, support@, or first valid
  const preferred = clean.find((e) => /^(info|contact|sales|support|hello|enquiry|admin)@/i.test(e));
  return preferred || clean[0] || null;
}

// Helper to extract meta description
function extractMetaDescription(html) {
  const metaMatch = html.match(/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']+)["\']/i)
    || html.match(/<meta[^>]*content=["\']([^"\']+)["\'][^>]*name=["\']description["\']/i)
    || html.match(/<meta[^>]*property=["\']og:description["\'][^>]*content=["\']([^"\']+)["\']/i);
  if (metaMatch && metaMatch[1] && metaMatch[1].trim().length > 30) {
    return metaMatch[1].trim().replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").slice(0, 450);
  }
  return null;
}

// Generate contextual editorial description if website didn't yield one
function generateEditorialDescription(listing, city, state, category) {
  const cName = cleanName(listing.name);
  const addr = listing.address ? ` Located at ${listing.address}, the` : ' The';
  return `${cName} is a solar solutions provider based in ${city}, ${state}.${addr} company specializes in ${category.toLowerCase()} across ${city} and neighboring regions, assisting homeowners and commercial properties with rooftop solar system design, DISCOM net-metering liaison, and PM Surya Ghar subsidy coordination.`;
}

async function enrichListing(listing) {
  let scrapedEmail = null;
  let scrapedDesc = null;

  if (listing.website) {
    let url = listing.website;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml',
        },
        signal: AbortSignal.timeout(6000),
      });

      if (res.ok) {
        const html = await res.text();
        scrapedEmail = extractEmail(html);
        scrapedDesc = extractMetaDescription(html);
      }
    } catch (e) {
      // Fetch failed or timed out
    }
  }

  const finalDesc = scrapedDesc || listing.description || generateEditorialDescription(
    listing,
    listing.location.city,
    listing.location.state,
    listing.category.name
  );

  const updateData = {};
  if (scrapedEmail && !listing.email) {
    updateData.email = scrapedEmail;
  }
  if (finalDesc && !listing.description) {
    updateData.description = finalDesc;
  }

  if (Object.keys(updateData).length > 0) {
    await prisma.listing.update({
      where: { id: listing.id },
      data: updateData,
    });
    return { id: listing.id, name: listing.name, ...updateData };
  }
  return null;
}

async function testBatch() {
  const batch = await prisma.listing.findMany({
    where: {
      website: { not: null },
      OR: [
        { email: null },
        { description: null }
      ]
    },
    take: 15,
    include: { location: true, category: true }
  });

  console.log(`Processing test batch of ${batch.length} listings...`);
  for (const l of batch) {
    const res = await enrichListing(l);
    console.log(`- ${l.name}:`, res ? `Updated (email: ${res.email || 'none'}, desc: ${res.description ? 'yes' : 'no'})` : 'No change');
  }
}

testBatch().catch(console.error).finally(() => prisma.$disconnect());
