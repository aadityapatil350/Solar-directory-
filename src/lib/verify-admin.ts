import { cookies } from 'next/headers';
import { verifySession, SessionPayload, COOKIE_NAME_EXPORT } from '@/lib/session';

/**
 * Verifies that the current request has an authenticated session with role 'admin'.
 * Checks HTTP-only cookie 'gsi_session' first, then Bearer session token if present.
 * Returns the SessionPayload if authorized, or null if unauthorized.
 */
export async function verifyAdmin(request?: Request): Promise<SessionPayload | null> {
  // 1. Try reading from Next.js cookie store
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME_EXPORT)?.value;
    if (token) {
      const session = await verifySession(token);
      if (session && session.role === 'admin') {
        return session;
      }
    }
  } catch {
    // getSession/cookies() might throw if called outside a request context
  }

  // 2. Direct cookie extraction from Request header (useful in API route handlers)
  if (request) {
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME_EXPORT}=([^;]*)`));
    if (match?.[1]) {
      const token = decodeURIComponent(match[1]);
      const session = await verifySession(token);
      if (session && session.role === 'admin') {
        return session;
      }
    }

    // 3. Support signed session token in Authorization header: Bearer <session_jwt>
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      const session = await verifySession(token);
      if (session && session.role === 'admin') {
        return session;
      }
    }
  }

  return null;
}
