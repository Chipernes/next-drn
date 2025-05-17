import * as Sentry from '@sentry/nextjs';
import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { tables } from '../../../../database/schema';

export async function GET() {
  try {
    const allTables = await db.select().from(tables);
    return Response.json(allTables);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'GET /api/tables' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { number } = await req.json();

    if (!number) {
      return new Response('number is required', { status: 400 });
    }

    const newTable = await db.insert(tables).values({ number }).returning();
    return Response.json(newTable[0], { status: 201 });
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'POST /api/tables' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}
