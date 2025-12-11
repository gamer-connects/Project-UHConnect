import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // HARD VALIDATION
    if (!body.title || !body.type || !body.image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const game = await prisma.game.create({
      data: {
        title: body.title,
        type: body.type,
        image: body.image,
        description: body.description || null,
      },
    });

    return NextResponse.json(game);
  } catch (error) {
    console.error('ADD GAME ERROR:', error);
    return NextResponse.json(
      { error: 'Failed to add game' },
      { status: 500 }
    );
  }
}
