import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const listing = await prisma.listing.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!listing) return NextResponse.json({ categories: [] });

    // Primary category always included
    const categoryMap = new Map([[listing.category.id, listing.category]]);

    // Extra category IDs stored in serviceTags JSON: { tags: [], categoryIds: [] }
    const extraIds: string[] = (() => {
      try {
        const parsed = JSON.parse(listing.serviceTags || '{}');
        return Array.isArray(parsed.categoryIds) ? parsed.categoryIds : [];
      } catch { return []; }
    })();

    if (extraIds.length > 0) {
      const extraCats = await prisma.category.findMany({ where: { id: { in: extraIds } } });
      for (const c of extraCats) categoryMap.set(c.id, c);
    }

    return NextResponse.json({ categories: Array.from(categoryMap.values()) });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ categories: [] });
  }
}
