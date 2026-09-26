const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

// Helper to clean scraped business names from Google Maps spam
function cleanBusinessName(raw) {
  if (!raw) return raw;
  let clean = raw
    .split('|')[0]
    .split(' - ')[0]
    .split(' :: ')[0]
    .trim();
  // Strip trailing descriptors like "Solar Panel Installation in Mumbai"
  clean = clean.replace(/\s+(Pvt\.?\s*Ltd\.?|LLP|Private\s+Limited|Limited|Ltd\.?)/i, ' $1');
  return clean.length >= 3 ? clean : raw;
}

// Helper to extract email from text / HTML
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
      !lower.endsWith('.gif') &&
      !lower.includes('example.com') &&
      !lower.includes('wixpress.com') &&
      !lower.includes('sentry.io') &&
      !lower.includes('domain.com') &&
      !lower.includes('schema.org') &&
      !lower.includes('user@') &&
      !lower.includes('email@') &&
      !lower.includes('yourname@') &&
      !lower.includes('wordpress') &&
      lower.length < 50
    );
  });
  // Prefer standard business inquiry emails
  const preferred = clean.find((e) => /^(info|contact|sales|support|hello|enquiry|admin|solar|care)@/i.test(e));
  return preferred || clean[0] || null;
}

// Helper to extract phone number if missing
function extractPhone(text) {
  if (!text) return null;
  const matches = text.match(/(?:\+91[\-\s]?)?[6-9]\d{4}[\-\s]?\d{5}/g) || [];
  if (matches.length > 0) {
    const p = matches[0].replace(/[\-\s]/g, '');
    if (p.length === 10) return `+91 ${p.slice(0, 5)} ${p.slice(5)}`;
    if (p.length === 12 && p.startsWith('91')) return `+91 ${p.slice(2, 7)} ${p.slice(7)}`;
    return matches[0];
  }
  return null;
}

