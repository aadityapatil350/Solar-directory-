import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function verifyAdmin(request: Request): Promise<boolean> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return false;
  const password = authHeader.substring(7);
  const user = await prisma.user.findUnique({
    where: { email: 'aadityabiz350@gmail.com', role: 'admin' },
  });
  if (!user?.password) return false;
  return bcrypt.compare(password, user.password);
}
