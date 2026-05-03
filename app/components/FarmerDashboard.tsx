import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { CropDiseaseDetector }
from "./CropDiseaseDetector";

import { VoiceAssistant }
from "./VoiceAssistant";

import { WeatherCard }
from "./WeatherCard";

import { NotificationCenter }
from "./NotificationCenter";

type LanguageType =
  | "en"
  | "hi"
  | "kn"
  | "mr";

interface FarmerDashboardProps {
  language: LanguageType;
  setLanguage: React.Dispatch<
    React.SetStateAction<LanguageType>
  >;
  onLogout?: () => void;
  user: any;
}

export function FarmerDashboard({
  language,
  setLanguage,
  onLogout,
  user
}: FarmerDashboardProps) {

  // WALLET
  const [
    walletBalance,
    setWalletBalance
  ] = useState(25000);

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

  // FORM
  const [
    showAddProduct,
    setShowAddProduct
  ] = useState(false);

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  // IMAGE FILE
  const [image, setImage] =
    useState<any>(null);

  // FETCH PRODUCTS
  const fetchProducts =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/products"
          );

        setProducts(res.data);

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

  // TOTAL EARNINGS
  const totalEarnings =
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

  // ADD PRODUCT
  const handleAddProduct =
    async () => {

      try {

        const formData =
          new FormData();

        formData.append(
          "name",
          name
        );

        formData.append(
          "price",
          price
        );

        formData.append(
          "quantity",
          quantity
        );

        formData.append(
          "farmerId",
          user._id
        );

        formData.append(
          "image",
          image
        );

        await axios.post(
          "http://localhost:5000/api/products/add",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

        alert(
          "Product uploaded successfully"
        );

        // RESET
        setName("");
        setPrice("");
        setQuantity("");
        setImage(null);

        setShowAddProduct(false);

        fetchProducts();

      } catch (err) {

        console.log(err);

        alert(
          "Upload failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-green-50 p-4">

      {/* TOP BAR */}
      <div className="bg-white rounded-2xl shadow-md p-4 flex justify-between items-center mb-4">

        {/* LEFT */}
        <div>

          <h1 className="text-2xl font-bold text-green-700">
            Namaste,
            {" "}
            {user.name}
            {" "}
            🧑‍🌾
          </h1>

          <p className="text-gray-500">
            Welcome to KrishiConnect
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <NotificationCenter />

          {/* PROFILE */}
          <button
            onClick={() =>
              setShowProfile(
                !showProfile
              )
            }
            className="w-12 h-12 rounded-full bg-green-600 text-white text-xl"
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

          <h2 className="text-2xl font-bold text-green-700 mb-5">
            My Account
          </h2>

          {/* USER DETAILS */}
          <div className="space-y-2 text-gray-700 mb-4">

            <p>
              <strong>Name:</strong>
              {" "}
              {user.name}
            </p>

            <p>
              <strong>Phone:</strong>
              {" "}
              {user.phone}
            </p>

            <p>
              <strong>Role:</strong>
              {" "}
              {user.role}
            </p>

          </div>

          {/* WALLET */}
          <div className="bg-green-100 rounded-xl p-4 mb-4">

            <h3 className="text-lg font-bold text-green-700 mb-2">
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
                className="bg-green-600 text-white px-3 py-2 rounded-lg"
              >
                + ₹1000
              </button>

              <button
                onClick={() =>
                  setWalletBalance(
                    walletBalance + 5000
                  )
                }
                className="bg-green-700 text-white px-3 py-2 rounded-lg"
              >
                + ₹5000
              </button>

            </div>

          </div>

          {/* EARNINGS */}
          <div className="bg-yellow-100 rounded-xl p-4 mb-4">

            <h3 className="text-lg font-bold text-yellow-700 mb-2">
              Earnings
            </h3>

            <p className="text-3xl font-bold">
              ₹{totalEarnings}
            </p>

            <p className="mt-2 text-gray-700">
              Total from orders
            </p>

          </div>

          {/* STATS */}
          <div className="bg-blue-100 rounded-xl p-4 mb-4">

            <h3 className="text-lg font-bold text-blue-700 mb-3">
              Statistics
            </h3>

            <div className="space-y-2">

              <p>
                📦 Products:
                {" "}
                {products.length}
              </p>

              <p>
                📑 Orders:
                {" "}
                {orders.length}
              </p>

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

        <h2 className="text-xl font-bold text-green-700 mb-3">
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

      {/* ADD PRODUCT BUTTON */}
      <div className="mb-4">

        <button
          onClick={() =>
            setShowAddProduct(
              !showAddProduct
            )
          }
          className="bg-green-600 text-white px-5 py-3 rounded-xl"
        >
          Add Product
        </button>

      </div>

      {/* ADD PRODUCT FORM */}
      {showAddProduct && (

        <div className="bg-white rounded-2xl shadow-md p-5 mb-4">

          <h2 className="text-xl font-bold text-green-700 mb-4">
            Add New Product
          </h2>

          <div className="space-y-3">

            {/* PRODUCT NAME */}
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="w-full border px-4 py-3 rounded-xl"
            />

            {/* PRICE */}
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }
              className="w-full border px-4 py-3 rounded-xl"
            />

            {/* QUANTITY */}
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  e.target.value
                )
              }
              className="w-full border px-4 py-3 rounded-xl"
            />

            {/* IMAGE */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(
                  e.target.files?.[0]
                )
              }
              className="w-full border px-4 py-3 rounded-xl"
            />

            {/* SUBMIT */}
            <button
              onClick={
                handleAddProduct
              }
              className="w-full bg-green-600 text-white py-3 rounded-xl"
            >
              Upload Product
            </button>

          </div>

        </div>

      )}

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {products.map(
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

                <p className="text-gray-600">
                  {product.quantity} kg
                </p>

              </div>

            </div>

          )
        )}

      </div>

      {/* ORDERS */}
      <div className="mt-8">

        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Orders Received
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
                  Total:
                  {" "}
                  ₹{
                    order.price *
                    order.quantity
                  }
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
      <CropDiseaseDetector />
      <VoiceAssistant />
      <WeatherCard />

    </div>
  );
}