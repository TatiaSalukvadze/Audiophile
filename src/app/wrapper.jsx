// "use client";

import "./globals.css";
// import { MyProvider } from "../context/MyContext";
// import Nav from "../components/nav/Nav";
// import Footer from "../components/footer/Footer";
// import Search from "../components/search/Search";
// import ScrollToTop from "../components/ScrollToTop";
import { auth } from "@clerk/nextjs/server";
// import { ClerkProvider } from "@clerk/nextjs";
import InsideWrapper from "./insideWrapper";

async function getRole() {
  const { sessionClaims } = auth();
  const role = sessionClaims?.metadata.role === "admin" ? "admin" : "user";
  return role;
}

export default async function Wrapper({ children }) {
  const { sessionClaims } = auth();
  const role = await getRole();
  // console.log(role);
  return (
    <InsideWrapper children={children} role={role} />
    // <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    // <html lang="en">
    //   <MyProvider>
    //     <body>
    //       <ScrollToTop />
    //       <Nav />
    //       <Search />
    //       {children}
    //       <Footer />
    //     </body>
    //   </MyProvider>
    // </html>
    // </ClerkProvider>
  );
}
