import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database/drizzle';
import { tables } from '../../../../database/schema';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    if (id) {
      const table = await db.select().from(tables).where(eq(tables.id, id as string));
      return res.json(table);
    }
    const allTables = await db.select().from(tables);
    return res.json(allTables);
  }

  if (req.method === 'POST') {
    const { number } = req.body;
    const newTable = await db.insert(tables).values({ number }).returning();
    return res.json(newTable);
  }

  if (req.method === 'PATCH') {
    const { number } = req.body;
    const updatedTable = await db.update(tables).set({ number }).where(eq(tables.id, id as string)).returning();
    return res.json(updatedTable);
  }

  if (req.method === 'DELETE') {
    const deletedTable = await db.delete(tables).where(eq(tables.id, id as string)).returning();
    return res.json(deletedTable);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
