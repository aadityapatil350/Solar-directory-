'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Submit as a lead with the message as requirement
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone || '0000000000',
        email: form.email,
        requirement: `[Contact Form] Subject: ${form.subject} | Message: ${form.message}`,
        urgency: 'normal',
      }),
    });
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">
            Have questions? Want to list your solar business? We're here to help.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-gray-600 leading-relaxed">
                Whether you're a homeowner looking for a solar installer, or a solar company
                wanting to list your business on GoSolarIndex — we'd love to hear from you.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">hello@gosolarindex.in</p>
                  <p className="text-sm text-gray-500">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                  <p className="text-sm text-gray-500">Mon–Sat, 9am–6pm IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Office</h3>
                  <p className="text-gray-600">India (Remote-First)</p>
                  <p className="text-sm text-gray-500">Serving all major cities</p>
                </div>
              </div>
            </div>

            {/* CTA box */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">List Your Solar Business</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get leads from homeowners and businesses in your city. Plans starting at ₹500/month.
              </p>
              <a
                href="/installers/signup"
                className="inline-block bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition"
              >
                Sign Up Free
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="List my business">List my solar business</option>
                      <option value="Get a quote">Get a solar quote</option>
                      <option value="Partnership">Partnership inquiry</option>
                      <option value="Report issue">Report an issue</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
