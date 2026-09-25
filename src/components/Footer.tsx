import Link from 'next/link';
import { Sun, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const topCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad',
    'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Surat', 'Nagpur', 'Indore', 'Bhopal', 'Chandigarh',
  ];

  const categories = [
    { name: 'Residential Installers', slug: 'residential-installers' },
    { name: 'Commercial Installers', slug: 'commercial-installers' },
    { name: 'Solar Panel Dealers', slug: 'solar-dealers' },
    { name: 'Solar Inverter Specialists', slug: 'inverter-specialists' },
    { name: 'Solar AMC & Maintenance', slug: 'maintenance-services' },
  ];

  const quickLinks = [
    { name: 'Subsidy & Payback Calculator', href: '/tools/solar-subsidy-calculator' },
    { name: 'For Solar Installers', href: '/for-installers' },
    { name: 'Subsidy Eligibility Checker', href: '/subsidy-checker' },
    { name: 'Solar Knowledge Hub', href: '/blog' },
    { name: 'Listing Plans & Pricing', href: '/pricing' },
    { name: 'About GoSolarIndex', href: '/about' },
    { name: 'Contact Support', href: '/contact' },
  ];

  const buyingGuides = [
    { name: 'Solar Panel Cleaning Kits', href: '/guides/best-solar-panel-cleaning-kits-india' },
    { name: 'Portable Solar Generators', href: '/guides/best-portable-solar-generators-india' },
    { name: 'TOPCon vs Mono PERC Panels', href: '/guides/topcon-vs-mono-perc-solar-panels-india' },
  ];

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Sun className="h-5 w-5 fill-amber-400" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">GoSolarIndex</span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              India&apos;s premier rooftop solar directory and lead-generation portal. Connecting homeowners
              with 1,700+ verified installers, DISCOM net-metering assistance, and PM Surya Ghar central subsidies.
            </p>
            <div className="pt-2 text-xs text-zinc-500 space-y-1">
              <div>Helpline: <a href="tel:+919373238164" className="text-zinc-300 hover:text-white transition">+91-93732-38164</a></div>
              <div>Email: <a href="mailto:hello@gosolarindex.in" className="text-zinc-300 hover:text-white transition">hello@gosolarindex.in</a></div>
            </div>
          </div>

          {/* Quick Links & Tools */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Tools &amp; Portals</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-emerald-400 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/dashboard/login" className="text-emerald-400 hover:text-emerald-300 transition font-medium">
                  Owner Dashboard Login →
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories & Guides */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Solar Services</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm mb-6">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="hover:text-emerald-400 transition">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Hardware Guides</h3>
            <ul className="space-y-2 text-xs">
              {buyingGuides.map((guide) => (
                <li key={guide.href}>
                  <Link href={guide.href} className="text-zinc-400 hover:text-emerald-400 transition">
                    {guide.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Metro Cities */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Popular Cities</h3>
            <ul className="space-y-2 text-xs sm:text-sm max-h-64 overflow-y-auto">
              {topCities.map((city) => (
                <li key={city}>
                  <Link
                    href={`/${city.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-emerald-400 transition"
                  >
                    Solar in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Notice */}
        <div className="border-t border-zinc-800/80 pt-6 pb-6 text-xs text-zinc-500 leading-relaxed max-w-4xl">
          <p>
            <strong>Amazon India Affiliate Disclosure:</strong> GoSolarIndex (gosolarindex.in) is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in. Certain hardware buying guides contain affiliate links from which we may receive a commission at no additional cost to you.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} GoSolarIndex. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300 transition">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="hover:text-zinc-300 transition">
              Sitemap (XML)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
