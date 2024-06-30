// "use client";
import { redirect } from "next/navigation";
// import { useEffect } from "react";
// import Home from "./home/page";
import { auth } from "@clerk/nextjs/server";
function page() {
  const { sessionClaims } = auth();
  // const router = useRouter();
  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/home");
  } else {
    redirect("/admin/dashboard");
  }
  // useEffect(() => {
  //   router.push("/home");
  // }, []);
  return <>{/* <Home /> */}</>;
}

export default page;
