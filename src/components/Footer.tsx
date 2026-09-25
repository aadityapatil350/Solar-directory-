import Link from 'next/link';
import { Sun } from 'lucide-react';

export default function Footer() {
  const directoryLinks = [
    { name: 'Solar in Mumbai', href: '/mumbai' },
    { name: 'Solar in Delhi', href: '/delhi' },
    { name: 'Solar in Bangalore', href: '/bangalore' },
    { name: 'Solar in Pune', href: '/pune' },
    { name: 'Solar in Hyderabad', href: '/hyderabad' },
    { name: 'Browse all 78+ cities', href: '/locations' },
    { name: 'All 36 Indian states', href: '/states/maharashtra' },
  ];

  const planningTools = [
    { name: 'Solar subsidy calculator', href: '/tools/solar-subsidy-calculator' },
    { name: 'PM Surya Ghar guide', href: '/blog/pm-surya-ghar-yojana-complete-guide' },
    { name: 'Net metering state rules', href: '/blog/net-metering-india-2026-state-rules-guide' },
    { name: 'Solar sizing guide', href: '/blog/1kw-2kw-3kw-5kw-solar-system-india-which-size' },
    { name: 'Solar panel brands comparison', href: '/blog/solar-panel-brand-comparison-india-2026' },
  ];

  const hardwareGuides = [
    { name: 'TOPCon vs mono PERC panels', href: '/guides/topcon-vs-mono-perc-solar-panels-india' },
    { name: 'Solar panel cleaning kits', href: '/guides/best-solar-panel-cleaning-kits-india' },
    { name: 'Portable solar generators', href: '/guides/best-portable-solar-generators-india' },
    { name: 'Solar for commercial businesses', href: '/blog/commercial-solar-for-businesses-india-2026' },
    { name: 'Solar AMC and maintenance', href: '/blog/solar-amc-maintenance-guide-india-2026' },
  ];

  const forBusinesses = [
    { name: 'For solar installers', href: '/for-installers' },
    { name: 'Claim your company profile', href: '/for-installers' },
    { name: 'About GoSolarIndex', href: '/about' },
    { name: 'Contact team', href: '/contact' },
    { name: 'Privacy policy', href: '/privacy' },
    { name: 'Terms of service', href: '/terms' },
  ];

  return (
    <footer className="bg-wash border-t border-line text-ink">
      <div className="max-w-content mx-auto px-4 sm:px-6 py-12">
        {/* Brand line */}
        <div className="flex items-center gap-2 mb-8">
          <Sun className="h-6 w-6 text-sun stroke-[2.2]" />
          <span className="font-heading font-bold text-xl tracking-tight text-ink">
            GoSolarIndex
          </span>
        </div>

        {/* 4 Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-sm">
          <div>
            <h4 className="font-heading font-semibold text-ink text-sm mb-3">
              Solar directory
            </h4>
            <ul className="space-y-2 text-ink-2">
              {directoryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-ink transition-colors underline-offset-2 hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-ink text-sm mb-3">
              Planning and tools
            </h4>
            <ul className="space-y-2 text-ink-2">
              {planningTools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-ink transition-colors underline-offset-2 hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-ink text-sm mb-3">
              Hardware and guides
            </h4>
            <ul className="space-y-2 text-ink-2">
              {hardwareGuides.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-ink transition-colors underline-offset-2 hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-ink text-sm mb-3">
              For businesses
            </h4>
            <ul className="space-y-2 text-ink-2">
              {forBusinesses.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-ink transition-colors underline-offset-2 hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Data sources note per DESIGN.md */}
        <div className="border-t border-line pt-6 pb-6 text-xs text-ink-2 leading-relaxed max-w-prose">
          <p className="mb-2">
            <strong>Data sources:</strong> Subsidy slabs and DCR guidelines from Ministry of New and Renewable Energy (MNRE) and the National Portal for Rooftop Solar (pmsuryaghar.gov.in). Net-metering regulations and tariff slabs from respective State Electricity Regulatory Commissions (SERC). Solar irradiance metrics derived from NASA POWER database.
          </p>
          <p>
            <strong>Amazon India disclosure:</strong> Certain hardware guides contain affiliate links linking to Amazon.in, where GoSolarIndex may earn a small referral commission at zero additional cost to buyers.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-line pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-2">
          <p>© {new Date().getFullYear()} GoSolarIndex. An independent Indian solar register.</p>
          <div className="flex gap-4">
            <Link href="/sitemap.xml" className="hover:text-ink underline underline-offset-2">
              XML sitemap
            </Link>
            <Link href="/privacy" className="hover:text-ink underline underline-offset-2">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink underline underline-offset-2">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
