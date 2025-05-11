import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { orders } from '../../../../../database/schema';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const order = await db.select().from(orders).where(eq(orders.id, params.id));
  return Response.json(order);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { ...updates } = body;

  if (!params.id) {
    return new Response('id is required', { status: 400 });
  }

  const existing = await db.select().from(orders).where(eq(orders.id, params.id));
  if (!existing.length) {
    return new Response('Order Dish not found', { status: 404 });
  }

  const updated = {
    ...existing[0],
    ...updates,
  };

  const updatedOrder = await db
    .update(orders)
    .set(updated)
    .where(eq(orders.id, params.id))
    .returning();

  return Response.json(updatedOrder);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const deletedOrder = await db.delete(orders)
    .where(eq(orders.id, params.id))
    .returning();

  return Response.json(deletedOrder);
}

