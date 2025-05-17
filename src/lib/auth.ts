/* eslint-disable no-param-reassign */
import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '../../database/drizzle';
import { users } from '../../database/schema';
import { Role } from 'basics/enums/schema.enums';

type UserType = {
  id: string;
  login: string;
  role: string;
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
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/verify',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const { email } = user;

        if (!email) return false;

        const existing = await db.select().from(users).where(eq(users.login, email)).limit(1);

        if (existing.length === 0) {
          await db.insert(users).values({
            login: email,
            password: '',
            role: Role.USER,
          });
        }

        user.id = existing[0].id;
        user.login = existing[0].login;
        user.role = existing[0].role;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.login = user.login;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.login = token.login as string;
      session.user.role = token.role as string;

      return session;
    },
  },
});
