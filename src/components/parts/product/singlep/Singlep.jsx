import "./singlep.css";

import AddToCart from "./addToCart";

function Singlep({ p }) {
  return (
    <div className="preview mainwrap">
      <div className="productim">
        <picture>
          <source media="(max-width: 768px)" srcSet={p.image.tablet} />
          <source media="(max-width: 476px)" srcSet={p.image.mobile} />
          <img src={p.image.desktop} alt="product" />
        </picture>
      </div>

      <div
        className="info calkep"
        data-aos="fade-down-left"
        data-aos-duration="500"
      >
        {p.new ? <p className="np">NEW PRODUCT</p> : <></>}
        <h1 className="title">{p.name}</h1>
        <p className="pr-desc">{p.description}</p>
        <p className="price">$ {p.price}</p>
        <AddToCart pid={p.id} />
      </div>
    </div>
  );
}

export default Singlep;
