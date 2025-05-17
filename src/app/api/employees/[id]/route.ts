import * as Sentry from '@sentry/nextjs';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { employees } from '../../../../../database/schema';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const employee = await db.select().from(employees).where(eq(employees.id, id));
    if (!employee.length) {
      return new Response('Employee not found', { status: 404 });
    }
    return Response.json(employee[0]);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'GET /api/employees/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { firstName, lastName, picture, role } = await req.json();

    const updatedEmployee = await db.update(employees)
      .set({
        first_name: firstName,
        last_name: lastName,
        picture,
        role,
      })
      .where(eq(employees.id, id))
      .returning();

    if (!updatedEmployee.length) {
      return new Response('Employee not found', { status: 404 });
    }

    return Response.json(updatedEmployee[0]);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'PATCH /api/employees/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const deleted = await db.delete(employees)
      .where(eq(employees.id, id))
      .returning();

    if (!deleted.length) {
      return new Response('Employee not found', { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'DELETE /api/employees/[id]' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}
