import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/dashboard', '/dashboard/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/api/', '/dashboard', '/dashboard/'],
      },
    ],
    sitemap: 'https://www.gosolarindex.in/sitemap.xml',
  };
}
