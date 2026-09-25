/**
 * Slug sanitization & normalization utility for GoSolarIndex
 * Enforces clean URL format: [business-name]-[city]
 * Strips spammy, duplicate keywords (e.g. repeated 'solar-dealer', 'solar-panel')
 */

export function sanitizeBusinessName(name: string): string {
  // Strip common repetitive spam phrases often found in Google Maps titles
  let clean = name
    .toLowerCase()
    .replace(/\b(solar\s+panel|rooftop\s+solar|solar\s+dealer|solar\s+system|best\s+solar|distributor\s+in|dealer\s+in|switches\s+ofc\s+cable\s+in|router\s+switches|online\s+ups|battery\s+solar|inverterlift|airconditioner\s+authorised\s+luminous\s+distributor\s+in)\b/gi, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // If cleaning wiped out almost everything, revert to basic alphanumeric cleanup
  if (clean.length < 3) {
    clean = name.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  return clean.replace(/\s+/g, '-');
}

export function generateCleanListingSlug(businessName: string, city: string): string {
  const cleanName = sanitizeBusinessName(businessName);
  const cleanCity = city.toLowerCase().trim().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

  // If the cleanName already ends with the city, avoid duplicating
  if (cleanName.endsWith(`-${cleanCity}`)) {
    return cleanName.replace(/-+/g, '-').replace(/^-|-$/g, '');
  }

  const combined = `${cleanName}-${cleanCity}`.replace(/-+/g, '-').replace(/^-|-$/g, '');
  // Limit slug length to 75 characters max to prevent crawl bloat & truncation
  if (combined.length > 75) {
    const parts = combined.split('-');
    let truncated = '';
    for (const part of parts) {
      if ((truncated + '-' + part).length > 70) break;
      truncated = truncated ? `${truncated}-${part}` : part;
    }
    return `${truncated}-${cleanCity}`.replace(/-+/g, '-').replace(/^-|-$/g, '');
  }

  return combined;
}
