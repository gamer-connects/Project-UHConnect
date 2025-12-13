'use server';

import { Stuff, Condition } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
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
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
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
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  await prisma.stuff.delete({
    where: { id },
  });
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password, username.
 */
export async function createUser(credentials: { email: string; password: string; username: string }) {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: credentials.email },
  });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Check if username exists
  const existingUsername = await prisma.user.findUnique({
    where: { username: credentials.username },
  });

  if (existingUsername) {
    throw new Error('Username already taken');
  }

  // Hash password
  const password = await hash(credentials.password, 10);

  // Create user with all required fields
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
      username: credentials.username,
      bio: '',
      gameInterestIds: [], // Empty array of integers
      gameTags: [],
      followers: 0,
      following: 0,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, oldPassword, password.
 */
export async function changePassword(credentials: { email: string; oldPassword: string; password: string }) {
  // Find the user
  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Verify old password
  const isValidPassword = await compare(credentials.oldPassword, user.password);

  if (!isValidPassword) {
    throw new Error('Current password is incorrect');
  }

  // Hash new password
  const newHashedPassword = await hash(credentials.password, 10);

  // Update password
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password: newHashedPassword,
    },
  });
}

/**
 * Searches for users by username or email.
 * @param searchQuery, the search string.
 * @returns an array of users (without passwords).
 */
export async function searchUsers(searchQuery: string) {
  if (!searchQuery.trim()) {
    // If empty search, return all users
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        bio: true,
        profileImage: true,
        gameInterestIds: true, // This is Int[] in schema
        gameTags: true,
        followers: true,
        following: true,
        role: true,
      },
      take: 50,
    });
  }

  // Search by username or email
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          email: {
            contains: searchQuery,
            mode: 'insensitive',
          },
        },
        {
          username: {
            contains: searchQuery,
            mode: 'insensitive',
          },
        },
      ],
    },
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
    take: 50,
  });
  return users;
}

export default async function getAllPosts() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      posts: true,
    },
  });
}
