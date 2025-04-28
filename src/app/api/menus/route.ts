import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database/drizzle';
import { menus } from '../../../../database/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    if (id) {
      const menu = await db.select().from(menus).where(eq(menus.id, id as string));
      return res.json(menu);
    }
    const allMenus = await db.select().from(menus);
    return res.json(allMenus);
  }

  if (req.method === 'POST') {
    const { title, type } = req.body;
    const newMenu = await db.insert(menus).values({ title, type }).returning();
    return res.status(201).json(newMenu);
  }

  if (req.method === 'PUT') {
    const { title, type } = req.body;
    const updated = await db.update(menus).set({ title, type }).where(eq(menus.id, id as string)).returning();
    return res.json(updated);
  }

  if (req.method === 'DELETE') {
    await db.delete(menus).where(eq(menus.id, id as string));
    return res.status(204).end();
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
