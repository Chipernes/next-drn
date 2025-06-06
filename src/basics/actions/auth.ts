/* eslint-disable no-console */

'use server';

import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '../../../database/drizzle';
import { users } from '../../../database/schema';
import { AuthCredentials } from '../types/auth.types';
import { signIn } from 'lib/auth';

export const signInWithCredentials = async (params: Pick<AuthCredentials, 'login' | 'password'>) => {
  const { login, password } = params;

  try {
    const result = await signIn('credentials', {
      login,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, 'Signup error');
    return { success: false, error: 'Signup error' };
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signIn('google', {
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { redirectLink: result, success: true };
  } catch (error) {
    console.log(error, 'SignIn error');
    return { success: false, error: 'SignIn error' };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { login, password, role } = params;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.login, login))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: 'User already exists' };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      login,
      password: hashedPassword,
      role,
    });

    await signInWithCredentials({ login, password });

    return { success: true };
  } catch (error) {
    console.log(error, 'Signup error');
    return { success: false, error: 'Signup error' };
  }
};
