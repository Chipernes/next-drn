import * as Sentry from '@sentry/nextjs';
import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { menus } from '../../../../database/schema';

export async function GET() {
  try {
    const allMenus = await db.select().from(menus);
    return Response.json(allMenus);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'GET /api/menus' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, type } = await req.json();

    if (!title || !type) {
      return new Response('Missing required fields: title, type', { status: 400 });
    }

    const newMenu = await db.insert(menus).values({ title, type }).returning();
    return Response.json(newMenu[0], { status: 201 });
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'POST /api/menus' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}
