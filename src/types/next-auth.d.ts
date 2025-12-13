// src/types/next-auth.d.ts

import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    username: string;
    role: string;
    profileImage: string | null;
    bio?: string | null;
    gameInterests?: string[];
    gameTags?: string[];
  }

  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      role: string;
      profileImage: string | null;
      bio?: string | null;
      gameInterests?: string[];
      gameTags?: string[];
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    username: string;
    role: string;
    profileImage: string | null;
    bio?: string | null;
    gameInterests?: string[];
    gameTags?: string[];
  }
}
