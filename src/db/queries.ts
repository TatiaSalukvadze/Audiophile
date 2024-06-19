import { db } from './index';
import { InsertOrder, ordersTable, SelectOrder } from './schema';
import { eq, sql } from 'drizzle-orm';

export async function createOrder(data: InsertOrder) {
  await db.insert(ordersTable).values(data);
}

export async function getOrdersByUserId(userId: string) {
  const orders = await db.select().from(ordersTable).where(eq(ordersTable.userId, userId));
  return orders;
}

export async function getOrdersByUserIdAndProductId(userId: string, productId: number) {
  const orders = await db.select().from(ordersTable)
    .where(sql`${ordersTable.userId} = ${userId} and ${ordersTable.productId} = ${productId}`);
  
  return orders;
}


export async function updateOrder(id: SelectOrder['id'], data: Partial<Omit<SelectOrder, 'id'>>) {
  await db.update(ordersTable).set(data).where(eq(ordersTable.id, id));
}

export async function deleteOrder(id: SelectOrder['id']) {
  await db.delete(ordersTable).where(eq(ordersTable.id, id));
}