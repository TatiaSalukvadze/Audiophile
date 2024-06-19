import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const ordersTable = pgTable('orders_table', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  productId: integer('productId').notNull(),
   count: integer('count').notNull(),
});



export type InsertOrder = typeof ordersTable.$inferInsert;
export type SelectOrder = typeof ordersTable.$inferSelect;


