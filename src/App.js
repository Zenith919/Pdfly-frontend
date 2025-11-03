// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verify/:token" element={<VerifyEmail />} /> {/* ✅ moved here */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
