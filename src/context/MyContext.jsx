"use client";
import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [cartList, setcartList] = useState([]);
  const [searchResults, setsearchResults] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  return (
    <MyContext.Provider
      value={{
        cartList,
        setcartList,
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
