/**
 * One-time script: update admin user password
 * Run: npx tsx scripts/update-admin-password.ts
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const newPassword = 'Gara771!@';
  const adminEmail = 'aadityabiz350@gmail.com';

  const hash = await bcrypt.hash(newPassword, 12);

  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hash,
      role: 'admin',
      name: 'Admin',
    },
    create: {
      email: adminEmail,
      password: hash,
      role: 'admin',
      name: 'Admin',
    },
  });

  console.log(`✅ Admin password updated for: ${user.email}`);
}

main()
  .catch((e) => { console.error('❌ Error:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
