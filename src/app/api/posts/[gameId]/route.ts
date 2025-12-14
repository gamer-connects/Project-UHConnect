import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const gameId = url.pathname.split('/').pop(); // last part of URL
  console.log('GameId from URL:', gameId);

  const gameID = parseInt(gameId!, 10);
  if (Number.isNaN(gameID)) {
    return NextResponse.json({ error: 'Invalid game ID' }, { status: 400 });
  }

  try {
    const posts = await prisma.post.findMany({
      where: { gameID },
      include: { user: true, game: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
