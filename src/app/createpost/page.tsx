import { prisma } from '@/lib/prisma';
import PostForm from '@/components/PostForm';

export default async function CreatePostPage() {
  const games = await prisma.game.findMany({
    orderBy: { title: 'asc' },
    select: { id: true, title: true },
  });

  return (
    <div className="container py-5">
      <h1 className="mb-4">Create a Post</h1>
      <PostForm gameOptions={games} />
    </div>
  );
}
