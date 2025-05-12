import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { orderDishes } from '../../../../database/schema';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('orderId');

  if (orderId) {
    const orderDish = await db
      .select()
      .from(orderDishes)
      .where(eq(orderDishes.order_id, orderId));
    return Response.json(orderDish);
  }

  const allOrderDishes = await db.select().from(orderDishes);
  return Response.json(allOrderDishes);
}

export async function POST(req: NextRequest) {
  const { orderId, dishId, chefId, status, startTime, endTime } = await req.json();

  if (!orderId || !dishId) {
    return new Response('orderId and dishId are required', { status: 400 });
  }

  const newOrderDish = await db.insert(orderDishes).values({
    order_id: orderId,
    dish_id: dishId,
    chef_id: chefId || null,
    status: status || 'NEW',
    start_time: startTime ? new Date(startTime) : undefined,
    end_time: endTime ? new Date(endTime) : undefined,
  }).returning();

  return Response.json(newOrderDish);
}

