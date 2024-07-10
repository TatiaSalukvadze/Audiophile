"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  getCartItemsByUserIdAndProductId,
  createCartItem,
  updateCartItem,
} from "../../../../db/queries";

function addToCart({ pid }) {
  const { userId } = useAuth();
  const [count, setCount] = useState(0);
  const [isNew, setisNew] = useState(true);
  const [orderId, setorderId] = useState(0);
  const [disabledB, setdisabledB] = useState(false);
  useEffect(() => {
    async function startwith() {
      if (userId && pid) {
        try {
          const orders = await getCartItemsByUserIdAndProductId(userId, pid);
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
  }, [userId, pid]);

  function AddToCart() {
    setdisabledB(true);
    if (count <= 0) return;

    if (isNew) {
      createCartItem({ userId: userId, productId: pid, count: count });
      setisNew(false);
    } else {
      updateCartItem(orderId, {
        userId: userId,
        productId: pid,
        count: count,
      });
    }
  }
  return (
    <div className="cartbs">
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
          onClick={() => AddToCart()}
          disabled={disabledB}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default addToCart;
