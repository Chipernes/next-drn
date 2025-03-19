/* eslint-disable no-param-reassign */
import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './database/drizzle';
import { users } from './database/schema';

type User = {
  id: string;
  login: string;
  password: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) {
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.login, credentials.login.toString()))
          .limit(1);

        if (user.length === 0) return null;

        const isPasswordValid = await compare(credentials.password.toString(), user[0].password);

        if (!isPasswordValid) return null;

        return {
          id: user[0].id.toString(),
          login: user[0].login.toString(),
        } as User;
      },
    }),
  ],
  pages: {
    signIn: '/verify',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;

      return session;
    },
  },
});
