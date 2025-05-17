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
    const { firstName, lastName, picture, role } = await req.json();

    const missing = [];
    if (!firstName) missing.push('firstName');
    if (!lastName) missing.push('lastName');
    if (!role) missing.push('role');

    if (missing.length) {
      return new Response(`Missing required fields: ${missing.join(', ')}`, { status: 400 });
    }

    const newEmployee = await db.insert(employees).values({
      first_name: firstName,
      last_name: lastName,
      picture,
      role,
    }).returning();

    return Response.json(newEmployee[0], { status: 201 });
  } catch (error) {
    Sentry.captureException(error, { extra: { route: 'POST /api/employees' } });
    return new Response('Internal Server Error', { status: 500 });
  }
}
