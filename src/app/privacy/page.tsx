import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy — GoSolarIndex',
  description: 'Learn how GoSolarIndex collects, uses, and protects your personal information. We respect your privacy and comply with Indian data protection laws.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> March 7, 2026
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to GoSolarIndex ("we," "our," or "us"). We operate the website{' '}
                <strong>gosolarindex.in</strong> (the "Platform"), India's most trusted solar installer directory.
              </p>
              <p className="text-gray-700 mb-4">
                This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our Platform. By using GoSolarIndex, you agree to the practices described in this policy.
              </p>
              <p className="text-gray-700 mb-4">
                We are committed to protecting your privacy and complying with applicable Indian data protection laws, including the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Information You Provide</h3>
              <p className="text-gray-700 mb-4">When you use our Platform, we may collect:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Lead Form Data:</strong> Name, email, phone number, location, project details, budget, and any message you submit when requesting quotes from solar installers.</li>
                <li><strong>Installer Account Data:</strong> Business name, owner name, email, phone, business address, GST number, licenses, certifications, website URL, and payment information.</li>
                <li><strong>Communication Data:</strong> Any correspondence you send to us via email, contact forms, or customer support.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Device & Browser Data:</strong> IP address, browser type, operating system, device type, screen resolution.</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent, search queries, clicks, referring URLs, and interaction patterns.</li>
                <li><strong>Location Data:</strong> Approximate location based on IP address (not GPS tracking).</li>
                <li><strong>Cookies & Similar Technologies:</strong> We use cookies, web beacons, and local storage to improve user experience and analyze Platform usage.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Third-Party Data</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Google Places API:</strong> We use Google Maps and Google Places API to display business locations, verify addresses, and provide map-based search. Google's privacy policy applies to this data.</li>
                <li><strong>Social Media Data:</strong> If you interact with us on social media or link your social accounts, we may receive publicly available profile information.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use collected information for the following purposes:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Lead Generation:</strong> Connect homeowners with verified solar installers by sharing lead form submissions.</li>
                <li><strong>Platform Operation:</strong> Provide, maintain, and improve our directory services.</li>
                <li><strong>Installer Services:</strong> Enable installer accounts, manage subscriptions, process payments, and deliver leads.</li>
                <li><strong>Communication:</strong> Send transactional emails (lead notifications, account updates), promotional emails (with opt-out option), and respond to inquiries.</li>
                <li><strong>Analytics:</strong> Understand user behavior, improve search algorithms, and optimize Platform performance.</li>
                <li><strong>Security:</strong> Detect fraud, prevent abuse, and protect user data.</li>
                <li><strong>Legal Compliance:</strong> Comply with Indian laws, resolve disputes, and enforce our Terms of Service.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Share Your Information</h2>
              <p className="text-gray-700 mb-4">We do NOT sell your personal information. We share data only in these situations:</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 With Solar Installers</h3>
              <p className="text-gray-700 mb-4">
                When you submit a lead form, we share your contact details (name, phone, email, project details) with verified solar installers in your area. This is the core purpose of our Platform.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 With Service Providers</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Hosting:</strong> Vercel (for website hosting)</li>
                <li><strong>Database:</strong> Supabase (for data storage)</li>
                <li><strong>Payments:</strong> Razorpay (for processing installer subscriptions)</li>
                <li><strong>Email:</strong> Email service providers for transactional and marketing emails</li>
                <li><strong>Analytics:</strong> Google Analytics (anonymized data)</li>
                <li><strong>Maps:</strong> Google Maps Platform for location services</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose information if required by law, court order, government authority, or to protect our rights, safety, or property.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.4 Business Transfers</h3>
              <p className="text-gray-700 mb-4">
                In case of merger, acquisition, or sale of assets, your information may be transferred to the new entity.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies & Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">We use the following types of cookies:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for Platform functionality (login sessions, forms).</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Platform (Google Analytics).</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and choices.</li>
                <li><strong>Advertising Cookies:</strong> Used for targeted ads (if applicable).</li>
              </ul>
              <p className="text-gray-700 mb-4">
                You can control cookies via your browser settings. Note that disabling cookies may limit Platform functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Encrypted database storage</li>
                <li>Password hashing (bcrypt)</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
              </ul>
              <p className="text-gray-700 mb-4">
                However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="text-gray-700 mb-4">Under Indian law, you have the following rights:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data.</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information.</li>
                <li><strong>Deletion:</strong> Request deletion of your data (subject to legal obligations).</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails (link in every email).</li>
                <li><strong>Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise these rights, contact us at{' '}
                <a href="mailto:hello@gosolarindex.in" className="text-orange-600 hover:underline">
                  hello@gosolarindex.in
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your information for as long as necessary to provide services and comply with legal obligations:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Lead Data:</strong> Retained for 2 years after submission.</li>
                <li><strong>Installer Accounts:</strong> Retained while account is active, plus 1 year after closure.</li>
                <li><strong>Transaction Records:</strong> Retained for 7 years (tax compliance).</li>
                <li><strong>Cookies:</strong> Most expire after 1 year; you can delete anytime.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Links</h2>
              <p className="text-gray-700 mb-4">
                Our Platform may contain links to third-party websites (installer websites, social media, partners). We are NOT responsible for their privacy practices. Please review their privacy policies before sharing information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                GoSolarIndex is not intended for users under 18 years of age. We do not knowingly collect data from children. If you believe a child has provided us with personal information, contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. International Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your data is primarily stored in India. Some service providers (Google, Vercel) may store data in international servers with adequate security measures.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy periodically. The "Last Updated" date will reflect changes. Continued use of the Platform after updates constitutes acceptance of the revised policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-4">
                <p className="text-gray-900 font-semibold mb-2">GoSolarIndex</p>
                <p className="text-gray-700">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:hello@gosolarindex.in" className="text-orange-600 hover:underline">
                    hello@gosolarindex.in
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> +91-93732-38164
                </p>
                <p className="text-gray-700">
                  <strong>Website:</strong>{' '}
                  <Link href="/" className="text-orange-600 hover:underline">
                    gosolarindex.in
                  </Link>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Grievance Officer</h2>
              <p className="text-gray-700 mb-4">
                In accordance with the Information Technology Act, 2000, if you have any grievances related to the processing of your personal information, you may contact our Grievance Officer:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="text-gray-700">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:hello@gosolarindex.in" className="text-orange-600 hover:underline">
                    hello@gosolarindex.in
                  </a>
                </p>
                <p className="text-gray-700 mt-2">
                  We will acknowledge your complaint within 48 hours and resolve it within 30 days.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
