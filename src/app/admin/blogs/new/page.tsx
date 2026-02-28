'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogEditor from '@/components/admin/BlogEditor';

export default function NewBlogPage() {
  const router = useRouter();
  const [auth, setAuth] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const a = localStorage.getItem('adminAuth');
    if (!a) { router.push('/admin'); return; }
    setAuth(a);
    setReady(true);
  }, [router]);

  if (!ready) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading…</div>
    </div>
  );

  return (
    <BlogEditor
      mode="new"
      auth={auth}
      onSuccess={(post) => {
        // After creating, redirect to the edit page so subsequent saves are PATCHes
        setTimeout(() => router.push(`/admin/blogs/${post.id}`), 800);
      }}
    />
  );
}
