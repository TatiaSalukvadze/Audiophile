"use client";
import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [cartList, setcartList] = useState([]);
  // const [count, setcount] = useState(0);
  const [searchResults, setsearchResults] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  // const [windowWidth, setWindowWidth] = useState(
  //   typeof window !== "undefined" ? window.innerWidth : 800
  // );

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // let imageSrcKey = "desktop";

  // if (windowWidth <= 768) {
  //   imageSrcKey = "tablet";
  // }
  // if (windowWidth <= 476) {
  //   imageSrcKey = "mobile";
  // }

  return (
    <MyContext.Provider
      value={{
        cartList,
        setcartList,
        // imageSrcKey,
        // count,
        // setcount,
        searchResults,
        setsearchResults,
        searchTerm,
        setsearchTerm,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
