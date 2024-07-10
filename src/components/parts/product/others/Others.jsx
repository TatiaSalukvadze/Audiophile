import Link from "next/link";
import data from "../../../../data.json";
import "./others.css";

function Others({ items }) {
  // const { imageSrcKey, setcount } = useContext(MyContext);
  // const cats = [];
  //  const cats =
  // for (let i = 0; i < items.length; i++) {
  //   cats[i] = data.find((el) => el.slug === items[i].slug).category;
  // }
  // const it1 = items[0];
  // const it2 = items[1];
  // const it3 = items[2];

  return (
    <div className="otherswrap mainwrap">
      <h1>you may also like</h1>
      <div className="others">
        {items.map((it) => {
          const cat = data.find((el) => el.slug === it.slug).category;
          return (
            <div className="o" data-aos="zoom-in-up" data-aos-duration="500">
              <picture>
                <source media="(max-width: 768px)" srcSet={it.image.tablet} />
                <source media="(max-width: 476px)" srcSet={it.image.mobile} />
                <img src={it.image.desktop} alt="others" />
              </picture>
              {/* <img src={it.image[imageSrcKey]} alt="others" /> */}
              <h3>{it.name}</h3>
              <Link href={`/${cat}/${it.slug}`}>
                <button>See Product</button>
              </Link>
            </div>
          );
        })}
        {/* <div className="o o1">
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
        </div> */}
      </div>
    </div>
  );
}

export default Others;
