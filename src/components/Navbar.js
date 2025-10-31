import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logo from "./Logo";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle theme switch
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-opacity-80 shadow-md"
          : "bg-opacity-100"
      } ${
        theme === "dark"
          ? "bg-gray-900/80 text-white"
          : "bg-gray-100/80 text-gray-900"
      } ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Logo size={scrolled ? 28 : 36} theme={theme} />
          <span
            className={`font-semibold tracking-wide transition-all duration-300 ${
              scrolled ? "text-lg" : "text-xl"
            }`}
          >
            PDFly
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`hover:underline ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className={`px-3 py-1 rounded transition ${
                  theme === "dark"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`hover:underline ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Login
            </Link>
          )}

          {/* 🌗 Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`px-2 py-1 rounded transition ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
