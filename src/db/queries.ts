"use server";
import { db } from './index';
import { InsertCartItem, cartTable, SelectCartItem, orderTable, InsertOrder, SelectOrder } from './schema';
import { eq, sql,desc } from 'drizzle-orm';

export async function createCartItem(data: InsertCartItem) {
  await db.insert(cartTable).values(data);
}
export async function createOrder(data: InsertOrder) {
  await db.insert(orderTable).values(data);
}

export async function getOrders() : Promise<
  Array<{
    id: number;
    userId: string;
    productId: number;
    count: number;
    createdAt:Date;
  }>
> {
  const orders = await db.select().from(orderTable).orderBy(desc(orderTable.createdAt));
  return orders;
}

export async function getCartItems() : Promise<
  Array<{
    id: number;
    userId: string;
    productId: number;
    count: number;
  }>
> {
  const orders = await db.select().from(cartTable);
  return orders;
}

export async function getCartItemsByUserId(userId: string) : Promise<
  Array<{
    id: number;
    userId: string;
    productId: number;
    count: number;
  }>
> {
  const orders = await db.select().from(cartTable).where(eq(cartTable.userId, userId));
  return orders;
}

export async function getCartItemsByUserIdAndProductId(userId: string, productId: number) : Promise<
  Array<{
    id: number;
    userId: string;
    productId: number;
    count: number;
  }>
> {
  const orders = await db.select().from(cartTable)
    .where(sql`${cartTable.userId} = ${userId} and ${cartTable.productId} = ${productId}`);
  
  return orders;
}


export async function updateCartItem(id: SelectCartItem['id'], data: Partial<Omit<SelectCartItem, 'id'>>) {
  await db.update(cartTable).set(data).where(eq(cartTable.id, id));
}

export async function deleteCartItem(id: SelectCartItem['id']) {
  await db.delete(cartTable).where(eq(cartTable.id, id));
}