import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { employees } from '../../../../database/schema';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const employee = await db.select().from(employees).where(eq(employees.id, id));
    return Response.json(employee);
  }

  const allEmployees = await db.select().from(employees);
  return Response.json(allEmployees);
}

export async function POST(req: NextRequest) {
  const { firstName, lastName, picture, role } = await req.json();
  const newEmployee = await db.insert(employees).values({
    first_name: firstName,
    last_name: lastName,
    picture,
    role,
  }).returning();

  return Response.json(newEmployee, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { id, firstName, lastName, picture, role } = await req.json();

  const updatedEmployee = await db.update(employees)
    .set({
      first_name: firstName,
      last_name: lastName,
      picture,
      role,
    })
    .where(eq(employees.id, id))
    .returning();

  return Response.json(updatedEmployee);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  await db.delete(employees)
    .where(eq(employees.id, id));

  return new Response(null, { status: 204 });
}
