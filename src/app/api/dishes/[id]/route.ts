import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { dishes } from '../../../../../database/schema';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const dish = await db.select().from(dishes).where(eq(dishes.id, params.id));
  return Response.json(dish);
}

export async function PATCH(req: NextRequest) {
  const { id, ...data } = await req.json();
  const updatedDish = await db.update(dishes)
    .set(data)
    .where(eq(dishes.id, id))
    .returning();

  return Response.json(updatedDish);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const deletedDish = await db.delete(dishes)
    .where(eq(dishes.id, params.id))
    .returning();

  return Response.json(deletedDish);
}
