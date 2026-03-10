import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/installers/dashboard'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/api/', '/installers/dashboard'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin', '/api/', '/installers/dashboard'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://www.gosolarindex.in/sitemap.xml',
    host: 'https://www.gosolarindex.in',
  };
}
