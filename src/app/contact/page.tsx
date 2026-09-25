'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Mail, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim() || '0000000000',
          email: form.email.trim(),
          requirement: `[Contact Form] Subject: ${form.subject} | Message: ${form.message}`,
          urgency: 'normal',
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('An error occurred while sending your message. Please reach us via email or WhatsApp below.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink pb-20 md:pb-0">
      <Header />

      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact', href: '/contact' },
            ]}
          />
        </div>
      </div>

      {/* Header Banner */}
      <header className="border-b border-line bg-wash py-10 sm:py-12">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider font-body">
              Support &amp; Editorial Enquiries
            </span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink mt-1.5 leading-tight">
              Contact GoSolarIndex
            </h1>
            <p className="text-base text-ink-2 mt-3 font-body leading-relaxed">
              Have questions regarding solar data, state net-metering policies, or business listing claims? Our research and support team is here to assist.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-heading font-semibold text-2xl text-ink">
                Direct channels
              </h2>
              <p className="text-sm text-ink-2 font-body mt-2 leading-relaxed">
                We respond to consumer enquiries, business claim verifications, and editorial corrections within 24 business hours.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-line rounded-sm p-5 bg-paper space-y-1">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-ink" />
                  <span className="text-xs font-semibold uppercase text-ink-2 font-body">Official Email</span>
                </div>
                <a
                  href="mailto:adityabiz350@gmail.com"
                  className="font-body font-medium text-base text-ink hover:underline block pt-1"
                >
                  adityabiz350@gmail.com
                </a>
                <p className="text-xs text-ink-2 font-body">Guaranteed reply within 24 hours</p>
              </div>

              <div className="border border-line rounded-sm p-5 bg-paper space-y-1">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-ink" />
                  <span className="text-xs font-semibold uppercase text-ink-2 font-body">WhatsApp Support</span>
                </div>
                <a
                  href="https://wa.me/919373238164"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body font-medium text-base text-ink hover:underline block pt-1"
                >
                  +91 93732 38164
                </a>
                <p className="text-xs text-ink-2 font-body">Monday to Saturday, 9:30 AM – 6:30 PM IST</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="border border-line rounded-sm p-6 sm:p-8 bg-paper">
              <h2 className="font-heading font-semibold text-2xl text-ink mb-1">
                Send a message
              </h2>
              <p className="text-xs text-ink-2 font-body mb-6">
                Fill in the details below and our team will get back to you promptly.
              </p>

              {submitted ? (
                <div className="border border-line rounded-sm p-6 bg-wash space-y-2">
                  <div className="flex items-center gap-2 text-ink">
                    <CheckCircle2 className="h-5 w-5" />
                    <h3 className="font-heading font-semibold text-base">Message received</h3>
                  </div>
                  <p className="text-sm text-ink-2 font-body leading-relaxed">
                    Thank you for reaching out. We have logged your enquiry and our team will reply to <strong>{form.email}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-wash border border-line rounded-sm flex items-center gap-2 text-ink text-xs font-semibold font-body">
                      <AlertCircle className="h-4 w-4 shrink-0 text-ink" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-name" className="block text-xs font-medium text-ink mb-1 font-body">
                        Your name *
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Rahul Patil"
                        className="w-full h-11 px-3.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink font-body"
                      />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="block text-xs font-medium text-ink mb-1 font-body">
                        Email address *
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full h-11 px-3.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink font-body"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-phone" className="block text-xs font-medium text-ink mb-1 font-body">
                        Mobile number
                      </label>
                      <input
                        id="c-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full h-11 px-3.5 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink font-body"
                      />
                    </div>
                    <div>
                      <label htmlFor="c-subject" className="block text-xs font-medium text-ink mb-1 font-body">
                        Enquiry category
                      </label>
                      <select
                        id="c-subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full h-11 px-3.5 bg-paper border border-line rounded-sm text-sm text-ink focus:outline-none focus:border-ink font-body"
                      >
                        <option value="General Question">General Question</option>
                        <option value="Listing Claim Support">Listing Claim Support</option>
                        <option value="Data Correction">Data / Policy Correction</option>
                        <option value="Advertising & Partnership">Advertising &amp; Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-message" className="block text-xs font-medium text-ink mb-1 font-body">
                      Your message *
                    </label>
                    <textarea
                      id="c-message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please share details about your question, correction, or business claim..."
                      className="w-full p-3 bg-paper border border-line rounded-sm text-sm text-ink placeholder:text-ink-2/50 focus:outline-none focus:border-ink font-body"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="h-11 px-6 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Sending message...' : 'Send message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
