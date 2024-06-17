"use client";

import "./globals.css";
import { MyProvider } from "../context/MyContext";
import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/ScrollToTop";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

import { ClerkProvider } from "@clerk/nextjs";
// export const metadata = {
//   title: "Next.js",
//   description: "Generated by Next.js",
// };

export default function Wrapper({ children }) {
  // const router = useRouter();
  // useEffect(() => {
  //   router.push("/home");
  // }, []);
  return (
    <ClerkProvider>
      <html lang="en">
        <MyProvider>
          <body>
            <ScrollToTop />
            <Nav />
            {children}
            <Footer />
          </body>
        </MyProvider>
      </html>
    </ClerkProvider>
  );
}