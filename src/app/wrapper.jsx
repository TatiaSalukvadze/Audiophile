import "./globals.css";
import { MyProvider } from "../context/MyContext";
import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
import Search from "../components/search/Search";
import ScrollToTop from "../components/ScrollToTop";
import { auth } from "@clerk/nextjs/server";
import { AOSInit } from "./aos";

async function getRole() {
  const { sessionClaims } = auth();
  const role = sessionClaims?.metadata.role === "admin" ? "admin" : "user";
  return role;
}

export default async function Wrapper({ children }) {
  const role = await getRole();

  return (
    <html lang="en">
      <MyProvider>
        <AOSInit />
        <body>
          <ScrollToTop />
          <Nav role={role} />
          <Search role={role} />
          {children}
          <Footer />
        </body>
      </MyProvider>
    </html>
  );
}
