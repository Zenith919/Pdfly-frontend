// src/pages/Login.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

// ✅ Use environment variable instead of localhost
const API_BASE_URL = "https://pdfly-backend.onrender.com/api";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Match your backend route (/api/user/login)
      const endpoint = isRegister ? "/user/register" : "/user/login";
      const res = await axios.post(`${API_BASE_URL}${endpoint}`, formData);

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login/Register error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
      <Navbar />

      <div className="flex items-center justify-center pt-24 pb-10 px-4">
        <div className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-md transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {isRegister ? "Create Account" : "Login"}
          </h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 bg-transparent p-2 mb-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 bg-transparent p-2 mb-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 bg-transparent p-2 mb-4 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium transition-all duration-300"
            >
              {isRegister ? "Sign Up" : "Login"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
