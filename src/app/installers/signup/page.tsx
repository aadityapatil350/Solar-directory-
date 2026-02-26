'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import { Zap, Building2, MapPin, Phone, Mail, Globe, FileText, CheckCircle, Loader2 } from 'lucide-react';

export default function InstallerSignup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    // Company Info
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    website: '',
    
    // Business Details
    category: '',
    yearsExperience: '',
    teamSize: '',
    serviceAreas: [] as string[],
    
    // Documents
    mnreApproved: false,
    panAvailable: false,
    
    // Account
    password: '',
    confirmPassword: '',
  });

  const serviceAreas = [
    'Residential Installation',
    'Commercial Installation',
    'Industrial Rooftop',
    'Solar Panel Sales',
    'Solar Inverter Sales',
    'Solar Battery Systems',
    'AMC & Maintenance',
    'Consultancy',
    'Design & Engineering',
  ];

  const categories = [
    'Residential Installers',
    'Commercial Installers',
    'Solar Panel Dealers',
    'Solar Inverter Specialists',
    'Solar AMC & Maintenance',
  ];

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Jammu & Kashmir', 'Chandigarh', 'Puducherry',
  ];

  const handleServiceAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      serviceAreas: prev.serviceAreas.includes(area)
        ? prev.serviceAreas.filter(a => a !== a)
        : [...prev.serviceAreas, area],
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.companyName && formData.contactPerson && formData.email && formData.phone);
      case 2:
        return !!(formData.category && formData.yearsExperience);
      case 3:
        return true;
      case 4:
        return !!(formData.password && formData.confirmPassword);
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validate all steps
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4)) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/installers/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const StepIndicator = ({ step, title, completed }: { step: number; title: string; completed: boolean }) => (
    <div className={`flex items-center gap-3 ${completed ? 'text-orange-600' : 'text-gray-400'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${completed ? 'bg-orange-500' : 'bg-gray-200'}`}>
        {completed && <CheckCircle className="h-5 w-5 text-white" />}
      </div>
      <span className="font-medium">{step}. {title}</span>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
      <p className="text-gray-600 mb-6">Tell us about your solar business</p>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
          <input
            type="text"
            required
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="SunRise Solar Solutions"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
          <input
            type="text"
            required
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="info@company.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
        <textarea
          rows={2}
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          placeholder="Street, City, State, PIN"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="Mumbai"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <select
            required
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <div className="relative">
            <Globe className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="https://company.com"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Business Details</h2>
      <p className="text-gray-600 mb-6">Tell us about your services</p>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Service Category *</label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
          <select
            required
            value={formData.yearsExperience}
            onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select Experience</option>
            <option value="1-2">1-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="11-15">11-15 years</option>
            <option value="15+">15+ years</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Team Size *</label>
          <select
            required
            value={formData.teamSize}
            onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select Team Size</option>
            <option value="1-5">1-5 employees</option>
            <option value="6-10">6-10 employees</option>
            <option value="11-20">11-20 employees</option>
            <option value="21-50">21-50 employees</option>
            <option value="50+">50+ employees</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Areas</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Services You Offer</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
          {serviceAreas.map((area) => (
            <label key={area} className="flex items-center gap-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-orange-500 transition">
              <input
                type="checkbox"
                className="w-4 h-4 text-orange-500 rounded"
                checked={formData.serviceAreas.includes(area)}
                onChange={() => handleServiceAreaToggle(area)}
              />
              <span className="text-sm">{area}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Documents & Certifications</h2>
      <p className="text-gray-600 mb-6">Upload your business documents (optional)</p>
      
      <div className="grid md:grid-cols-2 gap-4">
        <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer">
          <input
            type="checkbox"
            checked={formData.mnreApproved}
            onChange={(e) => setFormData({ ...formData, mnreApproved: e.target.checked })}
            className="w-5 h-5 text-orange-500"
          />
          <div>
            <FileText className="h-5 w-5 text-gray-600" />
            <div className="flex flex-col">
              <span className="font-medium">MNRE Approved</span>
              <span className="text-xs text-gray-500">Ministry of New and Renewable Energy</span>
            </div>
          </div>
        </label>

        <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer">
          <input
            type="checkbox"
            checked={formData.panAvailable}
            onChange={(e) => setFormData({ ...formData, panAvailable: e.target.checked })}
            className="w-5 h-5 text-orange-500"
          />
          <div>
            <FileText className="h-5 w-5 text-gray-600" />
            <div className="flex flex-col">
              <span className="font-medium">PAN Available</span>
              <span className="text-xs text-gray-500">PAN Application Number</span>
            </div>
          </div>
        </label>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Documents are optional for registration. You can upload them later in your dashboard.
        </p>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
      <p className="text-gray-600 mb-6">Set up your account credentials</p>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
          <input
            type="password"
            required
            minLength={6}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="At least 6 characters"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
          <input
            type="password"
            required
            minLength={6}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="Re-enter password"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mt-4">
        <p className="text-sm text-gray-600">
          <strong>Password Requirements:</strong>
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
          <li>Minimum 6 characters</li>
          <li>Must contain letters and numbers</li>
          <li>Should be memorable but secure</li>
        </ul>
      </div>
    </div>
  );

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for joining Go Solar Index. Your account has been created and you can now access the installer dashboard.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Next Steps:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>We will review your application within 24-48 hours</li>
                <li>You'll receive a confirmation email at <strong>{formData.email}</strong></li>
                <li>Once verified, you'll be able to access your installer dashboard</li>
                <li>You can then purchase leads and upgrade your subscription</li>
              </ol>
            </div>
            <div className="flex gap-3 justify-center">
              <Link
                href="/installers/login"
                className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Go to Login
              </Link>
              <Link
                href="/"
                className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="h-10 w-10 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-900">Installer Signup</h1>
            <Link href="/" className="text-gray-600 hover:text-gray-900 ml-auto">
              ← Back to Home
            </Link>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <p className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>{message.text}</p>
            </div>
          )}

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 bg-white rounded-xl p-4">
            <StepIndicator step={1} title="Company Info" completed={step > 1} />
            <div className="h-1 flex-1 bg-gray-200 mx-2"></div>
            <StepIndicator step={2} title="Business Details" completed={step > 2} />
            <div className="h-1 flex-1 bg-gray-200 mx-2"></div>
            <StepIndicator step={3} title="Documents" completed={step > 3} />
            <div className="h-1 flex-1 bg-gray-200 mx-2"></div>
            <StepIndicator step={4} title="Account" completed={step > 4} />
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Back
            </button>

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!validateStep(step)}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
