import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../../context/MyContext";
import "./singlep.css";
import { useAuth } from "@clerk/nextjs";
import {
  getOrdersByUserIdAndProductId,
  createOrder,
  updateOrder,
} from "../../../../db/queries";

function Singlep({ p }) {
  const { userId } = useAuth();
  const { cartList, setcartList, imageSrcKey } = useContext(MyContext);
  const [count, setCount] = useState(0);
  const [isNew, setisNew] = useState(true);
  const [orderId, setorderId] = useState(0);
  useEffect(() => {
    async function startwith() {
      if (userId && p.id) {
        try {
          const orders = await getOrdersByUserIdAndProductId(userId, p.id);
          if (orders.length > 0) {
            setCount(orders[0].count);
            setorderId(orders[0].id);
            setisNew(false);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    }
    startwith();
  }, [userId, p.id]);

  function addToCart() {
    if (count <= 0) return;
    // let temp = cartList;
    // let item = p;
    // item.count = item.count ? item.count + count : count;
    // const ind = temp.findIndex((el) => el.id === p.id);
    // console.log(ind);
    // if (ind >= 0) temp[ind] = item;
    // else temp.push(item);
    // setcartList(temp);
    if (isNew) {
      createOrder({ userId: userId, productId: p.id, count: count });
      setisNew(false);
    } else {
      updateOrder(orderId, { userId: userId, productId: p.id, count: count });
    }
    // setcount(0);
  }

  return (
    <div className="preview mainwrap">
      <img src={p.image[imageSrcKey]} alt="pruduct" className="productim" />
      <div className="info calkep">
        {p.new ? <p className="np">NEW PRODUCT</p> : <></>}
        <h1 className="title">{p.name}</h1>
        <p className="pr-desc">{p.description}</p>
        <p className="price">$ {p.price}</p>
        <div className="cartbs">
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
          {/* <button className="addcart" onClick={() => addToCart()}>
            ADD TO CART
          </button> */}
          <div className="cartb button-container-1">
            <span className="cartb mas">See Product</span>
            <button className="addcart" onClick={() => addToCart()}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singlep;
