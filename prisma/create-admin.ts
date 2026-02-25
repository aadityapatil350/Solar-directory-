import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating admin user...');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'aadityabiz350@gmail.com' },
    update: {},
    create: {
      email: 'aadityabiz350@gmail.com',
      name: 'Admin User',
      role: 'admin',
      password: 'admin123', // In production, this should be hashed (bcrypt)
    },
  });

  console.log('Admin user created:', admin);

  console.log('\n✅ Admin credentials:');
  console.log('   Email: aadityabiz350@gmail.com');
  console.log('   Password: admin123');
  console.log('\n   You can now login at: https://gosolarindex.in/admin');
}

main()
  .catch((e) => {
    console.error('Error creating admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
