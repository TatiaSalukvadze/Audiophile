"use client";
import { useRouter } from "next/navigation";

function goBack() {
  const router = useRouter();
  return (
    <p onClick={() => router.back()} className="goback preview mainwrap">
      Go Back
    </p>
  );
}

export default goBack;
