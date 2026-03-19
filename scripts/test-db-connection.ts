import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const prisma = new PrismaClient();

async function testConnection() {
  console.log('Testing database connection...');
  try {
    const count = await prisma.listing.count();
    console.log(`✅ Connected! Found ${count} listings`);

    // Quick test: add column
    console.log('\nAdding isTest column...');
    await prisma.$executeRawUnsafe(`ALTER TABLE "Listing" ADD COLUMN IF NOT EXISTS "isTest" BOOLEAN NOT NULL DEFAULT false;`);
    console.log('✅ Column added');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
