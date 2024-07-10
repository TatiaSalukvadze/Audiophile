"use client";
import React, { useState, useEffect, useRef } from "react";
import { Users, DeleteUser } from "../actions";
import "../userorder.css";
import "../dashboard/[[...dashboard]]/admin.css";
import DeleteModal from "../../../components/dashboard/deleteModal/deleteModal";

function users() {
  const [isMounted, setIsMounted] = useState(false);
  const [usersList, setusers] = useState([]);
  const [currentUser, setcurrentUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    async function getUsers() {
      try {
        const temp = await Users();
        setusers(temp);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    getUsers();
  }, []);

  if (!isMounted) {
    return null;
  }
  const delUser = async (userId) => {
    setIsLoading(true);
    try {
      // Perform the delete operation (this is a placeholder, replace with your actual delete logic)
      await DeleteUser(userId); // Ensure you have a function to delete the user from your server
      // Update the state to remove the deleted user
      setusers((usersList) => usersList.filter((user) => user.id !== userId));
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
          Our <span>Users</span>
        </h2>
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="tablewrap">
            <table className="trtable">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Email</td>
                  <td>CreatedAt</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user) => {
                  const createdAt = new Date(user.createdAt);
                  const year = createdAt.getFullYear();
                  const month = String(createdAt.getMonth() + 1).padStart(
                    2,
                    "0"
                  ); // Months are zero-based, so we add 1
                  const day = String(createdAt.getDate()).padStart(2, "0");

                  const date = `${year}-${month}-${day}`;
                  return (
                    <tr key={user.id + user.email}>
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
                        {user.email}
                        {/* <span className="trProduct">{p?.shortName || ""}</span> */}
                      </td>
                      <td>{date}</td>
                      <td>
                        <button
                          onClick={() => {
                            setcurrentUser(user.id);
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
          thing="Account"
          delThing={delUser}
          current={currentUser}
          setshowModal={setshowModal}
        />
      )}
    </div>
  );
}

export default users;
