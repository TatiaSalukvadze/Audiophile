"use client";
import React, { useState, useEffect, useRef } from "react";
import { Users, DeleteUser } from "../actions";
import "../userorder.css";
import "../dashboard/[[...dashboard]]/admin.css";

function users({ gotusers }) {
  const [isMounted, setIsMounted] = useState(false);
  const [usersList, setusers] = useState(gotusers);
  const [currentUser, setcurrentUser] = useState("");
  const modal = useRef(null);
  const insidemodal = useRef(null);
  useEffect(() => {
    setIsMounted(true);
    // async function getUsers() {
    //   try {
    //     const temp = await Users();
    //     setusers(temp);
    //   } catch (error) {
    //     console.error("Error fetching users:", error);
    //   }
    // }
    // getUsers();
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
  const delUser = async (userId) => {
    try {
      // Perform the delete operation (this is a placeholder, replace with your actual delete logic)
      await DeleteUser(userId); // Ensure you have a function to delete the user from your server
      // Update the state to remove the deleted user
      setusers((usersList) => usersList.filter((user) => user.id !== userId));
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
          Our <span>Users</span>
        </h2>
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
                const month = String(createdAt.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
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
            <p>Are you sure you want to delete your account?</p>

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
                  delUser(currentUser);
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

export default users;
