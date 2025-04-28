import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { tables } from '../../../../database/schema';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const table = await db.select().from(tables).where(eq(tables.id, id));
    return Response.json(table);
  }

  const allTables = await db.select().from(tables);
  return Response.json(allTables);
}

export async function POST(req: NextRequest) {
  const { number } = await req.json();
  const newTable = await db.insert(tables).values({ number }).returning();

  return Response.json(newTable);
}

export async function PATCH(req: NextRequest) {
  const { id, number } = await req.json();

  const updatedTable = await db.update(tables)
    .set({ number })
    .where(eq(tables.id, id))
    .returning();

  return Response.json(updatedTable);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const deletedTable = await db.delete(tables)
    .where(eq(tables.id, id))
    .returning();

  return Response.json(deletedTable);
}
