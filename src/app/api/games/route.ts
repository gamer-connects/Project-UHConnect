import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const games = await prisma.game.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(games);
  } catch (error) {
    console.error('ERROR FETCHING GAMES:', error);
    return NextResponse.json({ error: 'Failed to load games' }, { status: 500 });
  }
}

