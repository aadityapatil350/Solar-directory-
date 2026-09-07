import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // NOTE: /claim/ is deliberately NOT disallowed. Those URLs are stuck in the
        // index as Soft 404s; they carry an X-Robots-Tag: noindex header + noindex
        // metadata, and Google must be able to crawl them to see it and drop them.
        disallow: [
          '/admin',
          '/admin/',
          '/api/',
          '/dashboard',
          '/dashboard/',
          '/installers/dashboard',
          '/installers/login',
        ],
      },
    ],
    sitemap: 'https://gosolarindex.in/sitemap.xml',
  };
}
