import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdmin } from '@/lib/verify-admin';

// GET /api/admin/blogs/[id] — get single post by id or slug
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const ok = await verifyAdmin(request);
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const post = await prisma.blogPost.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ post });
}

// PATCH /api/admin/blogs/[id] — update blog post
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const ok = await verifyAdmin(request);
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await request.json();
    const { slug, title, description, content, category, date, readTime, published, metaTitle, metaDescription, ogImage } = body;

    // Check slug uniqueness if changing slug
    if (slug) {
      const conflict = await prisma.blogPost.findFirst({ where: { slug, NOT: { id } } });
      if (conflict) {
        return NextResponse.json({ error: 'Slug already in use' }, { status: 409 });
      }
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(slug !== undefined && { slug }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(content !== undefined && { content }),
        ...(category !== undefined && { category }),
        ...(date !== undefined && { date: new Date(date) }),
        ...(readTime !== undefined && { readTime }),
        ...(published !== undefined && { published }),
        ...(metaTitle !== undefined && { metaTitle: metaTitle || null }),
        ...(metaDescription !== undefined && { metaDescription: metaDescription || null }),
        ...(ogImage !== undefined && { ogImage: ogImage || null }),
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE /api/admin/blogs/[id] — delete blog post
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const ok = await verifyAdmin(request);
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
