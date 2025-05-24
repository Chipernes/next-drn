import * as Sentry from '@sentry/nextjs';
import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { employees } from '../../../../database/schema';

export async function GET() {
  try {
    const allEmployees = await db.select().from(employees);
    return Response.json(allEmployees);
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'GET /api/employees' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { first_name, last_name, picture, role } = await req.json();

    const missing = [];
    if (!first_name) missing.push('firstName');
    if (!last_name) missing.push('lastName');
    if (!role) missing.push('role');

    if (missing.length) {
      return new Response(`Missing required fields: ${missing.join(', ')}`, { status: 400 });
    }

    const newEmployee = await db.insert(employees).values({
      first_name,
      last_name,
      picture,
      role,
    }).returning();

    return Response.json(newEmployee[0], { status: 201 });
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'POST /api/employees' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}
