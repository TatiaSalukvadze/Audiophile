import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import "./admin.css";
import { getOrders, getCartItems } from "../../../../db/queries";
import Card from "../../../../components/dashboard/card/card";
import products from "../../../../data.json";
import Purchases from "../../../../components/dashboard/purchases/purchases";
import BarChart from "../../../../components/dashboard/barChart/barChart";
import LineChart from "../../../../components/dashboard/lineChart/lineChart";
import { Users } from "../../actions";

export default async function AdminDashboard() {
  const { sessionClaims } = auth();

  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/home");
  }

  // async function Users() {
  //   try {
  //     const { data } = await clerkClient.users.getUserList();
  //     // console.log(data);
  //     return data ? data : [];
  //   } catch (error) {
  //     console.error("Error fetching users:", error); // Error handling
  //   }
  // }
  const users = await Users();
  async function Orders() {
    try {
      const ords = await getOrders();
      let rev = 0;
      if (ords) {
        for (let or of ords) {
          let price =
            products.find((product) => product.id === or.productId)?.price || 0;

          rev += or.count * price;
        }

        return [ords, rev];
      } else {
        return [[], 0];
      }
    } catch (error) {
      console.error("Error fetching orders:", error); // Error handling
    }
  }
  const [orders, revenue] = await Orders();

  async function getCart() {
    try {
      const cart = await getCartItems();

      return cart ? cart : [];
    } catch (error) {
      console.error("Error fetching orders:", error); // Error handling
    }
  }
  const cart = await getCart();
  return (
    <div className="admindiv">
      <div className="mainwrap admin">
        <div className="cards">
          <Card
            item={{ title: "Total Users", number: users.length, jump: "users" }}
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
      </div>
    </div>
  );
}
