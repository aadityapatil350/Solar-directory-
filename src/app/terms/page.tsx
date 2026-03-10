import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';

export const metadata: Metadata = constructMetadata({
  title: 'Terms of Service | GoSolarIndex',
  description: 'Terms of Service for GoSolarIndex — rules and guidelines for using India\'s solar installer directory.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-orange-100">Last updated: March 2025</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 space-y-8">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using <strong>gosolarindex.in</strong> ("the Website"), you accept and agree
              to be bound by these Terms of Service. If you do not agree to these terms, please do not use
              our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. About GoSolarIndex</h2>
            <p className="text-gray-600 leading-relaxed">
              GoSolarIndex is an online directory that connects individuals and businesses seeking solar
              energy solutions with solar installers, dealers, and service providers across India.
              We are a directory platform — we do not install solar panels ourselves and are not responsible
              for the services provided by listed companies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Use of the Website</h2>
            <p className="text-gray-600 leading-relaxed mb-3">You agree to use this website only for lawful purposes. You must not:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Submit false or misleading information in lead forms</li>
              <li>Scrape or copy our listing data without permission</li>
              <li>Attempt to gain unauthorised access to any part of the website</li>
              <li>Use the site to send spam or unsolicited communications</li>
              <li>Impersonate any person or business</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Lead Enquiries</h2>
            <p className="text-gray-600 leading-relaxed">
              When you submit a lead enquiry, you consent to being contacted by up to 3 verified solar
              installers in your area. GoSolarIndex facilitates this connection but is not a party to any
              agreement between you and the installer. We are not liable for the quality of work, pricing,
              or any disputes arising from such arrangements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Listing Information</h2>
            <p className="text-gray-600 leading-relaxed">
              While we strive to maintain accurate and up-to-date listings, GoSolarIndex does not guarantee
              the accuracy, completeness, or timeliness of any listing information. Business details such as
              phone numbers, addresses, and ratings are sourced from public data and may change. Always
              verify details directly with the installer before engaging their services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Installer Accounts</h2>
            <p className="text-gray-600 leading-relaxed">
              Businesses that register as installers on our platform agree to provide accurate business
              information, respond to leads in a timely and professional manner, and comply with all
              applicable laws. GoSolarIndex reserves the right to suspend or remove any listing that
              violates these terms or receives consistent complaints.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Advertising</h2>
            <p className="text-gray-600 leading-relaxed">
              Our website may display advertisements served by Google AdSense and other third-party
              advertising networks. We are not responsible for the content of these advertisements.
              Clicking on ads is voluntary and at your own discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              All content on this website — including text, graphics, logos, and software — is the
              property of GoSolarIndex unless otherwise stated. You may not reproduce, distribute, or
              create derivative works without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Disclaimer of Warranties</h2>
            <p className="text-gray-600 leading-relaxed">
              The website is provided "as is" without any warranties, express or implied. We do not
              guarantee that the website will be available at all times or free from errors. We are not
              liable for any damages resulting from your use of the website or any installer's services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              To the maximum extent permitted by law, GoSolarIndex shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from your use of the website
              or services listed on it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service are governed by the laws of India. Any disputes shall be subject to
              the exclusive jurisdiction of the courts of Maharashtra, India.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately
              upon posting. Your continued use of the website constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">13. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about these Terms, contact us at:
            </p>
            <div className="mt-3 text-gray-600 space-y-1">
              <p>Email: <a href="mailto:hello@gosolarindex.in" className="text-orange-600 hover:underline">hello@gosolarindex.in</a></p>
              <p>WhatsApp: <a href="https://wa.me/919373238164" className="text-orange-600 hover:underline">+91 93732 38164</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
