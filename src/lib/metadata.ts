import { Metadata } from 'next';

export const siteName = 'Go Solar Index';
export const siteDescription = 'India\'s most trusted solar directory. Find verified solar installers, dealers, and service providers in your city. Compare prices, read reviews, go solar today!';
export const siteUrl = 'https://www.gosolarindex.in';

export function constructMetadata({
  title,
  description,
  path = '',
  ogImage = '/og-image.png',
}: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullDescription = description || siteDescription;
  const url = `${siteUrl}${path}`;

  return {
    title: fullTitle,
    description: fullDescription,
    alternates: {
      canonical: url,
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
    authors: [{ name: 'Go Solar Index' }],
    creator: 'Go Solar Index',
    publisher: 'Go Solar Index',
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
  const displayCount = count ? `Top ${count}` : 'Best';
  const title = `${displayCount} Solar Installers in ${city} (2026) — Free Quotes + Subsidy Help`;
  const description = `Compare ${count || 'verified'} solar companies in ${city}. Get 3 free quotes, check PM Surya Ghar subsidy eligibility, and go solar in 2026. No spam, only verified installers.`;
  return constructMetadata({
    title,
    description,
    path: `/${city.toLowerCase().replace(/\s+/g, '-')}`,
  });
}

export function constructCategoryMetadata(category: string, city?: string): Metadata {
  const locationText = city ? `in ${city} India` : 'in India';
  const title = `${category} ${locationText} (2026) — Verified ${category} Near You`;
  const description = `Find top-rated ${category} ${locationText}. Compare prices, read reviews, get free quotes. PM Surya Ghar subsidy available.`;
  return constructMetadata({
    title,
    description,
    path: `/categories/${category.toLowerCase().replace(/\s+/g, '-')}`,
  });
}
