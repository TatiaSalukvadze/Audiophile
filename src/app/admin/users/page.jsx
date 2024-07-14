import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import InsideUser from "./insideUser";

export default async function UsersWrap() {
  const { sessionClaims } = auth();

  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/home");
  }

  return <InsideUser />;
}
