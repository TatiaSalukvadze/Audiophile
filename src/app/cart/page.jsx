"use client";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../context/MyContext";
import Link from "next/link";
import "./cart.css";
import "../../components/parts/product/singlep/singlep.css";
import { useAuth } from "@clerk/nextjs";
import { updateOrder, getOrdersByUserId, deleteOrder } from "../../db/queries";
import data from "../../data.json";

function Cart() {
  const { userId } = useAuth();
  const { cartList, setcartList } = useContext(MyContext);
  // const [cartList, setcartList] = useState([]);
  const [total, settotal] = useState(0);
  useEffect(() => {
    async function startwith() {
      const orders = await getOrdersByUserId(userId);
      if (orders.length > 0) {
        setcartList(
          orders.map((or) => {
            const p = data.find((el) => el.id === or.productId);
            return {
              id: or.id,
              name: p.name,
              shortName: p.shortName,
              price: p.price,
              count: or.count,
              image: p.image.mobile,
              userId: or.userId,
              productId: or.productId,
            };
          })
        );
      } else {
        setcartList([]);
      }
    }
    startwith();
  }, []);

  useEffect(() => {
    const t = cartList.reduce((tot, c) => tot + c.price * c.count, 0);
    settotal(t);
  }, [cartList]);

  const handleDecrement = (el, index) => {
    if (cartList[index].count > 0) {
      const updObj = {
        userId: el.userId,
        productId: el.productId,
        count: el.count - 1,
      };
      const updCart = [...cartList];
      updCart[index].count -= 1;
      if (updCart[index].count === 0) {
        updCart.splice(index, 1);
        deleteOrder(el.id);
      } else {
        updateOrder(el.id, updObj);
      }
      setcartList(updCart);
    }
  };

  const handleIncrement = (el, index) => {
    const updObj = {
      userId: el.userId,
      productId: el.productId,
      count: el.count + 1,
    };
    const updCart = [...cartList];
    updCart[index].count += 1;
    updateOrder(el.id, updObj);
    setcartList(updCart);
  };

  return (
    <div className="bg">
      <div className="cart-comp">
        <div className="cart-header">
          <h3>Cart ({cartList.length})</h3>
          <h4 onClick={() => setcartList([])} style={{ cursor: "pointer" }}>
            Remove All
          </h4>
        </div>
        <div className="cart-list">
          {cartList.map((el, indx) => (
            <div className="cart-item" key={`${el.id}${el.name}`}>
              <img src={el.image} alt="cref" />
              <div className="dp">
                <span className="dp-t">{el.shortName}</span>
                <span className="dp-p">${el.price}</span>
              </div>
              <button className="quant cart-quant">
                <span
                  className="sign"
                  onClick={() => handleDecrement(el, indx)}
                >
                  -
                </span>
                <span className="qcount">{el.count}</span>
                <span
                  className="sign"
                  onClick={() => handleIncrement(el, indx)}
                >
                  +
                </span>
              </button>
            </div>
          ))}
        </div>
        <div className="total">
          <span className="ttl-text">total</span>
          <span className="total-price">${total}</span>
        </div>
        {cartList.length > 0 ? (
          <Link href="/checkout">
            <button
              className="check-button"
              // onClick={() => setIsModalOpen(!isModalOpen)}
            >
              checkout
            </button>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Cart;
