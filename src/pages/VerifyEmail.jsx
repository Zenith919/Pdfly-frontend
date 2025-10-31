import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying your email...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/verify/${token}`);
        setMessage(res.data.message || "✅ Email verified successfully!");
      } catch (err) {
        setMessage(
          err.response?.data?.message || "❌ Invalid or expired verification link."
        );
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [token]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#f4f6fa",
      textAlign: "center",
    }}>
      <div style={{
        background: "#fff",
        padding: "2rem 3rem",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}>
        <h2>{loading ? "Verifying..." : message}</h2>
        {!loading && (
          <button
            onClick={() => (window.location = "/login")}
            style={{
              marginTop: "1rem",
              background: "#4f46e5",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
