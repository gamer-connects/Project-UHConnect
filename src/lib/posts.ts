import { prisma } from '@/lib/prisma';

export default async function getAllPosts() {
  return prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      game: true,
    },
  });
}
