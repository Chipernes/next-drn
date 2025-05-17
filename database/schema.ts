import {
  pgTable,
  uuid,
  varchar,
  text,
  pgEnum,
  timestamp,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';

// ENUMs
export const ROLE_ENUM = pgEnum('role', ['USER', 'SERVICE', 'KITCHEN', 'ADMINISTRATION']);
export const STATUS_ORDER_ENUM = pgEnum('status_order', ['NEW', 'PROCESSING', 'DONE', 'CANCELLED']);
export const STATUS_DISH_ENUM = pgEnum('status_dish', ['NEW', 'COOKING', 'DONE', 'SERVED', 'CANCELLED']);

// Users Table (Only for authentication)
export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  login: varchar('login', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  role: ROLE_ENUM('role').notNull(),
});

// Employees Table (Detailed staff information)
export const employees = pgTable('employees', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  picture: text('picture'),
  role: ROLE_ENUM('role').notNull(),
});

// Menu Table
export const menus = pgTable('menus', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Dishes Table
export const dishes = pgTable('dishes', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  menu_id: uuid('menu_id').notNull().references(() => menus.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull(),
  weight: integer('weight').notNull(),
  picture: text('picture').notNull(),
  isHidden: boolean('is_hidden').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Tables Table
export const tables = pgTable('tables', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  number: integer('number').notNull().unique(),
});

// Orders Table
export const orders = pgTable('orders', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  table_id: uuid('table_id').notNull().references(() => tables.id, { onDelete: 'cascade' }),
  waiter_id: uuid('waiter_id').references(() => employees.id, { onDelete: 'set null' }),
  status: STATUS_ORDER_ENUM('status').default('NEW').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Order_Dish Table (many-to-many between orders and dishes)
export const orderDishes = pgTable('order_dishes', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  order_id: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  dish_id: uuid('dish_id').notNull().references(() => dishes.id, { onDelete: 'cascade' }),
  chef_id: uuid('chef_id').references(() => employees.id, { onDelete: 'set null' }),
  status: STATUS_DISH_ENUM('status').default('NEW').notNull(),
  start_time: timestamp('start_time', { withTimezone: true }).defaultNow(),
  end_time: timestamp('end_time', { withTimezone: true }),
});
