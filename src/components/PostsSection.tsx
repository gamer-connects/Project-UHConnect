import { prisma } from '@/lib/prisma';
import HomePost from './HomePost';

interface PostWithRelations {
  id: number;
  content: string;
  createdAt: Date;
  tags: string[];
  user: {
    username: string;
    profileImage: string | null;
  };
  game: {
    name: string;
    picture: string;
  };
}

export default async function PostsSection() {
  const posts: PostWithRelations[] = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      game: true,
    },
  });

  return (
    <div>
      {posts.map((post: PostWithRelations) => (
        <HomePost
          key={post.id}
          post={{
            id: post.id,
            content: post.content,
            createdAt: post.createdAt.toISOString(),
            tags: post.tags,
            user: {
              username: post.user.username,
              profileImage: post.user.profileImage ?? null,
            },
            game: {
              name: post.game.name,
              picture: post.game.picture,
            },
          }}
        />
      ))}
    </div>
  );
}
