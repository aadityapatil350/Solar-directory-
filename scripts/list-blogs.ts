import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const posts = await prisma.blogPost.findMany({
    select: { slug: true, title: true, category: true },
    orderBy: { date: 'desc' },
  });
  console.log('Total:', posts.length);
  posts.forEach((p, i) => console.log(`${i+1}. [${p.category}] ${p.title}`));
}
main().catch(console.error).finally(() => prisma.$disconnect());
