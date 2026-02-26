import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/metadata';
import { getBlogPost, blogPosts } from '@/lib/blog';
import Header from '@/components/Header';
import Link from 'next/link';
import Script from 'next/script';
import { Clock, Tag, ChevronRight, ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return constructMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
  });
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const siteUrl = 'https://gosolarindex.in';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'GoSolarIndex', url: siteUrl },
    publisher: {
      '@type': 'Organization',
      name: 'GoSolarIndex',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${slug}` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/blog/${slug}` },
    ],
  };

  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="bc-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-500 transition">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/blog" className="hover:text-orange-500 transition">Blog</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate max-w-64">{post.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center gap-1 text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                <Tag className="h-3.5 w-3.5" />
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-400">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
              <time className="text-sm text-gray-400">
                {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">{post.description}</p>
          </div>

          {/* Article body */}
          <article
            className="bg-white rounded-2xl shadow-sm p-8 md:p-12 prose prose-lg max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-li:text-gray-600
              prose-strong:text-gray-900
              prose-table:text-sm prose-td:p-2 prose-th:p-2 prose-th:bg-gray-50
              prose-a:text-orange-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Box */}
          <div className="mt-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Ready to Go Solar?</h3>
            <p className="text-orange-100 mb-6">
              Find verified solar installers in your city. Get free quotes and compare prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition"
              >
                Find Solar Installers
              </Link>
              <Link
                href="/pricing"
                className="border border-white/40 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
              >
                List Your Business
              </Link>
            </div>
          </div>

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-orange-600 hover:underline mt-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition group"
                  >
                    <span className="text-xs text-orange-600 font-medium">{p.category}</span>
                    <h3 className="font-semibold text-gray-900 mt-1 text-sm leading-snug group-hover:text-orange-600 transition line-clamp-3">
                      {p.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
