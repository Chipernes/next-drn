import { NextResponse } from 'next/server';
import { db } from '../../../../database/drizzle';
import { dishes } from '../../../../database/schema';

export async function GET() {
  try {
    const result = await db.select().from(dishes);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dishes' }, { status: 500 });
  }
}
