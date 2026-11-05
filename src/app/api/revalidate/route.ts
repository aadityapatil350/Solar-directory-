import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAdmin } from '@/lib/verify-admin';

/**
 * On-Demand Revalidation API
 *
 * Secured via:
 * 1. Active admin session cookie, OR
 * 2. x-revalidate-token header matching REVALIDATION_SECRET or SESSION_SECRET
 */
export async function POST(request: NextRequest) {
  try {
    const session = await verifyAdmin(request);
    const tokenHeader = request.headers.get('x-revalidate-token');
    const expectedSecret = process.env.REVALIDATION_SECRET || process.env.SESSION_SECRET;

    const isSecretValid = Boolean(expectedSecret && tokenHeader && tokenHeader === expectedSecret);

    if (!session && !isSecretValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { path, paths } = body;

    // Revalidate single path
    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        success: true,
        message: `Revalidated: ${path}`,
        revalidated: [path],
      });
    }

    // Revalidate multiple paths
    if (paths && Array.isArray(paths)) {
      for (const p of paths) {
        revalidatePath(p);
      }
      return NextResponse.json({
        success: true,
        message: `Revalidated ${paths.length} paths`,
        revalidated: paths,
      });
    }

    return NextResponse.json(
      { success: false, message: 'Missing path or paths parameter' },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
