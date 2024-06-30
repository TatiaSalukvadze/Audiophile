"use client";
import { MyProvider } from "../context/MyContext";
import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
import Search from "../components/search/Search";
import ScrollToTop from "../components/ScrollToTop";

function insideWrapper({ children, role }) {
  return (
    <html lang="en">
      <MyProvider>
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

export default insideWrapper;
