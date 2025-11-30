/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { email: string } },
) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: decodeURIComponent(params.email) },
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        profileImage: true,
        followers: true,
        following: true,
        gameInterests: true,
        gameTags: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}
