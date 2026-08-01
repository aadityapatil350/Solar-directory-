import { Metadata } from 'next';

export const siteName = 'Go Solar Index';
export const siteDescription = "India's most trusted solar directory. Find verified solar installers, dealers, and service providers in your city. Compare prices, read reviews, go solar today!";
export const siteUrl = 'https://gosolarindex.in';

export function constructMetadata({
  title,
  description,
  path = '',
  ogImage = '/og-image.png',
  standalone = false,
  canonicalUrl,
}: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  standalone?: boolean;
  canonicalUrl?: string;
}): Metadata {
  // standalone=true: use title as-is (for blog posts/city pages that are already fully formed)
  const fullTitle = title
    ? (standalone ? title : `${title} | ${siteName}`)
    : siteName;
  const fullDescription = description || siteDescription;
  const url = `${siteUrl}${path}`;

  return {
    title: fullTitle,
    description: fullDescription,
    alternates: {
      canonical: canonicalUrl || url,
    },
    icons: {
      icon: '/icon.svg',
      shortcut: '/icon.svg',
      apple: '/icon.svg',
    },
    keywords: [
      'solar installers India',
      'solar panel dealers',
      'residential solar',
      'commercial solar',
      'solar subsidy',
      'PM Surya Ghar',
      'solar companies',
      'solar installation',
      'solar energy India',
      'solar inverter',
      'solar battery',
      'solar AMC',
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(siteUrl),
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url,
      title: fullTitle,
      description: fullDescription,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
      creator: '@gosolarindex',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || 'Cz_rmQPT0CkxgxVyumpD4qoyt2Bkjax_gYv4k58T-1k',
    },
  };
}

export function constructCityMetadata(city: string, state: string, count?: number): Metadata {
  // Target multiple query intents in one title: "solar installers", "companies", "dealers", city, year.
  // Keep under ~60 chars where possible to avoid Google truncation.
  const countLabel = count ? `${count}+ ` : '';
  const title = `Solar Panel Installers in ${city} — ${countLabel}Companies & Prices (2026)`;
  const description = `Compare ${count ? `${count} verified` : 'top'} solar companies, panel dealers & installers in ${city}, ${state}. 3kW from ₹42k after ₹78,000 PM Surya Ghar subsidy. Free quotes, no spam calls.`;
  return constructMetadata({
    title,
    description,
    path: `/${city.toLowerCase().replace(/\s+/g, '-')}`,
    standalone: true,
  });
}

export function constructCategoryMetadata(category: string, city?: string): Metadata {
  const locationText = city ? `in ${city}` : 'in India';
  const title = `${category} ${locationText} — Verified Companies, Prices & Reviews (2026)`;
  const description = `Find top-rated ${category.toLowerCase()} ${locationText}. Compare prices, read verified reviews, get 3 free quotes. PM Surya Ghar subsidy up to ₹78,000 available.`;
  return constructMetadata({
    title,
    description,
    path: `/categories/${category.toLowerCase().replace(/\s+/g, '-')}`,
    standalone: true,
  });
}

export function constructStateMetadata(state: string, cityCount?: number, listingCount?: number): Metadata {
  const cLabel = listingCount ? `${listingCount}+ ` : '';
  const title = `Solar Installers in ${state} — ${cLabel}Verified Companies & Dealers (2026)`;
  const desc = `Compare ${listingCount ? `${listingCount} verified` : 'top'} solar installers & panel dealers across ${cityCount ? `${cityCount}+ cities in ` : ''}${state}. PM Surya Ghar subsidy up to ₹78,000, free quotes, DISCOM approved.`;
  return constructMetadata({
    title,
    description: desc,
    path: `/states/${state.toLowerCase().replace(/\s+/g, '-')}`,
    standalone: true,
  });
}
