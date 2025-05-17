import * as Sentry from '@sentry/nextjs';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { menus } from '../../../../../database/schema';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const menu = await db.select().from(menus).where(eq(menus.id, id));

    if (!menu.length) {
      return new Response('Menu not found', { status: 404 });
    }

    return Response.json(menu[0]);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'GET /api/menus/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const updates = await req.json();

    if (!id) {
      return new Response('Menu ID is required', { status: 400 });
    }

    const existing = await db.select().from(menus).where(eq(menus.id, id));
    if (!existing.length) {
      return new Response('Menu not found', { status: 404 });
    }

    const updated = await db
      .update(menus)
      .set(updates)
      .where(eq(menus.id, id))
      .returning();

    return Response.json(updated[0]);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'PATCH /api/menus/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const deleted = await db.delete(menus)
      .where(eq(menus.id, id))
      .returning();

    if (!deleted.length) {
      return new Response('Menu not found', { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'DELETE /api/menus/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}
