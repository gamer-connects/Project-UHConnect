'use server';

import { Stuff, Condition } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new stuff to the database.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else if (stuff.condition === 'fair') {
    condition = 'fair';
  }

  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  redirect('/list');
}

/**
 * Edits an existing stuff in the database.
 */
export async function editStuff(stuff: Stuff) {
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 */
export async function deleteStuff(id: number) {
  await prisma.stuff.delete({
    where: { id },
  });
  redirect('/list');
}

/**
 * Creates a new user in the database.
 */
export async function createUser(credentials: { email: string; password: string; username: string }) {
  const existingUser = await prisma.user.findUnique({
    where: { email: credentials.email },
  });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const existingUsername = await prisma.user.findUnique({
    where: { username: credentials.username },
  });
  if (existingUsername) {
    throw new Error('Username already taken');
  }

  const password = await hash(credentials.password, 10);

  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
      username: credentials.username,
      bio: '',
      gameInterestIds: [],
      gameTags: [],
      followers: 0,
      following: 0,
    },
  });
}

/**
 * Changes the password of an existing user.
 */
export async function changePassword(credentials: { email: string; oldPassword: string; password: string }) {
  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });
  if (!user) {
    throw new Error('User not found');
  }

  const isValidPassword = await compare(credentials.oldPassword, user.password);
  if (!isValidPassword) {
    throw new Error('Current password is incorrect');
  }

  const newHashedPassword = await hash(credentials.password, 10);

  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password: newHashedPassword,
    },
  });
}

/**
 * Searches for users by username/email AND optionally filters by game interest.
 *
 * @param searchQuery - Optional search string for username or email
 * @param gameId - Optional game ID to filter users who have this game in their interests
 * @returns Array of users (without password)
 */
export async function searchUsers(
  searchQuery: string = '',
  gameId: number | null = null,
) {
  const whereConditions: any[] = [];

  // Text search (username or email)
  if (searchQuery.trim()) {
    whereConditions.push({
      OR: [
        {
          email: {
            contains: searchQuery.trim(),
            mode: 'insensitive',
          },
        },
        {
          username: {
            contains: searchQuery.trim(),
            mode: 'insensitive',
          },
        },
      ],
    });
  }

  // Game filter
  if (gameId !== null) {
    whereConditions.push({
      gameInterestIds: {
        has: gameId, // Prisma magic for Int[] arrays
      },
    });
  }

  // Combine with AND if both filters are active
  const where = whereConditions.length > 0 ? { AND: whereConditions } : {};

  return prisma.user.findMany({
    where,
    select: {
      id: true,
      email: true,
      username: true,
      bio: true,
      profileImage: true,
      gameInterestIds: true,
      gameTags: true,
      followers: true,
      following: true,
      role: true,
    },
    orderBy: { username: 'asc' },
    take: 50, // Limit results for performance
  });
}

/**
 * Gets all users with their posts (you had this at the bottom)
 */
export default async function getAllPosts() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      posts: true,
    },
  });
}
