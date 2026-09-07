import type { Metadata } from 'next';

// The claim flow is a transactional utility (account creation + OTP). It must never
// be indexed, but claim/[slug]/page.tsx is a client component and can't export
// metadata itself — this server layout carries the noindex tag for the whole route.
// Kept crawlable (not disallowed in robots.txt) so Google can see this tag and drop
// the claim URLs that are currently stuck in the index as Soft 404s.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function ClaimLayout({ children }: { children: React.ReactNode }) {
  return children;
}
