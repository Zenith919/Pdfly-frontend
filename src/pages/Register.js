// src/pages/Register.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

// ✅ Use environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL;

export default function Register() {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${API_BASE_URL}/user/register`, formData); // ✅ match your route: /api/user

      if (res.data.token && res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setMessage("✅ Registration successful! Redirecting...");
        setTimeout(() => (window.location.href = "/dashboard"), 1000);
      } else {
        setMessage(
          res.data.message ||
            "✅ Registration successful! Please verify your email before logging in."
        );
      }
    } catch (err) {
      console.error("Registration error:", err);
      setMessage(err.response?.data?.message || "❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Your PDFly Account
        </h2>

        {message && <p className="text-center mb-4">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
