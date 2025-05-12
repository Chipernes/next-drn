import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { orders } from '../../../../../database/schema';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await db.select().from(orders).where(eq(orders.id, id));
  return Response.json(order);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { ...updates } = body;

  if (!id) {
    return new Response('id is required', { status: 400 });
  }

  const existing = await db.select().from(orders).where(eq(orders.id, id));
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
    .where(eq(orders.id, id))
    .returning();

  return Response.json(updatedOrder);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deletedOrder = await db.delete(orders)
    .where(eq(orders.id, id))
    .returning();

  return Response.json(deletedOrder);
}

