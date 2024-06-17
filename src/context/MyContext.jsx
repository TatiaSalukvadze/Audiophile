"use client";
import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [cartList, setcartList] = useState([]);
  const [count, setcount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let imageSrcKey = "desktop";

  if (windowWidth <= 768) {
    imageSrcKey = "tablet";
  }
  if (windowWidth <= 476) {
    imageSrcKey = "mobile";
  }

  return (
    <MyContext.Provider
      value={{ cartList, setcartList, imageSrcKey, count, setcount }}
    >
      {children}
    </MyContext.Provider>
  );
};
