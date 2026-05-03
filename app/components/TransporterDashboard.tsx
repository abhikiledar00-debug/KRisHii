import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { DeliveryMap }
from "./DeliveryMap";

type LanguageType =
  | "en"
  | "hi"
  | "kn"
  | "mr";

interface TransporterDashboardProps {
  language: LanguageType;
  setLanguage: React.Dispatch<
    React.SetStateAction<LanguageType>
  >;
  onLogout?: () => void;
}

export function TransporterDashboard({
  language,
  setLanguage,
  onLogout
}: TransporterDashboardProps) {

  // WALLET
  const walletBalance = 32000;

  // PROFILE
  const [
    showProfile,
    setShowProfile
  ] = useState(false);

  // ORDERS
  const [
    orders,
    setOrders
  ] = useState<any[]>([]);

  // FETCH ORDERS
  const fetchOrders =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/orders"
          );

        setOrders(res.data);

      } catch (err) {

        console.log(err);

      }
    };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 p-4">

      {/* TOP BAR */}
      <div className="bg-white rounded-2xl shadow-md p-4 flex justify-between items-center mb-4">

        {/* LEFT */}
        <div>

          <h1 className="text-2xl font-bold text-orange-700">
            Transport Dashboard 🚚
          </h1>

          <p className="text-gray-500">
            Manage deliveries
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* PROFILE */}
          <button
            onClick={() =>
              setShowProfile(
                !showProfile
              )
            }
            className="w-12 h-12 rounded-full bg-orange-600 text-white text-xl"
          >
            👤
          </button>

          {/* LOGOUT */}
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

      {/* PROFILE PANEL */}
      {showProfile && (

        <div className="bg-white rounded-2xl shadow-md p-5 mb-4">

          <h2 className="text-2xl font-bold text-orange-700 mb-5">
            My Account
          </h2>

          {/* WALLET */}
          <div className="bg-orange-100 rounded-xl p-4 mb-4">

            <h3 className="text-lg font-bold text-orange-700 mb-2">
              Wallet
            </h3>

            <p className="text-3xl font-bold">
              ₹{walletBalance}
            </p>

          </div>

          {/* SUPPORT */}
          <div className="bg-red-100 rounded-xl p-4">

            <h3 className="text-lg font-bold text-red-700 mb-3">
              Help & Support
            </h3>

            <div className="space-y-2 text-gray-700">

              <p>
                📞 9876543210
              </p>

              <p>
                ✉ support@krishiconnect.com
              </p>

            </div>

          </div>

        </div>

      )}

      {/* LANGUAGE */}
      <div className="bg-white rounded-2xl shadow-md p-5 mb-4">

        <h2 className="text-xl font-bold text-orange-700 mb-3">
          Change Language
        </h2>

        <select
          value={language}
          onChange={(e) =>
            setLanguage(
              e.target.value as LanguageType
            )
          }
          className="border px-4 py-2 rounded-lg"
        >
          <option value="en">
            English
          </option>

          <option value="hi">
            Hindi
          </option>

          <option value="kn">
            Kannada
          </option>

          <option value="mr">
            Marathi
          </option>

        </select>

      </div>

      {/* ORDERS */}
      <div className="space-y-4">

        {orders.map(
          (order, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-5"
            >

              <h2 className="text-xl font-bold mb-2">
                {order.productName}
              </h2>

              <p className="mb-1">
                Quantity:
                {" "}
                {order.quantity}
              </p>

              <p className="mb-1">
                Price:
                {" "}
                ₹{order.price}
              </p>

              <p className="mb-1">
                Retailer:
                {" "}
                {order.retailerName}
              </p>

              <p className="mb-4">
                Status:
                {" "}
                <span className="font-bold">
                  {order.status}
                </span>
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3">

                {/* ACCEPT */}
                {order.status ===
                  "Pending" && (

                  <button
                    onClick={async () => {

                      try {

                        await axios.put(
                          `http://localhost:5000/api/orders/accept/${order._id}`
                        );

                        fetchOrders();

                        alert(
                          "Order accepted"
                        );

                      } catch (err) {

                        console.log(err);

                        alert(
                          "Failed to accept order"
                        );
                      }
                    }}
                    className="bg-orange-600 text-white px-4 py-2 rounded-xl"
                  >
                    Accept
                  </button>

                )}

                {/* DELIVERED */}
                {order.status ===
                  "Accepted" && (

                  <button
                    onClick={async () => {

                      try {

                        await axios.put(
                          `http://localhost:5000/api/orders/complete/${order._id}`
                        );

                        fetchOrders();

                        alert(
                          "Order delivered"
                        );

                      } catch (err) {

                        console.log(err);

                        alert(
                          "Failed to complete delivery"
                        );
                      }
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl"
                  >
                    Delivered
                  </button>

                )}

              </div>

            </div>

          )
        )}

      </div>
      <DeliveryMap />

    </div>
  );
}