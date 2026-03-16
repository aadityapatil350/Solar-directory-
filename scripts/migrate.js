#!/usr/bin/env node
require('dotenv').config({ path: '.env.local' });
const { execSync } = require('child_process');

try {
  console.log('Running Prisma migrate dev...');
  execSync('npx prisma migrate dev --name add_listing_stats_fields', {
    stdio: 'inherit',
    env: process.env
  });
  console.log('Migration completed successfully!');
} catch (error) {
  console.error('Migration failed:', error.message);
  process.exit(1);
}
