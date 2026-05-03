import React, { useState } from "react";
import axios from "axios";

interface LoginScreenProps {
  onLogin: (user: any) => void;
}

type UserType =
  | "farmer"
  | "retailer"
  | "transporter";

export function LoginScreen({
  onLogin
}: LoginScreenProps) {

  const [isRegister, setIsRegister] =
    useState(false);

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState<UserType>("farmer");

  // LOGIN
  const handleLogin = async () => {
    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          phone,
          password
        }
      );

      alert(res.data.message);

      // SAVE FULL USER
      onLogin(res.data.user);

    } catch (err: any) {

      alert(
        err.response?.data?.message ||
        "Login failed"
      );
    }
  };

  // REGISTER
  const handleRegister = async () => {
    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          phone,
          password,
          role
        }
      );

      alert(res.data.message);

      setIsRegister(false);

    } catch (err: any) {

      alert(
        err.response?.data?.message ||
        "Register failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
          KrishiConnect
        </h1>

        <p className="text-center text-gray-600 mb-6">
          {isRegister
            ? "Create your account"
            : "Login to your account"}
        </p>

        {/* NAME */}
        {isRegister && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border px-4 py-3 rounded-lg mb-4"
          />
        )}

        {/* PHONE */}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          className="w-full border px-4 py-3 rounded-lg mb-4"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border px-4 py-3 rounded-lg mb-4"
        />

        {/* ROLE */}
        {isRegister && (
          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value as UserType
              )
            }
            className="w-full border px-4 py-3 rounded-lg mb-4"
          >
            <option value="farmer">
              Farmer
            </option>

            <option value="retailer">
              Retailer
            </option>

            <option value="transporter">
              Transporter
            </option>

          </select>
        )}

        {/* BUTTON */}
        {isRegister ? (
          <button
            onClick={handleRegister}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold mb-3"
          >
            Create Account
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold mb-3"
          >
            Login
          </button>
        )}

        {/* TOGGLE */}
        <p className="text-center text-sm">

          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}

          <span
            onClick={() =>
              setIsRegister(!isRegister)
            }
            className="text-green-600 cursor-pointer ml-1"
          >
            {isRegister
              ? "Login"
              : "Create Account"}
          </span>

        </p>

      </div>
    </div>
  );
}