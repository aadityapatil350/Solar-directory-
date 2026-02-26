'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import {
  Sun, Phone, Mail, MapPin, Star, ShieldCheck, Zap,
  Bell, LogOut, CheckCircle, Clock, User, ChevronRight,
  Building2, TrendingUp, AlertCircle, RefreshCw,
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  requirement: string | null;
  budget: string | null;
  urgency: string;
  status: string;
  createdAt: string;
  location: { city: string; state: string } | null;
}

interface LeadDelivery {
  id: string;
  status: string;
  openedAt: string | null;
  createdAt: string;
  paid: boolean;
  price: number | null;
  lead: Lead;
}

interface Installer {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  verified: boolean;
  subscriptionType: string;
  subscriptionEnd: string | null;
  paymentStatus: string;
  balance: number;
}

interface Listing {
  id: string;
  name: string;
  slug: string;
  rating: number | null;
  reviews: number;
  verified: boolean;
  featured: boolean;
  category: { name: string };
  location: { city: string; state: string };
}

interface DashboardData {
  installer: Installer;
  listing: Listing | null;
  leadDeliveries: LeadDelivery[];
  stats: { totalLeads: number; newLeads: number; openedLeads: number };
}

const PLAN_LABELS: Record<string, { label: string; color: string }> = {
  basic: { label: 'Basic (Free)', color: 'gray' },
  featured: { label: 'Featured', color: 'orange' },
  premium: { label: 'Premium', color: 'green' },
};

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  opened: 'bg-blue-100 text-blue-800',
  contacted: 'bg-blue-100 text-blue-800',
  converted: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
};

