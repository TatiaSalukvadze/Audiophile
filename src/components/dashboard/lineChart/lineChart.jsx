"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../barChart/barchart.css";

function lineChart({ users }) {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setdata] = useState([]);
  useEffect(() => {
    setIsMounted(true);
    function startWith() {
      const today = new Date();
      const sixWeeksAgo = new Date(today);
      sixWeeksAgo.setDate(today.getDate() - 6 * 7);
      const filteredUsers = users.filter((user) => {
        const userCreatedAt = new Date(user.createdAt);
        return userCreatedAt >= sixWeeksAgo && userCreatedAt <= today;
      });
      const weeklyCounts = [
        { name: "week 1", count: 0 },
        { name: "week 2", count: 0 },
        { name: "week 3", count: 0 },
        { name: "week 4", count: 0 },
        { name: "week 5", count: 0 },
        { name: "week 6", count: 0 },
      ];
      for (let i = 5; i >= 0; i--) {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - (i + 1) * 7); // Calculate start of the week
        const weekEnd = new Date(today);
        weekEnd.setDate(today.getDate() - i * 7); // Calculate end of the week
        // console.log("start", weekStart);
        // console.log("end", weekEnd);
        filteredUsers.forEach((user) => {
          const userDate = new Date(user.createdAt);
          if (userDate >= weekStart && userDate < weekEnd) {
            weeklyCounts[5 - i].count++;
          }
        });
      }
      setdata(weeklyCounts);
    }
    startWith();
    // console.log(startWith());
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <div className="linechartdiv">
      <h2 className="adtitles">
        <span>Users</span> Registered for Last 6 Weeks
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          className="linechart"
          //   width={500}
          //   height={300}
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
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default lineChart;
