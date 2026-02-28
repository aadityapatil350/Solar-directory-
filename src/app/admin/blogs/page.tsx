'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Plus, Search, Edit2, Trash2, Eye, EyeOff,
  Globe, FileText, RefreshCw, ChevronDown, Tag,
} from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  published: boolean;
  updatedAt: string;
  description: string;
}

const CATEGORIES = [
  '', 'Solar Basics', 'Installation', 'Government Schemes', 'Buying Guide',
  'Maintenance', 'Commercial Solar', 'Product Reviews', 'Industry News',
  'State Guides', 'Financing',
];

export default function AdminBlogsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [filterPub, setFilterPub] = useState('');
  const [total, setTotal] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  // Auth check
  useEffect(() => {
    const a = localStorage.getItem('adminAuth');
    if (!a) { router.push('/admin'); return; }
    setAuth(a);
  }, [router]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const headers = useCallback((a?: string) => ({
    Authorization: `Bearer ${a || auth}`,
    'Content-Type': 'application/json',
  }), [auth]);

  const fetchPosts = useCallback(async (a = auth) => {
    if (!a) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (filterCat) params.set('category', filterCat);
      if (filterPub !== '') params.set('published', filterPub);
      const res = await fetch(`/api/admin/blogs?${params}`, { headers: headers(a) });
      if (!res.ok) { router.push('/admin'); return; }
      const data = await res.json();
      setPosts(data.posts);
      setTotal(data.total);
      setPublishedCount(data.publishedCount);
    } finally {
      setLoading(false);
    }
  }, [auth, search, filterCat, filterPub, headers, router]);

  useEffect(() => {
    if (auth) fetchPosts(auth);
  }, [auth, fetchPosts]);

  const deletePost = async (post: BlogPost) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeletingId(post.id);
    const res = await fetch(`/api/admin/blogs/${post.id}`, { method: 'DELETE', headers: headers() });
    setDeletingId(null);
    if (res.ok) {
      setPosts((p) => p.filter((x) => x.id !== post.id));
      setTotal((t) => t - 1);
      if (post.published) setPublishedCount((c) => c - 1);
      showToast('Post deleted');
    } else {
      showToast('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <span className="text-gray-300">|</span>
          <span className="font-bold text-gray-900">Blog Posts</span>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={() => fetchPosts()} className="p-2 text-gray-400 hover:text-gray-600 transition" title="Refresh">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <Link
              href="/admin/blogs/new"
              className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition"
            >
              <Plus className="h-4 w-4" /> New Post
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{total}</div>
            <div className="text-xs text-gray-500 mt-0.5">Total Posts</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{publishedCount}</div>
            <div className="text-xs text-gray-500 mt-0.5">Published</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">{total - publishedCount}</div>
            <div className="text-xs text-gray-500 mt-0.5">Drafts</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 flex-1 min-w-48 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchPosts()}
              placeholder="Search posts…"
              className="flex-1 text-sm bg-transparent outline-none text-gray-700"
            />
          </div>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-600"
          >
            <option value="">All Categories</option>
            {CATEGORIES.filter(Boolean).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={filterPub}
            onChange={(e) => setFilterPub(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-600"
          >
            <option value="">All Status</option>
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
          <button
            onClick={() => fetchPosts()}
            className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition"
          >
            Filter
          </button>
          {(search || filterCat || filterPub) && (
            <button
              onClick={() => { setSearch(''); setFilterCat(''); setFilterPub(''); }}
              className="text-sm text-gray-400 hover:text-gray-600 transition"
            >
              Clear
            </button>
          )}
        </div>

        {/* Posts table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-gray-400">
              <RefreshCw className="h-5 w-5 animate-spin mr-2" /> Loading…
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No posts found</p>
              <p className="text-sm mt-1">Create your first post or adjust filters</p>
              <Link href="/admin/blogs/new" className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition">
                <Plus className="h-4 w-4" /> New Post
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Date</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr key={post.id} className={`border-b border-gray-100 hover:bg-gray-50 transition ${i % 2 === 0 ? '' : 'bg-gray-50/40'}`}>
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-gray-900 leading-snug line-clamp-1 max-w-xs">{post.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">/blog/{post.slug}</div>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="flex items-center gap-1 text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full w-fit">
                        <Tag className="h-3 w-3" />{post.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="text-gray-500 text-xs">
                        {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {post.published ? (
                        <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          <Globe className="h-3 w-3" /> Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                          <EyeOff className="h-3 w-3" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-green-600 transition"
                          title="View live"
                        >
                          <Eye className="h-4 w-4" />
                        </a>
                        <Link
                          href={`/admin/blogs/${post.id}`}
                          className="p-1.5 text-gray-400 hover:text-orange-500 transition"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => deletePost(post)}
                          disabled={deletingId === post.id}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition disabled:opacity-40"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {posts.length > 0 && (
          <p className="text-xs text-gray-400 text-center mt-3">Showing {posts.length} of {total} posts</p>
        )}
      </div>
    </div>
  );
}
