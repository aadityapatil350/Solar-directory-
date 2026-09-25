'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Sun, Building2, ImageIcon, Users, CreditCard,
  Save, LogOut, Eye, Globe, Phone, Mail, MapPin,
  Star, ShieldCheck, Trash2, Upload, CheckCircle,
  AlertCircle, BarChart3, MessageSquare, Zap, X,
  Youtube, Tag,
} from 'lucide-react';

const ALL_SERVICE_TAGS = [
  'Residential Solar',
  'Commercial Solar',
  'Industrial Solar',
  'Rooftop Installation',
  'Ground-Mounted Solar',
  'Solar Panel Supply',
  'Solar Inverter Supply',
  'Battery Storage',
  'Net Metering',
  'Solar Water Heater',
  'Solar Pump',
  'Solar Street Light',
  'AMC & Maintenance',
  'System Audit',
  'EPC (Engineering, Procurement, Construction)',
  'Subsidy Assistance',
  'On-Grid Systems',
  'Off-Grid Systems',
  'Hybrid Systems',
  'MNRE Certified',
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface ListingImage {
  id: string;
  url: string;
  order: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Listing {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  youtubeUrl: string | null;
  serviceTags: string | null; // JSON: { tags: string[], categoryIds: string[] }
  verified: boolean;
  featured: boolean;
  rating: number | null;
  reviews: number;
  views: number;
  category: { id: string; name: string; slug: string };
  location: { city: string; state: string };
  images: ListingImage[];
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  requirement: string | null;
  budget: string | null;
  city: string | null;
  createdAt: string;
  phoneMasked: boolean;
}

interface Analytics {
  views: number;
  whatsappClicks: number | null;
  enquiries: number | null;
  featuredOnly: boolean;
}

type TabId = 'listing' | 'photos' | 'leads' | 'subscription';

// ─── Toast component ──────────────────────────────────────────────────────────

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${bg} text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 max-w-sm`}>
      {type === 'success' && <CheckCircle className="h-5 w-5 shrink-0" />}
      {type === 'error' && <AlertCircle className="h-5 w-5 shrink-0" />}
      {type === 'info' && <Zap className="h-5 w-5 shrink-0" />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-auto shrink-0"><X className="h-4 w-4" /></button>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<Listing | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('listing');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Listing edit form state
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    description: '',
    youtubeUrl: '',
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedExtraCategoryIds, setSelectedExtraCategoryIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  // Image upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<ListingImage[]>([]);

  function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
    setToast({ message, type });
  }

  // ─── Load data ──────────────────────────────────────────────────────────────

  useEffect(() => {
    async function load() {
      try {
        const [listingRes, analyticsRes, leadsRes, catsRes] = await Promise.all([
          fetch('/api/dashboard/listing'),
          fetch('/api/dashboard/analytics'),
          fetch('/api/dashboard/leads'),
          fetch('/api/categories'),
        ]);

        if (listingRes.status === 401) {
          window.location.href = '/dashboard/login';
          return;
        }

        if (!listingRes.ok) {
          const errData = await listingRes.json().catch(() => ({}));
          console.error('Dashboard listing error:', listingRes.status, errData);
          setLoading(false);
          return;
        }

        if (listingRes.ok) {
          const data = await listingRes.json();
          const l: Listing = data.listing;
          setListing(l);
          setImages(l.images || []);
          setForm({
            name: l.name || '',
            phone: l.phone || '',
            email: l.email || '',
            website: l.website || '',
            address: l.address || '',
            description: l.description || '',
            youtubeUrl: l.youtubeUrl || '',
          });
          try {
            const st = JSON.parse(l.serviceTags || '{}');
            // Support both old format (plain array) and new format ({ tags, categoryIds })
            if (Array.isArray(st)) {
              setSelectedTags(st);
              setSelectedExtraCategoryIds([]);
            } else {
              setSelectedTags(Array.isArray(st.tags) ? st.tags : []);
              setSelectedExtraCategoryIds(Array.isArray(st.categoryIds) ? st.categoryIds : []);
            }
          } catch {
            setSelectedTags([]);
            setSelectedExtraCategoryIds([]);
          }
        }

        if (analyticsRes.ok) {
          setAnalytics(await analyticsRes.json());
        }

        if (leadsRes.ok) {
          const data = await leadsRes.json();
          setLeads(data.leads || []);
          setIsFeatured(data.isFeatured || false);
        }

        if (catsRes.ok) {
          setAllCategories(await catsRes.json());
        }
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  // ─── Save listing ────────────────────────────────────────────────────────────

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/dashboard/listing', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, serviceTags: JSON.stringify({ tags: selectedTags, categoryIds: selectedExtraCategoryIds }) }),
      });
      if (res.ok) {
        const data = await res.json();
        const l = data.listing;
        setListing(l);
        // Sync form state from saved response so re-edits show correct values
        setForm({
          name: l.name || '',
          phone: l.phone || '',
          email: l.email || '',
          website: l.website || '',
          address: l.address || '',
          description: l.description || '',
          youtubeUrl: l.youtubeUrl || '',
        });
        showToast('Listing saved successfully!', 'success');
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to save.', 'error');
      }
    } catch {
      showToast('Network error.', 'error');
    } finally {
      setSaving(false);
    }
  }

  // ─── Upload image ────────────────────────────────────────────────────────────

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('File must be under 5MB', 'error');
      return;
    }

    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetch('/api/dashboard/images', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        setImages((prev) => [...prev, data.image]);
        showToast('Photo uploaded!', 'success');
      } else {
        showToast(data.error || 'Upload failed.', 'error');
      }
    } catch {
      showToast('Upload failed.', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  // ─── Delete image ─────────────────────────────────────────────────────────

  async function handleImageDelete(id: string) {
    if (!confirm('Delete this photo?')) return;
    try {
      const res = await fetch(`/api/dashboard/images/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== id));
        showToast('Photo deleted.', 'success');
      } else {
        showToast('Failed to delete photo.', 'error');
      }
    } catch {
      showToast('Network error.', 'error');
    }
  }

  // ─── Logout ──────────────────────────────────────────────────────────────────

  async function handleLogout() {
    await fetch('/api/dashboard/auth/logout', { method: 'POST' });
    window.location.href = '/dashboard/login';
  }

  // ─── Render ───────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex flex-col justify-between">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sun" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-paper flex flex-col justify-between">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <div className="w-12 h-12 rounded-sm bg-wash border border-line flex items-center justify-center mx-auto mb-4 text-ink">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h1 className="font-heading text-xl font-bold text-ink mb-2">No listing linked to your account</h1>
          <p className="text-ink-2 font-body mb-2">Your account is not linked to any listing yet.</p>
          <p className="text-ink-2 font-body mb-6">
            If you recently had your claim approved, please{' '}
            <button
              onClick={() => { window.location.href = '/dashboard/login'; }}
              className="text-ink font-semibold underline underline-offset-2"
            >
              log out and log back in
            </button>
            {' '}to refresh your session. If the issue persists, contact us at{' '}
            <a href="mailto:support@gosolarindex.in" className="text-ink font-semibold underline underline-offset-2">
              support@gosolarindex.in
            </a>
            .
          </p>
          <button
            onClick={async () => {
              await fetch('/api/dashboard/auth/logout', { method: 'POST' });
              window.location.href = '/dashboard/login';
            }}
            className="inline-block bg-sun hover:bg-sun-hover text-ink font-heading font-semibold px-6 py-2.5 rounded-sm transition text-sm"
          >
            Log out &amp; try again
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'listing', label: 'My Listing', icon: <Building2 className="h-4 w-4" /> },
    { id: 'photos', label: 'Photos', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'leads', label: 'Leads', icon: <Users className="h-4 w-4" /> },
    { id: 'subscription', label: 'Subscription', icon: <CreditCard className="h-4 w-4" /> },
  ];

  const FEATURED_LIMIT = 5;
  const atImageLimit = !listing.featured || (listing.featured && images.length >= FEATURED_LIMIT);

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
      <Header />

      {/* Top bar */}
      <div className="bg-paper border-b border-line sticky top-[65px] z-40">
        <div className="max-w-content mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 border border-line bg-wash rounded-sm flex items-center justify-center shrink-0">
              <Sun className="h-4 w-4 text-sun" />
            </div>
            <div className="min-w-0">
              <p className="font-heading font-semibold text-ink text-sm truncate">{listing.name}</p>
              <p className="text-xs text-ink-2 font-body">{listing.location.city} · {listing.category.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/listing/${listing.slug}`}
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs text-ink border border-line px-3 py-1.5 rounded-sm hover:bg-wash transition font-body"
            >
              <Eye className="h-3.5 w-3.5" /> View Listing
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-ink border border-line px-3 py-1.5 rounded-sm hover:bg-wash transition font-body"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-content mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        <div className="max-w-5xl mx-auto">

          {/* Analytics quick stats */}
          {analytics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-paper rounded-sm p-4 border border-line">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="h-4 w-4 text-ink" />
                  <span className="text-xs text-ink-2 font-body font-semibold uppercase tracking-wider">Profile Views</span>
                </div>
                <p className="text-2xl font-bold font-heading text-ink">{analytics.views.toLocaleString()}</p>
                <p className="text-xs text-ink-2 font-body mt-0.5">All time register views</p>
              </div>
              <div className="bg-paper rounded-sm p-4 border border-line">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="h-4 w-4 text-ink" />
                  <span className="text-xs text-ink-2 font-body font-semibold uppercase tracking-wider">WhatsApp Clicks</span>
                </div>
                {analytics.featuredOnly ? (
                  <button onClick={() => setActiveTab('subscription')} className="flex items-center gap-1 text-xs text-ink font-semibold hover:underline mt-1 font-body">
                    <Star className="h-3 w-3 text-sun" /> Upgrade to unlock
                  </button>
                ) : (
                  <>
                    <p className="text-2xl font-bold font-heading text-ink">{analytics.whatsappClicks!.toLocaleString()}</p>
                    <p className="text-xs text-ink-2 font-body mt-0.5">Last 30 days direct enquiries</p>
                  </>
                )}
              </div>
              <div className="bg-paper rounded-sm p-4 border border-line">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-sun" />
                  <span className="text-xs text-ink-2 font-body font-semibold uppercase tracking-wider">City Enquiries</span>
                </div>
                {analytics.featuredOnly ? (
                  <button onClick={() => setActiveTab('subscription')} className="flex items-center gap-1 text-xs text-ink font-semibold hover:underline mt-1 font-body">
                    <Star className="h-3 w-3 text-sun" /> Upgrade to unlock
                  </button>
                ) : (
                  <>
                    <p className="text-2xl font-bold font-heading text-ink">{analytics.enquiries!.toLocaleString()}</p>
                    <p className="text-xs text-ink-2 font-body mt-0.5">Last 30 days consumer leads</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Tab navigation */}
          <div className="flex gap-2 border-b border-line mb-6 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold font-body border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-ink text-ink bg-wash'
                    : 'border-transparent text-ink-2 hover:text-ink hover:bg-wash'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* ── Tab: My Listing ── */}
          {activeTab === 'listing' && (
            <div className="bg-paper rounded-sm border border-line p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-heading font-bold text-ink">Edit Your Listing</h2>
                <div className="flex gap-2">
                  {listing.verified && (
                    <span className="flex items-center gap-1 bg-wash text-ink text-xs font-semibold px-2.5 py-1 rounded-sm border border-line">
                      <ShieldCheck className="h-3 w-3 text-ink" /> Verified
                    </span>
                  )}
                  {listing.featured && (
                    <span className="flex items-center gap-1 bg-sun-wash text-ink text-xs font-semibold px-2.5 py-1 rounded-sm border border-line">
                      <Star className="h-3 w-3 fill-sun text-sun" /> Featured
                    </span>
                  )}
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-4 font-body">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">Business Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-line rounded-sm px-4 py-2.5 text-sm bg-paper text-ink focus:outline-none focus:border-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5 flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" /> Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-line rounded-sm px-4 py-2.5 text-sm bg-paper text-ink focus:outline-none focus:border-ink"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5 flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-line rounded-sm px-4 py-2.5 text-sm bg-paper text-ink focus:outline-none focus:border-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5 flex items-center gap-1">
                      <Globe className="h-3.5 w-3.5" /> Website
                    </label>
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      placeholder="https://yourwebsite.com"
                      className="w-full border border-line rounded-sm px-4 py-2.5 text-sm bg-paper text-ink focus:outline-none focus:border-ink"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> Address
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Full business address"
                    className="w-full border border-line rounded-sm px-4 py-2.5 text-sm bg-paper text-ink focus:outline-none focus:border-ink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">Business Description</label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe your services, experience, certifications..."
                    className="w-full border border-line rounded-sm px-4 py-2.5 text-sm bg-paper text-ink focus:outline-none focus:border-ink resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5 flex items-center gap-1">
                    <Youtube className="h-3.5 w-3.5 text-ink" />
                    Show Your Work — YouTube Video URL
                  </label>
                  <input
                    type="url"
                    value={form.youtubeUrl}
                    onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full border border-line rounded-sm px-4 py-2.5 text-sm bg-paper text-ink focus:outline-none focus:border-ink"
                  />
                  <p className="text-xs text-ink-2 mt-1">Paste a YouTube link — it will be shown on your listing page to showcase your solar installations.</p>
                </div>

                {/* Extra Categories */}
                {allCategories.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5 flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5 text-ink" />
                      Additional Categories
                    </label>
                    <p className="text-xs text-ink-2 mb-3">
                      Your primary category is <span className="font-semibold text-ink">{listing.category.name}</span>. Select any additional categories your business also covers.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {allCategories
                        .filter((c) => c.id !== listing.category.id)
                        .map((cat) => {
                          const selected = selectedExtraCategoryIds.includes(cat.id);
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() =>
                                setSelectedExtraCategoryIds(
                                  selected
                                    ? selectedExtraCategoryIds.filter((id) => id !== cat.id)
                                    : [...selectedExtraCategoryIds, cat.id]
                                )
                              }
                              className={`px-3 py-1.5 rounded-sm text-xs font-medium border transition ${
                                selected
                                  ? 'bg-sun text-ink border-ink font-semibold'
                                  : 'bg-paper text-ink border-line hover:border-ink'
                              }`}
                            >
                              {selected && <span className="mr-1">✓</span>}
                              {cat.name}
                            </button>
                          );
                        })}
                    </div>
                    {selectedExtraCategoryIds.length > 0 && (
                      <p className="text-xs text-ink-2 mt-2">{selectedExtraCategoryIds.length} extra {selectedExtraCategoryIds.length !== 1 ? 'categories' : 'category'} selected</p>
                    )}
                  </div>
                )}

                {/* Service Tags */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5 flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5 text-ink" />
                    Services Offered
                  </label>
                  <p className="text-xs text-ink-2 mb-3">Select all services your business provides. These appear as tags on your listing.</p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_SERVICE_TAGS.map((tag) => {
                      const selected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() =>
                            setSelectedTags(
                              selected
                                ? selectedTags.filter((t) => t !== tag)
                                : [...selectedTags, tag]
                            )
                          }
                          className={`px-3 py-1.5 rounded-sm text-xs font-medium border transition ${
                            selected
                              ? 'bg-sun text-ink border-ink font-semibold'
                              : 'bg-paper text-ink border-line hover:border-ink'
                          }`}
                        >
                          {selected && <span className="mr-1">✓</span>}
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                  {selectedTags.length > 0 && (
                    <p className="text-xs text-ink-2 mt-2">{selectedTags.length} service{selectedTags.length !== 1 ? 's' : ''} selected</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-sun hover:bg-sun-hover text-ink font-heading font-semibold px-6 py-2.5 rounded-sm transition disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {/* ── Tab: Photos ── */}
          {activeTab === 'photos' && (
            <div className="bg-paper rounded-sm border border-line p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-heading font-bold text-ink">Business Photos</h2>
                <span className="text-sm font-body text-ink-2">
                  {listing.featured ? `${images.length}/5 photos` : 'Featured plan only'}
                </span>
              </div>

              {!listing.featured && (
                <div className="bg-sun-wash border border-line rounded-sm p-4 mb-5 flex items-start gap-3">
                  <Star className="h-5 w-5 text-sun shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-ink font-heading">Photos are a Featured partner feature</p>
                    <p className="text-sm text-ink-2 font-body">Upgrade to Featured (₹999/month) to upload up to 5 photos on your listing.</p>
                  </div>
                </div>
              )}

              {listing.featured && images.length >= FEATURED_LIMIT && (
                <div className="bg-wash border border-line rounded-sm p-4 mb-5 flex items-start gap-3">
                  <Star className="h-5 w-5 text-sun shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-ink font-heading">5/5 photos used</p>
                    <p className="text-sm text-ink-2 font-body">Maximum 5 photos reached. Delete a photo to upload a new one.</p>
                  </div>
                </div>
              )}

              {/* Upload button */}
              {!atImageLimit && (
                <div className="mb-5">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className={`flex items-center justify-center gap-2 border-2 border-dashed border-line rounded-sm p-6 cursor-pointer hover:bg-wash transition text-ink font-medium text-sm font-body ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
                  >
                    <Upload className="h-5 w-5 text-ink" />
                    {uploading ? 'Uploading...' : 'Click to upload photo (JPEG, PNG, WebP · max 5MB)'}
                  </label>
                </div>
              )}

              {/* Photo grid */}
              {images.length === 0 ? (
                <div className="text-center py-12 text-ink-2 font-body">
                  <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-40 text-ink" />
                  <p className="font-medium text-ink">No photos yet</p>
                  <p className="text-sm">Upload photos to showcase your work and attract more customers.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((img) => (
                    <div key={img.id} className="relative group aspect-square rounded-sm overflow-hidden bg-wash border border-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt="Listing photo" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <button
                          onClick={() => handleImageDelete(img.id)}
                          className="bg-paper text-ink p-2 rounded-sm hover:bg-sun transition"
                          title="Delete photo"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Tab: Leads ── */}
          {activeTab === 'leads' && (
            <div className="bg-paper rounded-sm border border-line p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-heading font-bold text-ink">Recent Leads</h2>
                <span className="text-sm font-body text-ink-2">{listing.location.city} · Last 30 days</span>
              </div>

              {!isFeatured && (
                <div className="bg-sun-wash border border-line rounded-sm p-4 mb-5 flex items-start gap-3">
                  <Star className="h-5 w-5 text-sun shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-ink font-heading">Upgrade to see full contact details</p>
                    <p className="text-sm text-ink-2 font-body">Free plan shows masked phone numbers. Upgrade to Featured (₹999/month) to see full consumer contact details.</p>
                  </div>
                </div>
              )}

              {leads.length === 0 ? (
                <div className="text-center py-12 text-ink-2 font-body">
                  <Users className="h-12 w-12 mx-auto mb-3 opacity-40 text-ink" />
                  <p className="font-medium text-ink">No leads yet in your city</p>
                  <p className="text-sm">Direct leads submitted for {listing.location.city} will appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-body">
                    <thead>
                      <tr className="border-b border-line bg-wash">
                        <th className="text-left py-3 px-3 text-xs font-semibold text-ink uppercase">Name</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-ink uppercase">Phone</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-ink uppercase">Requirement</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-ink uppercase">City</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-ink uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-wash transition">
                          <td className="py-3 px-3 font-medium text-ink">{lead.name}</td>
                          <td className="py-3 px-3">
                            {lead.phoneMasked ? (
                              <span className="flex items-center gap-1.5 text-ink-2">
                                <span className="font-mono text-xs">{lead.phone}</span>
                                <span className="text-xs bg-sun-wash text-ink border border-line px-1.5 py-0.5 rounded-sm font-semibold">Upgrade</span>
                              </span>
                            ) : (
                              <a href={`tel:${lead.phone}`} className="text-ink font-semibold underline underline-offset-2">{lead.phone}</a>
                            )}
                          </td>
                          <td className="py-3 px-3 text-ink-2">{lead.requirement || '—'}</td>
                          <td className="py-3 px-3 text-ink-2">{lead.city || '—'}</td>
                          <td className="py-3 px-3 text-ink-2 text-xs whitespace-nowrap">
                            {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── Tab: Subscription ── */}
          {activeTab === 'subscription' && (
            <div className="space-y-5">
              <div className="bg-paper rounded-sm border border-line p-6">
                <h2 className="text-lg font-heading font-bold text-ink mb-1">Current Plan</h2>
                <p className="text-sm font-body text-ink-2 mb-5">
                  You are currently on the{' '}
                  <span className="font-semibold text-ink font-heading">
                    {listing.featured ? 'Featured' : 'Free'} Plan
                  </span>
                </p>

                <div className="grid sm:grid-cols-2 gap-4 font-body">
                  {/* Free Plan */}
                  <div className={`rounded-sm border p-5 ${!listing.featured ? 'border-ink bg-wash' : 'border-line bg-paper'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold font-heading text-ink text-base">Free</h3>
                      {!listing.featured && (
                        <span className="text-xs bg-ink text-paper px-2 py-0.5 rounded-sm font-semibold font-body">Current</span>
                      )}
                    </div>
                    <p className="text-2xl font-bold font-heading text-ink mb-4">₹0 <span className="text-sm font-normal text-ink-2">/month</span></p>
                    <ul className="space-y-2 text-sm text-ink-2">
                      {[
                        'Basic directory listing',
                        'Edit business profile details',
                        'Verified business badge',
                        'Masked lead phone numbers',
                        'No photo gallery uploads',
                      ].map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-ink shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Featured Plan */}
                  <div className={`rounded-sm border-2 p-5 ${listing.featured ? 'border-ink bg-sun-wash/40' : 'border-line hover:border-ink transition bg-paper'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold font-heading text-ink text-base">Featured</h3>
                      {listing.featured ? (
                        <span className="text-xs bg-sun text-ink px-2 py-0.5 rounded-sm font-bold font-body">Current</span>
                      ) : (
                        <span className="text-xs bg-sun-wash text-ink border border-line px-2 py-0.5 rounded-sm font-semibold font-body">Recommended</span>
                      )}
                    </div>
                    <p className="text-2xl font-bold font-heading text-ink mb-4">
                      ₹999 <span className="text-sm font-normal text-ink-2">/month</span>
                    </p>
                    <ul className="space-y-2 text-sm text-ink mb-5">
                      {[
                        'Priority placement in city search',
                        'Up to 5 photos on your listing',
                        'Full unmasked lead phone numbers',
                        'Featured badge on listing',
                        'Featured showcase in top directory strip',
                        'YouTube video showcase on listing',
                        'Detailed monthly analytics',
                      ].map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-ink shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    {!listing.featured && (
                      <button
                        onClick={() => showToast('Contact our partner team at +91-93732-38164 to activate Featured.', 'info')}
                        className="w-full bg-sun hover:bg-sun-hover text-ink font-heading font-semibold py-2.5 rounded-sm transition text-sm"
                      >
                        Upgrade to Featured
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Need help */}
              <div className="bg-paper rounded-sm border border-line p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between font-body">
                <div>
                  <p className="font-semibold font-heading text-ink text-sm">Need help or want to upgrade?</p>
                  <p className="text-sm text-ink-2">Call us at +91-93732-38164 or email support@gosolarindex.in</p>
                </div>
                <a
                  href="tel:+919373238164"
                  className="shrink-0 border border-ink text-ink hover:bg-wash font-heading font-semibold px-4 py-2 rounded-sm text-sm transition"
                >
                  Call Support
                </a>
              </div>
            </div>
          )}

        </div>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <Footer />
    </div>
  );
}
