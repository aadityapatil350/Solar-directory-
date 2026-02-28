'use client';

import { useState, useEffect } from 'react';
import { ListFilter, RefreshCw, Trash2, Phone, Mail, MapPin, Star, ShieldCheck, Plus, Edit, Users, Building2, Zap, Send, ChevronDown, ChevronUp, CheckCircle2, X } from 'lucide-react';

interface Listing {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  rating: number | null;
  reviews: number;
  verified: boolean;
  featured: boolean;
  location: {
    id: string;
    city: string;
    state: string;
  };
  category: {
    id: string;
    name: string;
  };
}

interface Installer {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  subscriptionType: string;
  verified: boolean;
  paymentStatus: string;
  user: {
    name: string;
    email: string;
  };
}

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

interface Stats {
  totalListings: number;
  featuredListings: number;
  verifiedListings: number;
  totalLeads: number;
  newLeads: number;
  totalInstallers: number;
  verifiedInstallers: number;
}

type Tab = 'leads' | 'listings' | 'installers';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('leads');
  const [loginEmail, setLoginEmail] = useState('');
  const [auth, setAuth] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);

  // Leads state
  const [leads, setLeads] = useState<any[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsFilter, setLeadsFilter] = useState('all');

  // Suggest-installers panel state
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [suggestInstallers, setSuggestInstallers] = useState<any[]>([]);
  const [suggestCity, setSuggestCity] = useState('');
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [sendingTo, setSendingTo] = useState<string | null>(null);

  // Listings state
  const [listings, setListings] = useState<Listing[]>([]);
  const [listingsLoading, setListingsLoading] = useState(true);
  const [showAddListingForm, setShowAddListingForm] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [listingForm, setListingForm] = useState({
    name: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    categoryId: '',
    locationId: '',
    verified: false,
    featured: false,
  });

  // Installers state
  const [installers, setInstallers] = useState<Installer[]>([]);
  const [installersLoading, setInstallersLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalListings: 0,
    featuredListings: 0,
    verifiedListings: 0,
    totalLeads: 0,
    newLeads: 0,
    totalInstallers: 0,
    verifiedInstallers: 0,
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load categories and locations for forms
  const [categories, setCategories] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);

  // Auth check — restore session from localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    const savedEmail = localStorage.getItem('adminEmail');
    const savedName = localStorage.getItem('adminName');
    if (savedAuth && savedEmail) {
      setAuth(savedAuth);
      setLoginEmail(savedEmail);
      setIsAuthenticated(true);
      if (savedName) setAdminUser({ name: savedName, email: savedEmail });
      fetchAllData(savedAuth);
      fetchLeadsWithToken(savedAuth);
    }
  }, []);

  // Reload leads when filter changes or when leads tab becomes active
  useEffect(() => {
    if (isAuthenticated && activeTab === 'leads') {
      fetchLeadsWithToken(auth);
    }
  }, [leadsFilter, activeTab, isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchAllData = async (authToken: string) => {
    try {
      // Fetch all data in parallel
      const [listingsRes, categoriesRes, locationsRes] = await Promise.all([
        fetch('/api/admin/listings', {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch('/api/categories'),
        fetch('/api/locations'),
      ]);

      const listingsData = await listingsRes.json();
      const categoriesData = await categoriesRes.json();
      const locationsData = await locationsRes.json();

      setListings(listingsData.listings || []);
      setCategories(categoriesData);
      setLocations(locationsData);
      setStats(listingsData.stats || stats);
    } catch (error) {
      console.error('Error fetching data:', error);
      showMessage('error', 'Failed to load data');
    }
  };

  // Fetch leads using a given token (avoids stale closure on auth state)
  const fetchLeadsWithToken = async (token: string, filter?: string) => {
    setLeadsLoading(true);
    try {
      const statusParam = filter ?? leadsFilter;
      const response = await fetch(`/api/admin/leads?status=${statusParam}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        console.error('Leads fetch failed:', response.status);
        setLeads([]);
        return;
      }
      const data = await response.json();
      setLeads(data.leads || []);
      if (data.adminUser) setAdminUser(data.adminUser);
      setStats(prev => ({ ...prev, totalLeads: data.stats?.total || 0, newLeads: data.stats?.new || 0 }));
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLeadsLoading(false);
    }
  };

  const fetchLeads = () => fetchLeadsWithToken(auth);

  const toggleSuggestPanel = async (lead: any) => {
    if (expandedLeadId === lead.id) {
      setExpandedLeadId(null);
      return;
    }
    if (!lead.location) {
      setExpandedLeadId(lead.id);
      setSuggestInstallers([]);
      setSuggestCity('No city on this lead');
      return;
    }
    setExpandedLeadId(lead.id);
    setSuggestLoading(true);
    try {
      const res = await fetch(
        `/api/admin/installers/suggest?locationId=${lead.location.id}&leadId=${lead.id}`,
        { headers: { Authorization: `Bearer ${auth}` } }
      );
      const data = await res.json();
      setSuggestInstallers(data.installers || []);
      setSuggestCity(data.city || lead.location.city);
    } catch {
      setSuggestInstallers([]);
    } finally {
      setSuggestLoading(false);
    }
  };

  const sendLeadToInstaller = async (leadId: string, installerId: string) => {
    setSendingTo(installerId);
    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth}` },
        body: JSON.stringify({ leadId, installerId, status: 'assigned' }),
      });
      // Refresh the suggest list so the sent installer shows as alreadySent
      const lead = leads.find((l) => l.id === leadId);
      if (lead) await toggleSuggestPanel({ ...lead, _refresh: true });
      setSuggestInstallers((prev) =>
        prev.map((inst) => inst.id === installerId ? { ...inst, alreadySent: true } : inst)
      );
      fetchLeads();
    } finally {
      setSendingTo(null);
    }
  };

  const fetchListings = async () => {
    setListingsLoading(true);
    try {
      const response = await fetch('/api/admin/listings', {
        headers: { Authorization: `Bearer ${auth}` },
      });
      const data = await response.json();
      setListings(data.listings || []);
      setStats(data.stats || stats);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setListingsLoading(false);
    }
  };

  const handleListingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingListing) {
        // Update existing
        const response = await fetch(`/api/admin/listings/${editingListing.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify(listingForm),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Update failed');
        showMessage('success', 'Listing updated successfully');
      } else {
        // Create new
        const response = await fetch('/api/admin/listings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify(listingForm),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Creation failed');
        showMessage('success', 'Listing created successfully');
      }

      fetchAllData(auth);
      handleCancelEdit();
    } catch (error) {
      showMessage('error', error instanceof Error ? error.message : 'Failed to save listing');
    }
  };

  const handleEditListing = (listing: Listing) => {
    setEditingListing(listing);
    setListingForm({
      name: listing.name,
      description: listing.description || '',
      phone: listing.phone || '',
      email: listing.email || '',
      website: listing.website || '',
      address: listing.address || '',
      categoryId: listing.category.id,
      locationId: listing.location.id,
      verified: listing.verified,
      featured: listing.featured,
    });
    setShowAddListingForm(true);
  };

  const handleDeleteListing = async (listingId: string) => {
    if (!confirm('Are you sure you want to delete this listing? This cannot be undone.')) return;

    try {
      const response = await fetch(`/api/admin/listings/${listingId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${auth}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Delete failed');

      showMessage('success', 'Listing deleted successfully');
      fetchListings();
    } catch (error) {
      showMessage('error', error instanceof Error ? error.message : 'Failed to delete listing');
    }
  };

  const handleToggleFeatured = async (listing: Listing) => {
    try {
      const response = await fetch(`/api/admin/listings/${listing.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify({ featured: !listing.featured }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Update failed');

      fetchListings();
      showMessage('success', `Listing ${listing.featured ? 'removed from' : 'added to'} featured`);
    } catch (error) {
      showMessage('error', error instanceof Error ? error.message : 'Failed to update listing');
    }
  };

  const handleCancelEdit = () => {
    setShowAddListingForm(false);
    setEditingListing(null);
    setListingForm({
      name: '',
      description: '',
      phone: '',
      email: '',
      website: '',
      address: '',
      categoryId: '',
      locationId: '',
      verified: false,
      featured: false,
    });
  };

  // Installers
  const fetchInstallers = async () => {
    setInstallersLoading(true);
    try {
      const [installersRes, usersRes] = await Promise.all([
        fetch('/api/admin/installers', {
          headers: { Authorization: `Bearer ${auth}` },
        }),
        fetch('/api/admin/users', {
          headers: { Authorization: `Bearer ${auth}` },
        }),
      ]);

      const installersData = await installersRes.json();
      const usersData = await usersRes.json();
      setInstallers(installersData.installers || []);
      setUsers(usersData.users || []);
      setStats(installersData.stats || stats);
    } catch (error) {
      console.error('Error fetching installers:', error);
    } finally {
      setInstallersLoading(false);
    }
  };

  const handleVerifyInstaller = async (installerId: string) => {
    try {
      const response = await fetch('/api/admin/installers/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify({ installerId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Verification failed');

      showMessage('success', 'Installer verified successfully');
      fetchInstallers();
    } catch (error) {
      showMessage('error', error instanceof Error ? error.message : 'Failed to verify installer');
    }
  };

  const handleDeleteInstaller = async (installerId: string) => {
    if (!confirm('Are you sure you want to delete this installer?')) return;

    try {
      const response = await fetch(`/api/admin/installers/${installerId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${auth}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Delete failed');

      showMessage('success', 'Installer deleted successfully');
      fetchInstallers();
    } catch (error) {
      showMessage('error', error instanceof Error ? error.message : 'Failed to delete installer');
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  // Login — verify credentials server-side before granting access
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail.trim(), password: auth }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Invalid credentials');
        return;
      }
      // Credentials verified — persist session
      localStorage.setItem('adminAuth', auth);
      localStorage.setItem('adminEmail', loginEmail.trim());
      if (data.name) localStorage.setItem('adminName', data.name);
      setAdminUser({ name: data.name, email: data.email });
      setIsAuthenticated(true);
      fetchAllData(auth);
      fetchLeadsWithToken(auth);
    } catch {
      setLoginError('Network error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminName');
    setAuth('');
    setLoginEmail('');
    setLeads([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <Zap className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Go Solar Index Admin</h1>
            <p className="text-gray-600">Login to manage your solar directory</p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
              <X className="h-4 w-4 flex-shrink-0" />
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter admin email"
                required
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={auth}
                onChange={(e) => setAuth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter admin password"
                required
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loginLoading ? 'Verifying...' : 'Login to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-orange-500" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                {adminUser && <p className="text-sm text-gray-600">Welcome, {adminUser.name}</p>}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => fetchAllData(auth)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className={`container mx-auto px-4 py-4 ${message.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className={`max-w-md mx-auto p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p>{message.text}</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{stats.totalListings}</div>
            <div className="text-sm text-gray-600">Total Listings</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-orange-900">{stats.featuredListings}</div>
            <div className="text-sm text-orange-700">Featured</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-900">{stats.verifiedListings}</div>
            <div className="text-sm text-blue-700">Verified</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-900">{stats.totalLeads}</div>
            <div className="text-sm text-green-700">Total Leads</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-yellow-900">{stats.newLeads}</div>
            <div className="text-sm text-yellow-700">New Leads</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-orange-900">{stats.totalInstallers}</div>
            <div className="text-sm text-orange-700">Installers</div>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-indigo-900">{stats.verifiedInstallers}</div>
            <div className="text-sm text-indigo-700">Verified</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('leads')}
                className={`flex-1 px-6 py-4 font-medium transition border-b-2 ${
                  activeTab === 'leads'
                    ? 'text-orange-600 border-orange-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <ListFilter className="h-5 w-5 inline mr-2" />
                Leads
              </button>
              <button
                onClick={() => setActiveTab('listings')}
                className={`flex-1 px-6 py-4 font-medium transition border-b-2 ${
                  activeTab === 'listings'
                    ? 'text-orange-600 border-orange-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Building2 className="h-5 w-5 inline mr-2" />
                Listings
              </button>
              <button
                onClick={() => setActiveTab('installers')}
                className={`flex-1 px-6 py-4 font-medium transition border-b-2 ${
                  activeTab === 'installers'
                    ? 'text-orange-600 border-orange-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Users className="h-5 w-5 inline mr-2" />
                Installers
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'leads' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <select
                      value={leadsFilter}
                      onChange={(e) => setLeadsFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="all">All Leads</option>
                      <option value="new">New Leads</option>
                      <option value="assigned">Assigned</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <button
                    onClick={fetchLeads}
                    className="flex items-center gap-2 px-4 py-2 text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </button>
                </div>

                {leadsLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading leads...</p>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-12 text-center">
                    <p className="text-gray-600">No leads found.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Lead</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Details</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {leads.map((lead) => (
                          <>
                            <tr key={lead.id} className={`hover:bg-gray-50 ${expandedLeadId === lead.id ? 'bg-orange-50/40' : ''}`}>
                              <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">{lead.name}</div>
                                {lead.urgency === 'urgent' && (
                                  <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium mt-1">
                                    URGENT
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline font-medium">{lead.phone}</a>
                                  </div>
                                  {lead.email && (
                                    <div className="flex items-center gap-2 text-sm">
                                      <Mail className="h-4 w-4 text-gray-400" />
                                      <span className="text-gray-600">{lead.email}</span>
                                    </div>
                                  )}
                                  {lead.location && (
                                    <div className="flex items-center gap-2 text-sm">
                                      <MapPin className="h-4 w-4 text-gray-400" />
                                      <span className="text-gray-600">{lead.location.city}, {lead.location.state}</span>
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm">
                                {lead.requirement && <div><span className="font-medium">Need:</span> {lead.requirement}</div>}
                                {lead.budget && <div className="text-gray-500 mt-0.5"><span className="font-medium">Budget:</span> {lead.budget}</div>}
                                {lead.leadDeliveries?.length > 0 && (
                                  <div className="text-xs text-green-600 mt-1 font-medium">
                                    ✓ Sent to {lead.leadDeliveries.length} installer{lead.leadDeliveries.length > 1 ? 's' : ''}
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <select
                                  value={lead.status}
                                  onChange={(e) => {
                                    fetch('/api/admin/leads', {
                                      method: 'PATCH',
                                      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth}` },
                                      body: JSON.stringify({ leadId: lead.id, status: e.target.value }),
                                    }).then(() => fetchLeads());
                                  }}
                                  className={`px-3 py-2 rounded-lg text-sm font-medium border-0 ${
                                    lead.status === 'new' ? 'bg-blue-100 text-blue-900'
                                    : lead.status === 'assigned' ? 'bg-yellow-100 text-yellow-900'
                                    : lead.status === 'contacted' ? 'bg-orange-100 text-orange-900'
                                    : 'bg-green-100 text-green-900'
                                  }`}
                                >
                                  <option value="new">New</option>
                                  <option value="assigned">Assigned</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="closed">Closed</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  {/* Suggest installers button */}
                                  <button
                                    onClick={() => toggleSuggestPanel(lead)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                                      expandedLeadId === lead.id
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                                    }`}
                                    title="Suggest installers for this lead"
                                  >
                                    <Send className="h-3.5 w-3.5" />
                                    Send
                                    {expandedLeadId === lead.id
                                      ? <ChevronUp className="h-3 w-3" />
                                      : <ChevronDown className="h-3 w-3" />
                                    }
                                  </button>
                                  <button
                                    onClick={() => {
                                      fetch(`/api/admin/leads?leadId=${lead.id}`, {
                                        method: 'DELETE',
                                        headers: { Authorization: `Bearer ${auth}` },
                                      }).then(() => fetchLeads());
                                    }}
                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                                    title="Delete Lead"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>

                            {/* ── Suggest Installers Panel ── */}
                            {expandedLeadId === lead.id && (
                              <tr key={`suggest-${lead.id}`}>
                                <td colSpan={6} className="px-6 pb-5 bg-orange-50/40 border-b border-orange-100">
                                  <div className="bg-white rounded-xl border border-orange-200 p-5 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                      <div>
                                        <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                                          <Send className="h-4 w-4 text-orange-500" />
                                          Suggested Installers
                                          {suggestCity && (
                                            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-medium">
                                              {suggestCity}
                                            </span>
                                          )}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                          Select an installer to forward this lead to
                                        </p>
                                      </div>
                                      <button onClick={() => setExpandedLeadId(null)} className="text-gray-400 hover:text-gray-600">
                                        <X className="h-4 w-4" />
                                      </button>
                                    </div>

                                    {suggestLoading ? (
                                      <div className="flex items-center gap-2 text-sm text-gray-500 py-4">
                                        <span className="w-4 h-4 border-2 border-orange-300 border-t-orange-500 rounded-full animate-spin" />
                                        Finding installers in {lead.location?.city}…
                                      </div>
                                    ) : suggestInstallers.length === 0 ? (
                                      <div className="text-sm text-gray-500 py-4 text-center">
                                        No registered installers found in {lead.location?.city || 'this city'}.
                                        <br />
                                        <span className="text-xs text-gray-400">Ask installers to sign up at /installers/signup</span>
                                      </div>
                                    ) : (
                                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {suggestInstallers.map((inst) => (
                                          <div
                                            key={inst.id}
                                            className={`border rounded-xl p-4 flex flex-col gap-3 transition ${
                                              inst.alreadySent
                                                ? 'border-green-200 bg-green-50'
                                                : 'border-gray-200 bg-white hover:border-orange-200'
                                            }`}
                                          >
                                            <div className="flex items-start justify-between gap-2">
                                              <div>
                                                <p className="font-semibold text-gray-900 text-sm">{inst.companyName}</p>
                                                <p className="text-xs text-gray-500">{inst.contactPerson}</p>
                                              </div>
                                              <div className="flex flex-col items-end gap-1 shrink-0">
                                                {inst.verified && (
                                                  <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                                                    <ShieldCheck className="h-3 w-3" /> Verified
                                                  </span>
                                                )}
                                                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                                                  inst.subscriptionType === 'premium'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                  {inst.subscriptionType}
                                                </span>
                                              </div>
                                            </div>
                                            <div className="text-xs text-gray-500 space-y-0.5">
                                              <div className="flex items-center gap-1.5">
                                                <Phone className="h-3 w-3" /> {inst.phone}
                                              </div>
                                              {inst.category && (
                                                <div className="flex items-center gap-1.5">
                                                  <Zap className="h-3 w-3" /> {inst.category}
                                                </div>
                                              )}
                                            </div>
                                            {inst.alreadySent ? (
                                              <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
                                                <CheckCircle2 className="h-4 w-4" />
                                                Lead already sent
                                              </div>
                                            ) : (
                                              <button
                                                onClick={() => sendLeadToInstaller(lead.id, inst.id)}
                                                disabled={sendingTo === inst.id}
                                                className="w-full flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white text-xs font-bold py-2 rounded-lg transition"
                                              >
                                                {sendingTo === inst.id
                                                  ? <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                  : <Send className="h-3 w-3" />
                                                }
                                                {sendingTo === inst.id ? 'Sending…' : 'Send This Lead'}
                                              </button>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {activeTab === 'listings' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Manage Listings</h2>
                  <button
                    onClick={() => {
                      handleCancelEdit();
                      setShowAddListingForm(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                  >
                    <Plus className="h-4 w-4" />
                    Add New Listing
                  </button>
                </div>

                {showAddListingForm && (
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      {editingListing ? 'Edit Listing' : 'Add New Listing'}
                    </h3>
                    <form onSubmit={handleListingSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                          <input
                            type="text"
                            required
                            value={listingForm.name}
                            onChange={(e) => setListingForm({ ...listingForm, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="SunRise Solar Solutions"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                          <select
                            required
                            value={listingForm.categoryId}
                            onChange={(e) => setListingForm({ ...listingForm, categoryId: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                          <select
                            required
                            value={listingForm.locationId}
                            onChange={(e) => setListingForm({ ...listingForm, locationId: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          >
                            <option value="">Select location</option>
                            {locations.map((loc) => (
                              <option key={loc.id} value={loc.id}>{loc.city}, {loc.state}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                          <input
                            type="tel"
                            required
                            value={listingForm.phone}
                            onChange={(e) => setListingForm({ ...listingForm, phone: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={listingForm.email}
                            onChange={(e) => setListingForm({ ...listingForm, email: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="info@company.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        <input
                          type="url"
                          value={listingForm.website}
                          onChange={(e) => setListingForm({ ...listingForm, website: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          placeholder="https://company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <input
                          type="text"
                          value={listingForm.address}
                          onChange={(e) => setListingForm({ ...listingForm, address: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          placeholder="Street, City, State"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          rows={4}
                          value={listingForm.description}
                          onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          placeholder="Brief company description..."
                        />
                      </div>
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <input
                            type="checkbox"
                            checked={listingForm.verified}
                            onChange={(e) => setListingForm({ ...listingForm, verified: e.target.checked })}
                            className="w-4 h-4 text-orange-500 rounded"
                          />
                          Verified Company
                        </label>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <input
                            type="checkbox"
                            checked={listingForm.featured}
                            onChange={(e) => setListingForm({ ...listingForm, featured: e.target.checked })}
                            className="w-4 h-4 text-orange-500 rounded"
                          />
                          Featured Listing
                        </label>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          type="submit"
                          className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                        >
                          {editingListing ? 'Update Listing' : 'Create Listing'}
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {listingsLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading listings...</p>
                  </div>
                ) : listings.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-12 text-center">
                    <p className="text-gray-600">No listings found.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Company</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Rating</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {listings.map((listing) => (
                          <tr key={listing.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{listing.name}</div>
                              <div className="flex items-center gap-2 mt-1">
                                {listing.featured && (
                                  <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">
                                    ⭐ Featured
                                  </span>
                                )}
                                {listing.verified && (
                                  <div className="flex items-center gap-1">
                                    <ShieldCheck className="h-4 w-4 text-blue-500" />
                                    <span className="text-blue-600 text-xs">Verified</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <span className="text-gray-600">{listing.phone}</span>
                                </div>
                                {listing.email && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">{listing.email}</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-600">
                                  {listing.location.city}, {listing.location.state}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {listing.rating && (
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-gray-900 text-sm">{listing.rating}</span>
                                  </div>
                                )}
                                <span className="text-xs text-gray-500">({listing.reviews} reviews)</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 flex gap-2">
                              <button
                                onClick={() => handleEditListing(listing)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleToggleFeatured(listing)}
                                className="p-2 text-gray-600 hover:bg-yellow-100 rounded-lg transition"
                                title="Toggle Featured"
                              >
                                <Star className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteListing(listing.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {activeTab === 'installers' && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Installer Accounts</h2>
                </div>

                {installersLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading installers...</p>
                  </div>
                ) : installers.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-12 text-center">
                    <p className="text-gray-600">No installer accounts yet.</p>
                    <a
                      href="/installers/signup"
                      className="inline-block mt-4 text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Go to Signup Page →
                    </a>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Company</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Subscription</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {installers.map((installer) => (
                          <tr key={installer.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{installer.companyName}</div>
                              <div className="flex items-center gap-2 mt-1">
                                {installer.verified && (
                                  <div className="flex items-center gap-1">
                                    <ShieldCheck className="h-4 w-4 text-blue-500" />
                                    <span className="text-blue-600 text-xs">Verified</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm">
                                  <Users className="h-4 w-4 text-gray-400" />
                                  <span className="text-gray-600">{installer.contactPerson}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <span className="text-gray-600">{installer.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="h-4 w-4 text-gray-400" />
                                  <span className="text-gray-600">{installer.email}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                <div className="text-sm text-gray-600">
                                  <span className="font-medium">Type:</span> {installer.subscriptionType.toUpperCase()}
                                </div>
                                <div className="text-sm text-gray-600">
                                  <span className="font-medium">Payment:</span> {installer.paymentStatus.toUpperCase()}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {!installer.verified && (
                                  <button
                                    onClick={() => handleVerifyInstaller(installer.id)}
                                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
                                  >
                                    Verify
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteInstaller(installer.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                  title="Delete Installer"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
