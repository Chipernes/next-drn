import * as Sentry from '@sentry/nextjs';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { tables } from '../../../../../database/schema';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const table = await db.select().from(tables).where(eq(tables.id, id));

    if (!table.length) {
      return new Response('Table not found', { status: 404 });
    }

    return Response.json(table[0]);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'GET /api/tables/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { number } = await req.json();

    if (!number) {
      return new Response('number is required', { status: 400 });
    }

    const existing = await db.select().from(tables).where(eq(tables.id, id));
    if (!existing.length) {
      return new Response('Table not found', { status: 404 });
    }

    const updatedTable = await db
      .update(tables)
      .set({ number })
      .where(eq(tables.id, id))
      .returning();

    return Response.json(updatedTable[0]);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'PATCH /api/tables/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const deleted = await db.delete(tables)
      .where(eq(tables.id, id))
      .returning();

    if (!deleted.length) {
      return new Response('Table not found', { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'DELETE /api/tables/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}