export default function InstallerDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'listing' | 'subscription'>('overview');
  const [updatingLead, setUpdatingLead] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch('/api/installer/dashboard');
      if (res.status === 401) {
        router.push('/installers/login');
        return;
      }
      const json = await res.json();
      setData(json);
    } catch {
      router.push('/installers/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/installers/login');
  }

  async function markLeadOpened(deliveryId: string) {
    setUpdatingLead(deliveryId);
    await fetch('/api/installer/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadDeliveryId: deliveryId, status: 'opened' }),
    });
    await fetchDashboard();
    setUpdatingLead(null);
  }

  async function updateLeadStatus(deliveryId: string, status: string) {
    setUpdatingLead(deliveryId);
    await fetch('/api/installer/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadDeliveryId: deliveryId, status }),
    });
    await fetchDashboard();
    setUpdatingLead(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { installer, listing, leadDeliveries, stats } = data;
  const plan = PLAN_LABELS[installer.subscriptionType] || PLAN_LABELS.basic;
  const newLeads = leadDeliveries.filter((ld) => ld.status === 'pending');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Dashboard header bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-xl">
              <Building2 className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">{installer.companyName}</h1>
              <p className="text-xs text-gray-500">{installer.city}, {installer.state}</p>
            </div>
            {installer.verified && (
              <span title="Verified"><ShieldCheck className="h-5 w-5 text-green-500" /></span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {newLeads.length > 0 && (
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-500" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {newLeads.length}
                </span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition border border-gray-200 rounded-lg px-3 py-1.5"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Pending verification banner */}
        {!installer.verified && (
          <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800">Account under review</p>
              <p className="text-yellow-700 text-sm">
                Your account is being verified by our team. This usually takes 24–48 hours.
                Once verified, you&apos;ll start receiving leads.
              </p>
            </div>
          </div>
        )}

        {/* Tab nav */}
        <div className="flex gap-1 bg-white rounded-xl shadow-sm p-1 mb-6 overflow-x-auto">
          {([
            { key: 'overview', label: 'Overview', icon: TrendingUp },
            { key: 'leads', label: `Leads${stats.newLeads > 0 ? ` (${stats.newLeads} new)` : ''}`, icon: Bell },
            { key: 'listing', label: 'My Listing', icon: Building2 },
            { key: 'subscription', label: 'Subscription', icon: Zap },
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                activeTab === key
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Leads', value: stats.totalLeads, icon: Bell, color: 'orange' },
                { label: 'New Leads', value: stats.newLeads, icon: AlertCircle, color: 'yellow' },
                { label: 'Opened', value: stats.openedLeads, icon: CheckCircle, color: 'green' },
                { label: 'Balance', value: `₹${installer.balance}`, icon: Zap, color: 'blue' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-xl shadow-sm p-5">
                  <div className={`inline-flex p-2 rounded-lg mb-3 bg-${color}-100`}>
                    <Icon className={`h-5 w-5 text-${color}-600`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              ))}
            </div>

            {/* Profile card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-orange-500" />
                Profile
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                {[
                  { icon: User, label: 'Contact', value: installer.contactPerson },
                  { icon: Mail, label: 'Email', value: installer.email },
                  { icon: Phone, label: 'Phone', value: installer.phone },
                  { icon: MapPin, label: 'Location', value: `${installer.city}, ${installer.state}` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-xs">{label}</p>
                      <p className="text-gray-800 font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent leads preview */}
            {leadDeliveries.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-orange-500" />
                    Recent Leads
                  </h2>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-sm text-orange-600 hover:underline flex items-center gap-1"
                  >
                    View all <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {leadDeliveries.slice(0, 3).map((ld) => (
                    <div key={ld.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {ld.status === 'pending' ? '● New Lead' : ld.lead.requirement || 'Solar Enquiry'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {ld.lead.location?.city || 'Unknown city'} · {new Date(ld.createdAt).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[ld.status] || 'bg-gray-100 text-gray-600'}`}>
                        {ld.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Your Leads ({leadDeliveries.length})</h2>
              <button
                onClick={fetchDashboard}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-orange-600 transition"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>

            {leadDeliveries.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No leads yet</p>
                <p className="text-gray-400 text-sm mt-1">
                  {installer.verified
                    ? 'Leads from your city will appear here automatically.'
                    : 'Once your account is verified, leads will start appearing here.'}
                </p>
              </div>
            ) : (
              leadDeliveries.map((ld) => (
                <div
                  key={ld.id}
                  className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${
                    ld.status === 'pending' ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">
                          {ld.status === 'pending' ? 'New Lead — Click to Reveal' : ld.lead.name}
                        </h3>
                        {ld.status === 'pending' && (
                          <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">NEW</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        {ld.lead.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {ld.lead.location.city}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {new Date(ld.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${STATUS_STYLES[ld.status] || 'bg-gray-100 text-gray-600'}`}>
                      {ld.status}
                    </span>
                  </div>

                  {ld.status === 'pending' ? (
                    <button
                      onClick={() => markLeadOpened(ld.id)}
                      disabled={updatingLead === ld.id}
                      className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition disabled:opacity-60"
                    >
                      {updatingLead === ld.id ? 'Opening...' : 'Reveal Lead Details'}
                    </button>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">{ld.lead.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <a href={`tel:${ld.lead.phone}`} className="text-orange-600 hover:underline font-medium">
                            {ld.lead.phone}
                          </a>
                        </div>
                        {ld.lead.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <a href={`mailto:${ld.lead.email}`} className="text-blue-600 hover:underline">
                              {ld.lead.email}
                            </a>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        {ld.lead.requirement && (
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">{ld.lead.requirement}</span>
                          </div>
                        )}
                        {ld.lead.budget && (
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">Budget: {ld.lead.budget}</span>
                          </div>
                        )}
                        {ld.lead.urgency === 'urgent' && (
                          <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                            <AlertCircle className="h-3 w-3" /> Urgent
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Status update buttons */}
                  {ld.status !== 'pending' && ld.status !== 'converted' && ld.status !== 'lost' && (
                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      <span className="text-xs text-gray-500 self-center">Update status:</span>
                      {['contacted', 'converted', 'lost'].map((s) => (
                        <button
                          key={s}
                          onClick={() => updateLeadStatus(ld.id, s)}
                          disabled={updatingLead === ld.id || ld.status === s}
                          className="text-xs px-3 py-1 border border-gray-200 rounded-lg hover:border-orange-400 hover:text-orange-600 transition disabled:opacity-40 disabled:cursor-not-allowed capitalize"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Listing Tab */}
        {activeTab === 'listing' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-orange-500" />
              Your Directory Listing
            </h2>
            {listing ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{listing.name}</h3>
                    <p className="text-gray-500 text-sm">{listing.category.name} · {listing.location.city}</p>
                  </div>
                  <div className="flex gap-2">
                    {listing.verified && (
                      <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        <ShieldCheck className="h-3.5 w-3.5" /> Verified
                      </span>
                    )}
                    {listing.featured && (
                      <span className="flex items-center gap-1 bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                        <Star className="h-3.5 w-3.5" /> Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 p-4 bg-gray-50 rounded-lg">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    {listing.rating ?? 0} rating
                  </span>
                  <span>{listing.reviews} reviews</span>
                </div>

                <Link
                  href={`/listing/${listing.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-orange-600 hover:underline text-sm font-medium"
                >
                  View public listing <ChevronRight className="h-4 w-4" />
                </Link>

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                  To update your listing details (description, phone, address), please contact us at{' '}
                  <a href="mailto:hello@gosolarindex.in" className="font-medium hover:underline">
                    hello@gosolarindex.in
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p>No listing found. Contact support.</p>
              </div>
            )}
          </div>
        )}

        {/* Subscription Tab */}
        {activeTab === 'subscription' && (
          <div className="space-y-6">
            {/* Current plan */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-gray-900 text-xl mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                Current Plan
              </h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
                <div>
                  <p className="font-bold text-gray-900 text-lg">{plan.label}</p>
                  <p className="text-sm text-gray-500">
                    Status:{' '}
                    <span className={installer.paymentStatus === 'active' ? 'text-green-600 font-medium' : 'text-yellow-600 font-medium'}>
                      {installer.paymentStatus}
                    </span>
                  </p>
                  {installer.subscriptionEnd && (
                    <p className="text-xs text-gray-400 mt-1">
                      Expires: {new Date(installer.subscriptionEnd).toLocaleDateString('en-IN')}
                    </p>
                  )}
                </div>
                {installer.subscriptionType === 'basic' && (
                  <Link
                    href="/pricing"
                    className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition"
                  >
                    Upgrade Plan
                  </Link>
                )}
              </div>

              {/* Plan limits */}
              <div className="space-y-3">
                {[
                  { label: 'Leads per month', value: installer.subscriptionType === 'premium' ? 'Unlimited' : installer.subscriptionType === 'featured' ? '20' : '5' },
                  { label: 'Featured placement', value: installer.subscriptionType !== 'basic' ? 'Yes' : 'No' },
                  { label: 'Verified badge', value: installer.verified ? 'Active' : 'Pending review' },
                  { label: 'Account balance', value: `₹${installer.balance}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center text-sm py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-600">{label}</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade CTA */}
            {installer.subscriptionType === 'basic' && (
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                <h3 className="font-bold text-xl mb-2">Upgrade to Featured</h3>
                <p className="text-orange-100 mb-4 text-sm">
                  Get top placement, verified badge, and up to 20 leads/month for just ₹999/month.
                </p>
                <Link
                  href="/pricing"
                  className="inline-block bg-white text-orange-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-orange-50 transition"
                >
                  View Pricing Plans
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
