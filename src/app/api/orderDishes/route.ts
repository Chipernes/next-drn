import * as Sentry from '@sentry/nextjs';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { orderDishes } from '../../../../database/schema';
import { StatusDish } from '../../../basics/enums/schema.enums';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');

    if (orderId) {
      const dishesByOrder = await db
        .select()
        .from(orderDishes)
        .where(eq(orderDishes.order_id, orderId));
      return Response.json(dishesByOrder);
    }

    const allOrderDishes = await db.select().from(orderDishes);
    return Response.json(allOrderDishes);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'GET /api/order-dishes' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { orderId, dishId, chefId, status, startTime, endTime } = await req.json();

    if (!orderId || !dishId) {
      return new Response('orderId and dishId are required', { status: 400 });
    }

    const newOrderDish = await db.insert(orderDishes).values({
      order_id: orderId,
      dish_id: dishId,
      chef_id: chefId ?? null,
      status: status ?? StatusDish.NEW,
      start_time: startTime ? new Date(startTime) : new Date(),
      end_time: endTime ? new Date(endTime) : null,
    }).returning();

    return Response.json(newOrderDish[0], { status: 201 });
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'POST /api/order-dishes' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}
