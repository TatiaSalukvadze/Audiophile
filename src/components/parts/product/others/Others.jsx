import { useContext } from "react";
import { MyContext } from "../../../../context/MyContext";
import Link from "next/link";
import data from "../../../../data.json";
import "./others.css";

function Others({ items }) {
  const { imageSrcKey, setcount } = useContext(MyContext);
  const cats = [];

  for (let i = 0; i < items.length; i++) {
    cats[i] = data.find((el) => el.slug === items[i].slug).category;
  }
  const it1 = items[0];
  const it2 = items[1];
  const it3 = items[2];

  return (
    <div className="otherswrap mainwrap">
      <h1>you may also like</h1>
      <div className="others">
        <div className="o o1">
          <img src={it1.image[imageSrcKey]} alt="others" />
          <h3>{it1.name}</h3>
          <Link href={`/${cats[0]}/${it1.slug}`} onClick={() => setcount(0)}>
            <button>See Product</button>
          </Link>
        </div>

        <div className="o o2">
          <img src={it2.image[imageSrcKey]} alt="others" />
          <h3>{it2.name}</h3>
          <Link href={`/${cats[1]}/${it2.slug}`} onClick={() => setcount(0)}>
            <button>See Product</button>
          </Link>
        </div>

        <div className="o o3">
          <img src={it3.image[imageSrcKey]} alt="others" />
          <h3>{it3.name}</h3>
          <Link href={`/${cats[2]}/${it3.slug}`} onClick={() => setcount(0)}>
            <button>See Product</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Others;
