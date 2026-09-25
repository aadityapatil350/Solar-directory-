import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/metadata';
import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Link from 'next/link';

export const revalidate = 3600;   // ISR — revalidate every hour
export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
    select: { title: true, description: true, metaTitle: true, metaDescription: true, ogImage: true },
  });
  if (!post) return {};
  return constructMetadata({
    title: post.metaTitle || `${post.title} | GoSolarIndex`,
    description: post.metaDescription || post.description,
    path: `/blog/${slug}`,
    canonicalUrl: `https://gosolarindex.in/blog/${slug}`,
    standalone: true,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });
  if (!post) notFound();

  const siteUrl = 'https://gosolarindex.in';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { '@type': 'Organization', name: 'GoSolarIndex Editorial Team', url: siteUrl },
    publisher: {
      '@type': 'Organization',
      name: 'GoSolarIndex',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${slug}` },
    ...(post.ogImage && { image: post.ogImage }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Guides & Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/blog/${slug}` },
    ],
  };

  // Related posts in same category
  const related = await prisma.blogPost.findMany({
    where: { published: true, category: post.category, NOT: { slug } },
    orderBy: { date: 'desc' },
    take: 3,
    select: { slug: true, title: true, category: true, date: true },
  });

  return (
    <div className="min-h-screen bg-paper text-ink pb-20 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-line bg-paper">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title, href: `/blog/${slug}` },
            ]}
          />
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        {/* Article Header */}
        <header className="space-y-3 pb-8 border-b border-line">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-2 font-body">
            <span className="font-semibold text-ink uppercase tracking-wider">{post.category}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <time dateTime={new Date(post.date).toISOString()}>
              {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
          </div>

          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-ink-2 font-body leading-relaxed pt-1">
            {post.description}
          </p>
        </header>

        {/* Article Body */}
        <article
          className="prose prose-neutral max-w-none text-ink font-body leading-relaxed space-y-6 [&>h2]:font-heading [&>h2]:font-semibold [&>h2]:text-2xl [&>h2]:text-ink [&>h2]:mt-8 [&>h2]:mb-3 [&>h3]:font-heading [&>h3]:font-semibold [&>h3]:text-xl [&>h3]:text-ink [&>h3]:mt-6 [&>p]:text-[16px] [&>p]:text-ink-2 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ul]:text-ink-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1 [&>ol]:text-ink-2 [&>table]:w-full [&>table]:border [&>table]:border-line [&>table_th]:bg-wash [&>table_th]:p-3 [&>table_td]:p-3 [&>table_td]:border-t [&>table_td]:border-line"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Lead CTA Strip */}
        <div className="border border-line rounded-sm p-6 sm:p-8 bg-wash space-y-4 my-10">
          <h3 className="font-heading font-semibold text-2xl text-ink">
            Planning a rooftop solar installation?
          </h3>
          <p className="text-sm text-ink-2 font-body leading-relaxed">
            Get up to 3 verified engineering quotations from empanelled contractors in your city. Compare PM Surya Ghar subsidy deductions and equipment warranties with zero broker commission.
          </p>
          <div className="pt-1">
            <Link
              href="/get-quotes"
              className="inline-flex items-center justify-center h-11 px-6 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors"
            >
              Get free installer quotes
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="pt-8 border-t border-line space-y-4">
            <h3 className="font-heading font-semibold text-xl text-ink">
              Related articles in {post.category}
            </h3>
            <div className="divide-y divide-line">
              {related.map((r) => (
                <div key={r.slug} className="py-3 flex items-center justify-between">
                  <Link href={`/blog/${r.slug}`} className="font-body text-sm font-medium text-ink hover:underline">
                    {r.title}
                  </Link>
                  <span className="text-xs text-ink-2 font-body shrink-0 ml-4">
                    {new Date(r.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
