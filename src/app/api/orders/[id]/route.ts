import * as Sentry from '@sentry/nextjs';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { orders } from '../../../../../database/schema';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const order = await db.select().from(orders).where(eq(orders.id, id));
    if (!order.length) {
      return new Response('Order not found', { status: 404 });
    }

    return Response.json(order[0]);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'GET /api/orders/[id]' } });
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

    const existing = await db.select().from(orders).where(eq(orders.id, id));
    if (!existing.length) {
      return new Response('Order not found', { status: 404 });
    }

    const updatedOrder = await db
      .update(orders)
      .set({ ...existing[0], ...updates })
      .where(eq(orders.id, id))
      .returning();

    return Response.json(updatedOrder[0]);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'PATCH /api/orders/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const deleted = await db.delete(orders)
      .where(eq(orders.id, id))
      .returning();

    if (!deleted.length) {
      return new Response('Order not found', { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'DELETE /api/orders/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}
