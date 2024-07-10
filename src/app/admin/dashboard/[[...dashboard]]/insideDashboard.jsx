"use client";
import "./admin.css";
import { useState, useEffect } from "react";
import { getOrders, getCartItems } from "../../../../db/queries";
import Card from "../../../../components/dashboard/card/card";
import products from "../../../../data.json";
import Purchases from "../../../../components/dashboard/purchases/purchases";
import BarChart from "../../../../components/dashboard/barChart/barChart";
import LineChart from "../../../../components/dashboard/lineChart/lineChart";
import { Users } from "../../actions";

function insideDashboard() {
  const [users, setusers] = useState([]);
  const [orders, setorders] = useState([]);
  const [revenue, setrevenue] = useState(0);
  const [cart, setcart] = useState([]);
  const [usersLoaded, setusersLoaded] = useState(false);
  const [ordersLoaded, setordersLoaded] = useState(false);
  const [cartLoaded, setcartLoaded] = useState(false);
  useEffect(() => {
    async function getUsers() {
      try {
        const temp = await Users();
        setusers(temp);
        setusersLoaded(true);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    getUsers();

    async function Orders() {
      try {
        const ords = await getOrders();
        let rev = 0;
        if (ords) {
          for (let or of ords) {
            let price =
              products.find((product) => product.id === or.productId)?.price ||
              0;

            rev += or.count * price;
          }
          setorders(ords);
          setrevenue(rev);
          setordersLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching orders:", error); // Error handling
      }
    }
    Orders();

    async function getCart() {
      try {
        const cart = await getCartItems();

        if (cart) setcart(cart);
        setcartLoaded(true);
      } catch (error) {
        console.error("Error fetching cart items:", error); // Error handling
      }
    }
    getCart();
  }, []);

  return (
    <div className="admindiv">
      <div className="mainwrap admin">
        {ordersLoaded && cartLoaded && cartLoaded ? (
          <>
            <div className="cards">
              <Card
                item={{
                  title: "Total Users",
                  number: users.length,
                  jump: "users",
                }}
              />

              <Card
                item={{
                  title: "Total Orders",
                  number: orders.length,
                  jump: "orders",
                }}
              />
              <Card
                item={{
                  title: "Total Revenue",
                  number: "$ " + revenue,
                  jump: "orders",
                }}
              />
            </div>

            <Purchases orders={orders} users={users} />
            <BarChart orders={orders} cart={cart} />
            <LineChart
              users={users.map((u) => ({ id: u.id, createdAt: u.createdAt }))}
            />
          </>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default insideDashboard;
