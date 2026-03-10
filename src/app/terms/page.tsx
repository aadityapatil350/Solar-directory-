import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'Terms of Service — GoSolarIndex',
  description: 'Terms and conditions for using GoSolarIndex directory platform. Learn about your rights, responsibilities, and our policies for installers and users.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> March 7, 2026
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                Welcome to GoSolarIndex ("Platform," "we," "our," or "us"). By accessing or using{' '}
                <strong>gosolarindex.in</strong>, you agree to be bound by these Terms of Service ("Terms").
              </p>
              <p className="text-gray-700 mb-4">
                If you do not agree to these Terms, you may not use our Platform. These Terms apply to all users, including homeowners seeking solar installers and solar installation businesses listing their services.
              </p>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. Continued use after changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Platform Description</h2>
              <p className="text-gray-700 mb-4">
                GoSolarIndex is an online directory connecting homeowners and businesses with verified solar installation companies across India. We provide:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Business listings for solar installers, dealers, and service providers</li>
                <li>Lead generation services connecting customers with installers</li>
                <li>Solar calculators, subsidy checkers, and educational resources</li>
                <li>Review and rating systems for installers</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Important:</strong> GoSolarIndex is a marketplace/directory platform only. We do NOT:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Install solar panels ourselves</li>
                <li>Employ or control the installers listed on our Platform</li>
                <li>Guarantee the quality, accuracy, or safety of installer services</li>
                <li>Act as a party to any transaction between users and installers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Homeowners & Customers</h3>
              <p className="text-gray-700 mb-4">By using our lead generation services, you agree to:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Provide accurate and truthful information in lead forms</li>
                <li>Respond to installers who contact you in a timely and respectful manner</li>
                <li>Conduct your own due diligence before hiring any installer</li>
                <li>Verify installer credentials, licenses, and insurance independently</li>
                <li>Not misuse the Platform for spam, fraud, or illegal activities</li>
                <li>Not hold GoSolarIndex liable for installer performance, pricing, or disputes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Solar Installers</h3>
              <p className="text-gray-700 mb-4">By listing your business on GoSolarIndex, you agree to:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Provide accurate, complete, and up-to-date business information</li>
                <li>Hold all necessary licenses, certifications, and insurance required by law</li>
                <li>Comply with all applicable Indian laws, regulations, and industry standards</li>
                <li>Respond to leads promptly and professionally</li>
                <li>Honor quoted prices and service commitments</li>
                <li>Not engage in false advertising, misrepresentation, or deceptive practices</li>
                <li>Not post fake reviews or manipulate ratings</li>
                <li>Pay subscription fees on time (for paid plans)</li>
                <li>Indemnify GoSolarIndex against claims arising from your services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Listing Accuracy Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                <strong>We make no warranties or guarantees</strong> about the accuracy, completeness, or reliability of installer listings. While we strive to verify businesses, we cannot guarantee:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>That listed installers are licensed, insured, or qualified</li>
                <li>The quality, safety, or legality of their work</li>
                <li>Pricing accuracy or quote validity</li>
                <li>Availability or response times</li>
                <li>That installer information is current or error-free</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>You are solely responsible</strong> for verifying installer credentials, checking references, reviewing contracts, and making informed hiring decisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Lead Generation Terms</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 How Leads Work</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>When a customer submits a lead form, we share their contact details with verified installers in the relevant location</li>
                <li>Free listings may receive leads on a rotational basis</li>
                <li>Featured listings receive priority placement and more leads</li>
                <li>Premium listings receive ALL leads from their designated city</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Lead Quality</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>We do not guarantee lead quality, conversion rates, or customer intent</li>
                <li>Leads may contact multiple installers simultaneously</li>
                <li>Customers may change their mind or not respond</li>
                <li>We do not offer refunds for "bad leads" unless there is a technical error on our end</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Lead Ownership</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Leads delivered to installers are theirs to pursue</li>
                <li>Installers must comply with applicable telemarketing and spam laws (DND registry)</li>
                <li>GoSolarIndex is not liable for installer communication practices</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payment & Subscription Terms</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Pricing</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Free Plan: No charge</li>
                <li>Featured Plan: ₹2,999/month + GST</li>
                <li>Premium Plan: ₹5,999/month + GST</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Prices are subject to change with 30 days' notice. Current customers will be grandfathered at their original pricing for 12 months.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Billing</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Subscriptions are billed monthly in advance</li>
                <li>Payments are processed via Razorpay (credit/debit cards, UPI, net banking)</li>
                <li>Failed payments may result in listing suspension after 7 days</li>
                <li>All fees are non-refundable except as required by law or our refund policy</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 Cancellation</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>You can cancel your subscription anytime from your dashboard</li>
                <li>Cancellation takes effect at the end of the current billing period</li>
                <li>No refunds for partial months</li>
                <li>After cancellation, your listing will revert to Free plan</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.4 Refund Policy</h3>
              <p className="text-gray-700 mb-4">
                We offer a <strong>7-day money-back guarantee</strong> for first-time subscribers to Featured and Premium plans. Contact us at{' '}
                <a href="mailto:hello@gosolarindex.in" className="text-orange-600 hover:underline">
                  hello@gosolarindex.in
                </a>{' '}
                within 7 days of your first payment to request a refund.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Prohibited Activities</h2>
              <p className="text-gray-700 mb-4">You may NOT:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Post false, misleading, or fraudulent information</li>
                <li>Impersonate another person or business</li>
                <li>Scrape, copy, or harvest data from the Platform</li>
                <li>Use automated bots or scripts to access the Platform</li>
                <li>Spam, harass, or abuse other users</li>
                <li>Upload malware, viruses, or malicious code</li>
                <li>Violate intellectual property rights</li>
                <li>Circumvent security measures or access restrictions</li>
                <li>Use the Platform for illegal activities</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Violation of these terms may result in immediate account suspension or termination without refund.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content on GoSolarIndex (logos, text, graphics, software, design) is owned by us or our licensors and protected by Indian and international copyright laws.
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>You may not copy, reproduce, or distribute our content without permission</li>
                <li>Installer logos and business information remain the property of respective installers</li>
                <li>By submitting content (reviews, photos), you grant us a non-exclusive license to use it on the Platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimers & Limitation of Liability</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">9.1 Platform "As Is"</h3>
              <p className="text-gray-700 mb-4">
                The Platform is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, express or implied, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Fitness for a particular purpose</li>
                <li>Accuracy or reliability of information</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Security or absence of viruses</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">9.2 No Liability for Third-Party Services</h3>
              <p className="text-gray-700 mb-4">
                We are NOT liable for:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Installer performance, work quality, or safety</li>
                <li>Disputes between users and installers</li>
                <li>Damages arising from installer services or products</li>
                <li>Third-party website content or actions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">9.3 Limitation of Damages</h3>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, our total liability for any claim arising from your use of the Platform shall not exceed:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>For installers: The amount paid by you in the 12 months preceding the claim</li>
                <li>For customers: ₹1,000 (One Thousand Rupees)</li>
              </ul>
              <p className="text-gray-700 mb-4">
                We are not liable for indirect, incidental, consequential, or punitive damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify, defend, and hold harmless GoSolarIndex, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Your use of the Platform</li>
                <li>Violation of these Terms</li>
                <li>Your installer services (for installers)</li>
                <li>Infringement of third-party rights</li>
                <li>Disputes with other users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may suspend or terminate your access to the Platform at any time, with or without notice, for:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Violation of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Non-payment (for paid plans)</li>
                <li>Abuse of the Platform or other users</li>
                <li>Any reason at our sole discretion</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Upon termination, your right to use the Platform ceases immediately. No refunds will be provided for termination due to Terms violations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Dispute Resolution</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">12.1 Governing Law</h3>
              <p className="text-gray-700 mb-4">
                These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Maharashtra, India.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">12.2 Arbitration</h3>
              <p className="text-gray-700 mb-4">
                Any dispute arising from these Terms shall be resolved through binding arbitration under the Indian Arbitration and Conciliation Act, 1996, before a single arbitrator in Maharashtra.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">12.3 Informal Resolution</h3>
              <p className="text-gray-700 mb-4">
                Before initiating formal proceedings, parties agree to attempt informal resolution by contacting us at{' '}
                <a href="mailto:hello@gosolarindex.in" className="text-orange-600 hover:underline">
                  hello@gosolarindex.in
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Privacy</h2>
              <p className="text-gray-700 mb-4">
                Your use of the Platform is subject to our{' '}
                <Link href="/privacy" className="text-orange-600 hover:underline">
                  Privacy Policy
                </Link>
                , which is incorporated into these Terms by reference.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Modifications</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated "Last Updated" date. Material changes will be notified via email to registered installers.
              </p>
              <p className="text-gray-700 mb-4">
                Your continued use of the Platform after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions, concerns, or disputes regarding these Terms, contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
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

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
              <p className="text-sm text-gray-700">
                <strong>By using GoSolarIndex, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
