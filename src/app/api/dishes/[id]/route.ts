import * as Sentry from '@sentry/nextjs';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { dishes } from '../../../../../database/schema';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const dish = await db.select().from(dishes).where(eq(dishes.id, id));
    if (!dish.length) {
      return new Response('Dish not found', { status: 404 });
    }
    return Response.json(dish[0]);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'GET /api/dishes/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const updates = await req.json();

    if (!id) {
      return new Response('Missing dish ID', { status: 400 });
    }

    const updatedDish = await db.update(dishes)
      .set(updates)
      .where(eq(dishes.id, id))
      .returning();

    if (!updatedDish.length) {
      return new Response('Dish not found', { status: 404 });
    }

    return Response.json(updatedDish[0]);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'PATCH /api/dishes/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const deletedDish = await db.delete(dishes)
      .where(eq(dishes.id, id))
      .returning();

    if (!deletedDish.length) {
      return new Response('Dish not found', { status: 404 });
    }

    return Response.json(deletedDish[0]);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'DELETE /api/dishes/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}
