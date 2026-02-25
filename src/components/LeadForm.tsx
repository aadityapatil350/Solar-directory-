'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Zap, CheckCircle } from 'lucide-react';

interface LeadFormProps {
  prefill?: {
    requirement?: string;
    locationId?: string;
  };
  onSuccess?: () => void;
}

export default function LeadForm({ prefill, onSuccess }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: prefill?.requirement || '',
    locationId: prefill?.locationId || '',
    budget: '',
    urgency: 'normal' as 'normal' | 'urgent',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setSuccess(true);
      onSuccess?.();

      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          requirement: '',
          locationId: '',
          budget: '',
          urgency: 'normal',
        });
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-900 mb-2">Thank You!</h3>
        <p className="text-green-700">
          Your request has been submitted. Our solar experts will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="h-8 w-8 text-orange-500" />
        <h2 className="text-2xl font-bold text-gray-900">
          Get Free Solar Quotes
        </h2>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              required
              pattern="[6-9]\d{9}"
              title="Enter a valid 10-digit phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="98765 43210"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email (Optional)
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Requirement */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            I'm looking for
          </label>
          <select
            value={formData.requirement}
            onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select requirement</option>
            <option value="3kW Residential">3kW Residential System</option>
            <option value="5kW Residential">5kW Residential System</option>
            <option value="10kW Commercial">10kW Commercial System</option>
            <option value="Industrial Rooftop">Industrial Rooftop</option>
            <option value="Solar Water Heater">Solar Water Heater</option>
            <option value="Solar Inverter">Solar Inverter Only</option>
            <option value="Solar Batteries">Solar Batteries</option>
            <option value="AMC & Maintenance">AMC & Maintenance</option>
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select budget</option>
            <option value="₹1L - ₹2L">₹1L - ₹2L</option>
            <option value="₹2L - ₹3L">₹2L - ₹3L</option>
            <option value="₹3L - ₹5L">₹3L - ₹5L</option>
            <option value="₹5L - ₹10L">₹5L - ₹10L</option>
            <option value="₹10L+">₹10L+</option>
            <option value="Not Sure">Not Sure</option>
          </select>
        </div>

        {/* Urgency */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="urgent"
            checked={formData.urgency === 'urgent'}
            onChange={(e) =>
              setFormData({
                ...formData,
                urgency: e.target.checked ? 'urgent' : 'normal',
              })
            }
            className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
          />
          <label htmlFor="urgent" className="text-gray-700">
            This is urgent - I need help immediately
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Get Free Solar Quotes'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          By submitting, you agree to be contacted by our verified solar partners.
        </p>
      </form>
    </div>
  );
}
