import { useRouter } from "next/navigation";
import { useRef, useContext } from "react";
import search from "../../../public/assets/shared/desktop/icon-search.svg";
import data from "../../data.json";
import { MyContext } from "../../context/MyContext";

function Search() {
  const { setsearchResults, setsearchTerm } = useContext(MyContext);
  const router = useRouter();

  const inputw = useRef(null);
  function find() {
    if (inputw.current && inputw.current.value.length > 0) {
      const searchterm = inputw.current.value;
      const regex = new RegExp(searchterm, "i");
      const filteredResults = data.filter((el) => regex.test(el.name));
      setsearchResults(filteredResults);
      setsearchTerm(searchterm);
      router.push("/searchResults");
      inputw.current.value = "";
      console.log(filteredResults);
      // navigate(`/searchResults`, {
      //   state: { movies: filteredResults, sw: searchterm },
      // });
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