// Helper to extract meta description
function extractMetaDescription(html) {
  const metaMatch =
    html.match(/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']+)["\']/i) ||
    html.match(/<meta[^>]*content=["\']([^"\']+)["\'][^>]*name=["\']description["\']/i) ||
    html.match(/<meta[^>]*property=["\']og:description["\'][^>]*content=["\']([^"\']+)["\']/i);
  if (metaMatch && metaMatch[1] && metaMatch[1].trim().length > 30) {
    return metaMatch[1]
      .trim()
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/<[^>]+>/g, '')
      .slice(0, 450);
  }
  return null;
}

// Search web fallback for businesses without website or phone
async function searchWebForBusiness(name, city) {
  const query = encodeURIComponent(`${name} solar ${city} official website contact`);
  const searchUrl = `https://html.duckduckgo.com/html/?q=${query}`;

  try {
    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) return null;
    const html = await res.text();

    // Look for website links in DDG results
    const linkMatches = html.match(/uddg=([^&]+)/g) || [];
    for (const lm of linkMatches) {
      const rawUrl = decodeURIComponent(lm.replace('uddg=', ''));
      if (
        !rawUrl.includes('duckduckgo.com') &&
        !rawUrl.includes('justdial.com') &&
        !rawUrl.includes('indiamart.com') &&
        !rawUrl.includes('facebook.com') &&
        !rawUrl.includes('instagram.com') &&
        !rawUrl.includes('linkedin.com') &&
        !rawUrl.includes('youtube.com') &&
        !rawUrl.includes('yellowpages') &&
        !rawUrl.includes('sulekha') &&
        (rawUrl.startsWith('http://') || rawUrl.startsWith('https://'))
      ) {
        return rawUrl;
      }
    }
  } catch (err) {
    // Search timed out or network error
  }
  return null;
}

// Generate contextual editorial description
function generateEditorialDescription(listing, city, state, category) {
  const cName = cleanBusinessName(listing.name);
  const addr = listing.address ? ` Located at ${listing.address}, the` : ' The';
  return `${cName} is a verified solar solutions contractor based in ${city}, ${state}.${addr} company provides end-to-end ${category.toLowerCase()} services across ${city} and neighboring districts. Specializing in residential and commercial rooftop solar projects, they assist property owners with turnkey system installation, DISCOM net-metering liaison, tier-1 solar panel selection, and PM Surya Ghar Muft Bijli Yojana subsidy processing.`;
}

// Scrape website (homepage + /contact)
async function scrapeSite(url) {
  let finalUrl = url;
  if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
    finalUrl = 'https://' + finalUrl;
  }

  let email = null;
  let phone = null;
  let desc = null;

  try {
    const res = await fetch(finalUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(6000),
    });

    if (res.ok) {
      const html = await res.text();
      email = extractEmail(html);
      phone = extractPhone(html);
      desc = extractMetaDescription(html);

      // If no email found on homepage, try /contact or /contact-us
      if (!email) {
        const contactUrl = finalUrl.replace(/\/+$/, '') + '/contact';
        try {
          const cRes = await fetch(contactUrl, {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            signal: AbortSignal.timeout(4000),
          });
          if (cRes.ok) {
            const cHtml = await cRes.text();
            email = extractEmail(cHtml);
            if (!phone) phone = extractPhone(cHtml);
          }
        } catch {}
      }
    }
  } catch (err) {
    // Fetch failed
  }

  return { email, phone, desc };
}

// Process a single listing
async function processListing(listing) {
  const updateData = {};

  let website = listing.website;

  // If website is missing, attempt search
  if (!website) {
    const foundSite = await searchWebForBusiness(listing.name, listing.location.city);
    if (foundSite) {
      website = foundSite;
      updateData.website = foundSite;
    }
  }

  // If we have a website, scrape it
  let scraped = { email: null, phone: null, desc: null };
  if (website) {
    scraped = await scrapeSite(website);
  }

  // Update email if missing
  if (!listing.email && scraped.email) {
    updateData.email = scraped.email;
  }

  // Update phone if missing
  if (!listing.phone && scraped.phone) {
    updateData.phone = scraped.phone;
  }

  // Update description if missing
  if (!listing.description) {
    updateData.description =
      scraped.desc ||
      generateEditorialDescription(
        listing,
        listing.location.city,
        listing.location.state,
        listing.category.name
      );
  }

  if (Object.keys(updateData).length > 0) {
    await prisma.listing.update({
      where: { id: listing.id },
      data: updateData,
    });
    return { id: listing.id, updated: Object.keys(updateData) };
  }

  return null;
}

// Concurrent batch runner
async function run() {
  console.log('Fetching listings needing enrichment...');

  const listings = await prisma.listing.findMany({
    where: {
      OR: [
        { email: null },
        { email: '' },
        { description: null },
        { description: '' },
        { website: null },
        { website: '' },
        { phone: null },
        { phone: '' },
      ],
    },
    include: {
      location: true,
      category: true,
    },
    orderBy: [
      { featured: 'desc' },
      { verified: 'desc' },
      { reviews: 'desc' },
    ],
  });

  console.log(`Found ${listings.length} listings to enrich.`);

  const CONCURRENCY = 8;
  let processed = 0;
  let updatedCount = 0;
  let emailsAdded = 0;

  for (let i = 0; i < listings.length; i += CONCURRENCY) {
    const chunk = listings.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(chunk.map((l) => processListing(l)));

    for (const r of results) {
      processed++;
      if (r.status === 'fulfilled' && r.value) {
        updatedCount++;
        if (r.value.updated.includes('email')) emailsAdded++;
      }
    }

    if (processed % 50 === 0 || processed === listings.length) {
      console.log(
        `Progress: ${processed}/${listings.length} (${Math.round(
          (processed / listings.length) * 100
        )}%) | Updated: ${updatedCount} | Emails added: ${emailsAdded}`
      );
    }
  }

  console.log('Enrichment complete!');
  console.log(`Total listings processed: ${processed}`);
  console.log(`Total listings enriched: ${updatedCount}`);
  console.log(`Total emails populated: ${emailsAdded}`);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
