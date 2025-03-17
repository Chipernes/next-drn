import {
  pgTable,
  uuid,
  varchar,
  text,
  pgEnum,
  date,
  timestamp,
} from 'drizzle-orm/pg-core';

export const ROLE_ENUM = pgEnum('role', ['USER', 'SERVER', 'COOK', 'ADMIN']);

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom()
    .unique(),
  login: varchar('login', { length: 255 }).notNull(),
  password: text('password'),
  role: ROLE_ENUM('role').default('USER'),
  lastActivityDate: date('last_activity_date').defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
