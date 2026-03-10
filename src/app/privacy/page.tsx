import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy | GoSolarIndex',
  description: 'Privacy Policy for GoSolarIndex — how we collect, use, and protect your personal information on India\'s solar installer directory.',
  path: '/privacy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-orange-100">Last updated: March 2025</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 space-y-8">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              GoSolarIndex ("we", "our", or "us") operates the website <strong>gosolarindex.in</strong>.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website. Please read this policy carefully. If you disagree with its terms,
              please stop using the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-3">We may collect the following types of information:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number — only when you submit a lead form or sign up as an installer.</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent, browser type, device info, and IP address via Google Analytics.</li>
              <li><strong>Cookies:</strong> We use cookies for analytics (Google Analytics) and advertising (Google AdSense). You can disable cookies in your browser settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>To connect you with solar installers based on your enquiry</li>
              <li>To improve our website and services</li>
              <li>To send service-related communications (no marketing spam)</li>
              <li>To display relevant advertisements via Google AdSense</li>
              <li>To analyse website traffic and usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Google AdSense & Third-Party Ads</h2>
            <p className="text-gray-600 leading-relaxed">
              We use Google AdSense to display advertisements. Google may use cookies (including the DoubleClick
              cookie) to serve ads based on your prior visits to this and other websites. You can opt out of
              personalised advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>.
              Third-party vendors including Google use cookies to serve ads based on a user's prior visits
              to our website or other websites on the internet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Google Analytics</h2>
            <p className="text-gray-600 leading-relaxed">
              We use Google Analytics to understand how visitors interact with our site. Google Analytics
              collects information such as how often users visit, what pages they visit, and what other
              sites they used prior to coming to our site. We use this data solely to improve our website.
              You can opt out via the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              When you submit a lead enquiry, your contact information is shared with up to 3 verified
              solar installers in your city who may contact you with quotes. We do not sell your personal
              data to any other third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Data Retention</h2>
            <p className="text-gray-600 leading-relaxed">
              We retain lead enquiry data for up to 12 months. Analytics data is retained per Google's
              default retention settings. You may request deletion of your data by emailing us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-2">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction or deletion of your personal data</li>
              <li>Withdraw consent for us to process your data</li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Our website is not directed at children under 13 years of age. We do not knowingly collect
              personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page
              with an updated date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this Privacy Policy, contact us at:
            </p>
            <div className="mt-3 text-gray-600 space-y-1">
              <p>Email: <a href="mailto:hello@gosolarindex.in" className="text-orange-600 hover:underline">hello@gosolarindex.in</a></p>
              <p>WhatsApp: <a href="https://wa.me/919373238164" className="text-orange-600 hover:underline">+91 93732 38164</a></p>
              <p>Website: gosolarindex.in</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
