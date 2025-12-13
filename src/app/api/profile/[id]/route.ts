// src/app/api/profile/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id, 10) },
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
    const body = await request.json();
    const { username, bio, gameInterests, gameTags } = body;

    console.log('Updating user:', params.id);
    console.log('Body:', body);

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(params.id, 10) },
      data: {
        username,
        bio,
        gameInterests,
        gameTags,
      },
    });

    console.log('Updated successfully:', updatedUser);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user', details: String(error) }, 
      { status: 500 }
    );
  }
}