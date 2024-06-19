"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Home from "./home/page";

function page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);
  return (
    <>
      <Home />
    </>
  );
}

export default page;
