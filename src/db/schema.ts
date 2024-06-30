import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const cartTable = pgTable('cart_table', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  productId: integer('productId').notNull(),
   count: integer('count').notNull(),
});



export type InsertCartItem = typeof cartTable.$inferInsert;
export type SelectCartItem = typeof cartTable.$inferSelect;

export const orderTable = pgTable('order_table', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  productId: integer('productId').notNull(),
   count: integer('count').notNull(),
   createdAt: timestamp('created_at').notNull().defaultNow()
});

export type InsertOrder = typeof orderTable.$inferInsert;
export type SelectOrder = typeof orderTable.$inferSelect;



