// src/app/api/profile/[id]/route.ts
import { NextResponse } from 'next/server';
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
  request: Request,
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
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUserId = parseInt(session.user.id, 10);
    const targetUserId = parseInt(params.id, 10);
    if (isNaN(targetUserId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    if (currentUserId !== targetUserId) {
      return NextResponse.json({ error: 'Forbidden: You can only edit your own profile' }, { status: 403 });
    }

    const body = await request.json();
    // ADD profileImage here
    const { username, bio, gameInterestIds, gameTags, profileImage } = body;

    const updateData: any = {};

    // Username validation (unchanged)
    if (username !== undefined) {
      if (typeof username !== 'string') {
        return NextResponse.json({ error: 'Username must be a string' }, { status: 400 });
      }
      const trimmedUsername = username.trim();
      if (trimmedUsername === '') {
        return NextResponse.json({ error: 'Username cannot be empty' }, { status: 400 });
      }
      if (trimmedUsername.length < MIN_USERNAME_LENGTH || trimmedUsername.length > MAX_USERNAME_LENGTH) {
        return NextResponse.json({ error: `Username must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters` }, { status: 400 });
      }
      if (!USERNAME_REGEX.test(trimmedUsername)) {
        return NextResponse.json({ error: 'Username can only contain letters, numbers, and underscores' }, { status: 400 });
      }
      const existingUser = await prisma.user.findUnique({ where: { username: trimmedUsername } });
      if (existingUser && existingUser.id !== targetUserId) {
        return NextResponse.json({ error: 'Username is already taken' }, { status: 400 });
      }
      updateData.username = trimmedUsername;
    }

    // Bio
    if (bio !== undefined) {
      if (typeof bio !== 'string') {
        return NextResponse.json({ error: 'Bio must be a string' }, { status: 400 });
      }
      if (bio.length > MAX_BIO_LENGTH) {
        return NextResponse.json({ error: `Bio must be at most ${MAX_BIO_LENGTH} characters` }, { status: 400 });
      }
      updateData.bio = bio.trim();
    }

    // Game interests
    if (gameInterestIds !== undefined) {
      if (!Array.isArray(gameInterestIds)) {
        return NextResponse.json({ error: 'gameInterestIds must be an array of numbers' }, { status: 400 });
      }
      updateData.gameInterestIds = gameInterestIds;
    }

    // Game tags
    if (gameTags !== undefined) {
      if (!Array.isArray(gameTags)) {
        return NextResponse.json({ error: 'gameTags must be an array of strings' }, { status: 400 });
      }
      updateData.gameTags = gameTags;
    }

    // NEW: Profile Image
    if (profileImage !== undefined) {
      if (typeof profileImage !== 'string' && profileImage !== null) {
        return NextResponse.json({ error: 'profileImage must be a string or null' }, { status: 400 });
      }
      // Basic security: only allow our upload paths or empty/null
      if (profileImage && !profileImage.startsWith('/uploads/profiles/')) {
        return NextResponse.json({ error: 'Invalid profile image URL' }, { status: 400 });
      }
      updateData.profileImage = profileImage || null;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: targetUserId },
      data: updateData,
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

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error('Error updating user:', error);
    if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
      return NextResponse.json({ error: 'Username is already taken' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to update profile', details: process.env.NODE_ENV === 'development' ? String(error) : undefined },
      { status: 500 }
    );
  }
}