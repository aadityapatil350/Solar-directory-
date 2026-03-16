#!/usr/bin/env node
require('dotenv').config({ path: '.env.local' });
const { execSync } = require('child_process');

try {
  console.log('Pushing Prisma schema to database...');
  execSync('npx prisma db push --accept-data-loss', {
    stdio: 'inherit',
    env: process.env
  });
  console.log('Schema push completed successfully!');
} catch (error) {
  console.error('Schema push failed:', error.message);
  process.exit(1);
}
