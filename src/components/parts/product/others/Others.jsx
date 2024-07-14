import Link from "next/link";
import data from "../../../../data.json";
import "./others.css";

function Others({ items }) {
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

              <h3>{it.name}</h3>
              <Link href={`/${cat}/${it.slug}`}>
                <button>See Product</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Others;
