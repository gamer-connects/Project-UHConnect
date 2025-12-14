// src/app/api/follow/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma'; // Make sure this path is correct

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUserId = parseInt(session.user.id, 10);
    const { targetUserId } = await request.json();

    if (!targetUserId || isNaN(parseInt(targetUserId, 10))) {
      return NextResponse.json({ error: 'Invalid target user ID' }, { status: 400 });
    }

    const targetUserIdInt = parseInt(targetUserId, 10);

    if (currentUserId === targetUserIdInt) {
      return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 });
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserIdInt },
    });
    if (!targetUser) {
      return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
    }

    // Check if already following - use findFirst
    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: currentUserId,
        followingId: targetUserIdInt,
      },
    });

    if (existingFollow) {
      return NextResponse.json({ error: 'Already following this user' }, { status: 400 });
    }

    // Create follow
    await prisma.follow.create({
      data: {
        followerId: currentUserId,
        followingId: targetUserIdInt,
      },
    });

    // Update counts in transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: currentUserId },
        data: { following: { increment: 1 } },
      }),
      prisma.user.update({
        where: { id: targetUserIdInt },
        data: { followers: { increment: 1 } },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error following user:', error);
    return NextResponse.json({ error: 'Failed to follow user' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUserId = parseInt(session.user.id, 10);
    const { searchParams } = new URL(request.url);
    const targetUserId = searchParams.get('targetUserId');

    if (!targetUserId || isNaN(parseInt(targetUserId, 10))) {
      return NextResponse.json({ error: 'Invalid target user ID' }, { status: 400 });
    }

    const targetUserIdInt = parseInt(targetUserId, 10);

    // Remove follow - use deleteMany
    const deleted = await prisma.follow.deleteMany({
      where: {
        followerId: currentUserId,
        followingId: targetUserIdInt,
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json({ error: 'Not following this user' }, { status: 400 });
    }

    // Update counts
    await prisma.$transaction([
      prisma.user.update({
        where: { id: currentUserId },
        data: { following: { decrement: 1 } },
      }),
      prisma.user.update({
        where: { id: targetUserIdInt },
        data: { followers: { decrement: 1 } },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return NextResponse.json({ error: 'Failed to unfollow user' }, { status: 500 });
  }
}
