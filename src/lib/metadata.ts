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
  // Keep total title ≤ 65 chars — use standalone so no brand suffix appended
  const title = `Solar Installers in ${city} 2026 — ${count ? `${count} Verified` : 'Compare & Quote'} | GoSolarIndex`;
  const description = `Find ${count || 'verified'} solar companies in ${city}, ${state}. Get free quotes, claim PM Surya Ghar subsidy up to ₹78,000 & go solar in 2026. No spam.`;
  return constructMetadata({
    title,
    description,
    path: `/${city.toLowerCase().replace(/\s+/g, '-')}`,
    standalone: true,
  });
}

export function constructCategoryMetadata(category: string, city?: string): Metadata {
  const locationText = city ? `in ${city}` : 'in India';
  const title = `${category} ${locationText} 2026 — Verified & Rated | GoSolarIndex`;
  const description = `Find top-rated ${category} ${locationText}. Compare prices, read reviews, get free quotes. PM Surya Ghar subsidy available.`;
  return constructMetadata({
    title,
    description,
    path: `/categories/${category.toLowerCase().replace(/\s+/g, '-')}`,
    standalone: true,
  });
}
