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

  return <InsideOrder />;
}
