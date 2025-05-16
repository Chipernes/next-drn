import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { menus } from '../../../../../database/schema';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const menu = await db.select().from(menus).where(eq(menus.id, id));
  return Response.json(menu);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { ...updates } = body;

  if (!id) {
    return new Response('id is required', { status: 400 });
  }

  const existing = await db.select().from(menus).where(eq(menus.id, id));
  if (!existing.length) {
    return new Response('Menu not found', { status: 404 });
  }

  const updated = {
    ...existing[0],
    ...updates,
  };

  const updatedOrder = await db
    .update(menus)
    .set(updated)
    .where(eq(menus.id, id))
    .returning();

  return Response.json(updatedOrder);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await db.delete(menus)
    .where(eq(menus.id, id));

  return new Response(null, { status: 204 });
}
