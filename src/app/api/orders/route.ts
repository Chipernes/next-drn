import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database/drizzle';
import { orders } from '../../../../database/schema';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    if (id) {
      const order = await db.select().from(orders).where(eq(orders.id, id as string));
      return res.json(order);
    }
    const allOrders = await db.select().from(orders);
    return res.json(allOrders);
  }

  if (req.method === 'POST') {
    const { tableId, status } = req.body;
    const newOrder = await db.insert(orders).values({ table_id: tableId, status }).returning();
    return res.json(newOrder);
  }

  if (req.method === 'PATCH') {
    const { tableId, status } = req.body;
    const updatedOrder = await db.update(orders)
      .set({ table_id: tableId, status }).where(eq(orders.id, id as string)).returning();
    return res.json(updatedOrder);
  }

  if (req.method === 'DELETE') {
    const deletedOrder = await db.delete(orders).where(eq(orders.id, id as string)).returning();
    return res.json(deletedOrder);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
