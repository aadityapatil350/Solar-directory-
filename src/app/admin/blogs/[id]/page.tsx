'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import BlogEditor, { BlogFormData } from '@/components/admin/BlogEditor';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [auth, setAuth] = useState('');
  const [post, setPost] = useState<BlogFormData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const a = localStorage.getItem('adminAuth');
    if (!a) { router.push('/admin'); return; }
    setAuth(a);

    fetch(`/api/admin/blogs/${id}`, {
      headers: { Authorization: `Bearer ${a}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return; }
        const p = data.post;
        setPost({
          id: p.id,
          slug: p.slug,
          title: p.title,
          description: p.description,
          content: p.content,
          category: p.category,
          date: p.date ? p.date.split('T')[0] : new Date().toISOString().split('T')[0],
          readTime: p.readTime,
          published: p.published,
          metaTitle: p.metaTitle ?? '',
          metaDescription: p.metaDescription ?? '',
          ogImage: p.ogImage ?? '',
        });
      })
      .catch(() => setError('Failed to load post'));
  }, [id, router]);

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-6 py-4">{error}</div>
    </div>
  );

  if (!post || !auth) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading post…</div>
    </div>
  );

  return <BlogEditor mode="edit" auth={auth} initialData={post} />;
}
