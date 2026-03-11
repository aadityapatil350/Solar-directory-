import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/installers/dashboard', '/dashboard/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/api/', '/installers/dashboard', '/dashboard/'],
      },
    ],
    sitemap: 'https://www.gosolarindex.in/sitemap.xml',
  };
}
