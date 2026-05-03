import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { AdminAnalytics }
from "./AdminAnalytics";

export function AdminDashboard() {

  const [
    products,
    setProducts
  ] = useState<any[]>([]);

  const [
    orders,
    setOrders
  ] = useState<any[]>([]);

  // FETCH DATA
  const fetchData =
    async () => {

      try {

        // PRODUCTS
        const productRes =
          await axios.get(
            "http://localhost:5000/api/products"
          );

        setProducts(
          productRes.data
        );

        // ORDERS
        const orderRes =
          await axios.get(
            "http://localhost:5000/api/orders"
          );

        setOrders(
          orderRes.data
        );

      } catch (err) {

        console.log(err);

      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  // TOTAL EARNINGS
  const totalRevenue =
    orders.reduce(

      (
        total,
        order
      ) =>

        total +
        (
          order.price *
          order.quantity
        ),

      0
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Admin Dashboard 👨‍💼
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        {/* PRODUCTS */}
        <div className="bg-white rounded-2xl shadow-md p-5">

          <h2 className="text-xl font-bold text-green-700 mb-2">
            Products
          </h2>

          <p className="text-4xl font-bold">
            {products.length}
          </p>

        </div>

        {/* ORDERS */}
        <div className="bg-white rounded-2xl shadow-md p-5">

          <h2 className="text-xl font-bold text-blue-700 mb-2">
            Orders
          </h2>

          <p className="text-4xl font-bold">
            {orders.length}
          </p>

        </div>

        {/* REVENUE */}
        <div className="bg-white rounded-2xl shadow-md p-5">

          <h2 className="text-xl font-bold text-yellow-700 mb-2">
            Revenue
          </h2>

          <p className="text-4xl font-bold">
            ₹{totalRevenue}
          </p>

        </div>

      </div>

      {/* PRODUCTS TABLE */}
      <div className="bg-white rounded-2xl shadow-md p-5 mb-6">

        <h2 className="text-2xl font-bold mb-4">
          Products
        </h2>

        <div className="space-y-4">

          {products.map(
            (product, index) => (

              <div
                key={index}
                className="flex justify-between items-center border-b pb-3"
              >

                <div>

                  <h3 className="font-bold">
                    {product.name}
                  </h3>

                  <p>
                    ₹{product.price}/kg
                  </p>

                </div>

                <p>
                  {product.quantity} kg
                </p>

              </div>

            )
          )}

        </div>

      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white rounded-2xl shadow-md p-5">

        <h2 className="text-2xl font-bold mb-4">
          Orders
        </h2>

        <div className="space-y-4">

          {orders.map(
            (order, index) => (

              <div
                key={index}
                className="flex justify-between items-center border-b pb-3"
              >

                <div>

                  <h3 className="font-bold">
                    {order.productName}
                  </h3>

                  <p>
                    Qty:
                    {" "}
                    {order.quantity}
                  </p>

                </div>

                <span
                  className={`font-bold ${
                    order.status ===
                    "Pending"
                      ? "text-yellow-600"
                      : order.status ===
                        "Accepted"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {order.status}
                </span>

              </div>

            )
          )}

        </div>

      </div>
      <AdminAnalytics />

    </div>
  );
}