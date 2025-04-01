"use client";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ArrowPathIcon } from "@heroicons/react/24/outline";


ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserSubscriptionChart() {
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users"); // Fetch users data
        const data = await res.json();
        
        const regularUsers = data.users.filter(user => !user.isPaidSubscriber).length;
        const paidSubscribers = data.users.filter(user => user.isPaidSubscriber).length;

        setUsersData({
          labels: ["Regular Users", "Paid Subscribers"],
          datasets: [
            {
              data: [regularUsers, paidSubscribers],
              backgroundColor: ["#4CAF50", "#FF9800"],
              hoverBackgroundColor: ["#45a049", "#e68900"],
              borderColor: ["#ffffff", "#ffffff"],
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-center text-xl md:text-2xl font-semibold">
        User Subscription Breakdown
      </h2>
      <div className="rounded-xl bg-gray-50 p-4 flex flex-col items-center">
        {usersData ? <Pie data={usersData} /> : <p>No data available</p>}
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
      
    </div>
  );
}
