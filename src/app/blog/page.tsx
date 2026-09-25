import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const revalidate = 3600; // ISR — re-render every hour

export const metadata: Metadata = constructMetadata({
  title: 'Solar Energy Articles & Subsidy Guides (India 2026) | GoSolarIndex',
  description: 'In-depth solar guides, PM Surya Ghar subsidy updates, equipment comparisons, and net-metering regulations for Indian property owners.',
  path: '/blog',
  canonicalUrl: 'https://gosolarindex.in/blog',
});

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
    select: { slug: true, title: true, description: true, category: true, readTime: true, date: true },
  });

  return (
    <div className="min-h-screen bg-paper text-ink pb-20 md:pb-0">
      <Header />

      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Solar Guides & Articles', href: '/blog' },
            ]}
          />
        </div>
      </div>

      {/* Header Banner */}
      <header className="border-b border-line bg-wash py-10 sm:py-12">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider font-body">
              Editorial Guides &amp; Policy Analysis
            </span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink mt-1.5 leading-tight">
              Solar Guides, Subsidy Updates &amp; Industry Reports
            </h1>
            <p className="text-base text-ink-2 mt-3 font-body leading-relaxed">
              Research-backed editorial analysis covering PM Surya Ghar subsidy slabs, state net-metering orders, inverter sizing, and module degradation metrics for India.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-content mx-auto px-4 sm:px-6 py-10 space-y-10">
        <div className="border-t border-line divide-y divide-line">
          {posts.map((post) => (
            <article key={post.slug} className="py-6 sm:py-8 space-y-2 group">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-2 font-body">
                <span className="font-semibold text-ink uppercase tracking-wider">{post.category}</span>
                <span>·</span>
                <span>{post.readTime}</span>
                <span>·</span>
                <time dateTime={new Date(post.date).toISOString()}>
                  {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </time>
              </div>

              <h2 className="font-heading font-bold text-2xl text-ink leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>

              <p className="text-sm text-ink-2 font-body leading-relaxed max-w-3xl pt-1">
                {post.description}
              </p>

              <div className="pt-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-ink underline hover:text-ink/80 font-body"
                >
                  Read full article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
