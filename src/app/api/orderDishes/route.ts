import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { orderDishes } from '../../../../database/schema';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const orderDish = await db.select().from(orderDishes).where(eq(orderDishes.id, id));
    return Response.json(orderDish);
  }

  const allOrderDishes = await db.select().from(orderDishes);
  return Response.json(allOrderDishes);
}

export async function POST(req: NextRequest) {
  const { orderId, dishId } = await req.json();
  const newOrderDish = await db.insert(orderDishes).values({
    order_id: orderId,
    dish_id: dishId,
  }).returning();

  return Response.json(newOrderDish);
}

export async function PATCH(req: NextRequest) {
  const { id, orderId, dishId } = await req.json();

  const updatedOrderDish = await db.update(orderDishes)
    .set({
      order_id: orderId,
      dish_id: dishId,
    })
    .where(eq(orderDishes.id, id))
    .returning();

  return Response.json(updatedOrderDish);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const deletedOrderDish = await db.delete(orderDishes)
    .where(eq(orderDishes.id, id))
    .returning();

  return Response.json(deletedOrderDish);
}
