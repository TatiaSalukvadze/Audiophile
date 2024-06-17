import { useContext, useEffect } from "react";
import { MyContext } from "../../../../context/MyContext";
import "./singlep.css";
import im from "../../../../../public/assets/product-yx1-earphones/mobile/image-product.jpg";

function Singlep({ p }) {
  const { cartList, setcartList, imageSrcKey, count, setcount } =
    useContext(MyContext);

  useEffect(() => {
    setcount(0);
  }, [setcount]);

  function addToCart() {
    if (count <= 0) return;
    let temp = cartList;
    let item = p;
    item.count = item.count ? item.count + count : count;
    const ind = temp.findIndex((el) => el.id === p.id);
    console.log(ind);
    if (ind >= 0) temp[ind] = item;
    else temp.push(item);
    setcartList(temp);
    setcount(0);
  }

  return (
    <div className="preview mainwrap">
      <img src={p.image[imageSrcKey]} alt="pruduct" className="productim" />
      <div className="info calkep">
        {p.new ? <p className="np">NEW PRODUCT</p> : <></>}
        <h1 className="title">{p.name}</h1>
        <p className="pr-desc">{p.description}</p>
        <p className="price">$ {p.price}</p>
        <div>
          <button className="quant">
            <span
              className="sign"
              onClick={() => {
                if (count > 0) setcount(count - 1);
              }}
            >
              -
            </span>
            <span className="qcount">{count}</span>
            <span
              className="sign"
              onClick={() => {
                setcount(count + 1);
              }}
            >
              +
            </span>
          </button>
          <button className="addcart" onClick={() => addToCart()}>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

export default Singlep;
