import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * On-Demand Revalidation API
 *
 * Usage: POST /api/revalidate
 * Body: { "path": "/listing/some-slug" } or { "paths": ["/listing/slug1", "/listing/slug2"] }
 *
 * For security, add a secret token in production
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, paths } = body;

    // Revalidate single path
    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        success: true,
        message: `Revalidated: ${path}`,
        revalidated: [path]
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
        revalidated: paths
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
