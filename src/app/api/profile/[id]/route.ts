// src/app/api/profile/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/authOptions";

const prisma = new PrismaClient();

// Username validation regex (same as signup)
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 20;
const MAX_BIO_LENGTH = 500; // Adjust as needed

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = parseInt(params.id, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        profileImage: true,
        followers: true,
        following: true,
        gameInterestIds: true,
        gameTags: true,
      },
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Must be logged in
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUserId = parseInt(session.user.id, 10);
    const targetUserId = parseInt(params.id, 10);

    if (isNaN(targetUserId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // 2. Can only edit own profile
    if (currentUserId !== targetUserId) {
      return NextResponse.json({ error: 'Forbidden: You can only edit your own profile' }, { status: 403 });
    }

    const body = await request.json();
    const { username, bio, gameInterestIds, gameTags } = body;

    // Prepare update data
    const updateData: any = {};

    // Validate and add username if provided
    if (username !== undefined) {
      if (typeof username !== 'string') {
        return NextResponse.json({ error: 'Username must be a string' }, { status: 400 });
      }

      const trimmedUsername = username.trim();
      if (trimmedUsername === '') {
        return NextResponse.json({ error: 'Username cannot be empty' }, { status: 400 });
      }

      if (trimmedUsername.length < MIN_USERNAME_LENGTH) {
        return NextResponse.json({ error: `Username must be at least ${MIN_USERNAME_LENGTH} characters` }, { status: 400 });
      }

      if (trimmedUsername.length > MAX_USERNAME_LENGTH) {
        return NextResponse.json({ error: `Username must be at most ${MAX_USERNAME_LENGTH} characters` }, { status: 400 });
      }

      if (!USERNAME_REGEX.test(trimmedUsername)) {
        return NextResponse.json({ error: 'Username can only contain letters, numbers, and underscores' }, { status: 400 });
      }

      // Check uniqueness (exclude current user)
      const existingUser = await prisma.user.findUnique({
        where: { username: trimmedUsername },
      });

      if (existingUser && existingUser.id !== targetUserId) {
        return NextResponse.json({ error: 'Username is already taken' }, { status: 400 });
      }

      updateData.username = trimmedUsername;
    }

    // Validate bio
    if (bio !== undefined) {
      if (typeof bio !== 'string') {
        return NextResponse.json({ error: 'Bio must be a string' }, { status: 400 });
      }

      if (bio.length > MAX_BIO_LENGTH) {
        return NextResponse.json({ error: `Bio must be at most ${MAX_BIO_LENGTH} characters` }, { status: 400 });
      }

      updateData.bio = bio.trim();
    }

    // Optionally validate gameInterestIds and gameTags (arrays)
    if (gameInterestIds !== undefined) {
      if (!Array.isArray(gameInterestIds)) {
        return NextResponse.json({ error: 'gameInterestIds must be an array of numbers' }, { status: 400 });
      }
      updateData.gameInterestIds = gameInterestIds;
    }

    if (gameTags !== undefined) {
      if (!Array.isArray(gameTags)) {
        return NextResponse.json({ error: 'gameTags must be an array of strings' }, { status: 400 });
      }
      updateData.gameTags = gameTags;
    }

    // If nothing to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    // Perform update
    const updatedUser = await prisma.user.update({
      where: { id: targetUserId },
      data: updateData,
      select: {
        id: true,
        username: true,
        bio: true,
        gameInterestIds: true,
        gameTags: true,
        // include other fields you want to return
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error('Error updating user:', error);

    // Prisma unique constraint violation
    if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
      return NextResponse.json({ error: 'Username is already taken' }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Failed to update profile', details: process.env.NODE_ENV === 'development' ? String(error) : undefined },
      { status: 500 }
    );
  }
}