/* eslint-disable no-param-reassign */
import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '../../database/drizzle';
import { users } from '../../database/schema';

type UserType = {
  id: string;
  login: string;
  role: string;
  lastActivityDate: string;
  createdAt: string;
};

declare module 'next-auth' {
  /* eslint-disable-next-line */
  interface Session extends UserType {}
  /* eslint-disable-next-line */
  interface User extends UserType {}
}

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
          role: user[0].role.toString(),
          lastActivityDate: user[0]?.lastActivityDate?.toString() || '',
          createdAt: user[0]?.createdAt?.toString() || '',
        };
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
        token.login = user.login;
        token.role = user.role;
        token.lastActivityDate = user.lastActivityDate;
        token.createdAt = user.createdAt;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.login = token.login as string;
      session.user.role = token.role as string;
      session.user.lastActivityDate = token.lastActivityDate as string;
      session.user.createdAt = token.createdAt as string;

      return session;
    },
  },
});
