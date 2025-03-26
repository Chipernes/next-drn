import {
  pgTable,
  uuid,
  varchar,
  text,
  pgEnum,
  date,
  timestamp,
  integer,
} from 'drizzle-orm/pg-core';

export const ROLE_ENUM = pgEnum('role', ['GUEST', 'SERVICE', 'KITCHEN', 'ADMINISTRATION']);

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom()
    .unique(),
  login: varchar('login', { length: 255 }).notNull(),
  password: text('password').notNull(),
  email: text('email').notNull(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  picture: text('picture'),
  role: ROLE_ENUM('role').default('GUEST').notNull(),
  lastActivityDate: date('last_activity_date').defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const dishes = pgTable('dishes', {
  id: uuid('id').notNull().primaryKey().defaultRandom()
    .unique(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull(),
  weight: integer('weight').notNull(),
  picture: text('picture').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
