import { useRouter } from "next/navigation";
import { useRef, useContext, useEffect } from "react";
import search from "../../../public/assets/shared/desktop/icon-search.svg";
import data from "../../data.json";
import { MyContext } from "../../context/MyContext";

function Search() {
  const { setsearchResults, setsearchTerm } = useContext(MyContext);
  const router = useRouter();
  const inputw = useRef(null);
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        find();
      }
    };

    if (inputw.current) {
      inputw.current.addEventListener("keypress", handleKeyPress);
    }

    return () => {
      if (inputw.current) {
        inputw.current.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [inputw.current]);

  function find() {
    if (inputw.current && inputw.current.value.length > 0) {
      const searchterm = inputw.current.value;
      const regex = new RegExp(searchterm, "i");
      const filteredResults = data.filter((el) => regex.test(el.name));
      setsearchResults(filteredResults);
      setsearchTerm(searchterm);
      router.push("/searchResults");
      inputw.current.value = "";
    }
  }
  return (
    <div className="searchBox">
      <input
        className="searchInput"
        type="text"
        name=""
        placeholder="Search..."
        ref={inputw}
      />
      <button className="searchButton" onClick={() => find()}>
        <img src={search.src} alt="search" />
      </button>
    </div>
  );
}

export default Search;
