import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return NextResponse.json({
        error: 'User not found',
        debug: {
          userExists: !!user,
          hasPassword: !!user?.password
        }
      }, { status: 404 });
    }

    // Test the password comparison
    const valid = await bcrypt.compare(password, user.password);

    return NextResponse.json({
      email: user.email,
      role: user.role,
      passwordValid: valid,
      debug: {
        passwordLength: password.length,
        hashPrefix: user.password.substring(0, 7),
        hashLength: user.password.length,
        bcryptVersion: require('bcryptjs/package.json').version
      }
    });
  } catch (error) {
    console.error('Test login error:', error);
    return NextResponse.json({ error: 'Test failed', details: String(error) }, { status: 500 });
  }
}
