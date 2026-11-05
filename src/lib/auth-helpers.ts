import { getSession, SessionPayload } from '@/lib/session';

export type DecodedToken = SessionPayload;

export async function getAuthUser(): Promise<SessionPayload | null> {
  return getSession();
}

export async function isAdmin(): Promise<boolean> {
  const user = await getAuthUser();
  return user?.role === 'admin';
}

export async function isAdminOrOwner(userId?: string): Promise<boolean> {
  const user = await getAuthUser();
  if (!user) return false;
  return user.role === 'admin' || user.role === 'owner' || (Boolean(userId) && user.userId === userId);
}
