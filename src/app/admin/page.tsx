'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Zap, LogOut, RefreshCw, Trash2, Phone, Mail, MapPin, Star,
  ShieldCheck, Plus, Edit2, Send, ChevronDown, ChevronUp,
  CheckCircle2, X, Search, SlidersHorizontal, Building2,
  FileText, AlertTriangle, TrendingUp, Users2, XCircle,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

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
  location: { id: string; city: string; state: string };
  category: { id: string; name: string };
}

interface Stats {
  totalListings: number;
  featuredListings: number;
  verifiedListings: number;
  totalLeads: number;
  newLeads: number;
}

type Tab = 'leads' | 'listings';

interface Toast {
  id: number;
  type: 'success' | 'error';
  text: string;
}

// ─── Toast Component ──────────────────────────────────────────────────────────

function ToastList({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium pointer-events-auto transition-all
            ${t.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}
        >
          {t.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" />}
          <span>{t.text}</span>
          <button onClick={() => onDismiss(t.id)} className="ml-2 opacity-70 hover:opacity-100">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  // Auth
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [auth, setAuth] = useState(''); // stored plain password for Bearer token
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);

  // UI
  const [activeTab, setActiveTab] = useState<Tab>('leads');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  // Stats
  const [stats, setStats] = useState<Stats>({
    totalListings: 0, featuredListings: 0, verifiedListings: 0,
    totalLeads: 0, newLeads: 0,
  });

  // ── Leads state ──
  const [leads, setLeads] = useState<any[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsFilter, setLeadsFilter] = useState('all');
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [suggestInstallers, setSuggestInstallers] = useState<any[]>([]);
  const [suggestCity, setSuggestCity] = useState('');
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [sendingTo, setSendingTo] = useState<string | null>(null);

  // ── Listings state ──
  const [listings, setListings] = useState<Listing[]>([]);
  const [listingsLoading, setListingsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterVerified, setFilterVerified] = useState('');
  const [filterFeatured, setFilterFeatured] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [listingForm, setListingForm] = useState({
    name: '', description: '', phone: '', email: '',
    website: '', address: '', categoryId: '', locationId: '',
    verified: false, featured: false,
  });
  const [formSaving, setFormSaving] = useState(false);
  const [unfeaturing, setUnfeaturing] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // ── Helpers ──
  const toast = useCallback((type: 'success' | 'error', text: string) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Auth ──
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    const savedEmail = localStorage.getItem('adminEmail');
    const savedName = localStorage.getItem('adminName');
    if (savedAuth && savedEmail) {
      setAuth(savedAuth);
      setLoginEmail(savedEmail);
      setIsAuthenticated(true);
      if (savedName) setAdminUser({ name: savedName, email: savedEmail });
    }
  }, []);

  const headers = useCallback(
    (extra?: Record<string, string>) => ({
      Authorization: `Bearer ${auth}`,
      'Content-Type': 'application/json',
      ...extra,
    }),
    [auth],
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setLoginError(data.error || 'Invalid credentials'); return; }
      localStorage.setItem('adminAuth', loginPassword);
      localStorage.setItem('adminEmail', loginEmail.trim());
      if (data.name) localStorage.setItem('adminName', data.name);
      setAuth(loginPassword);
      setAdminUser({ name: data.name, email: data.email });
      setIsAuthenticated(true);
    } catch {
      setLoginError('Network error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    setAuth('');
    setLoginEmail('');
    setLoginPassword('');
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminName');
    setLeads([]);
    setListings([]);
  };

  // ── Fetch helpers ──
  const fetchLeads = useCallback(async (token = auth, filter = leadsFilter) => {
    setLeadsLoading(true);
    try {
      const res = await fetch(`/api/admin/leads?status=${filter}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { setLeads([]); return; }
      const data = await res.json();
      setLeads(data.leads || []);
      if (data.adminUser) setAdminUser(data.adminUser);
      setStats((prev) => ({
        ...prev,
        totalLeads: data.stats?.total || 0,
        newLeads: data.stats?.new || 0,
      }));
    } catch { setLeads([]); } finally { setLeadsLoading(false); }
  }, [auth, leadsFilter]);

  const fetchListings = useCallback(async (token = auth) => {
    setListingsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterCategory) params.set('categoryId', filterCategory);
      if (filterLocation) params.set('locationId', filterLocation);
      if (filterVerified) params.set('verified', filterVerified);
      if (filterFeatured) params.set('featured', filterFeatured);
      if (searchQuery) params.set('search', searchQuery);
      const res = await fetch(`/api/admin/listings?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setListings(data.listings || []);
      setStats((prev) => ({ ...prev, ...(data.stats || {}) }));
    } catch { /* silent */ } finally { setListingsLoading(false); }
  }, [auth, filterCategory, filterLocation, filterVerified, filterFeatured, searchQuery]);

  const fetchCatsLocs = useCallback(async () => {
    const [catsRes, locsRes] = await Promise.all([
      fetch('/api/categories'),
      fetch('/api/locations'),
    ]);
    setCategories(await catsRes.json());
    setLocations(await locsRes.json());
  }, []);

  // Load data when authenticated
  useEffect(() => {
    if (!isAuthenticated || !auth) return;
    fetchCatsLocs();
    fetchLeads(auth);
    fetchListings(auth);
  }, [isAuthenticated, auth]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reload leads when filter changes
  useEffect(() => {
    if (isAuthenticated && auth) fetchLeads(auth, leadsFilter);
  }, [leadsFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reload listings when filters change
  useEffect(() => {
    if (isAuthenticated && auth) fetchListings(auth);
  }, [filterCategory, filterLocation, filterVerified, filterFeatured]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Listings actions (optimistic) ──

  const toggleFeatured = async (listing: Listing) => {
    const newVal = !listing.featured;
    // Optimistic update
    setListings((prev) => prev.map((l) => l.id === listing.id ? { ...l, featured: newVal } : l));
    setStats((prev) => ({
      ...prev,
      featuredListings: prev.featuredListings + (newVal ? 1 : -1),
    }));
    try {
      setTogglingId(listing.id + '-featured');
      const res = await fetch('/api/admin/listings', {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify({ id: listing.id, featured: newVal }),
      });
      if (!res.ok) throw new Error();
      toast('success', newVal ? `⭐ "${listing.name}" is now Featured` : `Removed featured from "${listing.name}"`);
    } catch {
      // Rollback
      setListings((prev) => prev.map((l) => l.id === listing.id ? { ...l, featured: !newVal } : l));
      setStats((prev) => ({
        ...prev,
        featuredListings: prev.featuredListings + (newVal ? -1 : 1),
      }));
      toast('error', 'Failed to update featured status');
    } finally {
      setTogglingId(null);
    }
  };

  const toggleVerified = async (listing: Listing) => {
    const newVal = !listing.verified;
    setListings((prev) => prev.map((l) => l.id === listing.id ? { ...l, verified: newVal } : l));
    setStats((prev) => ({
      ...prev,
      verifiedListings: prev.verifiedListings + (newVal ? 1 : -1),
    }));
    try {
      setTogglingId(listing.id + '-verified');
      const res = await fetch('/api/admin/listings', {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify({ id: listing.id, verified: newVal }),
      });
      if (!res.ok) throw new Error();
      toast('success', newVal ? `✓ "${listing.name}" verified` : `Unverified "${listing.name}"`);
    } catch {
      setListings((prev) => prev.map((l) => l.id === listing.id ? { ...l, verified: !newVal } : l));
      setStats((prev) => ({
        ...prev,
        verifiedListings: prev.verifiedListings + (newVal ? -1 : 1),
      }));
      toast('error', 'Failed to update verified status');
    } finally {
      setTogglingId(null);
    }
  };

  const unfeatureAll = async () => {
    if (!confirm('Remove Featured status from ALL listings? This affects what shows on the homepage.')) return;
    setUnfeaturing(true);
    try {
      const res = await fetch('/api/admin/listings/unfeature-all', {
        method: 'POST',
        headers: headers(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      // Update local state
      setListings((prev) => prev.map((l) => ({ ...l, featured: false })));
      setStats((prev) => ({ ...prev, featuredListings: 0 }));
      toast('success', data.message || 'All listings unfeatured');
    } catch (err) {
      toast('error', 'Failed to unfeature all listings');
    } finally {
      setUnfeaturing(false);
    }
  };

  const deleteListing = async (listing: Listing) => {
    if (!confirm(`Delete "${listing.name}"? This cannot be undone.`)) return;
    // Optimistic
    setListings((prev) => prev.filter((l) => l.id !== listing.id));
    try {
      const res = await fetch(`/api/admin/listings?listingId=${listing.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${auth}` },
      });
      if (!res.ok) throw new Error();
      toast('success', `"${listing.name}" deleted`);
    } catch {
      // Rollback by refetching
      fetchListings();
      toast('error', 'Failed to delete listing');
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
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingListing(null);
    setListingForm({
      name: '', description: '', phone: '', email: '',
      website: '', address: '', categoryId: '', locationId: '',
      verified: false, featured: false,
    });
  };

  const handleListingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSaving(true);
    try {
      const body = editingListing
        ? { id: editingListing.id, ...listingForm }
        : listingForm;

      const res = await fetch('/api/admin/listings', {
        method: editingListing ? 'PATCH' : 'POST',
        headers: headers(),
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');

      toast('success', editingListing ? 'Listing updated' : 'Listing created');
      cancelForm();
      fetchListings();
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Failed to save listing');
    } finally {
      setFormSaving(false);
    }
  };

  // ── Leads actions (optimistic) ──

  const updateLeadStatus = async (leadId: string, status: string) => {
    // Optimistic
    setLeads((prev) => prev.map((l) => l.id === leadId ? { ...l, status } : l));
    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify({ leadId, status }),
      });
    } catch {
      toast('error', 'Failed to update lead status');
      fetchLeads(); // rollback via refetch
    }
  };

  const deleteLead = async (leadId: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    try {
      await fetch(`/api/admin/leads?leadId=${leadId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${auth}` },
      });
      toast('success', 'Lead deleted');
    } catch {
      toast('error', 'Failed to delete lead');
      fetchLeads();
    }
  };

  const toggleSuggestPanel = async (lead: any) => {
    if (expandedLeadId === lead.id) { setExpandedLeadId(null); return; }
    setExpandedLeadId(lead.id);
    if (!lead.location) { setSuggestInstallers([]); setSuggestCity('No city'); return; }
    setSuggestLoading(true);
    try {
      const res = await fetch(
        `/api/admin/installers/suggest?locationId=${lead.location.id}&leadId=${lead.id}`,
        { headers: { Authorization: `Bearer ${auth}` } },
      );
      const data = await res.json();
      setSuggestInstallers(data.installers || []);
      setSuggestCity(data.city || lead.location.city);
    } catch { setSuggestInstallers([]); } finally { setSuggestLoading(false); }
  };

  const sendLeadToInstaller = async (leadId: string, installerId: string) => {
    setSendingTo(installerId);
    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify({ leadId, installerId, status: 'assigned' }),
      });
      setSuggestInstallers((prev) =>
        prev.map((i) => i.id === installerId ? { ...i, alreadySent: true } : i),
      );
      setLeads((prev) => prev.map((l) => l.id === leadId ? { ...l, status: 'assigned' } : l));
      toast('success', 'Lead sent to installer');
    } catch { toast('error', 'Failed to send lead'); } finally { setSendingTo(null); }
  };

  // ──────────────────────────────────────────────────────────────────────────────
  // LOGIN SCREEN
  // ──────────────────────────────────────────────────────────────────────────────

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
              <Zap className="h-8 w-8 text-orange-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">GoSolarIndex Admin</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your solar directory</p>
          </div>

          {loginError && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                placeholder="admin@example.com"
                required
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-orange-500 text-white py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-60 text-sm"
            >
              {loginLoading ? 'Verifying…' : 'Login to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────────
  // DASHBOARD
  // ──────────────────────────────────────────────────────────────────────────────

  const hasActiveFilters = filterCategory || filterLocation || filterVerified || filterFeatured || searchQuery;

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastList toasts={toasts} onDismiss={dismissToast} />

      {/* ── Header ── */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-900 text-sm">GoSolarIndex</span>
              <span className="text-gray-400 text-xs ml-1.5">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {adminUser && (
              <span className="text-xs text-gray-500 hidden sm:block">
                {adminUser.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {[
            { label: 'Total Listings', value: stats.totalListings, icon: Building2, color: 'text-gray-900', bg: 'bg-white' },
            { label: 'Featured', value: stats.featuredListings, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Verified', value: stats.verifiedListings, icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Total Leads', value: stats.totalLeads, icon: TrendingUp, color: 'text-green-700', bg: 'bg-green-50' },
            { label: 'New Leads', value: stats.newLeads, icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className={`${bg} rounded-xl p-4 shadow-sm border border-gray-100`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">{label}</span>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b flex">
            {(['leads', 'listings'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-3.5 text-sm font-semibold transition border-b-2 ${
                  activeTab === tab
                    ? 'text-orange-600 border-orange-500 bg-orange-50/40'
                    : 'text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab === 'leads' ? (
                  <span className="flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" />
                    Leads
                    {stats.newLeads > 0 && (
                      <span className="bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                        {stats.newLeads}
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Listings
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-5">
            {/* ════════════════════════ LEADS TAB ════════════════════════ */}
            {activeTab === 'leads' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2 flex-wrap">
                    {['all', 'new', 'assigned', 'contacted', 'closed'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setLeadsFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                          leadsFilter === f
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => fetchLeads()}
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Refresh
                  </button>
                </div>

                {leadsLoading ? (
                  <div className="py-16 text-center">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-sm text-gray-500">Loading leads…</p>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="py-16 text-center">
                    <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No leads found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto -mx-5">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-y border-gray-100">
                        <tr>
                          {['Lead', 'Contact', 'Details', 'Status', 'Date', 'Actions'].map((h) => (
                            <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead) => (
                          <>
                            <tr key={lead.id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition ${expandedLeadId === lead.id ? 'bg-orange-50/30' : ''}`}>
                              <td className="px-5 py-3.5">
                                <div className="font-semibold text-gray-900">{lead.name}</div>
                                {lead.urgency === 'urgent' && (
                                  <span className="inline-block bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-xs font-bold mt-0.5">
                                    URGENT
                                  </span>
                                )}
                              </td>
                              <td className="px-5 py-3.5">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5 text-xs">
                                    <Phone className="h-3 w-3 text-gray-400" />
                                    <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline font-medium">{lead.phone}</a>
                                  </div>
                                  {lead.email && (
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                      <Mail className="h-3 w-3 text-gray-400" />
                                      {lead.email}
                                    </div>
                                  )}
                                  {lead.location && (
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                      <MapPin className="h-3 w-3 text-gray-400" />
                                      {lead.location.city}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-5 py-3.5 text-xs text-gray-600 max-w-[180px]">
                                {lead.requirement && <div className="truncate">{lead.requirement}</div>}
                                {lead.budget && <div className="text-gray-400">Budget: {lead.budget}</div>}
                                {lead.leadDeliveries?.length > 0 && (
                                  <div className="text-emerald-600 font-medium mt-0.5">
                                    ✓ Sent to {lead.leadDeliveries.length} installer{lead.leadDeliveries.length > 1 ? 's' : ''}
                                  </div>
                                )}
                              </td>
                              <td className="px-5 py-3.5">
                                <select
                                  value={lead.status}
                                  onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border-0 outline-none cursor-pointer ${
                                    lead.status === 'new' ? 'bg-blue-100 text-blue-800'
                                    : lead.status === 'assigned' ? 'bg-amber-100 text-amber-800'
                                    : lead.status === 'contacted' ? 'bg-orange-100 text-orange-800'
                                    : 'bg-green-100 text-green-800'
                                  }`}
                                >
                                  <option value="new">New</option>
                                  <option value="assigned">Assigned</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="closed">Closed</option>
                                </select>
                              </td>
                              <td className="px-5 py-3.5 text-xs text-gray-400 whitespace-nowrap">
                                {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                              </td>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => toggleSuggestPanel(lead)}
                                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                                      expandedLeadId === lead.id
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                                    }`}
                                  >
                                    <Send className="h-3 w-3" />
                                    Send
                                    {expandedLeadId === lead.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                                  </button>
                                  <button
                                    onClick={() => deleteLead(lead.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>

                            {/* Suggest panel */}
                            {expandedLeadId === lead.id && (
                              <tr key={`sp-${lead.id}`}>
                                <td colSpan={6} className="px-5 py-4 bg-orange-50/30 border-b border-orange-100">
                                  <div className="bg-white rounded-xl border border-orange-200 p-4 shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                      <h4 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
                                        <Send className="h-4 w-4 text-orange-500" />
                                        Suggested Installers
                                        {suggestCity && (
                                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                                            {suggestCity}
                                          </span>
                                        )}
                                      </h4>
                                      <button onClick={() => setExpandedLeadId(null)} className="text-gray-400 hover:text-gray-600">
                                        <X className="h-4 w-4" />
                                      </button>
                                    </div>
                                    {suggestLoading ? (
                                      <div className="flex items-center gap-2 text-sm text-gray-500 py-3">
                                        <span className="w-4 h-4 border-2 border-orange-300 border-t-orange-500 rounded-full animate-spin" />
                                        Finding installers…
                                      </div>
                                    ) : suggestInstallers.length === 0 ? (
                                      <p className="text-sm text-gray-500 py-3 text-center">
                                        No registered installers in {lead.location?.city || 'this city'}.
                                      </p>
                                    ) : (
                                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {suggestInstallers.map((inst) => (
                                          <div key={inst.id} className={`border rounded-xl p-3.5 flex flex-col gap-2.5 ${
                                            inst.alreadySent ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 hover:border-orange-200'
                                          }`}>
                                            <div className="flex items-start justify-between gap-2">
                                              <div>
                                                <p className="font-semibold text-sm text-gray-900">{inst.companyName}</p>
                                                <p className="text-xs text-gray-500">{inst.contactPerson}</p>
                                              </div>
                                              {inst.verified && (
                                                <span className="flex items-center gap-0.5 text-xs text-emerald-600 font-medium shrink-0">
                                                  <ShieldCheck className="h-3 w-3" /> Verified
                                                </span>
                                              )}
                                            </div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1.5">
                                              <Phone className="h-3 w-3" /> {inst.phone}
                                            </div>
                                            {inst.alreadySent ? (
                                              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                                                <CheckCircle2 className="h-3.5 w-3.5" /> Already sent
                                              </div>
                                            ) : (
                                              <button
                                                onClick={() => sendLeadToInstaller(lead.id, inst.id)}
                                                disabled={sendingTo === inst.id}
                                                className="w-full flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white text-xs font-bold py-1.5 rounded-lg transition"
                                              >
                                                {sendingTo === inst.id ? (
                                                  <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                                                ) : <Send className="h-3 w-3" />}
                                                {sendingTo === inst.id ? 'Sending…' : 'Send Lead'}
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
              </div>
            )}

            {/* ════════════════════════ LISTINGS TAB ════════════════════════ */}
            {activeTab === 'listings' && (
              <div>
                {/* Action bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Search */}
                    <div className="relative">
                      <Search className="h-3.5 w-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && fetchListings()}
                        className="pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm w-44 focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                      />
                    </div>
                    {/* Filters */}
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="h-3.5 w-3.5 text-gray-400" />
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-2.5 py-2 border border-gray-200 rounded-lg text-xs"
                      >
                        <option value="">All Categories</option>
                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                      <select
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                        className="px-2.5 py-2 border border-gray-200 rounded-lg text-xs"
                      >
                        <option value="">All Cities</option>
                        {locations.map((l) => <option key={l.id} value={l.id}>{l.city}</option>)}
                      </select>
                      <select
                        value={filterVerified}
                        onChange={(e) => setFilterVerified(e.target.value)}
                        className="px-2.5 py-2 border border-gray-200 rounded-lg text-xs"
                      >
                        <option value="">Verified?</option>
                        <option value="true">Verified</option>
                        <option value="false">Unverified</option>
                      </select>
                      <select
                        value={filterFeatured}
                        onChange={(e) => setFilterFeatured(e.target.value)}
                        className="px-2.5 py-2 border border-gray-200 rounded-lg text-xs"
                      >
                        <option value="">Featured?</option>
                        <option value="true">Featured</option>
                        <option value="false">Not Featured</option>
                      </select>
                      {hasActiveFilters && (
                        <button
                          onClick={() => {
                            setFilterCategory('');
                            setFilterLocation('');
                            setFilterVerified('');
                            setFilterFeatured('');
                            setSearchQuery('');
                          }}
                          className="text-xs text-red-500 hover:text-red-700 flex items-center gap-0.5"
                        >
                          <X className="h-3 w-3" /> Clear
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={unfeatureAll}
                      disabled={unfeaturing || stats.featuredListings === 0}
                      className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-2 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Remove featured status from ALL listings"
                    >
                      <Star className="h-3.5 w-3.5" />
                      {unfeaturing ? 'Unfeaturing…' : `Unfeature All (${stats.featuredListings})`}
                    </button>
                    <button
                      onClick={() => fetchListings()}
                      className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => { cancelForm(); setShowForm(true); }}
                      className="flex items-center gap-1.5 text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg transition"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Listing
                    </button>
                  </div>
                </div>

                {/* Add / Edit Form */}
                {showForm && (
                  <div className="mb-5 bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900">
                        {editingListing ? `Edit: ${editingListing.name}` : 'Add New Listing'}
                      </h3>
                      <button onClick={cancelForm} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <form onSubmit={handleListingSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Company Name *</label>
                          <input
                            required type="text" value={listingForm.name}
                            onChange={(e) => setListingForm({ ...listingForm, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="SunRise Solar Solutions"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Phone *</label>
                          <input
                            required type="tel" value={listingForm.phone}
                            onChange={(e) => setListingForm({ ...listingForm, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Category *</label>
                          <select
                            required value={listingForm.categoryId}
                            onChange={(e) => setListingForm({ ...listingForm, categoryId: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="">Select category</option>
                            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Location *</label>
                          <select
                            required value={listingForm.locationId}
                            onChange={(e) => setListingForm({ ...listingForm, locationId: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="">Select location</option>
                            {locations.map((l) => <option key={l.id} value={l.id}>{l.city}, {l.state}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                          <input
                            type="email" value={listingForm.email}
                            onChange={(e) => setListingForm({ ...listingForm, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="info@company.com"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Website</label>
                          <input
                            type="url" value={listingForm.website}
                            onChange={(e) => setListingForm({ ...listingForm, website: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="https://company.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Address</label>
                        <input
                          type="text" value={listingForm.address}
                          onChange={(e) => setListingForm({ ...listingForm, address: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Street, City, State"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                        <textarea
                          rows={3} value={listingForm.description}
                          onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Brief company description…"
                        />
                      </div>
                      <div className="flex items-center gap-5">
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                          <input
                            type="checkbox" checked={listingForm.verified}
                            onChange={(e) => setListingForm({ ...listingForm, verified: e.target.checked })}
                            className="w-4 h-4 accent-blue-500 rounded"
                          />
                          Verified
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                          <input
                            type="checkbox" checked={listingForm.featured}
                            onChange={(e) => setListingForm({ ...listingForm, featured: e.target.checked })}
                            className="w-4 h-4 accent-orange-500 rounded"
                          />
                          Featured (Premium Partner)
                        </label>
                      </div>
                      <div className="flex gap-3 pt-1">
                        <button
                          type="submit" disabled={formSaving}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 rounded-xl transition disabled:opacity-60"
                        >
                          {formSaving ? 'Saving…' : editingListing ? 'Update Listing' : 'Create Listing'}
                        </button>
                        <button
                          type="button" onClick={cancelForm}
                          className="px-6 py-2.5 border border-gray-300 rounded-xl text-sm hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Listings count */}
                <div className="text-xs text-gray-500 mb-3">
                  Showing <span className="font-semibold text-gray-800">{listings.length}</span> listings
                  {hasActiveFilters && ' (filtered)'}
                </div>

                {/* Table */}
                {listingsLoading ? (
                  <div className="py-16 text-center">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-sm text-gray-500">Loading listings…</p>
                  </div>
                ) : listings.length === 0 ? (
                  <div className="py-16 text-center">
                    <Building2 className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No listings found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto -mx-5">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-y border-gray-100">
                        <tr>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Company</th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Location / Category</th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Featured</th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Verified</th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listings.map((listing) => (
                          <tr key={listing.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition">
                            <td className="px-5 py-3.5">
                              <div className="font-semibold text-gray-900 leading-snug">{listing.name}</div>
                              {listing.rating ? (
                                <div className="flex items-center gap-1 text-xs text-amber-600 mt-0.5">
                                  <Star className="h-3 w-3 fill-amber-400" />
                                  {listing.rating} ({listing.reviews})
                                </div>
                              ) : null}
                            </td>
                            <td className="px-5 py-3.5">
                              <div className="space-y-0.5 text-xs text-gray-600">
                                {listing.phone && (
                                  <div className="flex items-center gap-1.5">
                                    <Phone className="h-3 w-3 text-gray-400" /> {listing.phone}
                                  </div>
                                )}
                                {listing.email && (
                                  <div className="flex items-center gap-1.5">
                                    <Mail className="h-3 w-3 text-gray-400" /> {listing.email}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-xs text-gray-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-gray-400" />
                                {listing.location.city}, {listing.location.state}
                              </div>
                              <div className="text-gray-400 mt-0.5">{listing.category.name}</div>
                            </td>
                            <td className="px-5 py-3.5">
                              <button
                                onClick={() => toggleFeatured(listing)}
                                disabled={togglingId === listing.id + '-featured'}
                                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition border ${
                                  listing.featured
                                    ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700'
                                } disabled:opacity-50`}
                              >
                                <Star className={`h-3 w-3 ${listing.featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                                {listing.featured ? 'Featured' : 'Feature'}
                              </button>
                            </td>
                            <td className="px-5 py-3.5">
                              <button
                                onClick={() => toggleVerified(listing)}
                                disabled={togglingId === listing.id + '-verified'}
                                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition border ${
                                  listing.verified
                                    ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700'
                                } disabled:opacity-50`}
                              >
                                <ShieldCheck className="h-3 w-3" />
                                {listing.verified ? 'Verified' : 'Verify'}
                              </button>
                            </td>
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleEditListing(listing)}
                                  className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
                                  title="Edit"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => deleteListing(listing)}
                                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                  title="Delete"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
