import * as Sentry from '@sentry/nextjs';
import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { dishes } from '../../../../database/schema';

export async function GET() {
  try {
    const allDishes = await db.select().from(dishes);
    return Response.json(allDishes);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'GET /api/dishes' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const requiredFields = ['menuId', 'title', 'description', 'price', 'weight', 'picture', 'isHidden'];
    const missingFields = requiredFields.filter((key) => body[key] === undefined);

    if (missingFields.length) {
      return new Response(`Missing fields: ${missingFields.join(', ')}`, { status: 400 });
    }

    const newDish = await db.insert(dishes).values({
      menu_id: body.menuId,
      title: body.title,
      description: body.description,
      price: body.price,
      weight: body.weight,
      picture: body.picture,
      isHidden: body.isHidden,
    }).returning();

    return Response.json(newDish[0]);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'POST /api/dishes' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}
