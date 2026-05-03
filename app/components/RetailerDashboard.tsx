import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { ChatBox }
from "./ChatBox";

type LanguageType =
  | "en"
  | "hi"
  | "kn"
  | "mr";

interface RetailerDashboardProps {
  language: LanguageType;
  setLanguage: React.Dispatch<
    React.SetStateAction<LanguageType>
  >;
  onLogout?: () => void;
}

export function RetailerDashboard({
  language,
  setLanguage,
  onLogout
}: RetailerDashboardProps) {

  // WALLET
  const [
    walletBalance,
    setWalletBalance
  ] = useState(55000);

  // PROFILE
  const [
    showProfile,
    setShowProfile
  ] = useState(false);

  // PRODUCTS
  const [
    products,
    setProducts
  ] = useState<any[]>([]);

  // ORDERS
  const [
    orders,
    setOrders
  ] = useState<any[]>([]);

  // SEARCH
  const [
    search,
    setSearch
  ] = useState("");

  // FETCH PRODUCTS
  const fetchProducts =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/products"
          );

        // DEFAULT BUY QUANTITY
        const updated =
          res.data.map((p: any) => ({
            ...p,
            buyQty: 1
          }));

        setProducts(updated);

      } catch (err) {

        console.log(err);

      }
    };

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

    fetchProducts();

    fetchOrders();

  }, []);

  // SEARCH FILTER
  const filteredProducts =
    products.filter((p) =>
      p.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

    const handlePayment =
  async (amount: number) => {

    try {

      // CREATE ORDER
      const res =
        await axios.post(
          "http://localhost:5000/api/payments/create-order",
          {
            amount
          }
        );

      const order =
        res.data;

      // RAZORPAY OPTIONS
      const options = {

        key:
          "rzp_test_Sk6aWWsWzsVhka",

        amount:
          order.amount,

        currency:
          order.currency,

        name:
          "KrishiConnect",

        description:
          "Crop Purchase",

        order_id:
          order.id,

        handler:
          function () {

            alert(
              "Payment successful"
            );
          },

        theme: {
          color:
            "#16a34a"
        }

      };

      const razorpay =
        new (window as any)
          .Razorpay(options);

      razorpay.open();

    } catch (err) {

      console.log(err);

      alert(
        "Payment failed"
      );
    }
};
  return (
    <div className="min-h-screen bg-blue-50 p-4">

      {/* TOP BAR */}
      <div className="bg-white rounded-2xl shadow-md p-4 flex justify-between items-center mb-4">

        {/* LEFT */}
        <div>

          <h1 className="text-2xl font-bold text-blue-700">
            Retailer Dashboard 🛒
          </h1>

          <p className="text-gray-500">
            Buy fresh produce directly
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
            className="w-12 h-12 rounded-full bg-blue-600 text-white text-xl"
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

          <h2 className="text-2xl font-bold text-blue-700 mb-5">
            My Account
          </h2>

          {/* WALLET */}
          <div className="bg-blue-100 rounded-xl p-4 mb-4">

            <h3 className="text-lg font-bold text-blue-700 mb-2">
              Wallet
            </h3>

            <p className="text-3xl font-bold">
              ₹{walletBalance}
            </p>

            {/* ADD MONEY */}
            <div className="flex gap-2 mt-3">

              <button
                onClick={() =>
                  setWalletBalance(
                    walletBalance + 1000
                  )
                }
                className="bg-blue-600 text-white px-3 py-2 rounded-lg"
              >
                + ₹1000
              </button>

              <button
                onClick={() =>
                  setWalletBalance(
                    walletBalance + 5000
                  )
                }
                className="bg-blue-700 text-white px-3 py-2 rounded-lg"
              >
                + ₹5000
              </button>

            </div>

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

        <h2 className="text-xl font-bold text-blue-700 mb-3">
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

      {/* SEARCH */}
      <div className="bg-white rounded-2xl shadow-md p-5 mb-4">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full border px-4 py-3 rounded-xl"
        />

      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {filteredProducts.map(
          (product, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >

              {/* IMAGE */}
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/300"
                }
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              {/* DETAILS */}
              <div className="p-4">

                <h2 className="text-xl font-bold mb-2">
                  {product.name}
                </h2>

                <p className="text-green-600 text-lg font-bold mb-1">
                  ₹{product.price}/kg
                </p>

                <p className="text-gray-600 mb-3">
                  {product.quantity} kg available
                </p>

                {/* QUANTITY */}
                <div className="flex items-center gap-3 mb-3">

                  <button
                    onClick={() => {

                      if (
                        product.buyQty > 1
                      ) {

                        product.buyQty--;

                        setProducts([
                          ...products
                        ]);
                      }
                    }}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span className="font-bold">
                    {product.buyQty}
                  </span>

                  <button
                    onClick={() => {

                      product.buyQty++;

                      setProducts([
                        ...products
                      ]);

                    }}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>

                </div>

                {/* BUY */}
                <button
                  onClick={async () => {

                    try {

                      await axios.post(
                        "http://localhost:5000/api/orders/create",
                        {
                          productName:
                            product.name,

                          quantity:
                            product.buyQty,

                          price:
                            product.price,

                          retailerName:
                            "Retailer"
                        }
                      );

                      alert(
                        "Order placed successfully"
                      );

                      fetchOrders();

                    } catch (err) {

                      console.log(err);

                      alert(
                        "Failed to place order"
                      );
                    }
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
                >
                  Buy Product
                </button>
                <button
  onClick={() =>
    handlePayment(
      product.price *
      product.buyQty
    )
  }
  className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
>
  Pay Now
</button>

              </div>

            </div>

          )
        )}

      </div>

      {/* ORDER HISTORY */}
      <div className="mt-8">

        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          My Orders
        </h2>

        <div className="space-y-4">

          {orders.map(
            (order, index) => (

              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-5"
              >

                <h3 className="text-xl font-bold mb-2">
                  {order.productName}
                </h3>

                <p>
                  Quantity:
                  {" "}
                  {order.quantity}
                </p>

                <p>
                  Price:
                  {" "}
                  ₹{order.price}
                </p>

                <p className="mt-2">

                  Status:
                  {" "}

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

                </p>

              </div>

            )
          )}

        </div>

      </div>
      <ChatBox />

    </div>
  );
}