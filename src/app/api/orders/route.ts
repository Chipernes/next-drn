import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { orders } from '../../../../database/schema';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const order = await db.select().from(orders).where(eq(orders.id, id));
    return Response.json(order);
  }

  const allOrders = await db.select().from(orders);
  return Response.json(allOrders);
}

export async function POST(req: NextRequest) {
  const { tableId, status } = await req.json();
  const newOrder = await db.insert(orders).values({
    table_id: tableId,
    status,
  }).returning();

  return Response.json(newOrder);
}

export async function PATCH(req: NextRequest) {
  const { id, tableId, status } = await req.json();

  const updatedOrder = await db.update(orders)
    .set({
      table_id: tableId,
      status,
    })
    .where(eq(orders.id, id))
    .returning();

  return Response.json(updatedOrder);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const deletedOrder = await db.delete(orders)
    .where(eq(orders.id, id))
    .returning();

  return Response.json(deletedOrder);
}

