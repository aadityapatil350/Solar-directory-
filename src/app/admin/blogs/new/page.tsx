'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogEditor from '@/components/admin/BlogEditor';

export default function NewBlogPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    localStorage.removeItem('adminAuth');
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.user?.role === 'admin') {
            setReady(true);
            return;
          }
        }
      } catch {
        // Not authenticated
      }
      router.push('/admin');
    }
    checkAuth();
  }, [router]);

  if (!ready) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading…</div>
    </div>
  );

  return (
    <BlogEditor
      mode="new"
      onSuccess={(post) => {
        // After creating, redirect to the edit page so subsequent saves are PATCHes
        setTimeout(() => router.push(`/admin/blogs/${post.id}`), 800);
      }}
    />
  );
}
