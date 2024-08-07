"use client";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
import "./searchRes.css";
import oval from "../../../public/assets/shared/desktop/Oval.svg";
import Link from "next/link";

function page() {
  const { searchResults, searchTerm } = useContext(MyContext);
  if (searchResults.length === 0) {
    return (
      <div className="mainwrap searchRes ">
        <h1>
          No results for <span>'{searchTerm}'</span>!
        </h1>
      </div>
    );
  } else {
    return (
      <div className="mainwrap searchRes">
        <h1>
          Found {searchResults.length} results for <span>'{searchTerm}'</span>:
        </h1>
        <div className="sProducts">
          {searchResults.map((el) => (
            <Link href={`/${el.category}/${el.slug}`}>
              <div className="sProduct" key={el.name}>
                <img src={el.image.mobile} id="sPimg" />
                <p>
                  {el.category} &nbsp; <img src={oval.src} /> &nbsp;{" "}
                  {el.shortName} &nbsp; <img src={oval.src} /> &nbsp; $
                  {el.price}
                </p>
                <h2>{el.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="mainwrap searchRes">
      <h1>Search Results for: {searchTerm}</h1>
      <ul>
        {searchResults.map((p, index) => (
          <li key={index}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default page;
