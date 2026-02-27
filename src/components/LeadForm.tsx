'use client';

import { useState } from 'react';
import { Phone, CheckCircle, Zap, AlertCircle } from 'lucide-react';

const CITIES = [
  'Ahmedabad', 'Bangalore', 'Bhopal', 'Chandigarh', 'Chennai',
  'Coimbatore', 'Delhi', 'Hyderabad', 'Indore', 'Jaipur',
  'Kochi', 'Kolkata', 'Lucknow', 'Mumbai', 'Nagpur',
  'Patna', 'Pune', 'Surat', 'Vadodara', 'Visakhapatnam',
];

const REQUIREMENTS = [
  { label: '3kW Home',       value: '3kW Residential' },
  { label: '5kW Home',       value: '5kW Residential' },
  { label: '10kW+',          value: '10kW+ Residential' },
  { label: 'Commercial',     value: 'Commercial Solar' },
  { label: 'Industrial',     value: 'Industrial Rooftop' },
  { label: 'Inverter Only',  value: 'Solar Inverter' },
  { label: 'AMC / Service',  value: 'AMC & Maintenance' },
  { label: 'Not sure yet',   value: 'General Enquiry' },
];

const BUDGETS = [
  '< ₹1L', '₹1L – ₹2L', '₹2L – ₹3L', '₹3L – ₹5L', '₹5L – ₹10L', '₹10L+', 'Not sure',
];

interface LeadFormProps {
  prefill?: { requirement?: string; city?: string };
  onSuccess?: () => void;
  compact?: boolean;
}

export default function LeadForm({ prefill, onSuccess, compact = false }: LeadFormProps) {
  const [name,        setName]        = useState('');
  const [phone,       setPhone]       = useState('');
  const [city,        setCity]        = useState(prefill?.city || '');
  const [requirement, setRequirement] = useState(prefill?.requirement || '');
  const [budget,      setBudget]      = useState('');
  const [urgent,      setUrgent]      = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const [success,     setSuccess]     = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanPhone = phone.replace(/\s+/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError('Enter a valid 10-digit mobile number starting with 6–9.');
      return;
    }
    if (!city) {
      setError('Please select your city.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: cleanPhone,
          city,
          requirement,
          budget,
          urgency: urgent ? 'urgent' : 'normal',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-green-900 mb-2">Request Sent!</h3>
        <p className="text-green-700 text-sm">
          Up to 3 verified solar installers in <strong>{city}</strong> will call you
          back within 24 hours. The service is completely free.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-md ${compact ? 'p-5' : 'p-6'}`}>
      {/* Header */}
      <div className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
          <Zap className="h-5 w-5 text-orange-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Get Free Solar Quotes</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            3 verified installers will call you back · Free service
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
          <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name + Phone — side by side on tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Rahul Sharma"
              className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm select-none">+91</span>
              <input
                type="tel"
                required
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="98765 43210"
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-base"
              />
            </div>
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Your City <span className="text-red-500">*</span>
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-base appearance-none"
          >
            <option value="">Select your city</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Requirement — pill buttons */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            What do you need?
          </label>
          <div className="flex flex-wrap gap-2">
            {REQUIREMENTS.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRequirement(requirement === r.value ? '' : r.value)}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-all ${
                  requirement === r.value
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Budget — pill buttons */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Budget (approx.)
          </label>
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBudget(budget === b ? '' : b)}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-all ${
                  budget === b
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Urgency toggle */}
        <div
          onClick={() => setUrgent(!urgent)}
          className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
            urgent ? 'bg-red-50 border-red-300' : 'bg-gray-50 border-gray-200'
          }`}
        >
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
            urgent ? 'bg-red-500 border-red-500' : 'border-gray-400 bg-white'
          }`}>
            {urgent && <span className="text-white text-xs font-bold">✓</span>}
          </div>
          <div>
            <p className={`text-sm font-semibold ${urgent ? 'text-red-700' : 'text-gray-700'}`}>
              This is urgent — I need help ASAP
            </p>
            <p className="text-xs text-gray-400">Installers will prioritise your call</p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 rounded-xl text-base transition-colors flex items-center justify-center gap-2 shadow-md"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              <Phone className="h-4 w-4" />
              Get Free Quotes
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">
          No spam · No charges · Only verified installers · You control who calls you
        </p>
      </form>
    </div>
  );
}
