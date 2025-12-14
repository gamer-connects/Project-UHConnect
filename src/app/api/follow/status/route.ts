import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ isFollowing: false });
    }

    const currentUserId = parseInt(session.user.id, 10);
    const { searchParams } = new URL(request.url);
    const targetUserId = searchParams.get('targetUserId');

    if (!targetUserId || isNaN(parseInt(targetUserId, 10))) {
      return NextResponse.json({ error: 'Invalid target user ID' }, { status: 400 });
    }

    const targetUserIdInt = parseInt(targetUserId, 10);

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: targetUserIdInt,
        },
      },
    });

    return NextResponse.json({ isFollowing: !!follow });
  } catch (error) {
    console.error('Error checking follow status:', error);
    return NextResponse.json({ error: 'Failed to check follow status' }, { status: 500 });
  }
}
