import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const games = await prisma.game.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(games, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('ERROR FETCHING GAMES:', error);
    return NextResponse.json(
      { error: 'Failed to load games' },
      { status: 500 }
    );
  }
}
