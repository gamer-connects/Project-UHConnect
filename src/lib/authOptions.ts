import { compare } from 'bcrypt';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'john@foo.com',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Find the user in Prisma
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        // Validate the password
        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) return null;

        // Return the user fields stored in JWT
        return {
          id: `${user.id}`,
          email: user.email,
          username: user.username,
          role: user.role,
          profileImage: user.profileImage ?? null,
        };
      },
    }),
  ],

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email!,
          username: (user as any).username,
          role: (user as any).role,
          profileImage: (user as any).profileImage,
          bio: (user as any).bio ?? null,
          gameInterestIds: (user as any).gameInterestIds ?? [],
          gameTags: (user as any).gameTags ?? [],
        };
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id as string,
          email: token.email as string,
          username: token.username as string,
          role: token.role as string,
          profileImage: token.profileImage as string | null,
          bio: token.bio as string | null,
          gameInterestIds: token.gameInterestIds as string[],
          gameTags: token.gameTags as string[],
        },
      };
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
