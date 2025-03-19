import { NextResponse } from 'next/server';
import { db } from '../../../../database/drizzle';
import { users } from '../../../../database/schema';

export async function GET() {
  try {
    const result = await db.select().from(users);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
