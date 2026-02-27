import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Contact Us — GoSolarIndex',
  description: 'Get in touch with GoSolarIndex. Contact us for solar business listings, lead packages, or any queries. WhatsApp: +91 93732 38164 | Email: adityabiz350@gmail.com',
  path: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
