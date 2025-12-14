import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Get all following
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
          select: {
            id: true,
            username: true,
            email: true,
            profileImage: true,
            bio: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    const followingList = following.map(f => f.following);

    return NextResponse.json(followingList);
  } catch (error) {
    console.error('Error fetching following:', error);
    return NextResponse.json({ error: 'Failed to fetch following' }, { status: 500 });
  }
}
