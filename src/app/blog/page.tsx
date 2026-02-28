import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Clock, Tag, ArrowRight } from 'lucide-react';

export const revalidate = 3600; // ISR — re-render every hour

export const metadata: Metadata = constructMetadata({
  title: 'Solar Energy Blog — Guides, Tips & News for India',
  description: 'Expert solar energy guides for Indian homeowners and businesses. Installation costs, government subsidies, best panels, maintenance tips and more.',
  path: '/blog',
});

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
    select: { slug: true, title: true, description: true, category: true, readTime: true, date: true },
  });

  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">Solar Energy Blog</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">
            Expert guides, subsidy updates, and solar tips for Indian homeowners and businesses.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="bg-orange-500 text-white text-sm px-4 py-1.5 rounded-full font-medium">All</span>
          {categories.map((cat) => (
            <span key={cat} className="bg-white border border-gray-200 text-gray-600 text-sm px-4 py-1.5 rounded-full hover:border-orange-400 hover:text-orange-600 cursor-pointer transition">
              {cat}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden group"
            >
              <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                    <Tag className="h-3 w-3" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition leading-snug">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.description}
                </p>

                <div className="flex items-center justify-between">
                  <time className="text-xs text-gray-400">
                    {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </time>
                  <span className="flex items-center gap-1 text-orange-600 text-sm font-medium group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
