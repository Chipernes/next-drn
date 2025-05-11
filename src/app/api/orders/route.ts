import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { orders } from '../../../../database/schema';

export async function GET() {
  const allOrders = await db.select().from(orders);
  return Response.json(allOrders);
}

export async function POST(req: NextRequest) {
  const { tableId, waiterId } = await req.json();

  if (!tableId || !waiterId) {
    return new Response('tableId and waiterId are required', { status: 400 });
  }

  const newOrder = await db.insert(orders).values({
    table_id: tableId,
    waiter_id: waiterId,
  }).returning();

  return Response.json(newOrder);
}
