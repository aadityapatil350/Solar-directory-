import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import { Zap, ShieldCheck, TrendingUp } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'About Go Solar Index',
  description: 'Learn about Go Solar Index - India\'s most trusted solar directory. Connecting homeowners with verified solar professionals since 2025.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Solar India</h1>
          
          <section className="bg-white rounded-xl p-8 mb-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Solar India is India's most trusted directory for finding reliable solar installers,
              dealers, and service providers. We connect homeowners and businesses with verified
              solar professionals across the country, making the transition to clean energy easier than ever.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 mb-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <ShieldCheck className="h-8 w-8 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Professionals</h3>
                  <p className="text-gray-600">
                    Every listing on our platform is verified to ensure you get reliable service from trusted professionals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Zap className="h-8 w-8 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Directory</h3>
                  <p className="text-gray-600">
                    From residential installers to industrial EPC companies, we have listings for every type of solar service you need.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparent Reviews</h3>
                  <p className="text-gray-600">
                    Read real reviews and ratings from actual customers to make informed decisions about your solar provider.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="space-y-2 text-gray-600">
              <p>Email: contact@solarindia.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
