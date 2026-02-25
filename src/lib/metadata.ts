import { Metadata } from 'next';

export const siteName = 'Go Solar Index';
export const siteDescription = 'India\'s most trusted solar directory. Find verified solar installers, dealers, and service providers in your city. Compare prices, read reviews, go solar today!';
export const siteUrl = 'https://gosolarindex.in';

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
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export function constructCityMetadata(city: string, state: string): Metadata {
  const title = `Best Solar Installers in ${city}, ${state}`;
  const description = `Find verified solar installers, dealers, and service providers in ${city}, ${state}. Compare prices, read reviews, get free quotes. PM Surya Ghar Yojana available.`;
  return constructMetadata({
    title,
    description,
    path: `/${city.toLowerCase().replace(/\s+/g, '-')}-solar-installers`,
  });
}

export function constructCategoryMetadata(category: string): Metadata {
  const title = `${category} in India`;
  const description = `Find top ${category} across India. Verified professionals, best prices, excellent service. Get free quotes today!`;
  return constructMetadata({
    title,
    description,
    path: `/categories/${category.toLowerCase().replace(/\s+/g, '-')}`,
  });
}
