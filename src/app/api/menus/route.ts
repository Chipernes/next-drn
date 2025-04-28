import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { menus } from '../../../../database/schema';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const menu = await db.select().from(menus).where(eq(menus.id, id));
    return Response.json(menu);
  }

  const allMenus = await db.select().from(menus);
  return Response.json(allMenus);
}

export async function POST(req: NextRequest) {
  const { title, type } = await req.json();
  const newMenu = await db.insert(menus).values({ title, type }).returning();
  return Response.json(newMenu, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { id, title, type } = await req.json();

  const updatedMenu = await db.update(menus)
    .set({ title, type })
    .where(eq(menus.id, id))
    .returning();

  return Response.json(updatedMenu);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  await db.delete(menus)
    .where(eq(menus.id, id));

  return new Response(null, { status: 204 });
}
