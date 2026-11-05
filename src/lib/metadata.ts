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
  noindex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  standalone?: boolean;
  canonicalUrl?: string;
  noindex?: boolean;
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
      index: !noindex,
      follow: true,
      googleBot: {
        index: !noindex,
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

const currentYear = () => new Date().getFullYear();

export function constructCityMetadata(city: string, state: string, count?: number, forceIndex?: boolean): Metadata {
  const year = currentYear();
  const countLabel = count && count > 0 ? `${count} Verified` : 'Verified';
  const cLower = city.toLowerCase();

  let title = `Best Solar Companies in ${city} (${year}) — ${countLabel} Installers & Subsidy`;
  let description = `Compare ${count && count > 0 ? `${count} verified` : 'top'} solar companies & rooftop EPC installers in ${city}, ${state}. Check 3kW–10kW prices, DISCOM net metering, ₹78,000 PM Surya Ghar subsidy & get free quotes.`;

  if (state === 'Uttar Pradesh') {
    title = `Best Solar Companies in ${city} (${year}) — Up to ₹1.08L Subsidy & ${countLabel} Installers`;
    description = `Compare ${count && count > 0 ? `${count} verified` : 'top'} solar companies in ${city}, UP. Get up to ₹1,08,000 combined subsidy (₹78K PM Surya Ghar + ₹30K UPNEDA), DISCOM net metering & get 3 free quotes.`;
  } else if (cLower === 'delhi' || state === 'Delhi') {
    title = `Best Solar Companies in Delhi (${year}) — ₹78K Subsidy + ₹3/Unit GBI Incentive`;
    description = `Compare ${count && count > 0 ? `${count} top` : 'top'} solar rooftop installers in Delhi. Check BSES / Tata Power net metering, ₹78,000 PM Surya Ghar subsidy, ₹3/kWh Delhi GBI cash reward & get free quotes.`;
  } else if (cLower === 'bengaluru' || cLower === 'bangalore') {
    title = `Best Solar Companies in Bangalore (${year}) — ${countLabel} Installers & BESCOM Net Metering`;
    description = `Compare ${count && count > 0 ? `${count} verified` : 'top'} solar installers in Bangalore (Bengaluru), Karnataka. Check 3kW–10kW prices, BESCOM net metering, ₹78,000 PM Surya Ghar subsidy & get free quotes.`;
  } else if (cLower === 'gurgaon' || cLower === 'gurugram') {
    title = `Best Solar Companies in Gurgaon (${year}) — ${countLabel} Installers & DHBVN Net Metering`;
    description = `Compare ${count && count > 0 ? `${count} verified` : 'top'} solar rooftop installers in Gurgaon (Gurugram), Haryana. Check DHBVN net metering, diesel generator bill replacement, ₹78,000 subsidy & get free quotes.`;
  } else if (cLower === 'chennai') {
    title = `Best Solar Companies in Chennai (${year}) — ${countLabel} Installers & TANGEDCO Subsidy`;
    description = `Compare ${count && count > 0 ? `${count} verified` : 'top'} solar rooftop installers in Chennai, Tamil Nadu. Check TANGEDCO net feed-in, coastal cyclone-proof structures, ₹78,000 PM Surya Ghar subsidy & get free quotes.`;
  } else if (cLower === 'coimbatore') {
    title = `Best Solar Companies in Coimbatore (${year}) — ${countLabel} Installers & TANGEDCO Net Metering`;
    description = `Compare ${count && count > 0 ? `${count} verified` : 'top'} solar installers in Coimbatore, Tamil Nadu. Check industrial & residential rooftop solar, TANGEDCO net metering, ₹78,000 subsidy & get free quotes.`;
  } else if (cLower === 'hyderabad') {
    title = `Best Solar Companies in Hyderabad (${year}) — ${countLabel} Installers & TSSPDCL Net Metering`;
    description = `Compare ${count && count > 0 ? `${count} verified` : 'top'} solar installers in Hyderabad, Telangana. Check TSSPDCL net metering, ₹78,000 PM Surya Ghar subsidy, summer power bill zeroing & get free quotes.`;
  } else if (cLower === 'jaipur') {
    title = `Best Solar Companies in Jaipur (${year}) — ${countLabel} Installers & JVVNL Net Metering`;
    description = `Compare ${count && count > 0 ? `${count} top` : 'top'} solar installers in Jaipur, Rajasthan. Check JVVNL net metering, high-radiation 3kW–10kW systems, ₹78,000 subsidy & get free quotes.`;
  } else if (cLower === 'ahmedabad') {
    title = `Best Solar Companies in Ahmedabad (${year}) — ${countLabel} Installers & Surya Gujarat Subsidy`;
    description = `Compare ${count && count > 0 ? `${count} verified` : 'top'} solar installers in Ahmedabad, Gujarat. Check UGVCL / Torrent Power net metering, ₹78,000 PM Surya Ghar subsidy & get free quotes.`;
  } else if (['bhopal', 'indore', 'gwalior', 'jabalpur'].includes(cLower)) {
    title = `Best Solar Companies in ${city} (${year}) — Experience Centre & ${countLabel} Installers`;
    description = `Compare ${count && count > 0 ? `${count} verified` : 'top'} solar rooftop installers in ${city}, MP. Visit the walk-in SolarSquare Experience Centre (10 AM–8 PM), get 3D roof simulation & ₹78,000 PM Surya Ghar subsidy.`;
  }

  return constructMetadata({
    title,
    description,
    path: `/${city.toLowerCase().replace(/\s+/g, '-')}`,
    standalone: true,
    noindex: forceIndex ? false : count === 0, // Never noindex priority hubs with fallback content
  });
}

export function constructCategoryMetadata(category: string, city?: string, count?: number, categorySlug?: string): Metadata {
  const year = currentYear();
  const locationText = city ? `in ${city}` : 'in India';
  const countLabel = count ? ` — ${count} Verified` : '';
  const title = `Best ${category} ${locationText} (${year})${countLabel}`;
  const description = `Find top-rated ${category.toLowerCase()} ${locationText}. Compare prices, read verified customer reviews, and get 3 free quotes. PM Surya Ghar subsidy up to ₹78,000 available.`;
  return constructMetadata({
    title,
    description,
    path: `/categories/${categorySlug || category.toLowerCase().replace(/\s+/g, '-')}`,
    standalone: true,
    noindex: count === 0, // Noindex if empty to prevent Soft 404s
  });
}

export function constructStateMetadata(state: string, cityCount?: number, listingCount?: number): Metadata {
  const year = currentYear();
  const cLabel = listingCount ? `${listingCount} Verified` : 'Verified';
  const title = `Best Solar Companies & Installers in ${state} (${year}) — ${cLabel}`;
  const desc = `Compare ${listingCount ? `${listingCount} verified` : 'top'} solar companies, rooftop EPC installers & panel dealers across ${cityCount ? `${cityCount}+ cities in ` : ''}${state}. PM Surya Ghar subsidy up to ₹78,000, free quotes, DISCOM approved.`;
  return constructMetadata({
    title,
    description: desc,
    path: `/states/${state.toLowerCase().replace(/\s+/g, '-')}`,
    standalone: true,
    noindex: listingCount === 0, // Noindex if empty to prevent Soft 404s
  });
}
