"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);
  return <></>;
}

export default page;
