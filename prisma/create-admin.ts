import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating/updating admin user...');

  const hashedPassword = await bcrypt.hash('Gara771!@', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'aadityabiz350@gmail.com' },
    update: {
      password: hashedPassword,
      role: 'admin',
    },
    create: {
      email: 'aadityabiz350@gmail.com',
      name: 'Admin User',
      role: 'admin',
      password: hashedPassword,
    },
  });

  console.log('Admin user created/updated:', admin.email);
  console.log('\n✅ Admin credentials:');
  console.log('   Email: aadityabiz350@gmail.com');
  console.log('   Password: [secured with bcrypt]');
  console.log('\n   Login at: https://gosolarindex.in/admin');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
