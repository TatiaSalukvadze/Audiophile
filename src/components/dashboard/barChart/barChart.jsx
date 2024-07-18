"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import products from "../../../data.json";
import "./barchart.css";

export default function barChart({ orders, cart }) {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setdata] = useState([]);
  useEffect(() => {
    setIsMounted(true);
    function startWith() {
      const d = {};
      products.forEach((p) => {
        d[`${p.id}`] = { id: p.id, name: p.shortName, cart: 0, order: 0 };
      });
      orders.forEach((o) => {
        if (d[o.productId]) d[o.productId].order += o.count;
      });
      cart.forEach((c) => {
        if (d[c.productId]) d[c.productId].cart += c.count;
      });
      return Object.values(d);
    }

    setdata(startWith());
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    // <ResponsiveContainer width="100%" height="auto">
    <div className="barchartdiv">
      <h2 className="adtitles">
        <span>Product</span> Popularity
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          className="barchart"
          // width={700}
          // height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="cart"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="order"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
      {/* </ResponsiveContainer> */}
    </div>
  );
}
