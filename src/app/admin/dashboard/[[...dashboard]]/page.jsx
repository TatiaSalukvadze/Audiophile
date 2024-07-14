import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import InsideDashboard from "./insideDashboard";

export default async function AdminDashboard() {
  const { sessionClaims } = auth();

  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/home");
  }

  return <InsideDashboard />;
}
