import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { dishes } from '../../../../database/schema';

export async function GET() {
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

