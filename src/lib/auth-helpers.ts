import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

export interface DecodedToken {
  userId: string;
  email: string;
  role: string;
}

export async function getAuthUser(): Promise<DecodedToken | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as DecodedToken;
  } catch (error) {
    return null;
  }
}

export async function isAdmin(): Promise<boolean> {
  const user = await getAuthUser();
  return user?.role === 'admin';
}

export async function isAdminOrOwner(userId?: string): Promise<boolean> {
  const user = await getAuthUser();
  if (!user) return false;
  return user.role === 'admin' || user.role === 'owner' || user.userId === userId;
}
