import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        game: true,
      },
    });

    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('ERROR FETCHING POSTS:', error);
    return NextResponse.json(
      { error: 'Failed to load posts' },
      { status: 500 }
    );
  }
}
