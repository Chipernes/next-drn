import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { orderDishes } from '../../../../../database/schema';

export async function GET() {
  const allOrderDishes = await db.select().from(orderDishes);
  return Response.json(allOrderDishes);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { ...updates } = body;

  if (!id) {
    return new Response('id is required', { status: 400 });
  }

  const existing = await db.select().from(orderDishes).where(eq(orderDishes.id, id));
  if (!existing.length) {
    return new Response('Order Dish not found', { status: 404 });
  }

  const updated = {
    ...existing[0],
    ...updates,
  };

  const updatedOrder = await db
    .update(orderDishes)
    .set(updated)
    .where(eq(orderDishes.id, id))
    .returning();

  return Response.json(updatedOrder);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deletedOrderDish = await db.delete(orderDishes)
    .where(eq(orderDishes.id, id))
    .returning();

  return Response.json(deletedOrderDish);
}
