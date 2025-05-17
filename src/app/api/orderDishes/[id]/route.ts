import * as Sentry from '@sentry/nextjs';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { orderDishes } from '../../../../../database/schema';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const dish = await db.select().from(orderDishes).where(eq(orderDishes.id, id));

    if (!dish.length) {
      return new Response('Order Dish not found', { status: 404 });
    }

    return Response.json(dish[0]);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'GET /api/order-dishes/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const updates = await req.json();

    if (!id) {
      return new Response('id is required', { status: 400 });
    }

    const existing = await db.select().from(orderDishes).where(eq(orderDishes.id, id));
    if (!existing.length) {
      return new Response('Order Dish not found', { status: 404 });
    }

    const updated = await db
      .update(orderDishes)
      .set(updates)
      .where(eq(orderDishes.id, id))
      .returning();

    return Response.json(updated[0]);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'PATCH /api/order-dishes/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const deleted = await db.delete(orderDishes)
      .where(eq(orderDishes.id, id))
      .returning();

    if (!deleted.length) {
      return new Response('Order Dish not found', { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'DELETE /api/order-dishes/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}
