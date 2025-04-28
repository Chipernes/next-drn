import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database/drizzle';
import { employees } from '../../../../database/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    if (id) {
      const employee = await db.select().from(employees).where(eq(employees.id, id as string));
      return res.json(employee);
    }
    const allEmployees = await db.select().from(employees);
    return res.json(allEmployees);
  }

  if (req.method === 'POST') {
    const { firstName, lastName, picture, role } = req.body;
    const newEmployee = await db.insert(employees).values({ first_name: firstName, last_name: lastName, picture, role }).returning();
    return res.status(201).json(newEmployee);
  }

  if (req.method === 'PUT') {
    const { firstName, lastName, picture, role } = req.body;
    const updated = await db.update(employees)
      .set({ first_name: firstName, last_name: lastName, picture, role }).where(eq(employees.id, id as string)).returning();
    return res.json(updated);
  }

  if (req.method === 'DELETE') {
    await db.delete(employees).where(eq(employees.id, id as string));
    return res.status(204).end();
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
