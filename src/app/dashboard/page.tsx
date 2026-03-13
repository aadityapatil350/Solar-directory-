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
          router.push('/dashboard/login');
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
    router.push('/dashboard/login');
  }

  // ─── Render ───────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500" />
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">No listing found</h1>
          <p className="text-gray-500 mb-6">Your account is not linked to any listing.</p>
          <Link href="/" className="text-orange-600 hover:underline">Go to homepage</Link>
        </div>
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Top bar */}
      <div className="bg-white border-b sticky top-[65px] z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
              <Sun className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">{listing.name}</p>
              <p className="text-xs text-gray-500">{listing.location.city} · {listing.category.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/listing/${listing.slug}`}
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs text-gray-600 border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
            >
              <Eye className="h-3.5 w-3.5" /> View Listing
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="max-w-5xl mx-auto">

          {/* Analytics quick stats */}
          {analytics && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="h-4 w-4 text-orange-500" />
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Profile Views</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{analytics.views.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-0.5">All time</p>
              </div>
              <div className={`rounded-xl p-4 shadow-sm border ${analytics.featuredOnly ? 'bg-amber-50 border-amber-100' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className={`h-4 w-4 ${analytics.featuredOnly ? 'text-amber-400' : 'text-green-500'}`} />
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">WhatsApp Clicks</span>
                </div>
                {analytics.featuredOnly ? (
                  <button onClick={() => setActiveTab('subscription')} className="flex items-center gap-1 text-xs text-amber-600 font-semibold hover:underline mt-1">
                    <Star className="h-3 w-3" /> Upgrade to unlock
                  </button>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-gray-900">{analytics.whatsappClicks!.toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Last 30 days</p>
                  </>
                )}
              </div>
              <div className={`rounded-xl p-4 shadow-sm border ${analytics.featuredOnly ? 'bg-amber-50 border-amber-100' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Zap className={`h-4 w-4 ${analytics.featuredOnly ? 'text-amber-400' : 'text-blue-500'}`} />
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">City Enquiries</span>
                </div>
                {analytics.featuredOnly ? (
                  <button onClick={() => setActiveTab('subscription')} className="flex items-center gap-1 text-xs text-amber-600 font-semibold hover:underline mt-1">
                    <Star className="h-3 w-3" /> Upgrade to unlock
                  </button>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-gray-900">{analytics.enquiries!.toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Last 30 days</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Tab navigation */}
          <div className="flex gap-1 bg-white rounded-xl p-1.5 shadow-sm border border-gray-100 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* ── Tab: My Listing ── */}
          {activeTab === 'listing' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">Edit Your Listing</h2>
                <div className="flex gap-2">
                  {listing.verified && (
                    <span className="flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200">
                      <ShieldCheck className="h-3 w-3" /> Verified
                    </span>
                  )}
                  {listing.featured && (
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200">
                      <Star className="h-3 w-3 fill-amber-500" /> Featured
                    </span>
                  )}
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" /> Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Globe className="h-3.5 w-3.5" /> Website
                    </label>
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      placeholder="https://yourwebsite.com"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> Address
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Full business address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe your services, experience, certifications..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Youtube className="h-3.5 w-3.5 text-red-500" />
                    Show Your Work — YouTube Video URL
                  </label>
                  <input
                    type="url"
                    value={form.youtubeUrl}
                    onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Paste a YouTube link — it will be shown on your listing page to showcase your solar installations.</p>
                </div>

                {/* Extra Categories */}
                {allCategories.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5 text-orange-500" />
                      Additional Categories
                    </label>
                    <p className="text-xs text-gray-400 mb-3">
                      Your primary category is <span className="font-semibold text-gray-600">{listing.category.name}</span>. Select any additional categories your business also covers.
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
                              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                                selected
                                  ? 'bg-orange-500 text-white border-orange-500'
                                  : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400 hover:text-orange-600'
                              }`}
                            >
                              {selected && <span className="mr-1">✓</span>}
                              {cat.name}
                            </button>
                          );
                        })}
                    </div>
                    {selectedExtraCategoryIds.length > 0 && (
                      <p className="text-xs text-gray-400 mt-2">{selectedExtraCategoryIds.length} extra {selectedExtraCategoryIds.length !== 1 ? 'categories' : 'category'} selected</p>
                    )}
                  </div>
                )}

                {/* Service Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5 text-orange-500" />
                    Services Offered
                  </label>
                  <p className="text-xs text-gray-400 mb-3">Select all services your business provides. These appear as tags on your listing.</p>
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
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                            selected
                              ? 'bg-orange-500 text-white border-orange-500'
                              : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400 hover:text-orange-600'
                          }`}
                        >
                          {selected && <span className="mr-1">✓</span>}
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                  {selectedTags.length > 0 && (
                    <p className="text-xs text-gray-400 mt-2">{selectedTags.length} service{selectedTags.length !== 1 ? 's' : ''} selected</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-orange-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-orange-600 transition disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {/* ── Tab: Photos ── */}
          {activeTab === 'photos' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">Business Photos</h2>
                <span className="text-sm text-gray-500">
                  {listing.featured ? `${images.length}/5 photos` : 'Featured plan only'}
                </span>
              </div>

              {!listing.featured && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 flex items-start gap-3">
                  <Star className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800">Photos are a Featured plan feature</p>
                    <p className="text-sm text-amber-700">Upgrade to Featured (₹999/month) to upload up to 5 photos on your listing.</p>
                  </div>
                </div>
              )}

              {listing.featured && images.length >= FEATURED_LIMIT && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 flex items-start gap-3">
                  <Star className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800">5/5 photos used</p>
                    <p className="text-sm text-amber-700">Maximum 5 photos reached. Delete a photo to upload a new one.</p>
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
                    className={`flex items-center justify-center gap-2 border-2 border-dashed border-orange-300 rounded-xl p-6 cursor-pointer hover:bg-orange-50 transition text-orange-600 font-medium text-sm ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
                  >
                    <Upload className="h-5 w-5" />
                    {uploading ? 'Uploading...' : 'Click to upload photo (JPEG, PNG, WebP · max 5MB)'}
                  </label>
                </div>
              )}

              {/* Photo grid */}
              {images.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-40" />
                  <p className="font-medium">No photos yet</p>
                  <p className="text-sm">Upload photos to showcase your work and attract more customers.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((img) => (
                    <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt="Listing photo" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <button
                          onClick={() => handleImageDelete(img.id)}
                          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">Recent Leads</h2>
                <span className="text-sm text-gray-500">{listing.location.city} · Last 30 days</span>
              </div>

              {!isFeatured && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 flex items-start gap-3">
                  <Star className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800">Upgrade to see full contact details</p>
                    <p className="text-sm text-blue-700">Free plan shows masked phone numbers. Upgrade to Featured (₹999/month) to see full details.</p>
                  </div>
                </div>
              )}

              {leads.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Users className="h-12 w-12 mx-auto mb-3 opacity-40" />
                  <p className="font-medium">No leads yet in your city</p>
                  <p className="text-sm">Leads submitted for {listing.location.city} will appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Name</th>
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Phone</th>
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Requirement</th>
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">City</th>
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50">
                          <td className="py-3 px-2 font-medium text-gray-900">{lead.name}</td>
                          <td className="py-3 px-2">
                            {lead.phoneMasked ? (
                              <span className="flex items-center gap-1 text-gray-400">
                                <span className="font-mono">{lead.phone}</span>
                                <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Upgrade</span>
                              </span>
                            ) : (
                              <a href={`tel:${lead.phone}`} className="text-orange-600 hover:underline font-medium">{lead.phone}</a>
                            )}
                          </td>
                          <td className="py-3 px-2 text-gray-600">{lead.requirement || '—'}</td>
                          <td className="py-3 px-2 text-gray-600">{lead.city || '—'}</td>
                          <td className="py-3 px-2 text-gray-400 text-xs whitespace-nowrap">
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
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Current Plan</h2>
                <p className="text-sm text-gray-500 mb-5">
                  You are currently on the{' '}
                  <span className={`font-semibold ${listing.featured ? 'text-amber-600' : 'text-gray-700'}`}>
                    {listing.featured ? 'Featured' : 'Free'} Plan
                  </span>
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Free Plan */}
                  <div className={`rounded-xl border-2 p-5 ${!listing.featured ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900">Free</h3>
                      {!listing.featured && (
                        <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-medium">Current</span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-4">₹0 <span className="text-sm font-normal text-gray-500">/month</span></p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {[
                        'Basic listing',
                        'Edit business details',
                        'Verified badge',
                        'Masked lead phone numbers',
                        'No photo uploads',
                      ].map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Featured Plan */}
                  <div className={`rounded-xl border-2 p-5 ${listing.featured ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300 transition'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900">Featured</h3>
                      {listing.featured ? (
                        <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full font-medium">Current</span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">Recommended</span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-4">
                      ₹999 <span className="text-sm font-normal text-gray-500">/month</span>
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600 mb-5">
                      {[
                        'Priority placement in search',
                        'Up to 5 photos on your listing',
                        'Full lead contact details',
                        'Featured badge on listing',
                        'Appear in homepage strip',
                        'YouTube video on listing',
                        'Detailed analytics',
                      ].map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-amber-500 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    {!listing.featured && (
                      <button
                        onClick={() => showToast('Payment coming soon! Contact us at +91-93732-38164 to upgrade.', 'info')}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 rounded-xl transition text-sm"
                      >
                        Upgrade to Featured
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Need help */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Need help or want to upgrade?</p>
                  <p className="text-sm text-gray-500">Call us at +91-93732-38164 or email support@gosolarindex.in</p>
                </div>
                <a
                  href="tel:+919373238164"
                  className="shrink-0 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl text-sm transition"
                >
                  Call Now
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
