import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Users } from "../actions";
import { getOrders } from "../../../db/queries";
import InsideOrder from "./insideOrder";

export default async function UsersWrap() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/home");
  }

  // const users = await Users();
  // async function Orders() {
  //   try {
  //     const ords = await getOrders();
  //     return ords ? ords : [];
  //   } catch (error) {
  //     console.error("Error fetching orders:", error); // Error handling
  //   }
  // }
  // const orders = await Orders();

  return <InsideOrder />;
}
