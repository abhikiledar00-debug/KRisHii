import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export function AdminAnalytics() {

  // SAMPLE DATA
  const revenueData = [

    {
      month: "Jan",
      revenue: 12000
    },

    {
      month: "Feb",
      revenue: 18000
    },

    {
      month: "Mar",
      revenue: 25000
    },

    {
      month: "Apr",
      revenue: 32000
    }

  ];

  const orderData = [

    {
      name: "Pending",
      value: 5
    },

    {
      name: "Accepted",
      value: 8
    },

    {
      name: "Delivered",
      value: 12
    }

  ];

  const COLORS = [
    "#facc15",
    "#fb923c",
    "#22c55e"
  ];

  return (
    <div className="mt-8">

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Analytics 📊
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="bg-white rounded-2xl shadow-md p-5">

          <h3 className="text-xl font-bold mb-4">
            Revenue Overview
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={revenueData}
            >

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="revenue"
                fill="#16a34a"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* PIE CHART */}
        <div className="bg-white rounded-2xl shadow-md p-5">

          <h3 className="text-xl font-bold mb-4">
            Orders Status
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={orderData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >

                {orderData.map(
                  (
                    entry,
                    index
                  ) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}