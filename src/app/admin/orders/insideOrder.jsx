"use client";
import React, { useState, useEffect, useRef } from "react";
import products from "../../../data.json";
import "../userorder.css";
import "../dashboard/[[...dashboard]]/admin.css";
import { deleteOrder } from "../../../db/queries";

function orders({ users, getorders }) {
  const [isMounted, setIsMounted] = useState(false);
  //   const [usersList, setusers] = useState(gotusers);
  const [ordersList, setordersList] = useState(getorders);
  const [currentOrder, setcurrentOrder] = useState("");
  const modal = useRef(null);
  const insidemodal = useRef(null);
  useEffect(() => {
    setIsMounted(true);

    const handleOutsideClick = (event) => {
      if (
        modal.current &&
        insidemodal.current &&
        !insidemodal.current.contains(event.target)
      ) {
        modal.current.style.display = "none";
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (!isMounted) {
    return null;
  }
  const delOrder = async (orderId) => {
    try {
      // Perform the delete operation (this is a placeholder, replace with your actual delete logic)
      await deleteOrder(orderId); // Ensure you have a function to delete the user from your server
      // Update the state to remove the deleted user
      setordersList((ordersList) =>
        ordersList.filter((or) => or.id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const changeModal = (style) => {
    console.log(style);
    if (modal.current) {
      modal.current.style.display = style;
    }
  };

  return (
    <div className="userorderdiv">
      <div> &nbsp;</div>
      <div className="userorder mainwrap">
        {" "}
        <h2 className="adtitles">
          Our <span>Orders</span>
        </h2>
        <div className="tablewrap">
          <table className="trtable">
            <thead>
              <tr>
                <td>Name</td>
                <td>Product</td>
                <td>Date</td>
                <td>Amount</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {ordersList.map((or) => {
                const user = users.find((u) => u.id === or.userId) || users[0];
                const p = products.find(
                  (product) => product.id === or.productId
                );

                const createdAt = new Date(or.createdAt);
                const year = createdAt.getFullYear();
                const month = String(createdAt.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
                const day = String(createdAt.getDate()).padStart(2, "0");

                const date = `${year}-${month}-${day}`;

                return (
                  <tr key={or.id + or.userId}>
                    <td>
                      <div className="trUser">
                        <img
                          src={user.imageUrl}
                          alt=""
                          width={40}
                          height={40}
                          className="truserImage"
                        />
                        {user.firstName + " " + user.lastName}
                      </div>
                    </td>
                    <td>
                      <span className="trProduct">{p?.shortName || ""}</span>
                    </td>
                    <td>{date}</td>
                    <td>${p?.price * or.count || 0}</td>
                    <td>
                      <button
                        onClick={() => {
                          setcurrentOrder(or.id);
                          changeModal("block");
                        }}
                        className="delButton"
                      >
                        del
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div id="id01" className="modal" ref={modal}>
        <span
          onClick={() => changeModal("none")}
          className="close"
          title="Close Modal"
        >
          ×
        </span>
        <form className="modal-content" ref={insidemodal}>
          <div className="container">
            <h1>Delete Account</h1>
            <p>Are you sure you want to delete order?</p>

            <div className="clearfix">
              <button
                type="button"
                onClick={() => changeModal("none")}
                className="cancelbtn"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  delOrder(currentOrder);
                  changeModal("none");
                }}
                className="deletebtn"
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default orders;
