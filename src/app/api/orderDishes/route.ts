import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database/drizzle';
import { orderDishes } from '../../../../database/schema';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    if (id) {
      const orderDish = await db.select().from(orderDishes).where(eq(orderDishes.id, id as string));
      return res.json(orderDish);
    }
    const allOrderDishes = await db.select().from(orderDishes);
    return res.json(allOrderDishes);
  }

  if (req.method === 'POST') {
    const { orderId, dishId } = req.body;
    const newOrderDish = await db.insert(orderDishes).values({ order_id: orderId, dish_id: dishId }).returning();
    return res.json(newOrderDish);
  }

  if (req.method === 'PATCH') {
    const { orderId, dishId } = req.body;
    const updatedOrderDish = await db.update(orderDishes)
      .set({ order_id: orderId, dish_id: dishId }).where(eq(orderDishes.id, id as string)).returning();
    return res.json(updatedOrderDish);
  }

  if (req.method === 'DELETE') {
    const deletedOrderDish = await db.delete(orderDishes).where(eq(orderDishes.id, id as string)).returning();
    return res.json(deletedOrderDish);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
