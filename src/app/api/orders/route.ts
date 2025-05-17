import * as Sentry from '@sentry/nextjs';
import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { orders } from '../../../../database/schema';

export async function GET() {
  try {
    const allOrders = await db.select().from(orders);
    return Response.json(allOrders);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'GET /api/orders' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { tableId, waiterId } = await req.json();

    if (!tableId || !waiterId) {
      return new Response('tableId and waiterId are required', { status: 400 });
    }

    const newOrder = await db.insert(orders).values({
      table_id: tableId,
      waiter_id: waiterId,
    }).returning();

    return Response.json(newOrder[0], { status: 201 });
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'POST /api/orders' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}
