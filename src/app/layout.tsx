import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Anek_Latin, Mukta } from "next/font/google";
import "./globals.css";

const anekLatin = Anek_Latin({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-anek",
  display: "swap",
});

const mukta = Mukta({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600"],
  variable: "--font-mukta",
  display: "swap",
});

const GA_ID = 'G-HRQJB0S57Q';

export const metadata: Metadata = constructMetadata({
  title: 'GoSolarIndex — Verified Solar Installers in India',
  description: 'Compare verified solar installers, dealers and AMC providers across India. Free quotes, real reviews, and PM Surya Ghar subsidy guidance.',
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
      <body className={`${anekLatin.variable} ${mukta.variable} font-body text-ink bg-paper antialiased`}>
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

        {/* Schema.org — plain <script> so it lands in the SSR HTML, not deferred to the client */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
