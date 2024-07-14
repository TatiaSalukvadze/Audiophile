// "use client";
import { redirect } from "next/navigation";
// import { useEffect } from "react";
// import Home from "./home/page";
import { auth } from "@clerk/nextjs/server";
function page() {
  const { sessionClaims } = auth();
  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/home");
  } else {
    redirect("/admin/dashboard");
  }

  return <>{/* <Home /> */}</>;
}

export default page;
