// "use client";
// import { useContext, useEffect, useState } from "react";
import "./singlep.css";
// import { useAuth } from "@clerk/nextjs";
// import {
//   getCartItemsByUserIdAndProductId,
//   createCartItem,
//   updateCartItem,
// } from "../../../../db/queries";
import AddToCart from "./addToCart";

function Singlep({ p }) {
  // const { userId } = useAuth();
  // const [count, setCount] = useState(0);
  // const [isNew, setisNew] = useState(true);
  // const [orderId, setorderId] = useState(0);
  // const [disabledB, setdisabledB] = useState(false);
  // useEffect(() => {
  //   async function startwith() {
  //     if (userId && p.id) {
  //       try {
  //         const orders = await getCartItemsByUserIdAndProductId(userId, p.id);
  //         if (orders.length > 0) {
  //           setCount(orders[0].count);
  //           setorderId(orders[0].id);
  //           setisNew(false);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching orders:", error);
  //       }
  //     }
  //   }
  //   startwith();
  // }, [userId, p.id]);

  // function addToCart() {
  //   setdisabledB(true);
  //   if (count <= 0) return;

  //   if (isNew) {
  //     createCartItem({ userId: userId, productId: p.id, count: count });
  //     setisNew(false);
  //   } else {
  //     updateCartItem(orderId, {
  //       userId: userId,
  //       productId: p.id,
  //       count: count,
  //     });
  //   }
  // setcount(0);
  // }

  return (
    <div className="preview mainwrap">
      <div className="productim">
        <picture>
          <source media="(max-width: 768px)" srcSet={p.image.tablet} />
          <source media="(max-width: 476px)" srcSet={p.image.mobile} />
          <img src={p.image.desktop} alt="product" />
        </picture>
      </div>
      {/* <img src={p.image[imageSrcKey]} alt="pruduct" className="productim" /> */}
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
        {/* <div className="cartbs">
          <button className="quant">
            <span
              className="sign"
              onClick={() => {
                if (count > 0) {
                  setCount(count - 1);
                  setdisabledB(false);
                }
              }}
            >
              -
            </span>
            <span className="qcount">{count}</span>
            <span
              className="sign"
              onClick={() => {
                setCount(count + 1);
                setdisabledB(false);
              }}
            >
              +
            </span>
          </button>
          <div className="cartb button-container-1">
            <span className="cartb mas">ADD TO CART</span>
            <button
              className="addcart"
              onClick={() => addToCart()}
              disabled={disabledB}
            >
              ADD TO CART
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Singlep;
