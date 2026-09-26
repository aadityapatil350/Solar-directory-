'use client';

import { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Zap, LogOut, RefreshCw, Trash2, Phone, Mail, MapPin, Star,
  ShieldCheck, Plus, Edit2, Send, ChevronDown, ChevronUp,
  CheckCircle2, X, Search, SlidersHorizontal, Building2,
  FileText, AlertTriangle, TrendingUp, Users2, XCircle, BookOpen,
  ExternalLink, UserCheck, Crown,
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
  // isTest: boolean; // TODO: Uncomment after migration
  premiumExpiresAt: string | null;
  serviceTags: string | null; // JSON: { tags: string[], categoryIds: string[] }
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

type Tab = 'leads' | 'listings' | 'claims';

interface ClaimRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  status: string;
  createdAt: string;
  listing: {
    id: string;
    name: string;
    slug: string;
    featured: boolean;
    userId: string | null;
    category: { id: string; name: string };
    location: { id: string; city: string; state: string };
  };
  user: {
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: string;
  } | null;
}

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


// ─── Paginator Component ──────────────────────────────────────────────────────

function Paginator({
  page, totalPages, loading, onChange,
}: {
  page: number; totalPages: number; loading?: boolean; onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-5 pt-4 border-t border-line">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1 || loading}
        className="px-3 py-1.5 text-xs font-semibold border border-line rounded-sm hover:bg-wash disabled:opacity-40 disabled:cursor-not-allowed text-ink transition"
      >
        ← Prev
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`el-${i}`} className="px-2 text-xs text-ink/40">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            disabled={loading}
            className={`min-w-[32px] h-8 text-xs font-semibold rounded-sm border transition ${
              p === page
                ? 'bg-sun text-ink border-sun'
                : 'bg-paper text-ink border-line hover:bg-wash'
            } disabled:opacity-50`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages || loading}
        className="px-3 py-1.5 text-xs font-semibold border border-line rounded-sm hover:bg-wash disabled:opacity-40 disabled:cursor-not-allowed text-ink transition"
      >
        Next →
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();

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

  // ── Claims state ──
  const [claims, setClaims] = useState<ClaimRequest[]>([]);
  const [claimsLoading, setClaimsLoading] = useState(false);
  const [processingClaim, setProcessingClaim] = useState<string | null>(null);
  const [claimsStatusFilter, setClaimsStatusFilter] = useState<'all' | 'claimed' | 'pending' | 'rejected'>('all');
  const [claimsSearch, setClaimsSearch] = useState('');

  // ── Listings state ──
  const [listings, setListings] = useState<Listing[]>([]);
  const [listingsLoading, setListingsLoading] = useState(false);
  const [listingsPage, setListingsPage] = useState(1);
  const [listingsTotalPages, setListingsTotalPages] = useState(1);
  const [listingsTotal, setListingsTotal] = useState(0);
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
  const [formExtraCategoryIds, setFormExtraCategoryIds] = useState<string[]>([]);
  const [formSaving, setFormSaving] = useState(false);
  const [unfeaturing, setUnfeaturing] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // ── Premium upgrade modal state ──
  const [upgradeModal, setUpgradeModal] = useState<{ listing: Listing } | null>(null);
  const [upgradeMonths, setUpgradeMonths] = useState(1);
  const [upgrading, setUpgrading] = useState(false);

  // ── Client-side pagination for leads & claims ──
  const LEADS_PER_PAGE = 10;
  const CLAIMS_PER_PAGE = 10;
  const [leadsPage, setLeadsPage] = useState(1);
  const [claimsPage, setClaimsPage] = useState(1);

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

  const fetchListings = useCallback(async (token = auth, page = listingsPage) => {
    setListingsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterCategory) params.set('categoryId', filterCategory);
      if (filterLocation) params.set('locationId', filterLocation);
      if (filterVerified) params.set('verified', filterVerified);
      if (filterFeatured) params.set('featured', filterFeatured);
      if (searchQuery) params.set('search', searchQuery);
      params.set('page', String(page));
      const res = await fetch(`/api/admin/listings?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setListings(data.listings || []);
      setListingsTotalPages(data.totalPages || 1);
      setListingsTotal(data.total || 0);
      setStats((prev) => ({ ...prev, ...(data.stats || {}) }));
    } catch { /* silent */ } finally { setListingsLoading(false); }
  }, [auth, listingsPage, filterCategory, filterLocation, filterVerified, filterFeatured, searchQuery]);

  const fetchCatsLocs = useCallback(async () => {
    const [catsRes, locsRes] = await Promise.all([
      fetch('/api/categories'),
      fetch('/api/locations'),
    ]);
    setCategories(await catsRes.json());
    setLocations(await locsRes.json());
  }, []);

  const fetchClaims = useCallback(async (token = auth) => {
    setClaimsLoading(true);
    try {
      const res = await fetch('/api/admin/claims', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setClaims(data.claims || []);
    } catch { setClaims([]); } finally { setClaimsLoading(false); }
  }, [auth]);

  const processClaim = async (claimId: string, action: 'approve' | 'reject') => {
    if (action === 'approve' && !confirm('Approve this claim? The listing will be verified and the owner will get dashboard access.')) return;
    if (action === 'reject' && !confirm('Reject this claim? The claimant will not get access to this listing.')) return;
    setProcessingClaim(claimId);
    try {
      const res = await fetch('/api/admin/claims', {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify({ claimId, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (action === 'approve') {
        toast('success', `Claim approved! ${data.ownerName || data.ownerEmail} now has dashboard access.`);
      } else {
        toast('success', 'Claim rejected.');
      }
      fetchClaims();
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Failed to process claim');
    } finally {
      setProcessingClaim(null);
    }
  };

  const deleteClaim = async (claimId: string) => {
    if (!confirm('Delete this claim? This will:\n• Unlink and unverify the listing\n• Delete the owner user account permanently\n\nThis cannot be undone.')) return;
    try {
      const res = await fetch('/api/admin/claims', {
        method: 'DELETE',
        headers: headers(),
        body: JSON.stringify({ claimId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast('success', `Claim deleted. Listing unlinked${data.deletedUser ? ` and user ${data.deletedUser} removed` : ''}.`);
      fetchClaims();
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Failed to delete claim');
    }
  };

  // Load data when authenticated — only load active tab
  useEffect(() => {
    if (!isAuthenticated || !auth) return;
    fetchCatsLocs();
    fetchLeads(auth);
  }, [isAuthenticated, auth]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lazy-load tab data when switching tabs
  useEffect(() => {
    if (!isAuthenticated || !auth) return;
    if (activeTab === 'listings' && listings.length === 0) fetchListings(auth, 1);
    if (activeTab === 'claims' && claims.length === 0) fetchClaims(auth);
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reload leads when filter changes
  useEffect(() => {
    if (isAuthenticated && auth) { setLeadsPage(1); fetchLeads(auth, leadsFilter); }
  }, [leadsFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reload listings when filters change (reset to page 1)
  useEffect(() => {
    if (isAuthenticated && auth) { setListingsPage(1); fetchListings(auth, 1); }
  }, [filterCategory, filterLocation, filterVerified, filterFeatured]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reload listings when page changes
  useEffect(() => {
    if (isAuthenticated && auth && activeTab === 'listings') fetchListings(auth, listingsPage);
  }, [listingsPage]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // TODO: Uncomment after migration
  // const toggleTest = async (listing: Listing) => {
  //   const newVal = !listing.isTest;
  //   setListings((prev) => prev.map((l) => l.id === listing.id ? { ...l, isTest: newVal } : l));
  //   try {
  //     setTogglingId(listing.id + '-test');
  //     const res = await fetch('/api/admin/listings/toggle-test', {
  //       method: 'POST',
  //       headers: headers(),
  //       body: JSON.stringify({ listingId: listing.id, isTest: newVal }),
  //     });
  //     if (!res.ok) throw new Error();
  //     toast('success', newVal ? `🧪 "${listing.name}" marked as TEST (hidden from public)` : `✓ "${listing.name}" is now PUBLIC`);
  //   } catch {
  //     setListings((prev) => prev.map((l) => l.id === listing.id ? { ...l, isTest: !newVal } : l));
  //     toast('error', 'Failed to update test status');
  //   } finally {
  //     setTogglingId(null);
  //   }
  // };

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

  const upgradeListing = async (listingId: string, months: number) => {
    setUpgrading(true);
    try {
      const res = await fetch('/api/admin/listings/upgrade', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ listingId, months }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (months === 0) {
        toast('success', 'Premium removed from listing.');
        // Optimistic update
        setListings((prev) => prev.map((l) => l.id === listingId ? { ...l, featured: false, premiumExpiresAt: null } : l));
      } else {
        const exp = new Date(data.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        toast('success', `Upgraded to Featured Premium! Expires ${exp}`);
        // Optimistic update
        setListings((prev) => prev.map((l) => l.id === listingId ? { ...l, featured: true, premiumExpiresAt: data.expiresAt } : l));
      }
      setUpgradeModal(null);
      fetchClaims(auth);
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Upgrade failed');
    } finally {
      setUpgrading(false);
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
    try {
      const st = JSON.parse(listing.serviceTags || '{}');
      setFormExtraCategoryIds(Array.isArray(st.categoryIds) ? st.categoryIds : []);
    } catch {
      setFormExtraCategoryIds([]);
    }
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingListing(null);
    setFormExtraCategoryIds([]);
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
        ? { id: editingListing.id, ...listingForm, extraCategoryIds: formExtraCategoryIds }
        : { ...listingForm, extraCategoryIds: formExtraCategoryIds };

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
      <div className="min-h-screen bg-wash flex items-center justify-center p-4">
        <div className="bg-paper rounded-sm border border-line p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-wash border border-line rounded-sm mb-4">
              <Zap className="h-7 w-7 text-sun" />
            </div>
            <h1 className="text-2xl font-bold font-heading text-ink">GoSolarIndex Admin</h1>
            <p className="text-ink-2 text-sm mt-1 font-body">Manage your solar directory</p>
          </div>

          {loginError && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-sm text-sm text-red-700 flex items-center gap-2 font-body">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 font-body">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-line rounded-sm focus:outline-none focus:border-ink text-sm bg-paper text-ink"
                placeholder="admin@example.com"
                required
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-line rounded-sm focus:outline-none focus:border-ink text-sm bg-paper text-ink"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-sun hover:bg-sun-hover text-ink py-2.5 rounded-sm font-heading font-semibold transition disabled:opacity-60 text-sm"
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

  const claimedListingUsers = claims.filter((c) => c.status === 'approved' && c.user);
  const filteredClaims = claims.filter((c) => {
    if (claimsStatusFilter === 'claimed' && !(c.status === 'approved' && c.user)) return false;
    if (claimsStatusFilter === 'pending' && c.status !== 'pending') return false;
    if (claimsStatusFilter === 'rejected' && c.status !== 'rejected') return false;
    if (claimsSearch) {
      const q = claimsSearch.toLowerCase();
      const haystack = `${c.name} ${c.email} ${c.phone} ${c.listing.name} ${c.user?.email ?? ''} ${c.user?.name ?? ''}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  // ── Client-side paged slices ──
  const leadsTotalPages = Math.max(1, Math.ceil(leads.length / LEADS_PER_PAGE));
  const pagedLeads = leads.slice((leadsPage - 1) * LEADS_PER_PAGE, leadsPage * LEADS_PER_PAGE);

  const claimsTotalPages = Math.max(1, Math.ceil(filteredClaims.length / CLAIMS_PER_PAGE));
  const pagedClaims = filteredClaims.slice((claimsPage - 1) * CLAIMS_PER_PAGE, claimsPage * CLAIMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastList toasts={toasts} onDismiss={dismissToast} />

      {/* ── Premium Upgrade Modal ── */}
      {upgradeModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center gap-2 mb-1">
              <Crown className="h-5 w-5 text-amber-500" />
              <h3 className="font-bold text-gray-900 text-base">Upgrade to Featured Premium</h3>
            </div>
            <p className="text-sm text-gray-500 mb-5">
              <span className="font-semibold text-gray-800">{upgradeModal.listing.name}</span>
              {upgradeModal.listing.premiumExpiresAt && new Date(upgradeModal.listing.premiumExpiresAt) > new Date() && (
                <span className="block text-xs text-amber-600 mt-0.5">
                  Currently expires: {new Date(upgradeModal.listing.premiumExpiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              )}
            </p>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 3, 6, 12, 24, 0].map((m) => (
                  <button
                    key={m}
                    onClick={() => setUpgradeMonths(m)}
                    className={`py-2 rounded-lg text-sm font-semibold border transition ${
                      upgradeMonths === m
                        ? m === 0
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-amber-500 text-white border-amber-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400'
                    }`}
                  >
                    {m === 0 ? 'Remove' : m === 1 ? '1 month' : m === 12 ? '1 year' : m === 24 ? '2 years' : `${m} months`}
                  </button>
                ))}
              </div>
            </div>

            {upgradeMonths > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-sm text-amber-800">
                <span className="font-semibold">Featured until: </span>
                {(() => {
                  const base = upgradeModal.listing.premiumExpiresAt && new Date(upgradeModal.listing.premiumExpiresAt) > new Date()
                    ? new Date(upgradeModal.listing.premiumExpiresAt)
                    : new Date();
                  const exp = new Date(base);
                  exp.setMonth(exp.getMonth() + upgradeMonths);
                  return exp.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
                })()}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => upgradeListing(upgradeModal.listing.id, upgradeMonths)}
                disabled={upgrading}
                className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition disabled:opacity-60 ${
                  upgradeMonths === 0
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
              >
                {upgrading ? 'Processing…' : upgradeMonths === 0 ? 'Remove Premium' : 'Confirm Upgrade'}
              </button>
              <button
                onClick={() => setUpgradeModal(null)}
                className="px-5 py-2.5 border border-gray-300 rounded-xl text-sm hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-sun text-ink p-1.5 rounded-sm">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold font-heading text-ink text-sm">GoSolarIndex</span>
              <span className="text-ink-2 text-xs ml-1.5 font-body">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {adminUser && (
              <span className="text-xs text-ink-2 hidden sm:block font-body">
                {adminUser.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-ink hover:text-ink/80 px-3 py-1.5 rounded-sm border border-line hover:bg-wash transition font-body"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 font-body">
        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {[
            { label: 'Total Listings', value: stats.totalListings, icon: Building2, color: 'text-ink', bg: 'bg-paper' },
            { label: 'Featured', value: stats.featuredListings, icon: Star, color: 'text-ink', bg: 'bg-sun-wash/30' },
            { label: 'Verified', value: stats.verifiedListings, icon: ShieldCheck, color: 'text-ink', bg: 'bg-paper' },
            { label: 'Total Leads', value: stats.totalLeads, icon: TrendingUp, color: 'text-ink', bg: 'bg-paper' },
            { label: 'New Leads', value: stats.newLeads, icon: FileText, color: 'text-ink', bg: 'bg-wash' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className={`${bg} rounded-sm p-4 border border-line`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-ink-2 font-medium">{label}</span>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <div className={`text-2xl font-bold font-heading ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="bg-paper rounded-sm border border-line overflow-hidden">
          <div className="border-b border-line flex">
            {(['leads', 'listings'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-3.5 text-sm font-semibold transition border-b-2 font-heading ${
                  activeTab === tab
                    ? 'text-ink border-ink bg-wash'
                    : 'text-ink-2 border-transparent hover:text-ink hover:bg-wash'
                }`}
              >
                {tab === 'leads' ? (
                  <span className="flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" />
                    Leads
                    {stats.newLeads > 0 && (
                      <span className="bg-sun text-ink text-xs rounded-sm px-1.5 py-0.5 leading-none font-bold">
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
            {/* Claims tab */}
            <button
              onClick={() => setActiveTab('claims')}
              className={`px-6 py-3.5 text-sm font-semibold transition border-b-2 font-heading ${
                activeTab === 'claims'
                  ? 'text-ink border-ink bg-wash'
                  : 'text-ink-2 border-transparent hover:text-ink hover:bg-wash'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Claims
                {claims.filter((c) => c.status === 'pending').length > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                    {claims.filter((c) => c.status === 'pending').length}
                  </span>
                )}
              </span>
            </button>
            {/* Blog CMS link — navigates to dedicated blog management page */}
            <Link
              href="/admin/blogs"
              className="px-6 py-3.5 text-sm font-semibold text-gray-500 border-b-2 border-transparent hover:text-emerald-600 hover:bg-emerald-50/40 transition flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Blog CMS
            </Link>
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
                        className={`px-3 py-1.5 rounded-sm text-xs font-semibold capitalize transition ${
                          leadsFilter === f
                            ? 'bg-sun text-ink font-bold'
                            : 'bg-wash text-ink-2 hover:text-ink hover:bg-line/20'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => fetchLeads()}
                    className="flex items-center gap-1.5 text-xs text-ink-2 hover:text-ink px-3 py-1.5 rounded-sm border border-line hover:bg-wash transition"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Refresh
                  </button>
                </div>

                {leadsLoading ? (
                  <div className="py-16 text-center">
                    <div className="w-8 h-8 border-2 border-sun border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-sm text-ink-2">Loading leads…</p>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="py-16 text-center">
                    <FileText className="h-10 w-10 text-ink-2 opacity-30 mx-auto mb-3" />
                    <p className="text-ink-2 text-sm">No leads found</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-ink/60">
                        Showing <span className="font-semibold text-ink">{(leadsPage - 1) * LEADS_PER_PAGE + 1}–{Math.min(leadsPage * LEADS_PER_PAGE, leads.length)}</span> of <span className="font-semibold text-ink">{leads.length}</span> leads
                      </p>
                    </div>
                    <div className="overflow-x-auto -mx-5">
                      <table className="w-full text-sm">
                        <thead className="bg-wash border-y border-line">
                          <tr>
                            {['Lead', 'Contact', 'Details', 'Status', 'Date', 'Actions'].map((h) => (
                              <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-ink uppercase tracking-wide">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {pagedLeads.map((lead) => (
                          <Fragment key={lead.id}>
                            <tr className={`border-b border-line hover:bg-wash/50 transition ${expandedLeadId === lead.id ? 'bg-wash' : ''}`}>
                              <td className="px-5 py-3.5">
                                <div className="font-semibold text-ink">{lead.name}</div>
                                {lead.urgency === 'urgent' && (
                                  <span className="inline-block bg-red-100 text-red-700 px-1.5 py-0.5 rounded-sm text-xs font-bold mt-0.5">
                                    URGENT
                                  </span>
                                )}
                              </td>
                              <td className="px-5 py-3.5">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5 text-xs">
                                    <Phone className="h-3 w-3 text-ink-2" />
                                    <a href={`tel:${lead.phone}`} className="text-ink font-semibold underline underline-offset-2">{lead.phone}</a>
                                  </div>
                                  {lead.email && (
                                    <div className="flex items-center gap-1.5 text-xs text-ink-2">
                                      <Mail className="h-3 w-3 text-ink-2" />
                                      {lead.email}
                                    </div>
                                  )}
                                  {lead.location && (
                                    <div className="flex items-center gap-1.5 text-xs text-ink-2">
                                      <MapPin className="h-3 w-3 text-ink-2" />
                                      {lead.location.city}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-5 py-3.5 text-xs text-ink-2 max-w-[180px]">
                                {lead.requirement && <div className="truncate">{lead.requirement}</div>}
                                {lead.budget && <div className="text-ink-2">Budget: {lead.budget}</div>}
                                {lead.leadDeliveries?.length > 0 && (
                                  <div className="text-ink font-medium mt-0.5">
                                    ✓ Sent to {lead.leadDeliveries.length} installer{lead.leadDeliveries.length > 1 ? 's' : ''}
                                  </div>
                                )}
                              </td>
                              <td className="px-5 py-3.5">
                                <select
                                  value={lead.status}
                                  onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                  className={`px-2.5 py-1.5 rounded-sm text-xs font-semibold border border-line outline-none cursor-pointer ${
                                    lead.status === 'new' ? 'bg-wash text-ink font-semibold'
                                    : lead.status === 'assigned' ? 'bg-wash text-ink'
                                    : lead.status === 'contacted' ? 'bg-sun-wash text-ink'
                                    : 'bg-wash text-ink'
                                  }`}
                                >
                                  <option value="new">New</option>
                                  <option value="assigned">Assigned</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="closed">Closed</option>
                                </select>
                              </td>
                              <td className="px-5 py-3.5 text-xs text-ink-2 whitespace-nowrap">
                                {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                              </td>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => toggleSuggestPanel(lead)}
                                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-sm text-xs font-semibold transition border border-line ${
                                      expandedLeadId === lead.id
                                        ? 'bg-sun text-ink font-bold'
                                        : 'bg-wash text-ink hover:bg-line/20'
                                    }`}
                                  >
                                    <Send className="h-3 w-3" />
                                    Send
                                    {expandedLeadId === lead.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                                  </button>
                                  <button
                                    onClick={() => deleteLead(lead.id)}
                                    className="p-1.5 text-ink-2 hover:text-red-600 hover:bg-red-50 rounded-sm transition"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>

                            {/* Suggest panel */}
                            {expandedLeadId === lead.id && (
                              <tr key={`sp-${lead.id}`}>
                                <td colSpan={6} className="px-5 py-4 bg-wash border-b border-line">
                                  <div className="bg-paper rounded-sm border border-line p-4">
                                    <div className="flex items-center justify-between mb-3">
                                      <h4 className="font-semibold font-heading text-sm text-ink flex items-center gap-2">
                                        <Send className="h-4 w-4 text-sun" />
                                        Suggested Installers
                                        {suggestCity && (
                                          <span className="text-xs bg-sun-wash text-ink border border-line px-2 py-0.5 rounded-sm font-semibold">
                                            {suggestCity}
                                          </span>
                                        )}
                                      </h4>
                                      <button onClick={() => setExpandedLeadId(null)} className="text-ink-2 hover:text-ink">
                                        <X className="h-4 w-4" />
                                      </button>
                                    </div>
                                    {suggestLoading ? (
                                      <div className="flex items-center gap-2 text-sm text-ink-2 py-3">
                                        <span className="w-4 h-4 border-2 border-line border-t-sun rounded-full animate-spin" />
                                        Finding installers…
                                      </div>
                                    ) : suggestInstallers.length === 0 ? (
                                      <p className="text-sm text-ink-2 py-3 text-center">
                                        No registered installers in {lead.location?.city || 'this city'}.
                                      </p>
                                    ) : (
                                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {suggestInstallers.map((inst) => (
                                          <div key={inst.id} className={`border rounded-sm p-3.5 flex flex-col gap-2.5 ${
                                            inst.alreadySent ? 'border-line bg-wash' : 'border-line hover:border-ink bg-paper'
                                          }`}>
                                            <div className="flex items-start justify-between gap-2">
                                              <div>
                                                <p className="font-semibold font-heading text-sm text-ink">{inst.companyName}</p>
                                                <p className="text-xs text-ink-2">{inst.contactPerson}</p>
                                              </div>
                                              {inst.verified && (
                                                <span className="flex items-center gap-0.5 text-xs text-ink font-semibold shrink-0">
                                                  <ShieldCheck className="h-3 w-3" /> Verified
                                                </span>
                                              )}
                                            </div>
                                            <div className="text-xs text-ink-2 flex items-center gap-1.5">
                                              <Phone className="h-3 w-3" /> {inst.phone}
                                            </div>
                                            {inst.alreadySent ? (
                                              <div className="flex items-center gap-1.5 text-xs text-ink font-semibold">
                                                <CheckCircle2 className="h-3.5 w-3.5" /> Already sent
                                              </div>
                                            ) : (
                                              <button
                                                onClick={() => sendLeadToInstaller(lead.id, inst.id)}
                                                disabled={sendingTo === inst.id}
                                                className="w-full flex items-center justify-center gap-1.5 bg-sun hover:bg-sun-hover disabled:opacity-50 text-ink text-xs font-bold py-1.5 rounded-sm transition"
                                              >
                                                {sendingTo === inst.id ? (
                                                  <span className="w-3 h-3 border border-ink/40 border-t-ink rounded-full animate-spin" />
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
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                    </div>
                    <Paginator
                      page={leadsPage}
                      totalPages={leadsTotalPages}
                      loading={leadsLoading}
                      onChange={(p) => { setLeadsPage(p); setExpandedLeadId(null); }}
                    />
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
                        onKeyDown={(e) => { if (e.key === 'Enter') { setListingsPage(1); fetchListings(auth, 1); } }}
                        className="pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm w-44 focus:outline-none focus:border-ink"
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
                      onClick={() => { fetchListings(auth, listingsPage); }}
                      disabled={listingsLoading}
                      className="flex items-center gap-1.5 text-xs text-ink-2 hover:text-ink px-3 py-2 rounded-sm border border-line hover:bg-wash transition disabled:opacity-50"
                      title="Refresh listings from database"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${listingsLoading ? 'animate-spin' : ''}`} />
                      Refresh
                    </button>
                    <button
                      onClick={() => { cancelForm(); setShowForm(true); }}
                      className="flex items-center gap-1.5 text-xs font-semibold bg-sun hover:bg-sun-hover text-ink px-3 py-2 rounded-sm transition font-semibold"
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
                      </div>
                      {/* Extra Categories */}
                      {listingForm.categoryId && (
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Additional Categories</label>
                          <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
                            {categories
                              .filter((c) => c.id !== listingForm.categoryId)
                              .map((cat) => {
                                const sel = formExtraCategoryIds.includes(cat.id);
                                return (
                                  <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setFormExtraCategoryIds(
                                      sel ? formExtraCategoryIds.filter((id) => id !== cat.id) : [...formExtraCategoryIds, cat.id]
                                    )}
                                    className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                                      sel ? 'bg-sun text-ink border-ink font-semibold' : 'bg-paper text-ink border-line hover:border-ink'
                                    }`}
                                  >
                                    {sel ? '✓ ' : ''}{cat.name}
                                  </button>
                                );
                              })}
                          </div>
                        </div>
                      )}
                      <div className="grid sm:grid-cols-2 gap-4">
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
                            className="w-4 h-4 accent-ink rounded-sm"
                          />
                          Featured (Premium Partner)
                        </label>
                      </div>
                      <div className="flex gap-3 pt-1">
                        <button
                          type="submit" disabled={formSaving}
                          className="flex-1 bg-sun hover:bg-sun-hover text-ink text-sm font-semibold py-2.5 rounded-sm transition disabled:opacity-60 font-heading"
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

                {/* Listings count + top paginator */}
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-ink/60">
                    Showing <span className="font-semibold text-ink">{listings.length}</span> of <span className="font-semibold text-ink">{listingsTotal}</span> listings
                    {hasActiveFilters && ' (filtered)'}
                  </p>
                  <p className="text-xs text-ink/40">Page {listingsPage} of {listingsTotalPages}</p>
                </div>

                {/* Table */}
                {listingsLoading ? (
                  <div className="py-16 text-center">
                    <div className="w-8 h-8 border-2 border-sun border-t-transparent rounded-full animate-spin mx-auto mb-3" />
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
                          {/* TODO: Uncomment Visibility column after migration */}
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listings.map((listing) => (
                          <tr key={listing.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition">
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-2">
                                <div className="font-semibold text-gray-900 leading-snug">{listing.name}</div>
                                {/* TODO: Uncomment after migration
                                {listing.isTest && (
                                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-purple-100 text-purple-700 rounded uppercase">
                                    TEST
                                  </span>
                                )}
                                */}
                              </div>
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
                            {/* TODO: Uncomment Visibility toggle after migration
                            <td className="px-5 py-3.5">
                              <button
                                onClick={() => toggleTest(listing)}
                                disabled={togglingId === listing.id + '-test'}
                                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition border ${
                                  listing.isTest
                                    ? 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
                                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700'
                                } disabled:opacity-50`}
                                title={listing.isTest ? 'Click to make PUBLIC' : 'Click to mark as TEST (hidden from public)'}
                              >
                                {listing.isTest ? '🧪 Test' : 'Public'}
                              </button>
                            </td>
                            */}
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => { setUpgradeMonths(1); setUpgradeModal({ listing }); }}
                                  className={`p-1.5 rounded-lg transition ${
                                    listing.featured
                                      ? 'text-amber-500 hover:bg-amber-50'
                                      : 'text-gray-400 hover:text-amber-600 hover:bg-amber-50'
                                  }`}
                                  title={listing.featured ? 'Manage premium' : 'Upgrade to premium'}
                                >
                                  <Crown className="h-3.5 w-3.5" />
                                </button>
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
                              {listing.premiumExpiresAt && (
                                <p className="text-xs text-amber-600 mt-0.5 whitespace-nowrap">
                                  Exp: {new Date(listing.premiumExpiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <Paginator
                  page={listingsPage}
                  totalPages={listingsTotalPages}
                  loading={listingsLoading}
                  onChange={(p) => setListingsPage(p)}
                />
              </div>
            )}

            {/* ════════════════════════ CLAIMS TAB ════════════════════════ */}
            {activeTab === 'claims' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">
                    Listing Claim Requests
                    <span className="ml-2 text-sm text-gray-400 font-normal">({claims.length} total)</span>
                  </h2>
                  <button
                    onClick={() => fetchClaims()}
                    className="flex items-center gap-1.5 text-xs text-ink-2 hover:text-ink transition"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Refresh
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                  <div className="flex gap-2 flex-wrap">
                    {([
                      { key: 'all', label: 'All' },
                      { key: 'claimed', label: `Claimed (${claimedListingUsers.length})` },
                      { key: 'pending', label: `Pending (${claims.filter((c) => c.status === 'pending').length})` },
                      { key: 'rejected', label: `Rejected (${claims.filter((c) => c.status === 'rejected').length})` },
                    ] as const).map((f) => (
                      <button
                        key={f.key}
                        onClick={() => setClaimsStatusFilter(f.key)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          claimsStatusFilter === f.key
                            ? 'bg-sun text-ink font-bold'
                            : 'bg-wash text-ink-2 hover:text-ink hover:bg-line/20'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <Search className="h-3.5 w-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={claimsSearch}
                      onChange={(e) => setClaimsSearch(e.target.value)}
                      placeholder="Search name, email, listing…"
                      className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg w-64 focus:outline-none focus:border-ink"
                    />
                  </div>
                </div>

                {claimsLoading ? (
                  <div className="text-center py-12 text-gray-400">Loading claims…</div>
                ) : claims.length === 0 ? (
                  <div className="text-center py-12">
                    <ShieldCheck className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400">No claim requests yet.</p>
                    <p className="text-gray-300 text-sm mt-1">When businesses submit claim requests they will appear here.</p>
                  </div>
                ) : filteredClaims.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400">No claims match this filter.</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-ink/60">
                        Showing <span className="font-semibold text-ink">{Math.min((claimsPage - 1) * CLAIMS_PER_PAGE + 1, filteredClaims.length)}–{Math.min(claimsPage * CLAIMS_PER_PAGE, filteredClaims.length)}</span> of <span className="font-semibold text-ink">{filteredClaims.length}</span> claims
                      </p>
                    </div>
                    <div className="space-y-4">
                    {pagedClaims.map((claim) => (
                      <div
                        key={claim.id}
                        className={`border rounded-xl p-5 ${
                          claim.status === 'pending'
                            ? 'border-blue-200 bg-blue-50/30'
                            : claim.status === 'approved'
                            ? 'border-green-200 bg-green-50/30'
                            : 'border-gray-200 bg-gray-50/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                claim.status === 'pending'
                                  ? 'bg-blue-100 text-blue-700'
                                  : claim.status === 'approved'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {claim.status.toUpperCase()}
                              </span>
                              {claim.listing.featured && (
                                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sun-wash text-ink border border-line flex items-center gap-1">
                                  <Crown className="h-3 w-3" /> Featured
                                </span>
                              )}
                              <span className="text-xs text-gray-400">
                                {new Date(claim.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            </div>

                            {/* Listing being claimed */}
                            <div className="mb-3">
                              <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Listing</p>
                              <p className="font-semibold text-gray-900">{claim.listing.name}</p>
                              <p className="text-sm text-gray-500">{claim.listing.category.name} · {claim.listing.location.city}, {claim.listing.location.state}</p>
                              <Link
                                href={`/listing/${claim.listing.slug}`}
                                target="_blank"
                                className="text-xs text-ink font-semibold underline underline-offset-2"
                              >
                                View listing →
                              </Link>
                            </div>

                            {/* Claimant details */}
                            <div className="grid sm:grid-cols-3 gap-3 text-sm mb-3">
                              <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase">Name</p>
                                <p className="text-gray-800 font-medium">{claim.name}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase">Email</p>
                                <a href={`mailto:${claim.email}`} className="text-ink font-semibold underline underline-offset-2">{claim.email}</a>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase">Phone</p>
                                <a href={`tel:${claim.phone}`} className="text-gray-800 font-medium">{claim.phone}</a>
                              </div>
                            </div>

                            {/* Linked user account */}
                            {claim.user ? (
                              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                                <UserCheck className="h-4 w-4 text-green-500 shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-gray-400 font-semibold uppercase mb-0.5">Logged-in User Account</p>
                                  <p className="text-sm font-medium text-gray-800">
                                    {claim.user.name || '—'}{' '}
                                    <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${
                                      claim.user.role === 'owner' ? 'bg-green-100 text-green-700'
                                      : claim.user.role === 'pending_owner' ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-gray-100 text-gray-600'
                                    }`}>{claim.user.role}</span>
                                  </p>
                                  <p className="text-xs text-gray-500">{claim.user.email}</p>
                                </div>
                                {claim.status === 'approved' && (
                                  <a
                                    href={`/dashboard/login`}
                                    target="_blank"
                                    className="flex items-center gap-1 text-xs bg-sun hover:bg-sun-hover text-ink px-3 py-1.5 rounded-sm font-semibold transition shrink-0"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    Dashboard Login
                                  </a>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-100 text-xs text-yellow-700">
                                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                                No user account found — claimant has not completed OTP verification yet.
                              </div>
                            )}

                            {claim.message && (
                              <div className="mt-3 p-3 bg-white rounded-lg border border-gray-100 text-sm text-gray-600 italic">
                                &ldquo;{claim.message}&rdquo;
                              </div>
                            )}
                          </div>

                          {/* Action buttons */}
                          <div className="flex flex-col gap-2 shrink-0">
                            {claim.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => processClaim(claim.id, 'approve')}
                                  disabled={processingClaim === claim.id}
                                  className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition disabled:opacity-60"
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => processClaim(claim.id, 'reject')}
                                  disabled={processingClaim === claim.id}
                                  className="flex items-center gap-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-semibold px-4 py-2 rounded-lg transition disabled:opacity-60"
                                >
                                  <X className="h-3.5 w-3.5" />
                                  Reject
                                </button>
                              </>
                            )}
                            {claim.status === 'approved' && (
                              <button
                                onClick={() => {
                                  // Find the listing from claims data and open upgrade modal
                                  setUpgradeMonths(1);
                                  setUpgradeModal({
                                    listing: {
                                      id: claim.listing.id,
                                      name: claim.listing.name,
                                      slug: claim.listing.slug,
                                      description: null,
                                      phone: null,
                                      email: null,
                                      website: null,
                                      address: null,
                                      rating: null,
                                      reviews: 0,
                                      verified: true,
                                      featured: claim.listing.featured,
                                      premiumExpiresAt: null,
                                      serviceTags: null,
                                      location: claim.listing.location,
                                      category: claim.listing.category,
                                    },
                                  });
                                }}
                                className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition border ${
                                  claim.listing.featured
                                    ? 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100'
                                    : 'bg-white border-amber-300 text-amber-700 hover:bg-amber-50'
                                }`}
                              >
                                <Crown className="h-3.5 w-3.5" />
                                {claim.listing.featured ? 'Manage Premium' : 'Upgrade Premium'}
                              </button>
                            )}
                            <button
                              onClick={() => deleteClaim(claim.id)}
                              className="flex items-center gap-1.5 bg-white hover:bg-red-50 text-red-500 border border-red-200 text-xs font-semibold px-4 py-2 rounded-lg transition"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    </div>
                    <Paginator
                      page={claimsPage}
                      totalPages={claimsTotalPages}
                      loading={claimsLoading}
                      onChange={(p) => { setClaimsPage(p); }}
                    />
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
