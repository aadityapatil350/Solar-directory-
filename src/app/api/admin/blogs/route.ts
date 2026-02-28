import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdmin } from '@/lib/verify-admin';

// GET /api/admin/blogs — list all blog posts
export async function GET(request: Request) {
  const ok = await verifyAdmin(request);
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const published = searchParams.get('published');

  const posts = await prisma.blogPost.findMany({
    where: {
      ...(search && { title: { contains: search, mode: 'insensitive' } }),
      ...(category && { category }),
      ...(published !== null && published !== '' && { published: published === 'true' }),
    },
    orderBy: { date: 'desc' },
    select: {
      id: true, slug: true, title: true, category: true,
      date: true, readTime: true, published: true, updatedAt: true,
      description: true,
    },
  });

  const total = await prisma.blogPost.count();
  const publishedCount = await prisma.blogPost.count({ where: { published: true } });

  return NextResponse.json({ posts, total, publishedCount });
}

// POST /api/admin/blogs — create new blog post
export async function POST(request: Request) {
  const ok = await verifyAdmin(request);
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { slug, title, description, content, category, date, readTime, published, metaTitle, metaDescription, ogImage } = body;

    if (!slug || !title || !content || !category) {
      return NextResponse.json({ error: 'slug, title, content, category are required' }, { status: 400 });
    }

    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Slug already exists. Choose a different slug.' }, { status: 409 });
    }

    const post = await prisma.blogPost.create({
      data: {
        slug,
        title,
        description: description || '',
        content,
        category,
        date: date ? new Date(date) : new Date(),
        readTime: readTime || '5 min read',
        published: published ?? true,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        ogImage: ogImage || null,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
