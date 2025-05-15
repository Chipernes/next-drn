import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { menus } from '../../../../database/schema';

export async function GET() {
  const allMenus = await db.select().from(menus);
  return Response.json(allMenus);
}

export async function POST(req: NextRequest) {
  const { title, type } = await req.json();
  const newMenu = await db.insert(menus).values({ title, type }).returning();
  return Response.json(newMenu, { status: 201 });
}
