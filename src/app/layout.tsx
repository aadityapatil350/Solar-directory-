import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = constructMetadata({
  title: 'Find Best Solar Installers & Companies in India',
  description: 'Discover top-rated solar panel installers, dealers, and service providers across India. Compare prices, read reviews, get free quotes. PM Surya Ghar Yojana available.',
});

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GoSolarIndex',
  url: 'https://gosolarindex.in',
  description: "India's trusted solar installer directory",
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://gosolarindex.in/?query={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GoSolarIndex',
  url: 'https://gosolarindex.in',
  logo: 'https://gosolarindex.in/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-98765-43210',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [
    'https://twitter.com/gosolarindex',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
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
      </body>
    </html>
  );
}
