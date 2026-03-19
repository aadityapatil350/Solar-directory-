import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const GA_ID = 'G-HRQJB0S57Q';
// Google AdSense Publisher ID
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-3540617055322931';

export const metadata: Metadata = constructMetadata({
  title: 'Find Solar Installers in India (2026) — 3948+ Verified Companies, Free Quotes',
  description: 'Discover top-rated solar panel installers, dealers, and service providers across India. Compare prices, read reviews, get free quotes. PM Surya Ghar Yojana available.',
});

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Go Solar Index',
  url: 'https://gosolarindex.in',
  description: "India's trusted solar installer directory",
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://gosolarindex.in/?query={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Go Solar Index',
    url: 'https://gosolarindex.in',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Go Solar Index',
  url: 'https://gosolarindex.in',
  logo: 'https://gosolarindex.in/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-93732-38164',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [
    'https://twitter.com/gosolarindex',
    'https://www.facebook.com/gosolarindex',
    'https://www.instagram.com/gosolarindex',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-3540617055322931" />
      </head>
      <body className="antialiased">
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>

        {/* Google AdSense — Auto Ads */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Schema.org */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
