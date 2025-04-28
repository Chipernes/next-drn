import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { dishes } from '../../../../database/schema';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const dish = await db.select().from(dishes).where(eq(dishes.id, id));
    return Response.json(dish);
  }

  const allDishes = await db.select().from(dishes);
  return Response.json(allDishes);
}

export async function POST(req: NextRequest) {
  const { menuId, title, description, price, weight, picture, isHidden } = await req.json();
  const newDish = await db.insert(dishes).values({
    menu_id: menuId,
    title,
    description,
    price,
    weight,
    picture,
    isHidden,
  }).returning();

  return Response.json(newDish);
}

export async function PATCH(req: NextRequest) {
  const { id, ...data } = await req.json();
  const updatedDish = await db.update(dishes)
    .set(data)
    .where(eq(dishes.id, id))
    .returning();

  return Response.json(updatedDish);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const deletedDish = await db.delete(dishes)
    .where(eq(dishes.id, id))
    .returning();

  return Response.json(deletedDish);
}
