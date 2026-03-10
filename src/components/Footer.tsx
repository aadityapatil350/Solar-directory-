import Link from 'next/link';
import { Sun } from 'lucide-react';

export default function Footer() {
  const topCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad',
    'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Surat', 'Nagpur', 'Indore', 'Bhopal', 'Chandigarh',
    'Coimbatore', 'Kochi', 'Vadodara', 'Patna', 'Visakhapatnam'
  ];

  const categories = [
    { name: 'Residential Installers', slug: 'residential-installers' },
    { name: 'Commercial Installers', slug: 'commercial-installers' },
    { name: 'Solar Panel Dealers', slug: 'solar-dealers' },
    { name: 'Solar Inverter Specialists', slug: 'inverter-specialists' },
    { name: 'Solar AMC & Maintenance', slug: 'maintenance-services' },
  ];

  const quickLinks = [
    { name: 'Solar Calculator', href: '/solar-calculator' },
    { name: 'Subsidy Checker', href: '/subsidy-checker' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sun className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold text-white">GoSolarIndex</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              India's most trusted solar directory connecting homeowners with verified solar installers across the country.
            </p>
            <div className="flex gap-4">
              <a href="tel:+919373238164" className="text-sm hover:text-orange-500 transition">
                +91-93732-38164
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-orange-500 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/installers/signup" className="text-sm text-orange-500 hover:text-orange-400 transition font-semibold">
                  List Your Business →
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="text-sm hover:text-orange-500 transition">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-white font-bold mb-4">Popular Cities</h3>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {topCities.map((city) => (
                <li key={city}>
                  <Link
                    href={`/${city.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm hover:text-orange-500 transition"
                  >
                    Solar in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} GoSolarIndex. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="hover:text-orange-500 transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-orange-500 transition">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="hover:text-orange-500 transition">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
