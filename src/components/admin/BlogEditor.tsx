'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, EyeOff, Globe, FileText, Search, Image } from 'lucide-react';

// Load editor client-side only (uses browser APIs)
const RichTextEditor = dynamic(() => import('./RichTextEditor'), { ssr: false, loading: () => (
  <div className="border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center h-64 text-gray-400 text-sm">Loading editor…</div>
)});

const CATEGORIES = [
  'Solar Basics', 'Installation', 'Government Schemes', 'Buying Guide',
  'Maintenance', 'Commercial Solar', 'Product Reviews', 'Industry News',
  'State Guides', 'Financing',
];

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 100);
}

function calcReadTime(html: string) {
  const words = html.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export interface BlogFormData {
  id?: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  published: boolean;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
}

interface Props {
  initialData?: Partial<BlogFormData>;
  mode: 'new' | 'edit';
  auth: string;
  onSuccess?: (post: BlogFormData) => void;
}

export default function BlogEditor({ initialData, mode, auth, onSuccess }: Props) {
  const [form, setForm] = useState<BlogFormData>({
    id: initialData?.id,
    slug: initialData?.slug ?? '',
    title: initialData?.title ?? '',
    description: initialData?.description ?? '',
    content: initialData?.content ?? '',
    category: initialData?.category ?? 'Solar Basics',
    date: initialData?.date ? initialData.date.split('T')[0] : new Date().toISOString().split('T')[0],
    readTime: initialData?.readTime ?? '5 min read',
    published: initialData?.published ?? true,
    metaTitle: initialData?.metaTitle ?? '',
    metaDescription: initialData?.metaDescription ?? '',
    ogImage: initialData?.ogImage ?? '',
  });

  const [slugLocked, setSlugLocked] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [seoOpen, setSeoOpen] = useState(false);

  // Auto-generate slug from title on new posts
  useEffect(() => {
    if (mode === 'new' && !slugLocked) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
  }, [form.title, mode, slugLocked]);

  const set = (key: keyof BlogFormData, val: string | boolean) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleContentChange = useCallback((html: string) => {
    setForm((f) => ({ ...f, content: html, readTime: calcReadTime(html) }));
  }, []);

  const save = async (publishedOverride?: boolean) => {
    setError('');
    setSuccess('');
    if (!form.title.trim()) { setError('Title is required'); return; }
    if (!form.slug.trim()) { setError('Slug is required'); return; }
    if (!form.content || form.content === '<p></p>') { setError('Content cannot be empty'); return; }
    if (!form.category) { setError('Category is required'); return; }

    const payload = {
      ...form,
      published: publishedOverride ?? form.published,
      metaTitle: form.metaTitle || null,
      metaDescription: form.metaDescription || null,
      ogImage: form.ogImage || null,
    };

    setSaving(true);
    try {
      let res: Response;
      if (mode === 'new') {
        res = await fetch('/api/admin/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth}` },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/admin/blogs/${form.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth}` },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Save failed'); return; }

      setSuccess(publishedOverride === false ? 'Saved as draft!' : 'Published successfully!');
      if (mode === 'new') {
        // Update form with returned ID so subsequent saves go to PATCH
        setForm((f) => ({ ...f, id: data.post.id }));
        onSuccess?.(data.post);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Top Bar ── */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/admin/blogs" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition">
            <ArrowLeft className="h-4 w-4" /> Blogs
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-semibold text-gray-700 truncate max-w-xs">
            {form.title || (mode === 'new' ? 'New Post' : 'Edit Post')}
          </span>
          <span className={`ml-1 text-xs px-2 py-0.5 rounded-full font-medium ${form.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {form.published ? 'Published' : 'Draft'}
          </span>
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={() => save(false)}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" />
              {saving ? 'Saving…' : 'Save Draft'}
            </button>
            <button
              type="button"
              onClick={() => save(true)}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition disabled:opacity-50"
            >
              <Globe className="h-3.5 w-3.5" />
              {saving ? 'Publishing…' : 'Publish'}
            </button>
          </div>
        </div>
        {(error || success) && (
          <div className={`px-4 py-2 text-sm font-medium ${error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {error || success}
          </div>
        )}
      </div>

      {/* ── Editor Layout ── */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        {/* Main column */}
        <div className="space-y-4">
          {/* Title */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Post title…"
              className="w-full px-5 py-4 text-2xl font-bold text-gray-900 placeholder-gray-300 border-none outline-none focus:ring-0"
            />
            <div className="border-t border-gray-100 px-5 py-2.5 flex items-center gap-2 bg-gray-50">
              <span className="text-xs text-gray-500">Slug:</span>
              <span className="text-xs text-gray-400">/blog/</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => { setSlugLocked(true); set('slug', slugify(e.target.value)); }}
                className="flex-1 text-xs text-orange-600 font-mono bg-transparent outline-none"
              />
              {mode === 'new' && (
                <button
                  type="button"
                  onClick={() => { setSlugLocked(false); setForm((f) => ({ ...f, slug: slugify(f.title) })); }}
                  className="text-xs text-gray-400 hover:text-orange-500 transition ml-2"
                  title="Auto-generate from title"
                >
                  Auto
                </button>
              )}
            </div>
          </div>

          {/* Description / excerpt */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Excerpt / Meta Description</span>
            </div>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Short description shown in search results and blog listing (150–160 characters ideal)…"
              rows={3}
              className="w-full px-4 py-3 text-sm text-gray-700 placeholder-gray-300 resize-none border-none outline-none focus:ring-0"
            />
            <div className="px-4 py-1.5 bg-gray-50 border-t border-gray-100">
              <span className={`text-xs ${form.description.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                {form.description.length} / 160 characters
              </span>
            </div>
          </div>

          {/* Rich text editor */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Content</span>
              <span className="ml-auto text-xs text-gray-400">{form.readTime}</span>
            </div>
            <div className="p-2">
              <RichTextEditor
                content={form.content}
                onChange={handleContentChange}
                placeholder="Write your blog post content here. Use H2 for main sections, H3 for subsections. Add tables, lists, and images as needed."
              />
            </div>
          </div>

          {/* SEO Section */}
          <div className="bg-white rounded-xl border border-gray-200">
            <button
              type="button"
              onClick={() => setSeoOpen(!seoOpen)}
              className="w-full px-4 py-3 flex items-center gap-2 text-left hover:bg-gray-50 transition"
            >
              <Search className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-gray-700">SEO Settings</span>
              <span className="ml-auto text-xs text-gray-400">{seoOpen ? 'Hide' : 'Show'}</span>
            </button>
            {seoOpen && (
              <div className="border-t border-gray-100 p-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    SEO Title <span className="font-normal text-gray-400">(overrides post title in &lt;title&gt; tag)</span>
                  </label>
                  <input
                    type="text"
                    value={form.metaTitle}
                    onChange={(e) => set('metaTitle', e.target.value)}
                    placeholder={form.title || 'Leave blank to use post title'}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-400 transition"
                  />
                  <p className={`text-xs mt-1 ${form.metaTitle.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>
                    {(form.metaTitle || form.title).length} / 60 characters
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Meta Description <span className="font-normal text-gray-400">(overrides excerpt)</span>
                  </label>
                  <textarea
                    value={form.metaDescription}
                    onChange={(e) => set('metaDescription', e.target.value)}
                    placeholder={form.description || 'Leave blank to use excerpt'}
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-400 transition resize-none"
                  />
                  <p className={`text-xs mt-1 ${(form.metaDescription || form.description).length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                    {(form.metaDescription || form.description).length} / 160 characters
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    <Image className="h-3.5 w-3.5 inline mr-1" />
                    OG Image URL <span className="font-normal text-gray-400">(for social sharing)</span>
                  </label>
                  <input
                    type="text"
                    value={form.ogImage}
                    onChange={(e) => set('ogImage', e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-400 transition"
                  />
                </div>

                {/* Google Preview */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Google Preview</p>
                  <div className="border border-gray-200 rounded-lg p-3 bg-white">
                    <p className="text-xs text-gray-400 mb-0.5">gosolarindex.in › blog › {form.slug || 'post-slug'}</p>
                    <p className="text-sm font-semibold text-blue-700 leading-snug">{(form.metaTitle || form.title).slice(0, 60) || 'Post Title'}</p>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{(form.metaDescription || form.description).slice(0, 160) || 'Post description will appear here...'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-4">
          {/* Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Status</p>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="status" value="published" checked={form.published} onChange={() => set('published', true)} className="accent-orange-500" />
                <span className="text-sm text-gray-700 flex items-center gap-1"><Globe className="h-3.5 w-3.5 text-green-600" /> Published</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="status" value="draft" checked={!form.published} onChange={() => set('published', false)} className="accent-orange-500" />
                <span className="text-sm text-gray-700 flex items-center gap-1"><EyeOff className="h-3.5 w-3.5 text-yellow-500" /> Draft</span>
              </label>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {form.published ? 'Visible on the blog page' : 'Hidden from visitors'}
            </p>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Settings</p>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 font-medium">Category</label>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-400 transition"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 font-medium">Publish Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 font-medium">Read Time</label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => set('readTime', e.target.value)}
                placeholder="5 min read"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-400 transition"
              />
              <p className="text-xs text-gray-400 mt-1">Auto-calculated: {calcReadTime(form.content)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
            <button
              type="button"
              onClick={() => save(true)}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
            >
              <Globe className="h-4 w-4" />
              {saving ? 'Saving…' : 'Publish Post'}
            </button>
            <button
              type="button"
              onClick={() => save(false)}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              Save as Draft
            </button>
            {form.slug && mode === 'edit' && (
              <a
                href={`/blog/${form.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-orange-600 hover:text-orange-700 transition"
              >
                <Eye className="h-3.5 w-3.5" />
                View Live Post
              </a>
            )}
          </div>

          {/* SEO tip box */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-green-800 mb-2">SEO Quick Tips</p>
            <ul className="text-xs text-green-700 space-y-1.5">
              <li>• Use H2 for main sections (2–4 per article)</li>
              <li>• Use H3 for subsections under each H2</li>
              <li>• Include target keyword in title + first H2</li>
              <li>• Add a comparison table — Google loves these</li>
              <li>• Aim for 800–2,000 words for long-tail keywords</li>
              <li>• Link to 3–5 related posts internally</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
