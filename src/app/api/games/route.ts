import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export default async function GET() {
  const games = await prisma.game.findMany({
    select: {
      id: true,
      name: true,
      picture: true,
      description: true,
    },
    orderBy: { name: 'asc' },
  });

  return NextResponse.json(games);
}
