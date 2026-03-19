import * as dotenv from 'dotenv';
import * as path from 'path';
import { execSync } from 'child_process';

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

console.log('🔄 Running Prisma migration...\n');

try {
  execSync('npx prisma migrate dev --name add_istest_to_listings', {
    stdio: 'inherit',
    env: { ...process.env }
  });
  console.log('\n✅ Migration completed successfully!');
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}
