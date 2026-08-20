/**
 * Canonical list of category slugs used across the site.
 * Every hardcoded /categories/<slug> link should route through this file.
 */
export interface CategoryEntry {
  slug: string;
  label: string;
  shortLabel: string;
  icon: string;
}

export const CATEGORIES: CategoryEntry[] = [
  { slug: 'residential-installers', label: 'Residential Installers', shortLabel: 'Residential', icon: '🏠' },
  { slug: 'commercial-installers', label: 'Commercial Installers', shortLabel: 'Commercial', icon: '🏢' },
  { slug: 'solar-dealers',         label: 'Solar Panel Dealers',   shortLabel: 'Panel Dealers', icon: '🔋' },
  { slug: 'inverter-specialists',  label: 'Inverter Specialists',  shortLabel: 'Inverter Only', icon: '⚡' },
  { slug: 'maintenance-services',  label: 'AMC & Maintenance',     shortLabel: 'AMC / Service', icon: '🔧' },
];

export const CATEGORY_SLUGS = new Set(CATEGORIES.map((c) => c.slug));

export function isValidCategorySlug(slug: string): boolean {
  return CATEGORY_SLUGS.has(slug);
}
