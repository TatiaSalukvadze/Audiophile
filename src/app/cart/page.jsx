"use client";
import { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../../context/MyContext";
import Link from "next/link";
import "./cart.css";

function Cart() {
  const { cartList, setcartList } = useContext(MyContext);
  const [total, settotal] = useState(0);
  useEffect(() => {
    const t = cartList.reduce((tot, c) => tot + c.price * c.count, 0);
    settotal(t);
  }, [cartList]);

  const handleDecrement = (index) => {
    if (cartList[index].count > 0) {
      const updCart = [...cartList];
      updCart[index].count -= 1;
      if (updCart[index].count === 0) {
        updCart.splice(index, 1);
        console.log(updCart);
      }
      setcartList(updCart);
    }
  };

  const handleIncrement = (index) => {
    const updCart = [...cartList];
    updCart[index].count += 1;
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
            <div className="cart-item" key={`${el.name}`}>
              <img src={el.image.mobile} alt="cref" />
              <div className="dp">
                <span className="dp-t">{el.shortName}</span>
                <span className="dp-p">${el.price}</span>
              </div>
              <button className="quant cart-quant">
                <span className="sign" onClick={() => handleDecrement(indx)}>
                  -
                </span>
                <span className="qcount">{el.count}</span>
                <span className="sign" onClick={() => handleIncrement(indx)}>
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
