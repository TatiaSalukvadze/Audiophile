"use client";
import React, { useState, useEffect, useRef } from "react";
import products from "../../../data.json";
import "../userorder.css";
import "../dashboard/[[...dashboard]]/admin.css";
import { getOrders, deleteOrder } from "../../../db/queries";
import { Users } from "../actions";
import DeleteModal from "../../../components/dashboard/deleteModal/deleteModal";

function orders() {
  const [isMounted, setIsMounted] = useState(false);
  const [usersList, setusers] = useState([]);
  const [ordersList, setordersList] = useState([]);
  const [currentOrder, setcurrentOrder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    async function getUsersOrders() {
      try {
        const temp = await Users();
        setusers(temp);
        const ords = await getOrders();
        setordersList(ords ? ords : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getUsersOrders();
  }, []);

  if (!isMounted) {
    return null;
  }
  const delOrder = async (orderId) => {
    setIsLoading(true);
    try {
      // Perform the delete operation (this is a placeholder, replace with your actual delete logic)
      await deleteOrder(orderId); // Ensure you have a function to delete the user from your server
      // Update the state to remove the deleted user
      setordersList((ordersList) =>
        ordersList.filter((or) => or.id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsLoading(false);
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
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
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
                  const user =
                    usersList.find((u) => u.id === or.userId) || usersList[0];
                  const p = products.find(
                    (product) => product.id === or.productId
                  );

                  const createdAt = new Date(or.createdAt);
                  const year = createdAt.getFullYear();
                  const month = String(createdAt.getMonth() + 1).padStart(
                    2,
                    "0"
                  ); // Months are zero-based, so we add 1
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
                            // changeModal("block");
                            setshowModal(true);
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
        )}
      </div>

      {showModal && (
        <DeleteModal
          thing="Order"
          delThing={delOrder}
          current={currentOrder}
          setshowModal={setshowModal}
        />
      )}
    </div>
  );
}

export default orders;
